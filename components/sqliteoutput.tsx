
import styles from '../styles/sqliteoutput.module.css';
import { useSQLiteData } from './sqlite/sqlite';
var query = ''
export default function SQLiteOutput(query) {
    const {rows} = useSQLiteData("select * from t");
    return (
        <div className={styles.container}>
            <table><tbody>{rows.map((row, index) => <tr key={index}>{row.map((col,index) => <td key = {index}>{col}</td>)}</tr>)}</tbody>
            </table>
        </div>
    )
}