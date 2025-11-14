import showdown from 'showdown';
import DOMPurify from 'dompurify';

export const useShowdown = () => {
    const converter = new showdown.Converter();

    const convertMd = async (path: string): Promise<string> => {
        try {
            const text = await requestMd(path);
            const rawHtml = converter.makeHtml(text);
            // Sanitize HTML to prevent XSS attacks
            const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
                ALLOWED_TAGS: [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'p',
                    'br',
                    'strong',
                    'em',
                    'u',
                    'ol',
                    'ul',
                    'li',
                    'a',
                    'img',
                    'code',
                    'pre',
                    'blockquote',
                    'hr',
                    'table',
                    'thead',
                    'tbody',
                    'tr',
                    'th',
                    'td',
                    'span',
                    'div',
                ],
                ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style', 'target', 'rel'],
            });
            return sanitizedHtml;
        } catch (error) {
            console.error('Error converting Markdown:', error);
            return '';
        }
    };

    const requestMd = async (path: string): Promise<string> => {
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
    };
};
