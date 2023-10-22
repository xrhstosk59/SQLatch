/* Next components  */
import Head from 'next/head';

/* Our Components */
import Navbar from '../components/navbar';
import BlocklyWorkspace from '../components/blockly-workspace';
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
                    <BlocklyWorkspace />
                    <Guide />
                </div>
                <SQLiteOutput />
            </div>
        </>
    );
}