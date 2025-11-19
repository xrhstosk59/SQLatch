import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';

import { useBlocklyContext } from '../../contexts/BlocklyContext';
import { useSQLite } from '../../contexts/SQLiteContext';
import { useAutoSaveContext } from '../../contexts/AutoSaveContext';
import { useState } from 'react';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcut';

import ShareURLModal from '../modals/ShareURLModal';
import SuccessToast from '../ui/SuccessToast';
import AutoSaveIndicator from '../ui/AutoSaveIndicator';
import KeyboardShortcutsModal from '../modals/KeyboardShortcutsModal';
import AboutModal from '../modals/AboutModal';
import SchemaModal from '../modals/SchemaModal';
import convertSchema, { DatabaseConfig } from '../../modules/SchemaGenerator';
import {
    downloadJSON,
    loadJSONFile,
    confirmAction,
    generateShareURL,
} from '../../utils/fileOperations';

export default function NavBar() {
    const useBL = useBlocklyContext();
    const useDB = useSQLite();
    const autoSave = useAutoSaveContext();

    const [modalShow, setModalShow] = useState(false);
    const [URL, setURL] = useState('');
    const [successToastShow, setSuccessToastShow] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [shortcutsModalShow, setShortcutsModalShow] = useState(false);
    const [aboutModalShow, setAboutModalShow] = useState(false);
    const [schemaModalShow, setSchemaModalShow] = useState(false);
    const [currentDatabase, setCurrentDatabase] = useState<DatabaseConfig>({
        tables: [],
        edgeConfigs: [],
        schemaColors: {},
        tablePositions: {},
    });

    const onClickResetButton = () => {
        const confirmed = confirmAction(
            'Είστε σίγουροι ότι θέλετε να καθαρίσετε το workspace?\n\nΌλα τα μη-αποθηκευμένα blocks θα χαθούν.'
        );

        if (confirmed) {
            useBL.loadWorkspaceFile('');
            useDB.resetDB();
        }
    };

    const onClickShareButton = () => {
        console.log('-- Navbar: Sharing link --');
        const url = generateShareURL(useBL.getWorkspaceState());
        setURL(url);
        setModalShow(true);
    };

    const onClickSaveButton = () => {
        console.log('-- Navbar: Save init --');
        const workspaceState = useBL.getWorkspaceState();
        const filename = `SQLatch-${Date.now()}.json`;

        downloadJSON(workspaceState, filename);

        setSuccessMessage('Το workspace αποθηκεύτηκε επιτυχώς!');
        setSuccessToastShow(true);
    };

    const onClickLoadButton = async () => {
        const confirmed = confirmAction(
            'Η φόρτωση νέου workspace θα αντικαταστήσει το τρέχον.\n\nΘέλετε να συνεχίσετε;'
        );

        if (!confirmed) return;

        try {
            const fileContent = await loadJSONFile();
            useBL.loadWorkspaceState(fileContent);

            setSuccessMessage('Το workspace φορτώθηκε επιτυχώς!');
            setSuccessToastShow(true);
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Σφάλμα κατά τη φόρτωση του αρχείου');
            console.error('Load error:', error);
        }
    };

    const onClickSchemaButton = () => {
        setCurrentDatabase(convertSchema(useDB));
        setSchemaModalShow(true);
    };

    // Keyboard shortcuts
    useKeyboardShortcuts([
        {
            shortcut: { key: 's', ctrl: true },
            callback: onClickSaveButton,
        },
        {
            shortcut: { key: 'o', ctrl: true },
            callback: onClickLoadButton,
        },
        {
            shortcut: { key: 's', ctrl: true, shift: true },
            callback: onClickShareButton,
        },
        {
            shortcut: { key: '?' },
            callback: () => setShortcutsModalShow(true),
        },
    ]);

    return (
        <>
            <Navbar
                expand="lg"
                style={{ paddingLeft: 20, minHeight: '56px' }}
                bg="dark"
                role="navigation"
                aria-label="Κύριο μενού πλοήγησης"
            >
                <Navbar.Brand href="" aria-label="SQLatch - Αρχική σελίδα" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Image
                        src="/logo.png"
                        alt="SQLatch Logo"
                        width={120}
                        height={40}
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                    <AutoSaveIndicator />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavDropdown
                        title={
                            <span>
                                <i className="bi bi-file-earmark" aria-hidden="true"></i> Αρχείο
                            </span>
                        }
                        id="file-menu-dropdown"
                        aria-label="Μενού αρχείου"
                    >
                        <NavDropdown.Item
                            onClick={onClickSaveButton}
                            href=""
                            aria-label="Αποθήκευση workspace (Ctrl+S)"
                        >
                            <i className="bi bi-floppy" aria-hidden="true"></i> Αποθήκευση{' '}
                            <small style={{ color: '#999' }}>Ctrl+S</small>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={onClickLoadButton}
                            href=""
                            aria-label="Φόρτωση workspace (Ctrl+O)"
                        >
                            <i className="bi bi-cloud-upload" aria-hidden="true"></i> Φόρτωση{' '}
                            <small style={{ color: '#999' }}>Ctrl+O</small>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={onClickResetButton}
                            href=""
                            aria-label="Καθαρισμός workspace"
                        >
                            <i className="bi bi-trash" aria-hidden="true"></i> Καθαρισμός
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            onClick={autoSave.toggleAutoSave}
                            aria-label={`Auto-save ${autoSave.isEnabled ? 'ενεργό' : 'ανενεργό'}`}
                        >
                            <Form.Check
                                type="checkbox"
                                id="auto-save-toggle"
                                label="Auto-save"
                                checked={autoSave.isEnabled}
                                onChange={() => {}}
                                style={{ pointerEvents: 'none' }}
                                aria-label="Toggle auto-save"
                            />
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link
                        onClick={onClickSchemaButton}
                        href=""
                        aria-label="Σχήμα Βάσης Δεδομένων"
                    >
                        <i className="bi bi-diagram-3" aria-hidden="true"></i> Σχήμα Βάσης
                    </Nav.Link>
                    <Nav.Link
                        onClick={onClickShareButton}
                        href=""
                        aria-label="Κοινοποίηση workspace (Ctrl+Shift+S)"
                    >
                        <i className="bi bi-share" aria-hidden="true"></i> Κοινοποίηση{' '}
                        <small style={{ color: '#999' }}>Ctrl+Shift+S</small>
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => setAboutModalShow(true)}
                        href=""
                        aria-label="Σχετικά με εμάς"
                    >
                        <i className="bi bi-info-circle" aria-hidden="true"></i> Σχετικά με εμάς
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
                <input type="file" id="fileInput" hidden aria-hidden="true" />
            </Navbar>
            <ShareURLModal show={modalShow} output={URL} onHide={() => setModalShow(false)} />
            <KeyboardShortcutsModal
                show={shortcutsModalShow}
                onHide={() => setShortcutsModalShow(false)}
            />
            <AboutModal show={aboutModalShow} onHide={() => setAboutModalShow(false)} />
            <SchemaModal
                show={schemaModalShow}
                onHide={() => setSchemaModalShow(false)}
                db={currentDatabase}
            />
            <ToastContainer position="top-end" style={{ padding: '20px', zIndex: 9999 }}>
                <SuccessToast
                    show={successToastShow}
                    onHide={() => setSuccessToastShow(false)}
                    message={successMessage}
                />
            </ToastContainer>
        </>
    );
}
