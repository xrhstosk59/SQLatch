import Toast from 'react-bootstrap/Toast';

export default function ErrorToast({ show, onHide, error }) {
    return (
        <Toast bg='danger' style={{color: 'white'}} show={show}>
            <Toast.Header closeButton onClick={onHide}>
                <strong className="me-auto">Σφάλμα</strong>
                <small className="text-muted">SQL</small>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
        </Toast>
    );
}