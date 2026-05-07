import { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/guide.module.css';

const FINAL_ASSIGNMENT_DURATION_MS = 30 * 60 * 1000;
const TIMER_STORAGE_KEY = 'finalAssignmentTimerEndAt.v1';

const getRemainingMs = (endAt: number | null) => {
    if (!endAt) return FINAL_ASSIGNMENT_DURATION_MS;
    return Math.max(0, endAt - Date.now());
};

const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function FinalAssignmentTimer() {
    const [endAt, setEndAt] = useState<number | null>(null);
    const [remainingMs, setRemainingMs] = useState(FINAL_ASSIGNMENT_DURATION_MS);

    useEffect(() => {
        const savedEndAt = Number(localStorage.getItem(TIMER_STORAGE_KEY));
        if (Number.isFinite(savedEndAt) && savedEndAt > Date.now()) {
            setEndAt(savedEndAt);
            setRemainingMs(getRemainingMs(savedEndAt));
        }
    }, []);

    useEffect(() => {
        if (!endAt) return;

        const timerId = window.setInterval(() => {
            const nextRemainingMs = getRemainingMs(endAt);
            setRemainingMs(nextRemainingMs);

            if (nextRemainingMs === 0) {
                window.clearInterval(timerId);
                localStorage.removeItem(TIMER_STORAGE_KEY);
            }
        }, 1000);

        return () => window.clearInterval(timerId);
    }, [endAt]);

    const hasStarted = endAt !== null;
    const hasFinished = hasStarted && remainingMs === 0;
    const timerLabel = useMemo(() => formatTime(remainingMs), [remainingMs]);

    const handleStart = () => {
        const nextEndAt = Date.now() + FINAL_ASSIGNMENT_DURATION_MS;
        localStorage.setItem(TIMER_STORAGE_KEY, String(nextEndAt));
        setEndAt(nextEndAt);
        setRemainingMs(FINAL_ASSIGNMENT_DURATION_MS);
    };

    return (
        <section className={styles.finalTimer} aria-label="Χρονόμετρο τελικής εργασίας">
            <div>
                <p className={styles.finalTimerLabel}>Χρόνος τελικής εργασίας</p>
                <div className={styles.finalTimerTime}>{timerLabel}</div>
            </div>
            <div className={styles.finalTimerActions}>
                <button
                    type="button"
                    className={styles.finalTimerButton}
                    onClick={handleStart}
                    disabled={hasStarted && !hasFinished}
                >
                    {hasStarted && !hasFinished ? 'Σε εξέλιξη' : 'Έναρξη'}
                </button>
                {hasFinished && <span className={styles.finalTimerDone}>Ο χρόνος τελείωσε.</span>}
            </div>
        </section>
    );
}
