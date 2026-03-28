import { useEffect, useState, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useValidation } from '../../modules/Validator';
import { useBlocklyContext } from '../../contexts/BlocklyContext';
import ExerciseAnswerBox from '../guide/ExerciseAnswerBox';
import GuideContent from '../guide/GuideContent';
import styles from '../../styles/scenario.module.css';

interface ScenarioProps {
    md: string;
    scenPath: string;
    totalVids: number;
    valSync: boolean;
    scenarioRequirements: [string[], string][];
    setScenCompleteSync: (value: boolean) => void;
}

interface ScenarioIntroTaskContent {
    noteLabel: string;
    noteTitle: string;
    noteText: string;
    answerKey: string;
    placeholder: string;
    solutionLabel: string;
    solutionTitle: string;
    solutionText: string;
}

const getScenarioIntroTaskContent = (scenPath: string): ScenarioIntroTaskContent | null => {
    if (scenPath.includes('Scenario1')) {
        return {
            noteLabel: 'Βήμα 1',
            noteTitle: 'Περιέγραψε το σενάριο',
            noteText:
                'Κράτησε σύντομες σημειώσεις για το τι προσπαθεί να πετύχει ο μάγος, ποια δεδομένα χρειάζεται να οργανώσει και πώς πιστεύεις ότι θα βοηθήσει η βάση δεδομένων.',
            answerKey: 'scenario1-part1-notes',
            placeholder:
                'Παράδειγμα: Ο μάγος θέλει να οργανώσει τα ξόρκια και τα υλικά τους, ώστε να μπορεί να τα βρίσκει και να τα διαχειρίζεται σωστά...',
            solutionLabel: 'Βήμα 2',
            solutionTitle: 'Βρες τα σωστά blocks και φτιάξε τη λύση',
            solutionText:
                'Χρησιμοποίησε τα blocks του workspace για να συνθέσεις τη λύση της άσκησης. Όταν είσαι έτοιμος, πάτησε Τρέξε Όλα για να γίνει η επικύρωση και, αν θέλεις να συγκρίνεις το αποτέλεσμα, χρησιμοποίησε το κουμπί της λύσης πιο κάτω.',
        };
    }

    if (scenPath.includes('Scenario2')) {
        return {
            noteLabel: 'Βήμα 1',
            noteTitle: 'Περιέγραψε το δεύτερο μέρος του σεναρίου',
            noteText:
                'Σημείωσε τι έχει ήδη καταφέρει ο μάγος στο πρώτο μέρος και τι χρειάζεται να ολοκληρώσεις τώρα με πιο σύνθετες SQL εντολές.',
            answerKey: 'scenario2-part2-notes',
            placeholder:
                'Παράδειγμα: Στο δεύτερο μέρος πρέπει να οργανώσω καλύτερα τα δεδομένα του βιβλίου και να χρησιμοποιήσω πιο σύνθετα queries, όπως group by και join...',
            solutionLabel: 'Βήμα 2',
            solutionTitle: 'Βρες τα σωστά blocks και φτιάξε τη λύση',
            solutionText:
                'Χρησιμοποίησε τα blocks του workspace για να φτιάξεις τη λύση της άσκησης. Όταν είσαι έτοιμος, πάτησε Τρέξε Όλα για επικύρωση και χρησιμοποίησε το κουμπί της λύσης πιο κάτω μόνο για έλεγχο.',
        };
    }

    return null;
};

