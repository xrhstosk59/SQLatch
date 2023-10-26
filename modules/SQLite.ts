import sqlite3InitModule, { Database, Sqlite3Static } from '@sqlite.org/sqlite-wasm';

let recentResult: any;
let activeDB: Database;

export const useSQL = () => {

    const initSQL = () => {
        console.log('SQLite: Initializing SQLite3 module...');
        sqlite3InitModule({
            print: console.log,
            printErr: console.error,
        }).then((sqlite3) => {
            try {
                setupDB(sqlite3);
            } catch (err) {
                console.log(err.name, err.message);
            }
        });
    }

    const setupDB = (sqlite3: Sqlite3Static) => {
        try {
            console.log('SQLite: Initializing DB...');
            activeDB = new sqlite3.oo1.DB();

            queryDB('CREATE TABLE IF NOT EXISTS t(a,b)');
            queryDB('INSERT INTO t(a,b) VALUES (1,2),(3,4)');
        } catch (err) {
            console.log('SQLite: ', err.name, err.message);
            activeDB.close();
        }
    };

    const queryDB = (query: string) => {
        try {
            console.log('SQLite: ', query);
            recentResult = activeDB.exec(query, { returnValue: 'resultRows' });
        } catch (err){
            console.log('SQLite: ', err.name, err.message);
        }
    };

    const getResultDB = (): any => {
        return recentResult;
    }

    return {
        initSQL,
        setupDB,
        queryDB,
        getResultDB
    }
}