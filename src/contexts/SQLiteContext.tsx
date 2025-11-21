import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useMemo,
    useCallback,
} from 'react';
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
    const [isInitializing, setIsInitializing] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const setupDB = useCallback((sqlite3: Sqlite3Static) => {
        try {
            console.log('-- SQLite: Initializing DB --');
            console.log('-- SQLite: Creating NEW database instance --');
            const db = new sqlite3.oo1.DB();
            console.log('-- SQLite: New DB created:', db);
            setActiveDB((prevDB) => {
                if (prevDB) {
                    console.log('-- SQLite: Closing previous DB --');
                    prevDB.close();
                }
                return db;
            });
            setIsInitialized(true);
            setIsInitializing(false);
        } catch (err) {
            console.log(err instanceof Error ? err.message : String(err));
            setIsInitializing(false);
        }
    }, []);

    const initSQL = useCallback(() => {
        // Prevent multiple initializations
        if (isInitializing || isInitialized) {
            console.log('-- SQLite: Already initialized or initializing, skipping --');
            return;
        }

        console.log('-- SQLite: Initializing module --');
        setIsInitializing(true);
        sqlite3InitModule({
            print: console.log,
            printErr: console.error,
        }).then((sqlite3) => {
            try {
                setSqlite3Global(sqlite3);
                setupDB(sqlite3);
            } catch (err) {
                console.log(err instanceof Error ? err.message : String(err));
                setIsInitializing(false);
            }
        });
    }, [setupDB, isInitializing, isInitialized]);

    const queryDB = useCallback((query: string) => {
        setErrors('');
        if (query === '') {
            setErrors('Δεν βρέθηκαν blocks στο workspace!');
        } else {
            try {
                console.log('-- SQLite: Querying --');
                console.log('-- SQLite: Original query:', query);

                // Remove trailing semicolons as SQLite.wasm exec() doesn't accept them
                const cleanQuery = query.trim().replace(/;+\s*$/, '');
                console.log('-- SQLite: Clean query:', cleanQuery);
                console.log('-- SQLite: activeDB instance:', activeDB);

                if (activeDB) {
                    const result = activeDB.exec(cleanQuery, {
                        rowMode: 'object',
                        returnValue: 'resultRows',
                    }) as Record<string, unknown>[];
                    console.log('-- SQLite: Query result:', result);
                    setRecentResult(result);

                    // If CREATE TABLE, verify it was created
                    if (cleanQuery.trim().toUpperCase().startsWith('CREATE TABLE')) {
                        const tables = activeDB.exec(
                            "SELECT name FROM sqlite_schema WHERE type = 'table'",
                            { rowMode: 'object', returnValue: 'resultRows' }
                        );
                        console.log('-- SQLite: Tables after CREATE:', tables);
                    }
                } else {
                    console.log('-- SQLite: ERROR - No activeDB!');
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                console.log('-- SQLite: Query error:', message);
                setErrors(message);
            }
        }
    }, [activeDB]);

    const getResultDB = useCallback((): Record<string, unknown>[] => {
        return recentResult;
    }, [recentResult]);

    const getError = useCallback((): string => {
        return errors;
    }, [errors]);

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

    const resetDB = useCallback(() => {
        console.log('-- SQLite: Resetting DB --');
        console.log('-- SQLite: WARNING - Creating new DB, old data will be lost! --');
        if (sqlite3Global) {
            const db = new sqlite3Global.oo1.DB();
            console.log('-- SQLite: Reset - New DB created --');
            setActiveDB((prevDB) => {
                if (prevDB) {
                    console.log('-- SQLite: Reset - Closing previous DB --');
                    prevDB.close();
                }
                return db;
            });
        }
    }, [sqlite3Global]);

    const loadDB = useCallback(async (path: string) => {
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
                    setActiveDB((prevDB) => {
                        if (prevDB) prevDB.close();
                        return db;
                    });
                }
            }
        }
    }, [sqlite3Global, resetDB]);

    const getTableNames = useCallback((): Record<string, unknown>[] => {
        console.log('getTableNames - activeDB:', activeDB);
        if (!activeDB) {
            console.log('getTableNames - No activeDB!');
            return [];
        }
        const result = activeDB.exec(
            "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT IN ('sqlite_sequence')",
            { rowMode: 'object', returnValue: 'resultRows' }
        ) as Record<string, unknown>[];
        console.log('getTableNames - Result:', result);
        return result;
    }, [activeDB]);

    const getColumnNames = useCallback((name: string): Record<string, unknown>[] => {
        if (!activeDB) return [];
        return activeDB.exec(`PRAGMA table_info(${name});`, {
            rowMode: 'object',
            returnValue: 'resultRows',
        }) as Record<string, unknown>[];
    }, [activeDB]);

    const getForeignKeys = useCallback((name: string): Record<string, unknown>[] => {
        if (!activeDB) return [];
        return activeDB.exec(`PRAGMA foreign_key_list(${name})`, {
            rowMode: 'object',
            returnValue: 'resultRows',
        }) as Record<string, unknown>[];
    }, [activeDB]);

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
        [initSQL, queryDB, getResultDB, getError, loadDB, resetDB, getTableNames, getColumnNames, getForeignKeys]
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
