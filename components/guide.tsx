import styles from '../styles/guide.module.css';
import showdown from "showdown";
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

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
        <div className={styles.container}>
            <Accordion defaultActiveKey="0"><Accordion.Item eventKey="0">
                <Accordion.Header>Guide</Accordion.Header>
                <Accordion.Body className="d-flex justify-content-between">
                <Button variant="secondary">Previous</Button>
                <Button variant="success">Next</Button></Accordion.Body>
                <Accordion.Body dangerouslySetInnerHTML={{ __html: html }}></Accordion.Body>
            
            </Accordion.Item>
            </Accordion> </div>
    );
}
