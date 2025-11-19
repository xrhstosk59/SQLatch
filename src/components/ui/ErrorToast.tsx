import { memo } from 'react';
import Toast from 'react-bootstrap/Toast';

interface ErrorToastProps {
    show: boolean;
    onHide: () => void;
    error: string;
}

function ErrorToast({ show, onHide, error }: ErrorToastProps) {
    return (
        <Toast bg="danger" style={{ color: 'white' }} show={show}>
            <Toast.Header closeButton onClick={onHide}>
                <strong className="me-auto">Σφάλμα</strong>
                <small className="text-muted">SQL</small>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
        </Toast>
    );
}

export default memo(ErrorToast);
