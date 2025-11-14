import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export interface QueryHistoryEntry {
    id: string;
    query: string;
    timestamp: Date;
    success: boolean;
    resultCount?: number;
    error?: string;
}

interface QueryHistoryContextType {
    history: QueryHistoryEntry[];
    addQuery: (query: string, success: boolean, resultCount?: number, error?: string) => void;
    clearHistory: () => void;
    deleteQuery: (id: string) => void;
}

const QueryHistoryContext = createContext<QueryHistoryContextType | undefined>(undefined);

const HISTORY_STORAGE_KEY = 'sqlatch_query_history';
const MAX_HISTORY_ITEMS = 50;

interface QueryHistoryProviderProps {
    children: ReactNode;
}

export function QueryHistoryProvider({ children }: QueryHistoryProviderProps) {
    const [history, setHistory] = useState<QueryHistoryEntry[]>([]);

    // Load history from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Convert timestamp strings back to Date objects
                const historyWithDates = parsed.map((entry: QueryHistoryEntry) => ({
                    ...entry,
                    timestamp: new Date(entry.timestamp),
                }));
                setHistory(historyWithDates);
            }
        } catch (error) {
            console.error('Error loading query history:', error);
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
        } catch (error) {
            console.error('Error saving query history:', error);
        }
    }, [history]);

    const addQuery = (
        query: string,
        success: boolean,
        resultCount?: number,
        error?: string
    ) => {
        const newEntry: QueryHistoryEntry = {
            id: Date.now().toString(),
            query: query.trim(),
            timestamp: new Date(),
            success,
            resultCount,
            error,
        };

        setHistory((prev) => {
            // Add to the beginning and limit to MAX_HISTORY_ITEMS
            const newHistory = [newEntry, ...prev].slice(0, MAX_HISTORY_ITEMS);
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_STORAGE_KEY);
    };

    const deleteQuery = (id: string) => {
        setHistory((prev) => prev.filter((entry) => entry.id !== id));
    };

    const value: QueryHistoryContextType = useMemo(
        () => ({
            history,
            addQuery,
            clearHistory,
            deleteQuery,
        }),
        [history]
    );

    return <QueryHistoryContext.Provider value={value}>{children}</QueryHistoryContext.Provider>;
}

export function useQueryHistory(): QueryHistoryContextType {
    const context = useContext(QueryHistoryContext);
    if (context === undefined) {
        throw new Error('useQueryHistory must be used within a QueryHistoryProvider');
    }
    return context;
}
