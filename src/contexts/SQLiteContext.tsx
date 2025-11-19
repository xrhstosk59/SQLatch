import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import sqlite3InitModule, { Database, Sqlite3Static } from '@sqlite.org/sqlite-wasm';

interface SQLiteContextType {
    initSQL: () => void;
    queryDB: (query: string) => void;
    getResultDB: () => Record<string, unknown>[];
    getError: () => string;
    loadDB: (path: string) => Promise<void>;
    resetDB: () => void;
    getTableNames: () => Record<string, unknown>[];
    getColumnNames: (name: string) => Record<string, unknown>[];
    getForeignKeys: (name: string) => Record<string, unknown>[];
}

const SQLiteContext = createContext<SQLiteContextType | undefined>(undefined);

interface SQLiteProviderProps {
    children: ReactNode;
}

export function SQLiteProvider({ children }: SQLiteProviderProps) {
    const [recentResult, setRecentResult] = useState<Record<string, unknown>[]>([]);
    const [sqlite3Global, setSqlite3Global] = useState<Sqlite3Static | null>(null);
    const [activeDB, setActiveDB] = useState<Database | null>(null);
    const [errors, setErrors] = useState<string>('');

    const initSQL = () => {
        console.log('-- SQLite: Initializing module --');
        sqlite3InitModule({
            print: console.log,
            printErr: console.error,
        }).then((sqlite3) => {
            try {
                setSqlite3Global(sqlite3);
                setupDB(sqlite3);
            } catch (err) {
                console.log(err instanceof Error ? err.message : String(err));
            }
        });
    };

    const setupDB = (sqlite3: Sqlite3Static) => {
        try {
            console.log('-- SQLite: Initializing DB --');
            const db = new sqlite3.oo1.DB();
            setActiveDB(db);
        } catch (err) {
            console.log(err instanceof Error ? err.message : String(err));
            if (activeDB) {
                activeDB.close();
            }
        }
    };

    const queryDB = (query: string) => {
        setErrors('');
        if (query === '') {
            setErrors('Δεν βρέθηκαν blocks στο workspace!');
        } else {
            try {
                console.log('-- SQLite: Querying --');
                if (activeDB) {
                    const result = activeDB.exec(query, {
                        rowMode: 'object',
                        returnValue: 'resultRows',
                    }) as Record<string, unknown>[];
                    setRecentResult(result);
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                console.log(message);
                setErrors(message);
            }
        }
    };

    const getResultDB = (): Record<string, unknown>[] => {
        return recentResult;
    };

    const getError = (): string => {
        return errors;
    };

    const requestDB = async (path: string): Promise<ArrayBuffer | ''> => {
        try {
            console.log('-- SQLite: fetching .db file --');
            const response = await fetch(path);
            const arrayBuf = await response.arrayBuffer();
            return arrayBuf;
        } catch (err) {
            console.log(err instanceof Error ? err.message : String(err));
            return '';
        }
    };

    const loadDB = async (path: string) => {
        console.log('-- SQLite: Loading DB --');

        if (path === '') {
            resetDB();
        } else {
            const arrayBuffer = await requestDB(path);
            if (arrayBuffer === '') {
                console.log('File error');
            } else {
                if (sqlite3Global) {
                    const p = sqlite3Global.wasm.allocFromTypedArray(arrayBuffer);
                    const db = new sqlite3Global.oo1.DB();
                    const rc = sqlite3Global.capi.sqlite3_deserialize(
                        db.pointer!,
                        'main',
                        p,
                        arrayBuffer.byteLength,
                        arrayBuffer.byteLength,
                        sqlite3Global.capi.SQLITE_DESERIALIZE_FREEONCLOSE |
                            sqlite3Global.capi.SQLITE_DESERIALIZE_RESIZEABLE
                    );
                    db.checkRc(rc);
                    if (activeDB) {
                        activeDB.close();
                    }
                    setActiveDB(db);
                }
            }
        }
    };

    const resetDB = () => {
        console.log('-- SQLite: Resetting DB --');
        if (sqlite3Global) {
            const db = new sqlite3Global.oo1.DB();
            if (activeDB) {
                activeDB.close();
            }
            setActiveDB(db);
        }
    };

    const getTableNames = (): Record<string, unknown>[] => {
        if (!activeDB) return [];
        return activeDB.exec(
            "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT IN ('sqlite_sequence')",
            { rowMode: 'object', returnValue: 'resultRows' }
        ) as Record<string, unknown>[];
    };

    const getColumnNames = (name: string): Record<string, unknown>[] => {
        if (!activeDB) return [];
        return activeDB.exec(`PRAGMA table_info(${name});`, {
            rowMode: 'object',
            returnValue: 'resultRows',
        }) as Record<string, unknown>[];
    };

    const getForeignKeys = (name: string): Record<string, unknown>[] => {
        if (!activeDB) return [];
        return activeDB.exec(`PRAGMA foreign_key_list(${name})`, {
            rowMode: 'object',
            returnValue: 'resultRows',
        }) as Record<string, unknown>[];
    };

    const value: SQLiteContextType = useMemo(
        () => ({
            initSQL,
            queryDB,
            getResultDB,
            getError,
            loadDB,
            resetDB,
            getTableNames,
            getColumnNames,
            getForeignKeys,
        }),
        []
    );

    return <SQLiteContext.Provider value={value}>{children}</SQLiteContext.Provider>;
}

export function useSQLite(): SQLiteContextType {
    const context = useContext(SQLiteContext);
    if (context === undefined) {
        throw new Error('useSQLite must be used within a SQLiteProvider');
    }
    return context;
}
