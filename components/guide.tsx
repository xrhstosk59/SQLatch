import styles from '../styles/guide.module.css';
import showdown from "showdown";
import { useEffect, useState } from 'react';

export default function Guide() {
    const [md, setMd] = useState('');

    useEffect(() => {
        const fetchMd = async () => {
            try {
                const response = await fetch('/MDGuides/test.md');
                const text = await response.text();
                setMd(text);
            } catch (error) {
                console.error('Error fetching the file: ', error);
            }
        };
        fetchMd();
    }, []);

    const converter = new showdown.Converter();
    const html = converter.makeHtml(md);

    return (
        <div className={styles.container} dangerouslySetInnerHTML={{ __html: html }} />
    );
}
