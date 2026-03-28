import Container from 'react-bootstrap/Container';
import parse, { DOMNode, Element } from 'html-react-parser';
import LoadingSpinner from '../ui/LoadingSpinner';
import ExerciseAnswerBox from './ExerciseAnswerBox';
import styles from '../../styles/guide.module.css';

interface GuideContentProps {
    content: string;
    isLoading: boolean;
}

export default function GuideContent({ content, isLoading }: GuideContentProps) {
    if (isLoading) {
        return <LoadingSpinner message="Φόρτωση οδηγού..." />;
    }

    const isHtmlElement = (node: DOMNode): node is Element => {
        return node.type === 'tag' && 'attribs' in node;
    };

    return (
        <Container className={styles.guideContent}>
            {parse(content, {
                replace(node) {
                    if (!isHtmlElement(node)) return undefined;

                    if (
                        node.name === 'div' &&
                        node.attribs.class?.split(' ').includes('exercise-answer-box')
                    ) {
                        return (
                            <ExerciseAnswerBox
                                answerKey={node.attribs['data-answer-key']}
                                label={node.attribs['data-label']}
                                placeholder={node.attribs['data-placeholder']}
                                helper={node.attribs['data-helper']}
                                rows={
                                    node.attribs['data-rows']
                                        ? Number(node.attribs['data-rows'])
                                        : undefined
                                }
                            />
                        );
                    }

                    return undefined;
                },
            })}
        </Container>
    );
}
