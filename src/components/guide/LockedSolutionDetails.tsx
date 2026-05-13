import { ReactNode, useState } from 'react';
import styles from '../../styles/guide.module.css';

interface LockedSolutionDetailsProps {
    summary: ReactNode;
    children: ReactNode;
    canUnlockSolution: boolean;
}

export default function LockedSolutionDetails({
    summary,
    children,
    canUnlockSolution,
}: LockedSolutionDetailsProps) {
    const [isUnlocked, setIsUnlocked] = useState(false);

    if (isUnlocked) {
        return (
            <details open>
                <summary>{summary}</summary>
                {children}
            </details>
        );
    }

    return (
        <div className={styles.lockedSolution}>
            <div className={styles.lockedSolutionHeader}>
                <strong>{summary}</strong>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    disabled={!canUnlockSolution}
                    onClick={() => setIsUnlocked(true)}
                >
                    {canUnlockSolution ? 'Δείξε λύση για έλεγχο' : 'Πρώτα κάνε προσπάθεια'}
                </button>
            </div>
            <small className={styles.lockedSolutionHint}>
                Η ενδεικτική λύση ανοίγει μόνο αφού τρέξεις τη δική σου λύση ή γράψεις τη δική σου
                απάντηση.
            </small>
        </div>
    );
}
