import styles from '../styles/sqliteoutput.module.css';
import { useSQL } from '../modules/SQLite';
import { useEffect } from 'react';
import { useState } from 'react';

export default function SQLiteOutput() {
    const [outputDB, setOutputDB] = useState();
    const useDB = useSQL();

    useEffect(() => {
        useDB.initSQL();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setOutputDB(useDB.getResultDB());
        }, 1000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    return (
        <div className={styles.container}>
            {/* <table><tbody>{rows.map((row, index) => <tr key={index}>{row.map((col,index) => <td key = {index}>{col}</td>)}</tr>)}</tbody>
            </table> */}
            {outputDB}
        </div>
    )
}