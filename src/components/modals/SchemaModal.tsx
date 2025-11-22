import { Button, Modal } from 'react-bootstrap';
import Visualizer from '../sql_schema_visualizer/src/Visualizer';

interface SchemaModalProps {
    show: boolean;
    onHide: () => void;
    db: any;
}

export default function SchemaModal({ show, onHide, db }: SchemaModalProps) {
    return (
        <Modal show={show} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header
                closeButton
                onClick={onHide}
                style={{ color: 'white', background: '#0d6efd' }}
            >
                <Modal.Title id="contained-modal-title-vcenter">Σχήμα Βάσης Δεδομένων</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{ height: '80svh', width: '100%', background: '#252a2e', padding: 0 }}
            >
                <Visualizer currentDatabase={db}></Visualizer>
            </Modal.Body>
            <Modal.Footer style={{ background: '#252a2e' }}>
                <Button variant="danger" onClick={onHide}>
                    Κλείσιμο
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
