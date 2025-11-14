import { memo, useState } from 'react';
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ShareModalProps {
    show: boolean;
    onHide: () => void;
    output: string;
}

function ShareModal({ show, onHide, output }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header
                closeButton
                onClick={onHide}
                style={{ color: 'white', background: '#0d6efd' }}
            >
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
                        style={{ marginBottom: '0px', marginRight: '0px' }}
                    />
                    <Button variant={copied ? 'success' : 'primary'} onClick={handleCopy}>
                        <i className={copied ? 'bi bi-check-lg' : 'bi bi-clipboard'}></i>
                        {copied ? ' Αντιγράφηκε!' : ' Αντιγραφή'}
                    </Button>
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

export default memo(ShareModal);
