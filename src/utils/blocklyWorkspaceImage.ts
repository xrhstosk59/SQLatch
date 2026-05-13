import * as Blockly from 'blockly';

interface BlocklyBounds {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const formatFilenameDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', '_').replace(':', '-');
};

const slugify = (value: string): string => {
    const slug = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return slug || 'blocks';
};

const downloadBlob = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const getWorkspaceBounds = (workspace: Blockly.WorkspaceSvg): BlocklyBounds => {
    return (
        workspace as Blockly.WorkspaceSvg & {
            getBlocksBoundingBox: () => BlocklyBounds;
        }
    ).getBlocksBoundingBox();
};

const buildWorkspaceSvg = (workspace: Blockly.WorkspaceSvg): string => {
    const topBlocks = workspace.getTopBlocks(true);

    if (topBlocks.length === 0) {
        throw new Error('Δεν υπάρχουν blocks για λήψη.');
    }

    const margin = 32;
    const bounds = getWorkspaceBounds(workspace);
    const left = bounds.left - margin;
    const top = bounds.top - margin;
    const width = Math.max(1, bounds.right - bounds.left + margin * 2);
    const height = Math.max(1, bounds.bottom - bounds.top + margin * 2);
    const serializer = new XMLSerializer();
    const blockMarkup = topBlocks
        .map((block) => {
            const svgRoot = (block as Blockly.BlockSvg).getSvgRoot();
            return svgRoot ? serializer.serializeToString(svgRoot.cloneNode(true)) : '';
        })
        .join('');

    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<svg xmlns="${SVG_NAMESPACE}" width="${width}" height="${height}" viewBox="${left} ${top} ${width} ${height}">`,
        '<style>',
        '.blocklyText,.blocklyNonEditableText>text,.blocklyEditableText>text{font-family:Arial,sans-serif;font-size:12px;fill:#fff;}',
        '.blocklyCommentText{font-family:Arial,sans-serif;font-size:12px;fill:#000;}',
        '</style>',
        `<rect x="${left}" y="${top}" width="${width}" height="${height}" fill="#111827"/>`,
        blockMarkup,
        '</svg>',
    ].join('');
};

const svgToPngBlob = (svg: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const image = new Image();

        image.onload = () => {
            const scale = Math.min(2, 4096 / Math.max(image.width, image.height, 1));
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.width * scale));
            canvas.height = Math.max(1, Math.round(image.height * scale));

            const context = canvas.getContext('2d');
            if (!context) {
                URL.revokeObjectURL(url);
                reject(new Error('Δεν ήταν δυνατή η δημιουργία εικόνας.'));
                return;
            }

            context.fillStyle = '#111827';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                    return;
                }

                reject(new Error('Δεν ήταν δυνατή η αποθήκευση της εικόνας.'));
            }, 'image/png');
        };

        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Δεν ήταν δυνατή η μετατροπή των blocks σε εικόνα.'));
        };

        image.src = url;
    });
};

export const downloadBlocklyWorkspacePng = async (
    workspace: Blockly.WorkspaceSvg | null,
    title: string
): Promise<void> => {
    if (!workspace) {
        throw new Error('Το workspace δεν είναι διαθέσιμο.');
    }

    const svg = buildWorkspaceSvg(workspace);
    const pngBlob = await svgToPngBlob(svg);
    const filename = `sqlatch-blocks-${slugify(title)}-${formatFilenameDate(new Date())}.png`;

    downloadBlob(pngBlob, filename);
};
