import styles from '../styles/guide.module.css';
import showdown from 'showdown';
import { useEffect, useState, useRef } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Guide() {
    const [md, setMd] = useState('');
    const Guides = ['Lesson1/select.md', 'Tasks1/tasks.md'];
    const idxRef = useRef(0);

    const fetchMd = async () => {
        try {
            const response = await fetch('/MDGuides/' + Guides[idxRef.current]);
            const text = await response.text();
            setMd(text);
        } catch (error) {
            console.error('Error fetching the file: ', error);
        }
    };

    const loadNextGuide = () => {
        if (idxRef.current < Guides.length - 1) {
            idxRef.current++;
            console.log(idxRef.current);
            fetchMd();
        }
    };

    const loadPrevGuide = () => {
        if (idxRef.current > 0) {
            idxRef.current--;
            console.log(idxRef.current);
            fetchMd();
        }
    };

    useEffect(() => {
        fetchMd();
    }, []);

    const converter = new showdown.Converter();
    const html = converter.makeHtml(md);

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.container}>
            <Accordion defaultActiveKey="0"><Accordion.Item eventKey="0">
                <Accordion.Header>Μαθήματα</Accordion.Header>
                <Accordion.Body className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={loadPrevGuide}>Previous</Button>
                    <Button variant="success" onClick={loadNextGuide}>Next</Button>
                </Accordion.Body>
                <Accordion.Body dangerouslySetInnerHTML={{ __html: html }}></Accordion.Body>
            </Accordion.Item>
            </Accordion> 
        </Container>
    );

}
