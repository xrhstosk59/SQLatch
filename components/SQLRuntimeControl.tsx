import styles from '../styles/runtimeControl.module.css';
import { useBlockly } from '../modules/Blockly/Blockly';
import { useSQL } from '../modules/SQLite';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import SQLOutputModal from './SQLOutputModal';
import ErrorToast from './ErrorToast';

export default function SQLRuntimeControl() {
    const useDB = useSQL();
    const useBL = useBlockly();

    const [modalShow, setModalShow] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const [outputDB, setOutputDB] = useState<object[]>([]);
    const [errorDB, setErrorDB] = useState<string>('');

    useEffect(() => {
        useDB.initSQL();
    }, []);

    const showResult = () => {
        setOutputDB(useDB.getResultDB());

        const error = useDB.getError();
        setErrorDB(error);
        if (error === '') {
            setModalShow(true);
        } else {
            setToastShow(true);
        }
    }

    const onClickRun = () => {
        const blocklyOut: string = useBL.runGen();
        useDB.queryDB(blocklyOut);

        showResult();
    }

    return (
        <>
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.container}>
                <Button variant="success" onClick={onClickRun}>Αποτέλεσμα</Button>
                <SQLOutputModal
                    show={modalShow}
                    output={outputDB}
                    onHide={() => setModalShow(false)}
                />
                <ToastContainer position='bottom-end' style={{padding: '20px'}}>
                    <ErrorToast
                        show={toastShow}
                        onHide={() => { setToastShow(false) }}
                        error={errorDB}
                    />
                </ToastContainer>
            </Container>

        </>
    )
}

