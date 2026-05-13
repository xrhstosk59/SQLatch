import { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/guide.module.css';
import { downloadWrittenAnswerDocx } from '../../utils/studentAnswerExport';

const WRITTEN_ANSWER_ATTEMPT_EVENT = 'sqlatch:written-answer-attempt';
const MIN_WRITTEN_ATTEMPT_LENGTH = 20;

interface ExerciseAnswerBoxProps {
    answerKey: string;
    label?: string;
    placeholder?: string;
    helper?: string;
    rows?: number;
    exportTitle?: string;
}

export default function ExerciseAnswerBox({
    answerKey,
    label = 'Η απάντησή σου',
    placeholder = 'Γράψε εδώ την απάντησή σου...',
    helper = 'Η απάντησή σου αποθηκεύεται τοπικά σε αυτόν τον browser.',
    rows = 8,
    exportTitle = 'Άσκηση SQLatch',
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

    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;
        if (value.trim().length < MIN_WRITTEN_ATTEMPT_LENGTH) return;

        window.dispatchEvent(
            new CustomEvent(WRITTEN_ANSWER_ATTEMPT_EVENT, {
                detail: { answerKey, length: value.trim().length },
            })
        );
    }, [answerKey, isMounted, value]);

    const handleClear = () => {
        setValue('');
        if (typeof window !== 'undefined') {
            localStorage.removeItem(storageKey);
        }
    };

    const handleDownloadDocx = () => {
        downloadWrittenAnswerDocx({
            title: exportTitle,
            label,
            answer: value,
        });
    };

    return (
        <div className={styles.answerBox}>
            <div className={styles.answerBoxHeader}>
                <strong>{label}</strong>
                <div className={styles.answerBoxActions}>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={handleDownloadDocx}
                    >
                        <i className="bi bi-file-earmark-word"></i> Λήψη DOCX
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleClear}
                    >
                        Καθαρισμός
                    </button>
                </div>
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
