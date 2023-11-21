import styles from '../styles/guide.module.css';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';

import { useGuide } from '../modules/Guide';
import { useBlockly } from '../modules/Blockly/Blockly';
import { useSQL } from '../modules/SQLite';

export default function Guide() {

    const useRequest = useGuide();
    const useBL = useBlockly();

    const LTSBlocks = [
        'Lessons/Lesson1/blocks.json',
        'Lessons/Lesson2/blocks.json',
    ]

    const LTS = [
        'Lessons/Lesson1/theory.md',
        'Lessons/Lesson2/theory.md',
        'Tasks/Tasks1/tasks.md',
        'Scenarios/Scenario1/scen.md',
        'Scenarios/Scenario2/scen.md',
        'Scenarios/Scenario3/scen.md'
    ];

    const LTSNames = [
        'Μάθημα με SELECT',
        'Μάθημα με CREATE TABLE',
        'Ασκήσεις',
        'Σενάριο: Το μαγικό βιβλίο',
        'Σενάριο: Η κλοπή του μουσείου',
        'Σενάριο: Η εξερεύνηση πλανητών'
    ]

    const DBs = [
        'Lessons/Lesson1/database.db',
        '',
        '',
        '',
        'Scenarios/Scenario2/database.db',
    ]

    const [idxState, setIdxState] = useState(0);
    const [inHome, setInHome] = useState(true);
    const [MDGuides, setMDGuides] = useState();

    const isPageActive = (id: number): boolean => {
        return id == idxState;
    }

    const loadNextGuide = () => {
        if (idxState < LTS.length - 1) {
            setIdxState(idxState + 1);
        }
    };

    const loadPrevGuide = () => {
        if (idxState > 0) {
            setIdxState(idxState - 1);
        }
    };

    useEffect(() => {
        const setHTML = async () => {
            let html = await useRequest.convertMd('/MDGuides/' + LTS[idxState]);
            setMDGuides(html);
            if (!inHome) {
                if (LTSBlocks[idxState] == '' || LTSBlocks[idxState] == undefined) {
                    useBL.loadWorkspaceFile('');
                } else {
                    useBL.loadWorkspaceFile('/MDGuides/' + LTSBlocks[idxState]);
                }
                if (DBs[idxState] == '' || DBs[idxState] == undefined) {
                    useSQL().resetDB();
                } else {
                    useSQL().loadDB('/MDGuides/' + DBs[idxState]);
                }
            }
        }

        setHTML();
    }, [idxState, inHome]);


    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.container}>
            {!inHome ? (
                <Container>
                    <Pagination style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination.Item active={inHome} onClick={() => setInHome(true)}>Αρχική</Pagination.Item>
                        <Pagination.Prev onClick={() => loadPrevGuide()} />

                        {LTS.map((_: string, valueIndex) => <Pagination.Item key={String(valueIndex)} active={isPageActive(valueIndex)} onClick={() => setIdxState(valueIndex)}>{valueIndex + 1}</Pagination.Item>)}

                        <Pagination.Next onClick={() => loadNextGuide()} />
                    </Pagination>
                    <Container dangerouslySetInnerHTML={{ __html: MDGuides }} />
                </Container>
            ) : (
                <Container>
                    <h2>Αρχική</h2>
                    <ul className={styles.link_list}>
                        {LTS.map((_: string, valueIndex) => <li key={String(valueIndex)}><Link href='' className={styles.link} onClick={() => { setIdxState(valueIndex); setInHome(false); }}>{valueIndex + 1}. {LTSNames[valueIndex]}</Link></li>)}
                    </ul>
                </Container>
            )}
        </Container>
    );
}

