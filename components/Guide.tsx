import styles from '../styles/guide.module.css';
import { useEffect, useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { useGuide } from '../modules/Guide';

export default function Guide() {

    const useRequest = useGuide();

    /*
        Types:
            0 - Lessons/
            1 - Tasks/
            2 - Scenarios/
    */

    const LTS = [
        ['Lesson1/theory.md', 'Lesson2/theory.md'],
        ['Tasks1/tasks.md'],
        ['Scenario1/scen.md','Scenario2/scen2.md','Scenario3/scen3.md'  ]
    ];

    const [ idxState, setIdxState] = useState([0, 0, 0]);
    const [ MDLessons, setMDLessons ] = useState();
    const [ MDTasks, setMDTasks ] = useState();
    const [ MDScenarios, setMDScenarios ] = useState();

    const isPrevShown = (type: number) => {
        return idxState[type] > 0;
    };

    const isNextShown = (type: number) => {
        return idxState[type] < LTS[type].length - 1;
    };

    const loadNextGuide = (type: number) => {
        if (idxState[type] < LTS[type].length - 1) {
            setIdxState(prevState => {
                let newStates = [...prevState];
                newStates[type] += 1;
                return newStates;
            });
        }
    };

    const loadPrevGuide = (type: number) => {
        if (idxState[type] > 0) {
            setIdxState(prevState => {
                let newStates = [...prevState];
                newStates[type] -= 1;
                return newStates;
            });
        }
    };

    useEffect(() => {
        const setHTML = async () => {
            let html = await useRequest.convertMd('/MDGuides/Lessons/' + LTS[0][idxState[0]]);
            setMDLessons(html);
        }
        setHTML();
    }, [idxState[0]]);

    useEffect(() => {
        const setHTML = async () => {
            let html = await useRequest.convertMd('/MDGuides/Tasks/' + LTS[1][idxState[1]]);
            setMDTasks(html);
        }
        setHTML();
    }, [idxState[1]]);

    useEffect(() => {
        const setHTML = async () => {
            let html = await useRequest.convertMd('/MDGuides/Scenarios/' + LTS[2][idxState[2]]);
            setMDScenarios(html);
        }
        setHTML();
    }, [idxState[2]]);

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.container}>
            <Accordion defaultActiveKey="0"><Accordion.Item eventKey="0">
                <Accordion.Header>Μαθήματα</Accordion.Header>
                {isPrevShown(0) || isNextShown(0) ? (
                <Accordion.Body className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => { loadPrevGuide(0) }} disabled={!isPrevShown(0)}>Προηγούμενο</Button>
                    <Button variant="success" onClick={() => { loadNextGuide(0) }} disabled={!isNextShown(0)}>Επόμενο</Button>
                </Accordion.Body>
                ) : <></>}
                <Accordion.Body dangerouslySetInnerHTML={{ __html: MDLessons }}></Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>Ασκήσεις</Accordion.Header>
                {isPrevShown(1) || isNextShown(1) ? (
                <Accordion.Body className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => { loadPrevGuide(1) }} disabled={!isPrevShown(1)}>Προηγούμενο</Button>
                    <Button variant="success" onClick={() => { loadNextGuide(1) }} disabled={!isNextShown(1)}>Επόμενο</Button>
                </Accordion.Body>
                ) : <></>}
                <Accordion.Body dangerouslySetInnerHTML={{ __html: MDTasks }}></Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Σενάρια</Accordion.Header>
                {isPrevShown(2) || isNextShown(2) ? (
                <Accordion.Body className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => { loadPrevGuide(2) }} disabled={!isPrevShown(2)}>Προηγούμενο</Button>
                    <Button variant="success" onClick={() => { loadNextGuide(2) }} disabled={!isNextShown(2)}>Επόμενο</Button>
                </Accordion.Body>
                ) : <></>}
                <Accordion.Body dangerouslySetInnerHTML={{ __html: MDScenarios }}></Accordion.Body>
            </Accordion.Item>
            </Accordion> 
        </Container>
    );

}

