import { Button, Form, Modal } from "react-bootstrap";

export default function ShareModal({ show, onHide, output }) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Κοινοποίηση με σύνδεσμο
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="text"
                    value={output}
                    readOnly
                />
                <Button variant="success" onClick={() => {navigator.clipboard.writeText(output)}} >Αντιγραφή στο πρόχειρο!</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
