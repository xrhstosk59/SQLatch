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
            <>
                <NavBar />
                <RuntimeControls />
                <Container fluid='true'>
                    <Row>
                        <Col xs={8}><BlocklyField /></Col>
                        <Col><Guide /></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col><SQLiteOutput /></Col>
                        <Col Style="color:white" >Connected to MySQL Server Successfully! IP: 82.142.69.101</Col>
                    </Row>
                   
                </Container>
            </>
        </>
    );
}