import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useSQLite } from '../../contexts/SQLiteContext';
import { useQueryHistory } from '../../contexts/QueryHistoryContext';
import SQLOutputModal from '../modals/SQLOutputModal';
import ErrorToast from '../ui/ErrorToast';
import SuccessToast from '../ui/SuccessToast';
import styles from '../../styles/sandbox.module.css';

const STARTER_SQL = `CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT,
    grade INTEGER
);

INSERT INTO students (id, name, grade) VALUES
    (1, 'Maria', 18),
    (2, 'Nikos', 15);

SELECT * FROM students;`;

export default function SandboxPanel() {
    const useDB = useSQLite();
    const queryHistory = useQueryHistory();

    const [sqlCode, setSqlCode] = useState('');
    const [output, setOutput] = useState<Record<string, unknown>[]>([]);
    const [error, setError] = useState('');
    const [outputModalShow, setOutputModalShow] = useState(false);
    const [errorToastShow, setErrorToastShow] = useState(false);
    const [successToastShow, setSuccessToastShow] = useState(false);

    const runSQL = () => {
        const trimmedSQL = sqlCode.trim();
        const results = useDB.queryDB(trimmedSQL);
        const dbError = useDB.getError();

        queryHistory.addQuery(
            trimmedSQL,
            dbError === '',
            dbError === '' ? results.length : undefined,
            dbError !== '' ? dbError : undefined
        );

        setOutput(results);
        setError(dbError);
        setErrorToastShow(false);
        setSuccessToastShow(false);

        if (dbError !== '') {
            setErrorToastShow(true);
            return;
        }

        if (results.length > 0) {
            setOutputModalShow(true);
        } else {
            setSuccessToastShow(true);
        }
    };

    const resetSandbox = () => {
        useDB.resetDB();
        setOutput([]);
        setError('');
        setErrorToastShow(false);
        setSuccessToastShow(true);
    };

    const loadStarterSQL = () => {
        setSqlCode(STARTER_SQL);
    };

    return (
        <section className={styles.panel} aria-labelledby="sandbox-title">
            <div className={styles.header}>
                <div>
                    <p className={styles.kicker}>Ελεύθερη εξάσκηση</p>
                    <h2 id="sandbox-title">Sandbox SQL</h2>
                </div>
                <i className="bi bi-terminal" aria-hidden="true"></i>
            </div>

            <p className={styles.description}>
                Γράψε δικές σου SQL εντολές ή φτιάξε blocks στο workspace και τρέξε τα χωρίς
                ερωτήσεις και χωρίς επικύρωση άσκησης.
            </p>

            <Form.Group controlId="sandbox-sql-editor" className={styles.editorGroup}>
                <Form.Label>SQL editor</Form.Label>
                <Form.Control
                    as="textarea"
                    value={sqlCode}
                    onChange={(event) => setSqlCode(event.target.value)}
                    placeholder="π.χ. CREATE TABLE students (...); ή SELECT * FROM students;"
                    className={styles.editor}
                    spellCheck={false}
                />
            </Form.Group>

            <ButtonGroup className={styles.actions}>
                <Button variant="success" onClick={runSQL}>
                    <i className="bi bi-play-fill" aria-hidden="true"></i> Τρέξε SQL
                </Button>
                <Button variant="outline-info" onClick={loadStarterSQL}>
                    <i className="bi bi-code-square" aria-hidden="true"></i> Παράδειγμα
                </Button>
                <Button variant="outline-light" onClick={resetSandbox}>
                    <i className="bi bi-arrow-counterclockwise" aria-hidden="true"></i> Νέα βάση
                </Button>
            </ButtonGroup>

            <div className={styles.note}>
                <strong>Σημείωση:</strong> η βάση του sandbox είναι προσωρινή. Μπορείς να τη
                γεμίσεις με CREATE και INSERT είτε από τον editor είτε από blocks.
            </div>

            <SQLOutputModal
                show={outputModalShow}
                onHide={() => setOutputModalShow(false)}
                output={output}
            />
            <ToastContainer position="bottom-end" style={{ padding: '20px' }}>
                <ErrorToast
                    show={errorToastShow}
                    onHide={() => setErrorToastShow(false)}
                    error={error}
                />
                <SuccessToast
                    show={successToastShow}
                    onHide={() => setSuccessToastShow(false)}
                    message="Η εντολή εκτελέστηκε στο sandbox."
                />
            </ToastContainer>
        </section>
    );
}
