import styles from '../../styles/guide.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

const LESSON_COMPLETION_STORAGE_KEY = 'lessonCompletion.v8';

const getFirstQueryValue = (value: string | string[] | undefined): string | undefined => {
    return Array.isArray(value) ? value[0] : value;
};

const lessonNameToSlug = (name: string): string => {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const resolveLessonParam = (lessonParam: string): number | null => {
    const numericValue = Number(lessonParam);
    if (Number.isInteger(numericValue) && numericValue >= 1 && numericValue <= LTS.length) {
        return numericValue - 1;
    }

    const normalizedLessonParam = lessonNameToSlug(lessonParam);
    const lessonIndex = LTS.findIndex(
        (lesson) => lessonNameToSlug(lesson.name) === normalizedLessonParam
    );

    return lessonIndex >= 0 ? lessonIndex : null;
};

export default function Guide({ valSync }: GuideProps) {
    const router = useRouter();
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

    const syncLessonQuery = (lessonIndex: number | null) => {
        if (!router.isReady) return;

        const nextQuery = { ...router.query };

        if (lessonIndex === null) {
            delete nextQuery.lesson;
        } else {
            nextQuery.lesson = String(lessonIndex + 1);
        }

        router.replace(
            {
                pathname: router.pathname,
                query: nextQuery,
            },
            undefined,
            { shallow: true }
        );
    };

    // Load completion status from localStorage after mount (client-side only)
    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(LESSON_COMPLETION_STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)) {
                        const normalized = Array.from({ length: LTS.length }, (_, index) =>
                            Boolean(parsed[index])
                        );
                        setViewed(normalized);
                    }
                } catch (e) {
                    console.error('Error loading lesson completion:', e);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        const lessonParam = getFirstQueryValue(router.query.lesson);
        if (!lessonParam) return;

        const targetLessonIndex = resolveLessonParam(lessonParam);
        if (targetLessonIndex === null) return;

        setIdxState(targetLessonIndex);
        setInHome(false);
    }, [router.isReady, router.query.lesson]);

    const handleHomeClick = () => {
        setInHome(true);
        syncLessonQuery(null);
    };

    const handleLessonClick = (index: number) => {
        setIdxState(index);
        setInHome(false);
        syncLessonQuery(index);
    };

    const handleNextGuide = () => {
        // Mark current lesson as complete if it has no requirements
        if (LTS[idxState].requirements.length === 0) {
            const newViewed = [...viewed];
            newViewed[idxState] = true;
            setViewed(newViewed);
        }

        if (idxState < LTS.length - 1) {
            const nextIndex = idxState + 1;
            setIdxState(nextIndex);
            syncLessonQuery(nextIndex);
        }
    };

    const handlePrevGuide = () => {
        if (idxState > 0) {
            const prevIndex = idxState - 1;
            setIdxState(prevIndex);
            syncLessonQuery(prevIndex);
        }
    };

    const handlePageClick = (index: number) => {
        setIdxState(index);
        setInHome(false);
        syncLessonQuery(index);
    };

    const handleResetProgress = () => {
        if (confirm('Είσαι σίγουρος ότι θέλεις να επαναφέρεις όλη την πρόοδό σου;')) {
            const resetViewed = Array(LTS.length).fill(false);
            setViewed(resetViewed);
            if (typeof window !== 'undefined') {
                localStorage.setItem(LESSON_COMPLETION_STORAGE_KEY, JSON.stringify(resetViewed));
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
            localStorage.setItem(LESSON_COMPLETION_STORAGE_KEY, JSON.stringify(viewed));
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
