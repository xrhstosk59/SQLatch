import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useMemo,
    useCallback,
    useRef,
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
    const recentResultRef = useRef<Record<string, unknown>[]>([]);
    const activeDBRef = useRef<Database | null>(null);
    const errorsRef = useRef('');

    const updateError = useCallback((message: string) => {
        errorsRef.current = message;
        setErrors(message);
    }, []);

    const updateRecentResult = useCallback((result: Record<string, unknown>[]) => {
        recentResultRef.current = result;
        setRecentResult(result);
    }, []);

    const setupDB = useCallback((sqlite3: Sqlite3Static) => {
        try {
            const db = new sqlite3.oo1.DB();
            setActiveDB((prevDB) => {
                if (prevDB) {
                    prevDB.close();
                }
                activeDBRef.current = db;
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
        sqlite3InitModule().then((sqlite3) => {
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
            updateError('');
            if (query === '') {
                updateError('Δεν βρέθηκαν blocks στο workspace!');
                updateRecentResult([]);
                return [];
            }

            try {
                // Split multiple statements by semicolon
                const statements = query
                    .split(';')
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0);

                const db = activeDBRef.current;
                if (!db) {
                    updateError('Η βάση δεδομένων δεν έχει φορτωθεί ακόμα. Δοκίμασε ξανά σε λίγο.');
                    updateRecentResult([]);
                    return [];
                }

                let lastResult: Record<string, unknown>[] = [];

                // Execute each statement separately
                statements.forEach((statement) => {
                    const result = db.exec(statement, {
                        rowMode: 'object',
                        returnValue: 'resultRows',
                    }) as Record<string, unknown>[];

                    // Keep the last non-empty result (typically from SELECT)
                    if (result && result.length > 0) {
                        lastResult = result;
                    }
                });

                updateRecentResult(lastResult);
                return lastResult;
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                updateError(message);
                updateRecentResult([]);
                return [];
            }
        },
        [updateError, updateRecentResult]
    );

    const getResultDB = useCallback((): Record<string, unknown>[] => {
        return recentResultRef.current;
    }, []);

    const getError = useCallback((): string => {
        return errorsRef.current;
    }, []);

    const requestDB = async (path: string): Promise<ArrayBuffer | ''> => {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(
                    `Αποτυχία φόρτωσης βάσης: ${response.status} ${response.statusText}`
                );
            }
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
                activeDBRef.current = db;
                return db;
            });
            updateError('');
            updateRecentResult([]);
        }
    }, [sqlite3Global, updateError, updateRecentResult]);

    const loadDB = useCallback(
        async (path: string) => {
            updateError('');
            updateRecentResult([]);
            if (path === '') {
                resetDB();
            } else {
                if (!sqlite3Global) {
                    updateError('Η SQLite δεν έχει αρχικοποιηθεί ακόμα. Δοκίμασε ξανά σε λίγο.');
                    return;
                }
                const arrayBuffer = await requestDB(path);
                if (arrayBuffer !== '') {
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
                        activeDBRef.current = db;
                        return db;
                    });
                }
            }
        },
        [sqlite3Global, resetDB, updateError, updateRecentResult]
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
