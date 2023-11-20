import sqlite3InitModule, { Database, Sqlite3Static } from '@sqlite.org/sqlite-wasm';

let recentResult: object[];
let sqlite3Global: Sqlite3Static;
let activeDB: Database;
let errors: any;

export const useSQL = () => {
    const initSQL = () => {
        console.log('-- SQLite: Initializing module --');
        sqlite3InitModule({
            print: console.log,
            printErr: console.error,
        }).then((sqlite3) => {
            try {
                sqlite3Global = sqlite3;
                setupDB(sqlite3);
            } catch (err) {
                console.log(err.message);
            }
        });
    }

    const setupDB = (sqlite3: Sqlite3Static) => {
        try {
            console.log('-- SQLite: Initializing DB --');
            activeDB = new sqlite3.oo1.DB();

            /*queryDB('CREATE TABLE IF NOT EXISTS t(a,b,c)');
            queryDB('INSERT INTO t(a,b,c) VALUES (1,2,3),(4,5,6),(4,5,6),(4,5,6),(4,5,6),(4,5,6)');*/
        } catch (err) {
            console.log(err.message);
            activeDB.close();
        }
    };

    const queryDB = (query: string) => {
        errors = '';
        if (query == '') {
            errors = 'Δεν βρέθηκαν blocks στο workspace!';
        }
        else {
            try {
                console.log('-- SQLite: Querying --');
                console.log(query);
                recentResult = activeDB.exec(query, { rowMode: "object", returnValue: 'resultRows' });
                console.log(recentResult);
            } catch (err) {
                console.log(err.message);
                errors = err.message;
            }
        }
    };

    const getResultDB = (): object[] => {
        return recentResult;
    }

    const getError = (): object[] => {
        return errors;
    }

    const requestDB = async (path: string): Promise<any> => {
        try {
            console.log('-- SQLite: fetching .db file --');
            const response = await fetch(path);
            const arrayBuf = await response.arrayBuffer();
            return arrayBuf;
        } catch (err) {
            console.log(err.message);
            return '';
        }
    };

    const loadDB = async (path: string) => {
        console.log('-- SQLite: Loading DB --');

        if (path == '') {
            console.log('No path specified, initializing empty DB');
            const db = new sqlite3Global.oo1.DB();
            activeDB.close();
            activeDB = db;
        }
        else {
            const arrayBuffer = await requestDB(path)
            if (arrayBuffer == '') {
                console.log('File error');
            } else {
                const p = sqlite3Global.wasm.allocFromTypedArray(arrayBuffer);
                const db = new sqlite3Global.oo1.DB();
                const rc = sqlite3Global.capi.sqlite3_deserialize(
                    db.pointer, 'main', p, arrayBuffer.byteLength, arrayBuffer.byteLength,
                    sqlite3Global.capi.SQLITE_DESERIALIZE_FREEONCLOSE
                );
                db.checkRc(rc);
                activeDB.close();
                activeDB = db;
            }
        }
    }

    return {
        initSQL,
        setupDB,
        queryDB,
        getResultDB,
        getError,
        loadDB
    }
}