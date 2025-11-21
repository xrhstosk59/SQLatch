import Toast from 'react-bootstrap/Toast';

interface ValidationToastProps {
    show: boolean;
    onHide: () => void;
}

export default function ValidationToast({ show, onHide }: ValidationToastProps) {
    return (
        <Toast bg="warning" show={show}>
            <Toast.Header closeButton onClick={onHide}>
                <strong className="me-auto">Oops</strong>
                <small className="text-muted">Validation</small>
            </Toast.Header>
            <Toast.Body>
                Χμμ, Η εντολές σου δεν δίνουν το αποτέλεσμα που ψάχνουμε. Δοκίμασε ξανά!
            </Toast.Body>
        </Toast>
    );
}
