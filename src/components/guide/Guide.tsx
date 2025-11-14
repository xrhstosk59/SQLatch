import styles from '../../styles/guide.module.css';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import { useShowdown } from '../../modules/Showdown';
import { useBlocklyContext } from '../../contexts/BlocklyContext';
import { useSQLite } from '../../contexts/SQLiteContext';
import { LTS, LTSBlocks, LTSNames, DBs } from '../../config/lessons';
import GuidePagination from './GuidePagination';
import GuideHome from './GuideHome';
import GuideContent from './GuideContent';
import QueryHistory from '../sql/QueryHistory';

export default function Guide() {
    const useMD = useShowdown();
    const useBL = useBlocklyContext();
    const useDB = useSQLite();

    const [idxState, setIdxState] = useState(0);
    const [inHome, setInHome] = useState(true);
    const [MDGuides, setMDGuides] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleHomeClick = () => {
        setInHome(true);
    };

    const handleLessonClick = (index: number) => {
        setIdxState(index);
        setInHome(false);
    };

    const handleNextGuide = () => {
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

    useEffect(() => {
        const setHTML = async () => {
            setIsLoading(true);
            try {
                let html = await useMD.convertMd('/MDGuides/' + LTS[idxState]);
                setMDGuides(html);
                if (!inHome) {
                    if (LTSBlocks[idxState] == '' || LTSBlocks[idxState] == undefined) {
                        useBL.loadWorkspaceFile('');
                    } else {
                        useBL.loadWorkspaceFile('/MDGuides/' + LTSBlocks[idxState]);
                    }
                    if (DBs[idxState] == '' || DBs[idxState] == undefined) {
                        useDB.resetDB();
                    } else {
                        useDB.loadDB('/MDGuides/' + DBs[idxState]);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        setHTML();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idxState, inHome]);

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
                    />
                    <GuideContent content={MDGuides} isLoading={isLoading} />
                </Container>
            ) : (
                <GuideHome lessonNames={LTSNames} onLessonClick={handleLessonClick} />
            )}
            <QueryHistory />
        </Container>
    );
}
