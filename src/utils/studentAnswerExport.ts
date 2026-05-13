export type StudentAnswerExportFormat = 'txt' | 'json' | 'docx';

export interface StudentAnswerExportInput {
    exerciseTitle: string;
    sqlQuery: string;
    workspaceState?: object | null;
    executionResult: Record<string, unknown>[];
    studentComment: string;
    studentNameOrTeam?: string;
    allowTeamSubmission?: boolean;
    validationPassed?: boolean;
}

export interface StudentAnswerExportPayload extends StudentAnswerExportInput {
    schemaVersion: 1;
    exportedAt: string;
    exportedAtLocal: string;
}

export interface WrittenAnswerExportInput {
    title: string;
    label: string;
    answer: string;
}

const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
};

const stringifyForExport = (value: unknown): string => {
    return JSON.stringify(
        value,
        (_, nestedValue) =>
            typeof nestedValue === 'bigint' ? nestedValue.toString() : nestedValue,
        2
    );
};

const formatFilenameDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', '_').replace(':', '-');
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

const downloadTextFile = (content: string, filename: string, type: string): void => {
    downloadBlob(new Blob([content], { type }), filename);
};

const formatResultAsText = (rows: Record<string, unknown>[]): string => {
    if (rows.length === 0) return 'Δεν επέστρεψε γραμμές.';

    const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
    const headerRow = headers.join('\t');
    const dataRows = rows.map((row) =>
        headers.map((header) => formatValue(row[header])).join('\t')
    );

    return [headerRow, ...dataRows].join('\n');
};

const formatWorkspaceStateAsText = (workspaceState?: object | null): string => {
    if (!workspaceState) return 'Δεν είναι διαθέσιμη.';
    return stringifyForExport(workspaceState);
};

const buildTextExport = (payload: StudentAnswerExportPayload): string => {
    const studentIdentityLabel = payload.allowTeamSubmission
        ? 'Ονοματεπώνυμο ή ομάδα'
        : 'Ονοματεπώνυμο';

    return [
        'SQLatch - Παράδοση απάντησης',
        '',
        `Τίτλος άσκησης: ${payload.exerciseTitle}`,
        `Ημερομηνία/ώρα: ${payload.exportedAtLocal}`,
        `${studentIdentityLabel}: ${payload.studentNameOrTeam?.trim() || '-'}`,
        `Επικύρωση: ${
            payload.validationPassed === undefined
                ? 'Δεν εφαρμόστηκε'
                : payload.validationPassed
                  ? 'Επιτυχής'
                  : 'Μη επιτυχής'
        }`,
        '',
        'Σχόλιο μαθητή:',
        payload.studentComment.trim() || '-',
        '',
        'SQL query:',
        payload.sqlQuery.trim() || '-',
        '',
        'Αποτέλεσμα εκτέλεσης:',
        formatResultAsText(payload.executionResult),
        '',
        'Blocks / δομή λύσης:',
        formatWorkspaceStateAsText(payload.workspaceState),
        '',
    ].join('\n');
};

