import { memo } from 'react';
import Toast from 'react-bootstrap/Toast';

interface SuccessToastProps {
    show: boolean;
    onHide: () => void;
    message: string;
}

function SuccessToast({ show, onHide, message }: SuccessToastProps) {
    return (
        <Toast
            bg="success"
            style={{ color: 'white' }}
            show={show}
            onClose={onHide}
            delay={3000}
            autohide
        >
            <Toast.Header closeButton>
                <strong className="me-auto">Επιτυχία</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}

export default memo(SuccessToast);
