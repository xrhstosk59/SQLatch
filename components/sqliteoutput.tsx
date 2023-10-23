
import styles from '../styles/sqliteoutput.module.css';
import { useSQLiteData } from './sqlite/sqlite';

export default function SQLiteOutput() {
    const {rows} = useSQLiteData("select * from t");
    return (
        <div className={styles.container}>
            <table><tbody>{rows.map((row) => <tr>{row.map((col) => <td>{col}</td>)}</tr>)}</tbody>
            </table>
        </div>
    )
}