const escapeXml = (value: string): string => {
    return value
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

const getValidationLabel = (payload: StudentAnswerExportPayload): string => {
    if (payload.validationPassed === undefined) return 'Δεν εφαρμόστηκε';
    return payload.validationPassed ? 'Επιτυχής' : 'Μη επιτυχής';
};

const buildDocxParagraph = (
    text = '',
    options: { bold?: boolean; size?: number; monospace?: boolean } = {}
): string => {
    const runProperties = [
        options.bold ? '<w:b/>' : '',
        options.size ? `<w:sz w:val="${options.size}"/>` : '',
        options.monospace ? '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/>' : '',
    ].join('');

    return [
        '<w:p>',
        '<w:r>',
        runProperties ? `<w:rPr>${runProperties}</w:rPr>` : '',
        `<w:t xml:space="preserve">${escapeXml(text)}</w:t>`,
        '</w:r>',
        '</w:p>',
    ].join('');
};

const buildDocxTextBlock = (text: string, monospace = false): string => {
    return text
        .split('\n')
        .map((line) => buildDocxParagraph(line, { monospace }))
        .join('');
};

const buildDocxSection = (title: string, content: string, monospace = false): string => {
    return [
        buildDocxParagraph(title, { bold: true, size: 28 }),
        buildDocxTextBlock(content || '-', monospace),
        buildDocxParagraph(),
    ].join('');
};

const buildDocxResultTable = (rows: Record<string, unknown>[]): string => {
    if (rows.length === 0) return buildDocxParagraph('Δεν επέστρεψε γραμμές.');

    const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
    const tableRows = [headers, ...rows.map((row) => headers.map((header) => row[header]))];

    const cell = (value: unknown, isHeader = false): string => {
        return [
            '<w:tc>',
            '<w:tcPr><w:tcW w:w="2400" w:type="dxa"/></w:tcPr>',
            buildDocxParagraph(formatValue(value), { bold: isHeader }),
            '</w:tc>',
        ].join('');
    };

    return [
        '<w:tbl>',
        '<w:tblPr><w:tblBorders>',
        '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>',
        '<w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>',
        '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>',
        '<w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>',
        '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>',
        '<w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>',
        '</w:tblBorders></w:tblPr>',
        tableRows
            .map(
                (row, rowIndex) =>
                    `<w:tr>${row.map((value) => cell(value, rowIndex === 0)).join('')}</w:tr>`
            )
            .join(''),
        '</w:tbl>',
    ].join('');
};

const buildDocxDocumentXml = (payload: StudentAnswerExportPayload): string => {
    const studentIdentityLabel = payload.allowTeamSubmission
        ? 'Ονοματεπώνυμο ή ομάδα'
        : 'Ονοματεπώνυμο';

    const body = [
        buildDocxParagraph('SQLatch - Παράδοση απάντησης', { bold: true, size: 36 }),
        buildDocxParagraph(`Τίτλος άσκησης: ${payload.exerciseTitle}`),
        buildDocxParagraph(`Ημερομηνία/ώρα: ${payload.exportedAtLocal}`),
        buildDocxParagraph(`${studentIdentityLabel}: ${payload.studentNameOrTeam?.trim() || '-'}`),
        buildDocxParagraph(`Επικύρωση: ${getValidationLabel(payload)}`),
        buildDocxParagraph(),
        buildDocxSection('Σχόλιο μαθητή', payload.studentComment.trim() || '-'),
        buildDocxSection('SQL query', payload.sqlQuery.trim() || '-', true),
        buildDocxParagraph('Αποτέλεσμα εκτέλεσης', { bold: true, size: 28 }),
        buildDocxResultTable(payload.executionResult),
        buildDocxParagraph(),
        buildDocxSection(
            'Blocks / δομή λύσης',
            formatWorkspaceStateAsText(payload.workspaceState),
            true
        ),
    ].join('');

    return [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">',
        '<w:body>',
        body,
        '<w:sectPr>',
        '<w:pgSz w:w="11906" w:h="16838"/>',
        '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>',
        '</w:sectPr>',
        '</w:body>',
        '</w:document>',
    ].join('');
};

const encodeText = (value: string): Uint8Array => new TextEncoder().encode(value);

const concatBytes = (chunks: Uint8Array[]): Uint8Array => {
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const output = new Uint8Array(totalLength);
    let offset = 0;

    chunks.forEach((chunk) => {
        output.set(chunk, offset);
        offset += chunk.length;
    });

    return output;
};

const uint16 = (value: number): Uint8Array => {
    const output = new Uint8Array(2);
    const view = new DataView(output.buffer);
    view.setUint16(0, value, true);
    return output;
};

const uint32 = (value: number): Uint8Array => {
    const output = new Uint8Array(4);
    const view = new DataView(output.buffer);
    view.setUint32(0, value, true);
    return output;
};

const getCrcTable = (): number[] => {
    const table: number[] = [];

    for (let i = 0; i < 256; i += 1) {
        let crc = i;
        for (let j = 0; j < 8; j += 1) {
            crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
        }
        table[i] = crc >>> 0;
    }

    return table;
};

const CRC_TABLE = getCrcTable();

const crc32 = (data: Uint8Array): number => {
    let crc = 0xffffffff;

    data.forEach((byte) => {
        crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    });

    return (crc ^ 0xffffffff) >>> 0;
};

const getDosDateTime = (date: Date): { time: number; date: number } => {
    const year = Math.max(date.getFullYear(), 1980);

    return {
        time:
            (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
        date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
    };
};

const buildZip = (files: { path: string; content: string }[]): Uint8Array => {
    const now = new Date();
    const { time, date } = getDosDateTime(now);
    const localParts: Uint8Array[] = [];
    const centralParts: Uint8Array[] = [];
    let offset = 0;

    files.forEach((file) => {
        const pathBytes = encodeText(file.path);
        const contentBytes = encodeText(file.content);
        const checksum = crc32(contentBytes);
        const localHeaderOffset = offset;

        const localHeader = concatBytes([
            uint32(0x04034b50),
            uint16(20),
            uint16(0x0800),
            uint16(0),
            uint16(time),
            uint16(date),
            uint32(checksum),
            uint32(contentBytes.length),
            uint32(contentBytes.length),
            uint16(pathBytes.length),
            uint16(0),
            pathBytes,
        ]);

        localParts.push(localHeader, contentBytes);
        offset += localHeader.length + contentBytes.length;

        centralParts.push(
            concatBytes([
                uint32(0x02014b50),
                uint16(20),
                uint16(20),
                uint16(0x0800),
                uint16(0),
                uint16(time),
                uint16(date),
                uint32(checksum),
                uint32(contentBytes.length),
                uint32(contentBytes.length),
                uint16(pathBytes.length),
                uint16(0),
                uint16(0),
                uint16(0),
                uint16(0),
                uint32(0),
                uint32(localHeaderOffset),
                pathBytes,
            ])
        );
    });

    const centralDirectory = concatBytes(centralParts);
    const endOfCentralDirectory = concatBytes([
        uint32(0x06054b50),
        uint16(0),
        uint16(0),
        uint16(files.length),
        uint16(files.length),
        uint32(centralDirectory.length),
        uint32(offset),
        uint16(0),
    ]);

    return concatBytes([...localParts, centralDirectory, endOfCentralDirectory]);
};

const buildDocxBlobFromDocumentXml = (documentXml: string): Blob => {
    const files = [
        {
            path: '[Content_Types].xml',
            content: [
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
                '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
                '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
                '<Default Extension="xml" ContentType="application/xml"/>',
                '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>',
                '</Types>',
            ].join(''),
        },
        {
            path: '_rels/.rels',
            content: [
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>',
                '</Relationships>',
            ].join(''),
        },
        {
            path: 'word/document.xml',
            content: documentXml,
        },
    ];

    return new Blob([buildZip(files)], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
};

const buildDocxBlob = (payload: StudentAnswerExportPayload): Blob => {
    return buildDocxBlobFromDocumentXml(buildDocxDocumentXml(payload));
};

const buildWrittenAnswerDocumentXml = (
    input: WrittenAnswerExportInput,
    exportedAtLocal: string
): string => {
    const body = [
        buildDocxParagraph('SQLatch - Γραπτή απάντηση', { bold: true, size: 36 }),
        buildDocxParagraph(`Άσκηση: ${input.title}`),
        buildDocxParagraph(`Πεδίο: ${input.label}`),
        buildDocxParagraph(`Ημερομηνία/ώρα: ${exportedAtLocal}`),
        buildDocxParagraph(),
        buildDocxSection('Κείμενο απάντησης', input.answer.trim() || '-'),
    ].join('');

    return [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">',
        '<w:body>',
        body,
        '<w:sectPr>',
        '<w:pgSz w:w="11906" w:h="16838"/>',
        '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>',
        '</w:sectPr>',
        '</w:body>',
        '</w:document>',
    ].join('');
};

export const createStudentAnswerExport = (
    input: StudentAnswerExportInput
): StudentAnswerExportPayload => {
    const now = new Date();

    return {
        schemaVersion: 1,
        exportedAt: now.toISOString(),
        exportedAtLocal: new Intl.DateTimeFormat('el-GR', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(now),
        ...input,
    };
};

export const downloadStudentAnswerExport = (
    payload: StudentAnswerExportPayload,
    format: StudentAnswerExportFormat
): void => {
    const exportedAt = new Date(payload.exportedAt);
    const filename = `sqlatch-answer-${formatFilenameDate(exportedAt)}.${format}`;

    if (format === 'docx') {
        downloadBlob(buildDocxBlob(payload), filename);
        return;
    }

    if (format === 'json') {
        downloadTextFile(stringifyForExport(payload), filename, 'application/json;charset=utf-8;');
        return;
    }

    downloadTextFile(buildTextExport(payload), filename, 'text/plain;charset=utf-8;');
};

export const downloadWrittenAnswerDocx = (input: WrittenAnswerExportInput): void => {
    const now = new Date();
    const exportedAtLocal = new Intl.DateTimeFormat('el-GR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(now);
    const filename = `sqlatch-written-answer-${formatFilenameDate(now)}.docx`;

    downloadBlob(
        buildDocxBlobFromDocumentXml(buildWrittenAnswerDocumentXml(input, exportedAtLocal)),
        filename
    );
};
