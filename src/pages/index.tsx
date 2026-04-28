/* Next components   */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/* Our Components */
import NavBar from '../components/layout/Navbar';
import BlocklyField from '../components/blockly/BlocklyField';
import Guide from '../components/guide/Guide';
import IntroModal from '../components/modals/IntroModal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    const router = useRouter();
    const [introShow, setIntroShow] = useState(false);
    const [valSync, setValSync] = useState(false);
    const [hasInitializedIntro, setHasInitializedIntro] = useState(false);

    useEffect(() => {
        if (!router.isReady || hasInitializedIntro) return;

        const hasLessonDeepLink = typeof router.query.lesson !== 'undefined';
        setIntroShow(!hasLessonDeepLink);
        setHasInitializedIntro(true);
    }, [router.isReady, router.query.lesson, hasInitializedIntro]);

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
                            <Guide valSync={valSync} />
                        </Col>
                    </Row>
                </Container>
                {introShow && <IntroModal show={introShow} onHide={() => setIntroShow(false)} />}
            </Container>
        </>
    );
}
