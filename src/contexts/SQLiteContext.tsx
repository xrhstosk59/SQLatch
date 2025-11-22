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
    queryDB: (query: string) => Record<string, unknown>[];
    getResultDB: () => Record<string, unknown>[];
    getError: () => string;
    loadDB: (path: string) => Promise<void>;
    resetDB: () => void;
    getTableNames: () => Record<string, unknown>[];
    getColumnNames: (name: string) => Record<string, unknown>[];
    getForeignKeys: (name: string) => Record<string, unknown>[];
    isInitialized: boolean;
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
            const db = new sqlite3.oo1.DB();
            setActiveDB((prevDB) => {
                if (prevDB) {
                    prevDB.close();
                }
                return db;
            });
            setIsInitialized(true);
            setIsInitializing(false);
        } catch (err) {
            console.error(err instanceof Error ? err.message : String(err));
            setIsInitializing(false);
        }
    }, []);

    const initSQL = useCallback(() => {
        // Prevent multiple initializations
        if (isInitializing || isInitialized) {
            return;
        }

        setIsInitializing(true);
        sqlite3InitModule({
            print: console.log,
            printErr: console.error,
        }).then((sqlite3) => {
            try {
                setSqlite3Global(sqlite3);
                setupDB(sqlite3);
            } catch (err) {
                console.error(err instanceof Error ? err.message : String(err));
                setIsInitializing(false);
            }
        });
    }, [setupDB, isInitializing, isInitialized]);

    const queryDB = useCallback(
        (query: string): Record<string, unknown>[] => {
            setErrors('');
            if (query === '') {
                setErrors('Δεν βρέθηκαν blocks στο workspace!');
                return [];
            }

            try {
                // Split multiple statements by semicolon
                const statements = query
                    .split(';')
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0);

                if (!activeDB) {
                    return [];
                }

                let lastResult: Record<string, unknown>[] = [];

                // Execute each statement separately
                statements.forEach((statement) => {
                    const result = activeDB.exec(statement, {
                        rowMode: 'object',
                        returnValue: 'resultRows',
                    }) as Record<string, unknown>[];

                    // Keep the last non-empty result (typically from SELECT)
                    if (result && result.length > 0) {
                        lastResult = result;
                    }
                });

                setRecentResult(lastResult);
                return lastResult;
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                setErrors(message);
                return [];
            }
        },
        [activeDB]
    );

    const getResultDB = useCallback((): Record<string, unknown>[] => {
        return recentResult;
    }, [recentResult]);

    const getError = useCallback((): string => {
        return errors;
    }, [errors]);

    const requestDB = async (path: string): Promise<ArrayBuffer | ''> => {
        try {
            const response = await fetch(path);
            const arrayBuf = await response.arrayBuffer();
            return arrayBuf;
        } catch (err) {
            console.error(err instanceof Error ? err.message : String(err));
            return '';
        }
    };

    const resetDB = useCallback(() => {
        if (sqlite3Global) {
            const db = new sqlite3Global.oo1.DB();
            setActiveDB((prevDB) => {
                if (prevDB) {
                    prevDB.close();
                }
                return db;
            });
        }
    }, [sqlite3Global]);

    const loadDB = useCallback(
        async (path: string) => {
            if (path === '') {
                resetDB();
            } else {
                const arrayBuffer = await requestDB(path);
                if (arrayBuffer !== '') {
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
        },
        [sqlite3Global, resetDB]
    );

    const getTableNames = useCallback((): Record<string, unknown>[] => {
        if (!activeDB) {
            return [];
        }
        const result = activeDB.exec(
            "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT IN ('sqlite_sequence')",
            { rowMode: 'object', returnValue: 'resultRows' }
        ) as Record<string, unknown>[];
        return result;
    }, [activeDB]);

    const getColumnNames = useCallback(
        (name: string): Record<string, unknown>[] => {
            if (!activeDB) return [];
            return activeDB.exec(`PRAGMA table_info(${name});`, {
                rowMode: 'object',
                returnValue: 'resultRows',
            }) as Record<string, unknown>[];
        },
        [activeDB]
    );

    const getForeignKeys = useCallback(
        (name: string): Record<string, unknown>[] => {
            if (!activeDB) return [];
            return activeDB.exec(`PRAGMA foreign_key_list(${name})`, {
                rowMode: 'object',
                returnValue: 'resultRows',
            }) as Record<string, unknown>[];
        },
        [activeDB]
    );

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
            isInitialized,
        }),
        [
            initSQL,
            queryDB,
            getResultDB,
            getError,
            loadDB,
            resetDB,
            getTableNames,
            getColumnNames,
            getForeignKeys,
            isInitialized,
        ]
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
