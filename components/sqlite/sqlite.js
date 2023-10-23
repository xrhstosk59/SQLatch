import { useState,useEffect } from "react";
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
export function useSQLiteData(query) {
  const [db, setDb] = useState(null);
  const [rows, setRows] = useState([]);
  let needsSetup = true;

  useEffect(() => {
    async function setupDB() {
      const sqliteDB = await sqlite3InitModule().then((sqlite3) => {
        const _db = new sqlite3.oo1.DB();
        console.log("sqlite3 instance created:", sqlite3);
        console.log("DB instance created is:", _db);
        setDb(_db);
        return sqlite3;
      });
      console.log("sqliteDB:", sqliteDB);
    }

    if (!db && needsSetup) {
      needsSetup = false;
      console.log("useEffect()/setupDB()");
      setupDB();
    }
  }, []);

  useEffect(() => {
    if (db !== null) {
      try {
        console.log("Create a table...\n");
        db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");

        console.log("Insert some data using exec()...\n");

        db.exec("insert into t(a,b) values (1,2),(3,4)");

        console.log("Query data with exec() without a callback...\n");

        let rows = db.exec(query, {
          returnValue: "resultRows"
        });
        console.log(rows);
        setRows(rows);
      } catch (e) {
        console.log("error is:" + e);
        throw e;
      }
    }
  }, [db]);

  return { rows };
}