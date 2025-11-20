/* Next components   */
import Head from 'next/head';
import { useEffect, useState, lazy, Suspense, startTransition } from 'react';

/* Our Components */
import NavBar from '../components/layout/Navbar';
import BlocklyField from '../components/blockly/BlocklyField';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Lazy load components that aren't critical for initial render
const Guide = lazy(() => import('../components/guide/Guide'));
const IntroModal = lazy(() => import('../components/modals/IntroModal'));

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    const [introShow, setIntroShow] = useState(false);
    const [valSync, setValSync] = useState(false);

    useEffect(() => {
        startTransition(() => {
            setIntroShow(true);
        });
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
                />
                <link rel="icon" type="image/png" sizes="180x180" href="/favicon.png"></link>
                <title>SQLatch - POC</title>
            </Head>
            <Container fluid className="wh-100 bg-dark" data-bs-theme="dark">
                <NavBar />
                <Container fluid>
                    <Row>
                        <Col xs={12} lg={7} className="mb-3 mb-lg-0">
                            <BlocklyField valSync={valSync} setValSync={setValSync} />
                        </Col>
                        <Col xs={12} lg={5}>
                            <Suspense fallback={<LoadingSpinner message="Φόρτωση οδηγού..." />}>
                                <Guide valSync={valSync} />
                            </Suspense>
                        </Col>
                    </Row>
                </Container>
                <Suspense fallback={null}>
                    <IntroModal show={introShow} onHide={() => setIntroShow(false)} />
                </Suspense>
            </Container>
        </>
    );
}
