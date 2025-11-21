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
    const [pendingResult, setPendingResult] = useState<Record<string, unknown>[] | null>(null);

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

    // Open modal after outputDB state updates
    useEffect(() => {
        if (pendingResult !== null) {
            console.log('=== PENDING RESULT EFFECT ===');
            console.log('Opening modal with result:', pendingResult);
            const error = useDB.getError();
            if (error === '') {
                setModalShow(true);
            } else {
                setErrorToastShow(true);
            }
            setPendingResult(null);
        }
    }, [outputDB, pendingResult, useDB]);

    const showResult = (resultDB: Record<string, unknown>[]): boolean => {
        setErrorToastShow(false);
        console.log('=== SHOW RESULT DEBUG ===');
        console.log('Result from DB:', resultDB);
        console.log('Result length:', resultDB?.length);
        console.log('Result type:', typeof resultDB);

        const error = useDB.getError();
        console.log('Error from DB:', error);
        setErrorDB(error);

        // Set output first
        setOutputDB(resultDB);

        // Wait for state to update before showing modal
        setTimeout(() => {
            console.log('=== OPENING MODAL AFTER TIMEOUT ===');
            if (error === '') {
                setModalShow(true);
            } else {
                setErrorToastShow(true);
            }
        }, 0);

        return error === '';
    };

    const onClickRun = (runSelectedOnly: boolean = false) => {
        console.log('=== ONCLICK RUN DEBUG ===');
        console.log('Selected only mode:', runSelectedOnly);
        const blocklyOut: string = runSelectedOnly ? useBL.runGenSelected() : useBL.runGen();
        console.log('Blockly output (query):', blocklyOut);
        console.log('Query length:', blocklyOut?.length);

        const resultDB = useDB.queryDB(blocklyOut);
        console.log('Query DB returned:', resultDB);

        if (showResult(resultDB)) {
            if (useVA.validate(blocklyOut, resultDB)) {
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button
                        variant="success"
                        onClick={() => onClickRun(false)}
                        title="Εκτέλεση όλων των blocks στο workspace"
                    >
                        ▶ Τρέξε Όλα
                    </Button>

                    <Button
                        variant="primary"
                        onClick={() => onClickRun(true)}
                        title="Εκτέλεση μόνο του επιλεγμένου block (πάτησε πάνω σε ένα block για να το επιλέξεις)"
                    >
                        ▶ Τρέξε Επιλεγμένο
                    </Button>
                </div>

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
