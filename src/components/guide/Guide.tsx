import styles from '../../styles/guide.module.css';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import { useShowdown } from '../../modules/Showdown';
import { useBlocklyContext } from '../../contexts/BlocklyContext';
import { useSQLite } from '../../contexts/SQLiteContext';
import { useValidation } from '../../modules/Validator';
import { LTS } from '../../config/lessons';
import GuidePagination from './GuidePagination';
import GuideHome from './GuideHome';
import GuideContent from './GuideContent';
import QueryHistory from '../sql/QueryHistory';
import Scenario from '../scenario/Scenario';

interface GuideProps {
    valSync: boolean;
}

export default function Guide({ valSync }: GuideProps) {
    const useMD = useShowdown();
    const useBL = useBlocklyContext();
    const useDB = useSQLite();
    const useVA = useValidation();

    const [idxState, setIdxState] = useState(0);
    const [inHome, setInHome] = useState(true);
    const [MDGuides, setMDGuides] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [viewed, setViewed] = useState<boolean[]>(Array(LTS.length).fill(false));
    const [canSync, setCanSync] = useState(false);
    const [scenCompleteSync, setScenCompleteSync] = useState(false);

    // Load completion status from localStorage after mount (client-side only)
    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('lessonCompletion');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Ensure array has correct length
                    if (Array.isArray(parsed) && parsed.length === LTS.length) {
                        setViewed(parsed);
                    }
                } catch (e) {
                    console.error('Error loading lesson completion:', e);
                }
            }
        }
    }, []);

    const handleHomeClick = () => {
        setInHome(true);
    };

    const handleLessonClick = (index: number) => {
        setIdxState(index);
        setInHome(false);
    };

    const handleNextGuide = () => {
        // Mark current lesson as complete if it has no requirements
        if (LTS[idxState].requirements.length === 0) {
            const newViewed = [...viewed];
            newViewed[idxState] = true;
            setViewed(newViewed);
        }

        if (idxState < LTS.length - 1) {
            setIdxState(idxState + 1);
        }
    };

    const handlePrevGuide = () => {
        if (idxState > 0) {
            setIdxState(idxState - 1);
        }
    };

    const handlePageClick = (index: number) => {
        setIdxState(index);
    };

    const handleResetProgress = () => {
        if (confirm('Είσαι σίγουρος ότι θέλεις να επαναφέρεις όλη την πρόοδό σου;')) {
            const resetViewed = Array(LTS.length).fill(false);
            setViewed(resetViewed);
            if (typeof window !== 'undefined') {
                localStorage.setItem('lessonCompletion', JSON.stringify(resetViewed));
            }
        }
    };

    useEffect(() => {
        const setHTML = async () => {
            setIsLoading(true);
            try {
                const currentLesson = LTS[idxState];
                let html = await useMD.convertMd('/MDGuides/' + currentLesson.theory);
                setMDGuides(html);

                if (!inHome) {
                    // Load blocks for non-scenario lessons
                    if (!currentLesson.isScenario) {
                        if (currentLesson.blocks === '' || currentLesson.blocks === undefined) {
                            useBL.loadWorkspaceFile('');
                        } else {
                            useBL.loadWorkspaceFile('/MDGuides/' + currentLesson.blocks);
                        }
                        // Set validation requirements
                        if (currentLesson.requirements.length > 0) {
                            useVA.setRequirements(
                                currentLesson.requirements[0][0],
                                currentLesson.requirements[0][1]
                            );
                        } else {
                            // Auto-complete lessons without requirements after a short delay
                            // This gives the user time to see the content
                            setTimeout(() => {
                                setViewed((prev) => {
                                    const newViewed = [...prev];
                                    newViewed[idxState] = true;
                                    return newViewed;
                                });
                            }, 2000);
                        }
                    }

                    // Load database
                    if (currentLesson.database === '' || currentLesson.database === undefined) {
                        useDB.resetDB();
                    } else {
                        useDB.loadDB('/MDGuides/' + currentLesson.database);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        setHTML();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idxState, inHome]);

    useEffect(() => {
        if (canSync) {
            if (scenCompleteSync === true) {
                const newViewed = [...viewed];
                newViewed[idxState] = true;
                setViewed(newViewed);
                setScenCompleteSync(false);
            } else if (!LTS[idxState].isScenario) {
                const newViewed = [...viewed];
                newViewed[idxState] = true;
                setViewed(newViewed);
            }
        } else {
            setCanSync(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valSync, scenCompleteSync]);

    // Save completion status to localStorage whenever it changes (after mount)
    useEffect(() => {
        if (isMounted && typeof window !== 'undefined') {
            localStorage.setItem('lessonCompletion', JSON.stringify(viewed));
        }
    }, [viewed, isMounted]);

    const lessonNames = LTS.map((item) => item.name);

    return (
        <Container className={styles.container}>
            {!inHome ? (
                <Container>
                    <GuidePagination
                        currentIndex={idxState}
                        totalPages={LTS.length}
                        onHomeClick={handleHomeClick}
                        onPrevClick={handlePrevGuide}
                        onNextClick={handleNextGuide}
                        onPageClick={handlePageClick}
                        viewed={viewed}
                    />
                    {LTS[idxState].isScenario ? (
                        <Scenario
                            md={MDGuides}
                            scenPath={LTS[idxState].blocks}
                            totalVids={LTS[idxState].numVideos}
                            valSync={valSync}
                            scenarioRequirements={LTS[idxState].requirements}
                            setScenCompleteSync={setScenCompleteSync}
                        />
                    ) : (
                        <GuideContent content={MDGuides} isLoading={isLoading} />
                    )}
                </Container>
            ) : (
                <GuideHome
                    lessonNames={lessonNames}
                    onLessonClick={handleLessonClick}
                    viewed={viewed}
                    onResetProgress={handleResetProgress}
                />
            )}
            <QueryHistory />
        </Container>
    );
}
