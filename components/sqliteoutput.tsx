import styles from '../styles/sqliteoutput.module.css';
import Table from 'react-bootstrap/Table';

import { SqlValue } from '@sqlite.org/sqlite-wasm';
import { useSQL } from '../modules/SQLite';
import { useEffect } from 'react';
import { useState } from 'react';

export default function SQLiteOutput() {
    const [outputDB, setOutputDB] = useState<object[]>([]);
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
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        {outputDB[0] != null && Object.keys(outputDB[0]).map((column,colIndex) => <th key={colIndex}>{column}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {outputDB[0] != null && outputDB.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td key={rowIndex * 100}>
                                {rowIndex}
                            </td>
                            {Object.values(row).map((value,valueIndex) => <td key={valueIndex}>{value}</td> )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}