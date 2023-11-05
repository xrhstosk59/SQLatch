/* Next components  */
import Head from 'next/head';

/* Our Components */
import NavBar from '../components/navbar';
import RuntimeControls from '../components/runtime-controls';
import BlocklyField from '../components/blockly-field';
import Guide from '../components/guide';
import SQLiteOutput from '../components/sqliteoutput';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" sizes="180x180" href="/favicon.png"></link>
                <title>SQLatch - POC</title>
            </Head>
            <Container className='h-100 bg-dark' data-bs-theme="dark" fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <NavBar />
                <RuntimeControls />
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row>
                        <Col xs={8}><BlocklyField /></Col>
                        <Col><Guide /></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col><SQLiteOutput /></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}