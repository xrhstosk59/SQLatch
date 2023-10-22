/* Next components  */
import Head from 'next/head';

/* Our Components */
import Navbar from '../components/navbar';
import Blockly from '../components/blockly';
import Guide from '../components/guide';
import SQLiteOutput from '../components/sqliteoutput';

import styles from '../styles/home.module.css';

export default function Home() {
    return (
        <>
            <Head>
                <title>SQLatch - POC</title>
            </Head>
            <div className={styles.topcontainer}>
                <Navbar />
                <div className={styles.midcontainer}>
                    <Blockly />
                    <Guide />
                </div>
                <SQLiteOutput />
            </div>
        </>
    );
}