import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
export async function initSQLite(){
const sqlite3 = await sqlite3InitModule()
const db = new sqlite3.oo1.DB();
db.exec("create table t(a,b)")
db.exec("insert into t values (1,2)")
return db
}

export function execSQL(db,sqlQuery) {
  return db.exec(sqlQuery, { returnValue: "resultRows" })
}