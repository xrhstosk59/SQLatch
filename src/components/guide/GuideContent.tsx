import Container from 'react-bootstrap/Container';
import LoadingSpinner from '../ui/LoadingSpinner';

interface GuideContentProps {
    content: string;
    isLoading: boolean;
}

export default function GuideContent({ content, isLoading }: GuideContentProps) {
    if (isLoading) {
        return <LoadingSpinner message="Φόρτωση οδηγού..." />;
    }

    return <Container dangerouslySetInnerHTML={{ __html: content }} />;
}
