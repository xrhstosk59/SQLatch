import styles from '../../styles/runtimeControl.module.css';
import { useBlocklyContext } from '../../contexts/BlocklyContext';
import { useSQLite } from '../../contexts/SQLiteContext';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { ToastContainer } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import SQLOutputModal from '../modals/SQLOutputModal';
import SchemaModal from '../modals/SchemaModal';
import ErrorToast from '../ui/ErrorToast';
import ValidationToast from '../ui/ValidationToast';
import SuccessToast from '../ui/SuccessToast';
import convertSchema from '../../modules/SchemaGenerator';
import { useValidation } from '../../modules/Validator';

interface DatabaseConfig {
    tables: any[];
    edgeConfigs: any[];
    schemaColors: Record<string, string>;
    tablePositions: Record<string, { x: number; y: number }>;
}

interface SQLRuntimeControlProps {
    valSync: boolean;
    setValSync: (value: boolean) => void;
}

export default function SQLRuntimeControl({ valSync, setValSync }: SQLRuntimeControlProps) {
    const useDB = useSQLite();
    const useBL = useBlocklyContext();
    const useVA = useValidation();

    const [modalShow, setModalShow] = useState(false);
    const [errortoastShow, setErrorToastShow] = useState(false);
    const [validationtoastShow, setValidationToastShow] = useState(false);
    const [successtoastShow, setSuccessToastShow] = useState(false);
    const [selectedOnly, setSelectedOnly] = useState(false);

    const [schemaShow, setschemaShow] = useState(false);
    const [currentDatabaseInternal, setCurrentDatabase] = useState<DatabaseConfig>({
        tables: [],
        edgeConfigs: [],
        schemaColors: {},
        tablePositions: {},
    });
    const [outputDB, setOutputDB] = useState<Record<string, unknown>[]>([]);
    const [errorDB, setErrorDB] = useState<string>('');

    // Initialize SQL only once on mount
    useEffect(() => {
        useDB.initSQL();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showResult = (): boolean => {
        setErrorToastShow(false);
        setOutputDB(useDB.getResultDB());

        const error = useDB.getError();
        setErrorDB(error);
        if (error === '') {
            setModalShow(true);
            return true;
        } else {
            setErrorToastShow(true);
            return false;
        }
    };

    const onClickRun = () => {
        const blocklyOut: string = selectedOnly ? useBL.runGenSelected() : useBL.runGen();
        useDB.queryDB(blocklyOut);

        if (showResult()) {
            if (useVA.validate(blocklyOut, useDB.getResultDB())) {
                console.log('Validation: passed');
                setValSync(!valSync);
                setSuccessToastShow(true);
            } else {
                setValidationToastShow(true);
            }
        }
    };

    return (
        <>
            <Container
                fluid
                style={{ paddingLeft: 0, paddingRight: 0 }}
                className={styles.container}
            >
                <Button variant="success" onClick={onClickRun}>
                    Αποτέλεσμα
                </Button>

                <Form.Check
                    type="checkbox"
                    id="selected-only-checkbox"
                    label="Μόνο επιλεγμένο"
                    checked={selectedOnly}
                    onChange={(e) => setSelectedOnly(e.target.checked)}
                    style={{
                        marginLeft: '15px',
                        display: 'inline-block',
                        color: 'white',
                        userSelect: 'none'
                    }}
                    title="Εκτέλεση μόνο του επιλεγμένου block"
                />

                <Button
                    variant="primary"
                    style={{ marginLeft: '20px' }}
                    onClick={() => {
                        setCurrentDatabase(convertSchema(useDB));
                        setschemaShow(true);
                    }}
                >
                    Σχήμα Βάσης
                </Button>
                <SQLOutputModal
                    show={modalShow}
                    output={outputDB}
                    onHide={() => setModalShow(false)}
                />
                <SchemaModal
                    show={schemaShow}
                    onHide={() => setschemaShow(false)}
                    db={currentDatabaseInternal}
                ></SchemaModal>
                <ToastContainer position="bottom-end" style={{ padding: '20px' }}>
                    <ErrorToast
                        show={errortoastShow}
                        onHide={() => {
                            setErrorToastShow(false);
                        }}
                        error={errorDB}
                    />
                    <ValidationToast
                        show={validationtoastShow}
                        onHide={() => {
                            setValidationToastShow(false);
                        }}
                    />
                    <SuccessToast
                        show={successtoastShow}
                        onHide={() => {
                            setSuccessToastShow(false);
                        }}
                        message="Η επικύρωση πέρασε επιτυχώς!"
                    />
                </ToastContainer>
            </Container>
        </>
    );
}
