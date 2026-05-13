import Container from 'react-bootstrap/Container';
import parse, { domToReact, DOMNode, Element } from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import ExerciseAnswerBox from './ExerciseAnswerBox';
import LockedSolutionDetails from './LockedSolutionDetails';
import styles from '../../styles/guide.module.css';

const QUERY_ATTEMPT_EVENT = 'sqlatch:query-attempt';
const WRITTEN_ANSWER_ATTEMPT_EVENT = 'sqlatch:written-answer-attempt';

interface GuideContentProps {
    content: string;
    isLoading: boolean;
    onScrolledToBottom?: () => void;
    exportTitle?: string;
}

export default function GuideContent({
    content,
    isLoading,
    onScrolledToBottom,
    exportTitle = 'Άσκηση SQLatch',
}: GuideContentProps) {
    const endMarkerRef = useRef<HTMLDivElement | null>(null);
    const [hasAttemptedCurrentContent, setHasAttemptedCurrentContent] = useState(false);

    useEffect(() => {
        setHasAttemptedCurrentContent(false);
    }, [content, exportTitle]);

    useEffect(() => {
        const markAttempted = () => setHasAttemptedCurrentContent(true);

        window.addEventListener(QUERY_ATTEMPT_EVENT, markAttempted);
        window.addEventListener(WRITTEN_ANSWER_ATTEMPT_EVENT, markAttempted);

        return () => {
            window.removeEventListener(QUERY_ATTEMPT_EVENT, markAttempted);
            window.removeEventListener(WRITTEN_ANSWER_ATTEMPT_EVENT, markAttempted);
        };
    }, []);

    useEffect(() => {
        if (isLoading || !onScrolledToBottom || !endMarkerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onScrolledToBottom();
                }
            },
            { threshold: 1 }
        );

        observer.observe(endMarkerRef.current);

        return () => observer.disconnect();
    }, [content, isLoading, onScrolledToBottom]);

    if (isLoading) {
        return <LoadingSpinner message="Φόρτωση οδηγού..." />;
    }

    const isHtmlElement = (node: DOMNode): node is Element => {
        return node.type === 'tag' && 'attribs' in node;
    };

    const isSolutionSummary = (summaryText: string): boolean => {
        return /δείξε\s+την\s+ενδεικτική\s+(λύση|απάντηση)/i.test(summaryText);
    };

    const getTextContent = (nodes: DOMNode[]): string => {
        return nodes
            .map((child) => {
                if (child.type === 'text' && 'data' in child) return child.data;
                if (isHtmlElement(child)) return getTextContent(child.children as DOMNode[]);
                return '';
            })
            .join('');
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
                                exportTitle={exportTitle}
                            />
                        );
                    }

                    if (node.name === 'details') {
                        const children = node.children as DOMNode[];
                        const summaryNode = children.find(
                            (child): child is Element =>
                                isHtmlElement(child) && child.name === 'summary'
                        );

                        if (!summaryNode) return undefined;

                        const summaryText = getTextContent(
                            summaryNode.children as DOMNode[]
                        ).trim();

                        if (!isSolutionSummary(summaryText)) return undefined;

                        const contentNodes = children.filter((child) => child !== summaryNode);

                        return (
                            <LockedSolutionDetails
                                summary={domToReact(summaryNode.children as DOMNode[])}
                                canUnlockSolution={hasAttemptedCurrentContent}
                            >
                                {domToReact(contentNodes)}
                            </LockedSolutionDetails>
                        );
                    }

                    return undefined;
                },
            })}
            <div ref={endMarkerRef} className={styles.guideEndMarker} aria-hidden="true" />
        </Container>
    );
}
