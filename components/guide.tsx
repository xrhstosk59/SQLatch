import styles from '../styles/guide.module.css';
import showdown from "showdown";
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

export default function Guide() {
    const [content, setContent] = useState<JSX.Element[] | null>(null); // Explicitly define the type

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch('/MDGuides/test.md');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const md = await response.text();
                const converter = new showdown.Converter();
                const html = converter.makeHtml(md);
                const out:JSX.Element = parse(html) ; // Explicitly typecast to Element
                setContent(out)
            } catch (error) {
                console.error('Error fetching or parsing Markdown:', error);
            }
        };

        fetchMarkdown();
    }, []);

    return (
        <div className={styles.container}>
            {out}
        </div>
    );
}
