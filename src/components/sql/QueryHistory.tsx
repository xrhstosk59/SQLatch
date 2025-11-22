import { memo, useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';
import { useQueryHistory } from '../../contexts/QueryHistoryContext';
import styles from '../../styles/queryHistory.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function QueryHistory() {
    const { history, clearHistory, deleteQuery } = useQueryHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatTimestamp = (date: Date) => {
        return new Date(date).toLocaleString('el-GR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const copyToClipboard = (query: string) => {
        navigator.clipboard
            .writeText(query)
            .then(() => {
                // Could add a toast notification here
                console.log('Query copied to clipboard');
            })
            .catch((err) => {
                console.error('Failed to copy query:', err);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <button
                        className={styles.toggleButton}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-controls="query-history-collapse"
                        aria-expanded={isOpen}
                    >
                        <i className={`bi bi-clock-history ${styles.icon}`}></i>
                        <span>Ιστορικό Queries</span>
                        <i
                            className={`bi bi-chevron-down ${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
                        ></i>
                    </button>
                    <div>
                        <span className={styles.badge}>{mounted ? history.length : 0} queries</span>
                        {mounted && history.length > 0 && (
                            <button className={styles.clearButton} onClick={clearHistory}>
                                <i className="bi bi-trash"></i> Καθαρισμός
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Collapse in={isOpen}>
                <div id="query-history-collapse" className={styles.collapseContainer}>
                    <div className={styles.body}>
                        {!mounted || history.length === 0 ? (
                            <div className={styles.emptyState}>
                                <i className={`bi bi-inbox ${styles.emptyIcon}`}></i>
                                <p className={styles.emptyText}>
                                    Δεν υπάρχει ιστορικό queries ακόμα
                                </p>
                            </div>
                        ) : (
                            <div>
                                {history.map((entry) => (
                                    <div key={entry.id} className={styles.listItem}>
                                        <div className={styles.itemContent}>
                                            <div className={styles.itemMain}>
                                                <div className={styles.itemHeader}>
                                                    <span
                                                        className={`${styles.statusBadge} ${entry.success ? styles.statusSuccess : styles.statusError}`}
                                                    >
                                                        {entry.success ? '✓' : '✗'}
                                                    </span>
                                                    <span className={styles.timestamp}>
                                                        {formatTimestamp(entry.timestamp)}
                                                    </span>
                                                    {entry.success &&
                                                        entry.resultCount !== undefined && (
                                                            <span className={styles.resultCount}>
                                                                {entry.resultCount} αποτελέσματα
                                                            </span>
                                                        )}
                                                </div>
                                                <pre className={styles.queryCode}>
                                                    {entry.query}
                                                </pre>
                                                {entry.error && (
                                                    <div className={styles.errorText}>
                                                        Error: {entry.error}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.actions}>
                                                <button
                                                    className={`${styles.actionButton} ${styles.copyButton}`}
                                                    onClick={() => copyToClipboard(entry.query)}
                                                    title="Αντιγραφή"
                                                >
                                                    <i className="bi bi-clipboard"></i>
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                                    onClick={() => deleteQuery(entry.id)}
                                                    title="Διαγραφή"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default memo(QueryHistory);
