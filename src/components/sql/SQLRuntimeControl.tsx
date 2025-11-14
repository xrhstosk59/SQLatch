import styles from '../../styles/runtimeControl.module.css';
import { useBlocklyContext } from '../../contexts/BlocklyContext';
import { useSQLite } from '../../contexts/SQLiteContext';
import { useQueryHistory } from '../../contexts/QueryHistoryContext';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import SQLOutputModal from '../modals/SQLOutputModal';
import SQLPreviewModal from '../modals/SQLPreviewModal';
import ErrorToast from '../ui/ErrorToast';

export default function SQLRuntimeControl() {
    const useDB = useSQLite();
    const useBL = useBlocklyContext();
    const queryHistory = useQueryHistory();

    const [modalShow, setModalShow] = useState(false);
    const [previewModalShow, setPreviewModalShow] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const [outputDB, setOutputDB] = useState<Record<string, unknown>[]>([]);
    const [errorDB, setErrorDB] = useState<string>('');
    const [currentSQL, setCurrentSQL] = useState<string>('');

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
    };

    const onClickRun = () => {
        // Generate SQL and show preview
        const blocklyOut: string = useBL.runGen();
        setCurrentSQL(blocklyOut);
        setPreviewModalShow(true);
    };

    const executeSQL = () => {
        // Execute the SQL and close preview
        useDB.queryDB(currentSQL);
        setPreviewModalShow(false);

        // Get results and error
        const results = useDB.getResultDB();
        const error = useDB.getError();

        // Add to query history
        queryHistory.addQuery(
            currentSQL,
            error === '',
            error === '' ? results.length : undefined,
            error !== '' ? error : undefined
        );

        showResult();
    };

    // Keyboard shortcut for running query (Ctrl+Enter)
    useKeyboardShortcut({ key: 'Enter', ctrl: true }, onClickRun);

    return (
        <>
            <Container
                fluid
                style={{ paddingLeft: 0, paddingRight: 0 }}
                className={styles.container}
                role="region"
                aria-label="SQL εκτέλεση και αποτελέσματα"
            >
                <button
                    className={styles.executeButton}
                    onClick={onClickRun}
                    aria-label="Εκτέλεση SQL query (Ctrl+Enter)"
                    title="Ctrl+Enter"
                >
                    <i className="bi bi-play-circle-fill"></i>
                    <span>Αποτέλεσμα</span>
                </button>
                <SQLPreviewModal
                    show={previewModalShow}
                    onHide={() => setPreviewModalShow(false)}
                    onConfirm={executeSQL}
                    sqlCode={currentSQL}
                />
                <SQLOutputModal
                    show={modalShow}
                    output={outputDB}
                    onHide={() => setModalShow(false)}
                />
                <ToastContainer position="bottom-end" style={{ padding: '20px' }}>
                    <ErrorToast
                        show={toastShow}
                        onHide={() => {
                            setToastShow(false);
                        }}
                        error={errorDB}
                    />
                </ToastContainer>
            </Container>
        </>
    );
}
