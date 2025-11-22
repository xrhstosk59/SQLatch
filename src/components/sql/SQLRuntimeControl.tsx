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

    const [errortoastShow, setErrorToastShow] = useState(false);
    const [validationtoastShow, setValidationToastShow] = useState(false);
    const [successtoastShow, setSuccessToastShow] = useState(false);

    const [schemaShow, setschemaShow] = useState(false);
    const [currentDatabaseInternal, setCurrentDatabase] = useState<DatabaseConfig>({
        tables: [],
        edgeConfigs: [],
        schemaColors: {},
        tablePositions: {},
    });

    // Separate state for output and modal visibility
    const [queryOutput, setQueryOutput] = useState<Record<string, unknown>[]>([]);
    const [queryError, setQueryError] = useState<string>('');
    const [showOutputModal, setShowOutputModal] = useState(false);

    // Initialize SQL only once on mount
    useEffect(() => {
        useDB.initSQL();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Show modal AFTER output is updated
    useEffect(() => {
        console.log('=== USE EFFECT TRIGGERED ===');
        console.log('queryOutput:', queryOutput);
        console.log('queryOutput length:', queryOutput.length);
        console.log('queryError:', queryError);

        if (queryOutput.length > 0 && queryError === '') {
            console.log('Opening modal with data!');
            // Small delay to ensure state is fully updated
            setTimeout(() => setShowOutputModal(true), 0);
        } else {
            console.log('NOT opening modal - length:', queryOutput.length, 'error:', queryError);
        }
    }, [queryOutput, queryError]);

    const showResult = (resultDB: Record<string, unknown>[]): boolean => {
        console.log('=== SHOW RESULT CALLED ===');
        console.log('resultDB:', resultDB);
        console.log('resultDB length:', resultDB?.length);
        console.log('resultDB is array:', Array.isArray(resultDB));

        const error = useDB.getError();
        console.log('Error:', error);

        // Close modal first
        setShowOutputModal(false);

        // Update output state
        console.log('Setting queryOutput to:', resultDB);
        setQueryOutput(resultDB);
        setQueryError(error);

        // Show error toast if there's an error
        if (error !== '') {
            setErrorToastShow(true);
        } else {
            setErrorToastShow(false);
            // Modal will open via useEffect when queryOutput updates
        }

        return error === '';
    };

    const onClickRun = (runSelectedOnly: boolean = false) => {
        console.log('=== ONCLICK RUN DEBUG ===');
        console.log('DB Initialized:', useDB.isInitialized);
        console.log('Selected only mode:', runSelectedOnly);

        const blocklyOut: string = runSelectedOnly ? useBL.runGenSelected() : useBL.runGen();
        console.log('Blockly output (query):', blocklyOut);
        console.log('Query length:', blocklyOut?.length);

        const resultDB = useDB.queryDB(blocklyOut);
        console.log('Query DB returned:', resultDB);
        console.log('Result is array:', Array.isArray(resultDB));
        console.log('Result length:', resultDB?.length);
        console.log('Result[0]:', resultDB?.[0]);

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
                        disabled={!useDB.isInitialized}
                    >
                        ▶ Τρέξε Όλα
                    </Button>

                    <Button
                        variant="primary"
                        onClick={() => onClickRun(true)}
                        title="Εκτέλεση μόνο του επιλεγμένου block (πάτησε πάνω σε ένα block για να το επιλέξεις)"
                        disabled={!useDB.isInitialized}
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
                    show={showOutputModal}
                    output={queryOutput}
                    onHide={() => setShowOutputModal(false)}
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
                        error={queryError}
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
