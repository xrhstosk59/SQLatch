import sqlite3InitModule, { Database, Sqlite3Static } from '@sqlite.org/sqlite-wasm';

let recentResult: object[];
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

            queryDB('CREATE TABLE IF NOT EXISTS t(a,b,c)');
            queryDB('INSERT INTO t(a,b,c) VALUES (1,2,3),(4,5,6),(4,5,6),(4,5,6),(4,5,6),(4,5,6)');
        } catch (err) {
            console.log(err.message);
            activeDB.close();
        }
    };

    const queryDB = (query: string) => {
        if (query == ''){
            alert('Empty query!');
        }
        else {
            try {
                console.log('SQLite: ', query);
                recentResult = activeDB.exec(query, {rowMode:"object", returnValue: 'resultRows' });
                console.log(recentResult);
            } catch (err){
                console.log(err.message);
                alert(err.message.split(':').slice(2, err.message.length));
            }
        }
    };

    const getResultDB = (): object[] => {
        return recentResult;
    }

    return {
        initSQL,
        setupDB,
        queryDB,
        getResultDB
    }
}