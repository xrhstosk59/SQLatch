import { Table } from 'react-bootstrap';
import BaseModal from '../common/BaseModal';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface KeyboardShortcutsModalProps {
    show: boolean;
    onHide: () => void;
}

interface Shortcut {
    keys: string;
    description: string;
    category: string;
}

const shortcuts: Shortcut[] = [
    { keys: 'Ctrl+S', description: 'Αποθήκευση workspace', category: 'Αρχείο' },
    { keys: 'Ctrl+O', description: 'Φόρτωση workspace', category: 'Αρχείο' },
    { keys: 'Ctrl+Shift+S', description: 'Κοινοποίηση workspace', category: 'Αρχείο' },
    { keys: 'Ctrl+Enter', description: 'Εκτέλεση SQL query', category: 'Εκτέλεση' },
    { keys: 'Esc', description: 'Κλείσιμο modal', category: 'Πλοήγηση' },
    { keys: 'Tab', description: 'Μετακίνηση στο επόμενο στοιχείο', category: 'Πλοήγηση' },
    { keys: 'Shift+Tab', description: 'Μετακίνηση στο προηγούμενο στοιχείο', category: 'Πλοήγηση' },
    { keys: '?', description: 'Εμφάνιση βοήθειας shortcuts', category: 'Βοήθεια' },
];

export default function KeyboardShortcutsModal({ show, onHide }: KeyboardShortcutsModalProps) {
    const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

    return (
        <BaseModal
            show={show}
            onHide={onHide}
            title="Συντομεύσεις Πληκτρολογίου"
            size="lg"
            ariaLabel="Λίστα συντομεύσεων πληκτρολογίου"
        >
            <div style={{ marginBottom: '15px', color: '#666' }}>
                <i className="bi bi-info-circle"></i> Χρησιμοποιήστε αυτές τις συντομεύσεις για
                γρηγορότερη πλοήγηση
            </div>

            {categories.map((category) => (
                <div key={category} style={{ marginBottom: '20px' }}>
                    <h6 style={{ color: '#0d6efd', marginBottom: '10px' }}>{category}</h6>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Πλήκτρα</th>
                                <th>Περιγραφή</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shortcuts
                                .filter((s) => s.category === category)
                                .map((shortcut, index) => (
                                    <tr key={index}>
                                        <td>
                                            <kbd
                                                style={{
                                                    padding: '3px 6px',
                                                    backgroundColor: '#f8f9fa',
                                                    border: '1px solid #dee2e6',
                                                    borderRadius: '3px',
                                                    fontFamily: 'monospace',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                {shortcut.keys}
                                            </kbd>
                                        </td>
                                        <td>{shortcut.description}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            ))}
        </BaseModal>
    );
}