const Scenario = ({
    md,
    scenPath,
    totalVids,
    valSync,
    scenarioRequirements,
    setScenCompleteSync,
}: ScenarioProps) => {
    const useVA = useValidation();
    const useBL = useBlocklyContext();

    const [idx, setIdx] = useState(0);
    const [validatedList, setValidatedList] = useState<boolean[]>([]);
    const [valid, setValid] = useState(false);
    const [inIntro, setInIntro] = useState(true);
    const prevValSyncRef = useRef(valSync);
    const introTaskContent = idx === 0 ? getScenarioIntroTaskContent(scenPath) : null;

    useEffect(() => {
        console.log('-- Scenario: Initializing --');
        setInIntro(true);
        setIdx(0);
        setValidatedList([]);
        setValid(false);
        prevValSyncRef.current = valSync; // Reset ref on scenario change

        useBL.loadWorkspaceFile('');

        if (scenarioRequirements && scenarioRequirements[0]) {
            useVA.setRequirements(
                scenarioRequirements[0][0],
                scenPath + scenarioRequirements[0][1]
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scenPath]);

    useEffect(() => {
        // Only react to valSync changes, not to idx changes
        if (!inIntro && idx < totalVids && prevValSyncRef.current !== valSync) {
            // Only set validated and show "Next" when validation actually passed
            // valSync toggles only when validation succeeds in SQLRuntimeControl
            console.log('-- Scenario: Validation passed for step', idx);

            setValidatedList((prev) => {
                const tmp = [...prev];
                tmp[idx] = true;
                return tmp;
            });

            if (idx + 1 === totalVids) {
                setScenCompleteSync(true);
            } else {
                setValid(true);
            }

            // Update the ref to the current value
            prevValSyncRef.current = valSync;
        }
    }, [valSync, inIntro, idx, totalVids, setScenCompleteSync]);

    useEffect(() => {
        console.log('-- Scenario: Loading requirements for step', idx);
        console.log('-- Scenario: scenarioRequirements length:', scenarioRequirements?.length);

        if (!scenarioRequirements || !scenarioRequirements[idx]) {
            console.log('-- Scenario: No requirements for step', idx);
            return;
        }

        useVA.setRequirements(
            scenarioRequirements[idx][0],
            scenPath + scenarioRequirements[idx][1]
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx, scenPath]);

    const start = () => {
        console.log('-- Scenario: Starting scenario, setting inIntro=false --');
        setInIntro(false);
    };

    const onClickShowSolution = () => {
        useBL.loadWorkspaceFile(scenPath + 'Blocks/' + idx + '.json');
    };

    const onClickNext = () => {
        useBL.loadWorkspaceFile('');
        setIdx(idx + 1);
        setValid(false);
    };

    console.log('-- Scenario: Rendering, inIntro=', inIntro, 'idx=', idx);

    return (
        <Container>
            <ProgressBar
                variant="success"
                now={(validatedList.filter(Boolean).length / totalVids) * 100}
                label={validatedList.filter(Boolean).length + '/' + totalVids}
                style={{ marginBottom: '20px' }}
            />
            {inIntro ? (
                <>
                    <Container style={{ maxWidth: 'none', paddingLeft: 0, paddingRight: 0 }}>
                        <GuideContent content={md} isLoading={false} />
                    </Container>
                    <Container
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            marginTop: '10px',
                        }}
                    >
                        <Button variant="success" onClick={() => start()}>
                            Εκκίνηση Σεναρίου
                        </Button>
                    </Container>
                </>
            ) : (
                <>
                    <Container>
                        <Container
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            {validatedList.filter(Boolean).length !== totalVids ? (
                                <></>
                            ) : (
                                <h2>Συγχαρητήρια!</h2>
                            )}
                        </Container>
                        <Container
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <video
                                src={
                                    validatedList.filter(Boolean).length !== totalVids
                                        ? scenPath + 'Videos/' + String(idx) + '.m4v'
                                        : scenPath + 'Videos/end.m4v'
                                }
                                width="75%"
                                controls={true}
                                autoPlay={true}
                            />
                        </Container>
                    </Container>
                    {introTaskContent ? (
                        <Container className={styles.taskStack}>
                            <section className={styles.taskCard}>
                                <p className={styles.taskLabel}>{introTaskContent.noteLabel}</p>
                                <h3 className={styles.taskTitle}>{introTaskContent.noteTitle}</h3>
                                <p className={styles.taskText}>{introTaskContent.noteText}</p>
                                <ExerciseAnswerBox
                                    answerKey={introTaskContent.answerKey}
                                    label="Σημειώσεις για το σενάριο"
                                    placeholder={introTaskContent.placeholder}
                                    helper="Οι σημειώσεις αποθηκεύονται τοπικά σε αυτόν τον browser, ώστε να μπορείς να τις συμπληρώνεις σταδιακά."
                                    rows={7}
                                />
                            </section>

                            <section className={styles.taskCard}>
                                <p className={styles.taskLabel}>{introTaskContent.solutionLabel}</p>
                                <h3 className={styles.taskTitle}>
                                    {introTaskContent.solutionTitle}
                                </h3>
                                <p className={styles.taskText}>{introTaskContent.solutionText}</p>
                            </section>
                        </Container>
                    ) : null}
                    <Container
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            marginTop: '10px',
                        }}
                    >
                        {validatedList.filter(Boolean).length !== totalVids ? (
                            <Button variant="secondary" onClick={() => onClickShowSolution()}>
                                Δείξε τη λύση για έλεγχο
                            </Button>
                        ) : (
                            <></>
                        )}
                        {valid ? (
                            <Button
                                variant="success"
                                onClick={() => onClickNext()}
                                style={{ marginLeft: '10px' }}
                            >
                                Επόμενο
                            </Button>
                        ) : (
                            <></>
                        )}
                    </Container>
                </>
            )}
        </Container>
    );
};

export default Scenario;
