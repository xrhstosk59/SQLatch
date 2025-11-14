import styles from '../../styles/blockly.module.css';

import React from 'react';
import { useEffect, useRef, useState } from 'react';

import Blockly from 'blockly';
import { useBlocklyContext } from '../../contexts/BlocklyContext';
import { useSQLite } from '../../contexts/SQLiteContext';
import { useQueryHistory } from '../../contexts/QueryHistoryContext';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { ZoomToFitControl } from '@blockly/zoom-to-fit';
import {
    ContinuousToolbox,
    ContinuousFlyout,
    ContinuousMetrics,
} from '@blockly/continuous-toolbox';
import DarkTheme from '@blockly/theme-dark';

import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-bootstrap';
import SQLOutputModal from '../modals/SQLOutputModal';
import SQLPreviewModal from '../modals/SQLPreviewModal';
import ErrorToast from '../ui/ErrorToast';

export default function BlocklyField() {
    const useBL = useBlocklyContext();
    const useDB = useSQLite();
    const queryHistory = useQueryHistory();

    const primaryWorkspace = useRef<Blockly.WorkspaceSvg | null>(null);
    const blocklyDiv = useRef<HTMLDivElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const [previewModalShow, setPreviewModalShow] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const [outputDB, setOutputDB] = useState<Record<string, unknown>[]>([]);
    const [errorDB, setErrorDB] = useState<string>('');
    const [currentSQL, setCurrentSQL] = useState<string>('');

    // Initialize SQL after hydration
    useEffect(() => {
        setIsMounted(true);
        useDB.initSQL();
    }, []);

    useEffect(() => {
        if (!blocklyDiv.current || !isMounted) return;

        /* Initialize Blockly */
        useBL.initBlockly();
        useBL.initGen();

        // Detect if mobile device
        const isMobile = window.innerWidth < 768;

        primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
            toolbox: useBL.getToolbox(),
            plugins: {
                toolbox: ContinuousToolbox,
                flyoutsVerticalToolbox: ContinuousFlyout,
                metricsManager: ContinuousMetrics,
            },
            theme: DarkTheme,
            zoom: {
                controls: true,
                startScale: isMobile ? 0.7 : 0.9,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: isMobile ? 1.1 : 1.2,
                pinch: true, // Enable pinch-to-zoom on mobile
            },
            move: {
                scrollbars: {
                    horizontal: true,
                    vertical: true,
                },
                drag: true,
                wheel: !isMobile, // Disable mouse wheel zoom on mobile
            },
        });
        useBL.setWorkspace(primaryWorkspace.current);

        /* Initialize Zoom-to-fit */
        const zoomToFit = new ZoomToFitControl(primaryWorkspace.current);
        zoomToFit.init();

        /* Load from parameters */
        try {
            const searchParams = new URLSearchParams(window.location.search);
            const encodedData = searchParams.get('bl');

            if (encodedData) {
                const state = JSON.parse(atob(encodedData));
                useBL.loadWorkspaceState(state);
            }
        } catch (error) {
            console.error('Error decoding or parsing data:', error);
        }

        /* Cleanup function */
        return () => {
            if (primaryWorkspace.current) {
                primaryWorkspace.current.dispose();
            }
        };
    }, [isMounted]); // Run when component is mounted

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
        <Container style={{ position: 'relative' }}>
            <Container fluid className={styles.container} ref={blocklyDiv} id="blocklyDiv" />

            {/* Floating Action Button */}
            <button
                className={styles.floatingButton}
                onClick={onClickRun}
                aria-label="Εκτέλεση SQL query (Ctrl+Enter)"
                title="Ctrl+Enter"
            >
                <i className="bi bi-play-circle-fill"></i>
                <span>Αποτέλεσμα</span>
            </button>

            {/* Modals */}
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
    );
}
