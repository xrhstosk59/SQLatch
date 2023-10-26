/* Next components  */
import Head from 'next/head';

/* Our Components */
import Navbar from '../components/navbar';
import RuntimeControls from '../components/runtime-controls';
import BlocklyField from '../components/blockly-field';
import Guide from '../components/guide';
import SQLiteOutput from '../components/sqliteoutput';

import styles from '../styles/home.module.css';

export default function Home() {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" sizes="180x180" href="/favicon.png"></link>
                <title>SQLatch - POC</title>
            </Head>
            <div className={styles.topcontainer}>
                <Navbar />
                <RuntimeControls />
                <div className={styles.midcontainer}>
                    <BlocklyField />
                    <Guide />
                </div>
                <SQLiteOutput />
            </div>
        </>
    );
}