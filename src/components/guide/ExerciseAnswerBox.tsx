import { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/guide.module.css';

interface ExerciseAnswerBoxProps {
    answerKey: string;
    label?: string;
    placeholder?: string;
    helper?: string;
    rows?: number;
}

export default function ExerciseAnswerBox({
    answerKey,
    label = 'Η απάντησή σου',
    placeholder = 'Γράψε εδώ την απάντησή σου...',
    helper = 'Η απάντησή σου αποθηκεύεται τοπικά σε αυτόν τον browser.',
    rows = 8,
}: ExerciseAnswerBoxProps) {
    const storageKey = useMemo(() => `sqlatch_exercise_answer_${answerKey}`, [answerKey]);
    const [value, setValue] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window === 'undefined') return;

        const savedValue = localStorage.getItem(storageKey);
        if (savedValue !== null) {
            setValue(savedValue);
        }
    }, [storageKey]);

    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;
        localStorage.setItem(storageKey, value);
    }, [isMounted, storageKey, value]);

    const handleClear = () => {
        setValue('');
        if (typeof window !== 'undefined') {
            localStorage.removeItem(storageKey);
        }
    };

    return (
        <div className={styles.answerBox}>
            <div className={styles.answerBoxHeader}>
                <strong>{label}</strong>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleClear}
                >
                    Καθαρισμός
                </button>
            </div>
            <textarea
                className={styles.answerTextarea}
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={(event) => setValue(event.target.value)}
            />
            <small className={styles.answerHelper}>{helper}</small>
        </div>
    );
}
