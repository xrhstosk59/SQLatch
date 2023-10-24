import styles from '../styles/guide.module.css';
import showdown from "showdown";
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

export default function Guide() {

    const md =`### Η συντακτική δομή της SELECT είναι η εξής:
         SELECT column1, column2, ...
         FROM table_name`;
    const converter = new showdown.Converter();
    const html = converter.makeHtml(md);
    const out = parse(html)
    return (
        <div className={styles.container}>
            {out}
        </div>
    );
}
