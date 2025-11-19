import showdown from 'showdown';

export const useShowdown = () => {
    const converter = new showdown.Converter();

    const convertMd = (path: string): any => {
        const html = requestMd(path).then((text): any => { return converter.makeHtml(text) });
        return html;
    }

    const requestMd = async (path: string): Promise<any> => {
        try {
            const response = await fetch(path);
            const text = await response.text();
            return text;

        } catch (error) {
            console.error('Error fetching the file: ', error);
            return '';
        }
    };

    return {
        convertMd,
    }
}
