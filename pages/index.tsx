/* Next components   */
import Head from 'next/head';
import { useEffect, useState } from 'react';

/* Our Components */
import NavBar from '../components/Navbar';
import SQLRuntimeControl from '../components/SQLRuntimeControl';
import BlocklyField from '../components/BlocklyField';
import Guide from '../components/Guide';
import IntroModal from '../components/IntroModal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    const [introShow, setIntroShow] = useState(false);

    useEffect(() => {
        setIntroShow(true);
    }, [])

    return (
        <>
            <Head>
                <link rel="icon" type="image/png" sizes="180x180" href="/favicon.png"></link>
                <title>SQLatch - POC</title>
            </Head>
            <Container className='wh-100 bg-dark' data-bs-theme="dark" fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <NavBar />
                <SQLRuntimeControl />
                <Container fluid>
                    <Row>
                        <Col xs={7}><BlocklyField /></Col>
                        <Col><Guide /></Col>
                    </Row>
                </Container>
                <IntroModal
                    show={introShow}
                    onHide={() => setIntroShow(false)}
                />
            </Container>
        </>
    );
}