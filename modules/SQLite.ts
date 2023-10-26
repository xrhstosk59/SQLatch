import sqlite3InitModule, { Database, SQLite3Error, Sqlite3Static } from '@sqlite.org/sqlite-wasm';

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
                console.log(err.message);
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
            console.log(err.message);
            activeDB.close();
        }
    };

    const queryDB = (query: string) => {
        try {
            console.log('SQLite: ', query);
            recentResult = activeDB.exec(query, { returnValue: 'resultRows' });
        } catch (err){
            console.log(err.message);
            alert(err.message.split(':').slice(2, err.message.length));
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