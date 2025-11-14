import { memo } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface LoadingSpinnerProps {
    message?: string;
}

function LoadingSpinner({ message = 'Φόρτωση...' }: LoadingSpinnerProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                gap: '1rem',
            }}
        >
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p style={{ margin: 0, color: '#aaa' }}>{message}</p>
        </div>
    );
}

export default memo(LoadingSpinner);
