import styles from '../styles/runtimeControl.module.css';
import { useBlockly } from '../modules/Blockly/Blockly';
import { useSQL } from '../modules/SQLite';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import SQLOutputModal from './SQLOutputModal';

export default function SQLRuntimeControl() {
    const useDB = useSQL();
    const useBL = useBlockly();

    const [modalShow, setModalShow] = useState(false);
    const [outputDB, setOutputDB] = useState<object[]>([]);
    const [errorDB, setErrorDB] = useState<object[]>([]);

    useEffect(() => {
        useDB.initSQL();
    }, []);

    const showResult = () => {
        setOutputDB(useDB.getResultDB());
        setErrorDB(useDB.getError());
        setModalShow(true);
    }

    const onClickRun = () => {
        const blocklyOut: string = useBL.runGen();
        useDB.queryDB(blocklyOut);

        showResult();
    }

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.container}>
            <Button variant="success" onClick={onClickRun}>Αποτέλεσμα</Button>
            <SQLOutputModal
                show={modalShow}
                error={errorDB}
                output={outputDB}
                onHide={() => setModalShow(false)}
            />
        </Container>
    )
}

