import { useState, useEffect } from 'react';
import styles from '../styles/sqliteoutput.module.css';
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
export default function SQLiteOutput() {
    const [db, setDb] = useState<any>(null)
    const [rows,setRows] =useState<any>([]);
    let needsSetup = true
    useEffect(() => {
        async function setupDB() {
            const sqliteDB = await sqlite3InitModule().then((sqlite3: any) => {
                //const opfsDb = new sqlite3.opfs.OpfsDb("my-db", "c");
                // or in-memory ...
                const _db = new sqlite3.oo1.DB();
                console.log("sqlite3 instance created:", sqlite3);
                console.log("DB instance created is:", _db)
                setDb(_db);
                return sqlite3;
            });
            console.log("sqliteDB:", sqliteDB);
        }

        if (!db && needsSetup) {
            needsSetup = false
            console.log("useEffect()/setupDB()")
            setupDB()
        }
    }, []);
    useEffect(() => {
        if (db !== null) {
            try {
                console.log("Create a table...\n");
                db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
                // SQL can be either a string or a byte array
                // or an array of strings which get concatenated
                // together as-is (so be sure to end each statement
                // with a semicolon).

                console.log("Insert some data using exec()...\n");

                db.exec("insert into t(a,b) values (1,2),(3,4)")
                // bind by parameter index...   
                console.log("Query data with exec() without a callback...\n");


                let rows = db.exec("select * from t", {
                    returnValue: "resultRows"
                })
                console.log(rows);
                setRows(rows);
            } catch (e) {
                // if(e instanceof sqlite3.SQLite3Error){
                //   log("Got expected exception from db.transaction():",e.message);
                //   log("count(*) from t =",db.selectValue("select count(*) from t"));
                // }else{
                //   throw e;
                // }
                console.log("error is:" + e)
                throw e
            }
        }
    }, [db]);

    return (
        <div className={styles.container}>
            {rows.join("\n")}
        </div>
    )
}