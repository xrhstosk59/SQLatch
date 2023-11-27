import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ShareModal({ show, onHide, output }) {
    return (
        

        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={onHide} style={{ color: 'white', background: '#0d6efd' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Κοινοποίηση με σύνδεσμο
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: '#252a2e' }}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        value={output}
                        readOnly
                        style={{ marginBottom: "0px", marginRight:'0px' }}
                    />
                    <Button
                        variant="success"
                        onClick={() => {
                            navigator.clipboard.writeText(output);
                        }}
                    >
                        <i className="bi bi-clipboard"></i> Αντιγραφή</Button>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer style={{ background: '#252a2e' }}>
                <Button variant="danger" onClick={onHide}>
                    Κλείσιμο
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
