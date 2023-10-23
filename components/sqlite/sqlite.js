import { useState, useEffect } from "react";
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

function useSQLiteSetup() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    async function setupDB() {
      const sqlite3 = await sqlite3InitModule();
      const _db = new sqlite3.oo1.DB();
      console.log("Create a table...\n");
      _db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");

      console.log("Insert some data using exec()...\n");

      _db.exec("insert into t(a,b) values (1,2),(3,4)");

      console.log("Query data with exec() without a callback...\n");
      setDb(_db);
    }

    setupDB();

  }, []);

  return { db };
}

function useSQLiteQuery(db, query) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (db !== null) {
      try {
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

export function useSQLiteData(query) {
  const { db } = useSQLiteSetup();
  const { rows } = useSQLiteQuery(db, query);

  return { rows };
}