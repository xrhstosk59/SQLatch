import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import styles from '../../styles/guide.module.css';

interface GuideHomeProps {
    lessonNames: string[];
    onLessonClick: (index: number) => void;
}

export default function GuideHome({ lessonNames, onLessonClick }: GuideHomeProps) {
    return (
        <Container>
            <h2>Αρχική</h2>
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
                    </li>
                ))}
            </ul>
        </Container>
    );
}
