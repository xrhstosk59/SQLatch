import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import styles from '../../styles/guide.module.css';
import { LTS } from '../../config/lessons';
import InfoScenarioButton from '../common/InfoScenarioButton';

interface GuideHomeProps {
    lessonNames: string[];
    onLessonClick: (index: number) => void;
    viewed?: boolean[];
}

export default function GuideHome({ lessonNames, onLessonClick, viewed = [] }: GuideHomeProps) {
    return (
        <Container style={{ maxWidth: 'none', padding: '2%' }}>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>Αρχική</h2>
            <ul className={styles.link_list}>
                {lessonNames.map((name, index) => (
                    <li key={index}>
                        <Link
                            href=""
                            className={styles.link}
                            onClick={(e) => {
                                e.preventDefault();
                                onLessonClick(index);
                            }}
                        >
                            {index + 1}. {name}
                        </Link>
                        {viewed[index] && <i className="bi bi-check-lg" style={{ color: '#14A44D' }}></i>}
                        <InfoScenarioButton title="Πληροφορίες" body={LTS[index].info} />
                    </li>
                ))}
            </ul>
        </Container>
    );
}
