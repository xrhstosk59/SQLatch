import { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/guide.module.css';

const FINAL_ASSIGNMENT_DURATION_MS = 90 * 60 * 1000;
const TIMER_STORAGE_KEY = 'finalAssignmentTimerState.v2';
const TIMER_AUTO_PAUSE_EVENT = 'final-assignment-timer:auto-pause';
const TIMER_AUTO_RESUME_EVENT = 'final-assignment-timer:auto-resume';

type PauseSource = 'manual' | 'auto' | null;

interface TimerState {
    endAt: number | null;
    hasStarted: boolean;
    manualPauseUsed: boolean;
    pauseSource: PauseSource;
    remainingMs: number;
}

const createInitialState = (): TimerState => ({
    endAt: null,
    hasStarted: false,
    manualPauseUsed: false,
    pauseSource: null,
    remainingMs: FINAL_ASSIGNMENT_DURATION_MS,
});

const getRemainingMs = (endAt: number | null, fallbackMs = FINAL_ASSIGNMENT_DURATION_MS) => {
    if (!endAt) return fallbackMs;
    return Math.max(0, endAt - Date.now());
};

const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function FinalAssignmentTimer() {
    const [timerState, setTimerState] = useState<TimerState>(createInitialState);

    const persistTimerState = (nextState: TimerState) => {
        localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(nextState));
    };

    useEffect(() => {
        const savedTimerState = localStorage.getItem(TIMER_STORAGE_KEY);
        if (!savedTimerState) return;

        try {
            const parsedState = JSON.parse(savedTimerState) as Partial<TimerState>;
            if (!parsedState.hasStarted) return;

            const pauseSource = parsedState.pauseSource ?? null;
            const remainingMs =
                pauseSource !== null
                    ? Number(parsedState.remainingMs)
                    : getRemainingMs(Number(parsedState.endAt), Number(parsedState.remainingMs));

            const nextState: TimerState = {
                endAt: pauseSource === null ? Number(parsedState.endAt) : null,
                hasStarted: true,
                manualPauseUsed: Boolean(parsedState.manualPauseUsed),
                pauseSource,
                remainingMs: Math.max(0, remainingMs),
            };

            setTimerState(nextState);
            persistTimerState(nextState);
        } catch (error) {
            localStorage.removeItem(TIMER_STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        if (!timerState.endAt || timerState.pauseSource !== null) return;

        const timerId = window.setInterval(() => {
            setTimerState((currentState) => {
                if (!currentState.endAt || currentState.pauseSource !== null) return currentState;

                const nextRemainingMs = Math.max(0, currentState.endAt - Date.now());
                const nextState = {
                    ...currentState,
                    remainingMs: nextRemainingMs,
                };
                persistTimerState(nextState);

                if (nextRemainingMs === 0) {
                    window.clearInterval(timerId);
                }

                return nextState;
            });
        }, 1000);

        return () => window.clearInterval(timerId);
    }, [timerState.endAt, timerState.pauseSource]);

    useEffect(() => {
        const pauseTimer = (source: PauseSource) => {
            setTimerState((currentState) => {
                if (
                    !currentState.hasStarted ||
                    currentState.remainingMs === 0 ||
                    currentState.pauseSource !== null
                ) {
                    return currentState;
                }

                const nextRemainingMs = currentState.endAt
                    ? Math.max(0, currentState.endAt - Date.now())
                    : currentState.remainingMs;
                const nextState = {
                    ...currentState,
                    endAt: null,
                    manualPauseUsed: source === 'manual' ? true : currentState.manualPauseUsed,
                    pauseSource: source,
                    remainingMs: nextRemainingMs,
                };
                persistTimerState(nextState);
                return nextState;
            });
        };

        const resumeTimer = (source: PauseSource) => {
            setTimerState((currentState) => {
                if (
                    !currentState.hasStarted ||
                    currentState.remainingMs === 0 ||
                    currentState.pauseSource !== source
                ) {
                    return currentState;
                }

                const nextState = {
                    ...currentState,
                    endAt: Date.now() + currentState.remainingMs,
                    pauseSource: null,
                };
                persistTimerState(nextState);
                return nextState;
            });
        };

        const handleAutoPause = () => pauseTimer('auto');
        const handleAutoResume = () => resumeTimer('auto');

        window.addEventListener(TIMER_AUTO_PAUSE_EVENT, handleAutoPause);
        window.addEventListener(TIMER_AUTO_RESUME_EVENT, handleAutoResume);

        return () => {
            window.removeEventListener(TIMER_AUTO_PAUSE_EVENT, handleAutoPause);
            window.removeEventListener(TIMER_AUTO_RESUME_EVENT, handleAutoResume);
        };
    }, []);

    const hasFinished = timerState.hasStarted && timerState.remainingMs === 0;
    const isRunning =
        timerState.hasStarted && timerState.remainingMs > 0 && timerState.pauseSource === null;
    const isManuallyPaused = timerState.pauseSource === 'manual';
    const isAutoPaused = timerState.pauseSource === 'auto';
    const timerLabel = useMemo(() => formatTime(timerState.remainingMs), [timerState.remainingMs]);

    const handleStart = () => {
        const nextEndAt = Date.now() + FINAL_ASSIGNMENT_DURATION_MS;
        const nextState = {
            endAt: nextEndAt,
            hasStarted: true,
            manualPauseUsed: false,
            pauseSource: null,
            remainingMs: FINAL_ASSIGNMENT_DURATION_MS,
        };
        persistTimerState(nextState);
        setTimerState(nextState);
    };

    const handleManualPause = () => {
        window.dispatchEvent(new Event(TIMER_AUTO_RESUME_EVENT));
        setTimerState((currentState) => {
            if (
                !currentState.hasStarted ||
                currentState.remainingMs === 0 ||
                currentState.pauseSource !== null ||
                currentState.manualPauseUsed
            ) {
                return currentState;
            }

            const nextRemainingMs = currentState.endAt
                ? Math.max(0, currentState.endAt - Date.now())
                : currentState.remainingMs;
            const nextState = {
                ...currentState,
                endAt: null,
                manualPauseUsed: true,
                pauseSource: 'manual' as PauseSource,
                remainingMs: nextRemainingMs,
            };
            persistTimerState(nextState);
            return nextState;
        });
    };

    const handleManualResume = () => {
        setTimerState((currentState) => {
            if (currentState.pauseSource !== 'manual') return currentState;

            const nextState = {
                ...currentState,
                endAt: Date.now() + currentState.remainingMs,
                pauseSource: null,
            };
            persistTimerState(nextState);
            return nextState;
        });
    };

    return (
        <section className={styles.finalTimer} aria-label="Χρονόμετρο τελικής εργασίας">
            <div>
                <p className={styles.finalTimerLabel}>Χρόνος τελικής εργασίας: μιάμιση ώρα</p>
                <div className={styles.finalTimerTime}>{timerLabel}</div>
                {isAutoPaused && (
                    <p className={styles.finalTimerStatus}>Παύση όσο εκτελείται εντολή.</p>
                )}
            </div>
            <div className={styles.finalTimerActions}>
                <button
                    type="button"
                    className={styles.finalTimerButton}
                    onClick={handleStart}
                    disabled={timerState.hasStarted && !hasFinished}
                >
                    {timerState.hasStarted && !hasFinished ? 'Σε εξέλιξη' : 'Έναρξη'}
                </button>
                {isRunning && !timerState.manualPauseUsed && (
                    <button
                        type="button"
                        className={styles.finalTimerSecondaryButton}
                        onClick={handleManualPause}
                    >
                        Παύση
                    </button>
                )}
                {isManuallyPaused && (
                    <button
                        type="button"
                        className={styles.finalTimerSecondaryButton}
                        onClick={handleManualResume}
                    >
                        Συνέχεια
                    </button>
                )}
                {hasFinished && <span className={styles.finalTimerDone}>Ο χρόνος τελείωσε.</span>}
            </div>
        </section>
    );
}
