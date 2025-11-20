import { memo, useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useShowdown } from '../../modules/Showdown';
import LoadingSpinner from '../ui/LoadingSpinner';

interface IntroModalProps {
    show: boolean;
    onHide: () => void;
}

function IntroModal({ show, onHide }: IntroModalProps) {
    const useMD = useShowdown();

    const [introMD, setIntroMD] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const setHTML = async () => {
            console.log('IntroModal: Starting markdown load');
            setIsLoading(true);
            try {
                const html = await useMD.convertMd('/Intro/text.md');
                console.log('IntroModal: Markdown converted, HTML length:', html.length);
                setIntroMD(html);
            } catch (error) {
                console.error('IntroModal: Error loading markdown:', error);
            } finally {
                console.log('IntroModal: Setting loading to false');
                setIsLoading(false);
            }
        };

        if (show) {
            setHTML();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    // Detect mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 576);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Modal
            style={{ color: 'white' }}
            show={show}
            size="lg"
            fullscreen={isMobile ? true : undefined}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header
                style={{ color: 'white', background: '#0d6efd' }}
                data-bs-theme="dark"
                closeButton
                onClick={onHide}
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Καλώς ήρθατε στη SQLatch!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white" data-bs-theme="dark">
                <Container style={{ height: '50vh', overflow: 'auto' }}>
                    {isLoading ? (
                        <LoadingSpinner message="Φόρτωση..." />
                    ) : (
                        <div
                            className="text-white"
                            style={{ color: 'white' }}
                            dangerouslySetInnerHTML={{ __html: introMD }}
                        />
                    )}
                </Container>
            </Modal.Body>
            <Modal.Footer className="bg-dark" data-bs-theme="dark">
                No rights were ever reserved
            </Modal.Footer>
        </Modal>
    );
}

export default memo(IntroModal);
