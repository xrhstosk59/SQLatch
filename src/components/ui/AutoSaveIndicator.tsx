import { memo, useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import { useAutoSaveContext } from '../../contexts/AutoSaveContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AutoSaveIndicator() {
    const { isEnabled, lastSaved } = useAutoSaveContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isEnabled || !mounted) {
        return null;
    }

    const formatLastSaved = () => {
        if (!lastSaved) return 'Ενεργό';
        const now = new Date();
        const diff = now.getTime() - lastSaved.getTime();
        const seconds = Math.floor(diff / 1000);

        if (seconds < 60) return `Αποθηκεύτηκε πριν ${seconds}δ`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `Αποθηκεύτηκε πριν ${minutes}λ`;
        return lastSaved.toLocaleTimeString('el-GR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Badge
            bg="success"
            style={{
                marginLeft: '10px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
            }}
        >
            <i className="bi bi-check-circle-fill"></i>
            Auto-save: {formatLastSaved()}
        </Badge>
    );
}

export default memo(AutoSaveIndicator);
