import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useBlocklyContext } from './BlocklyContext';
import { useAutoSave } from '../hooks/useAutoSave';

interface AutoSaveContextType {
    isEnabled: boolean;
    interval: number;
    lastSaved: Date | null;
    toggleAutoSave: () => void;
    setInterval: (interval: number) => void;
}

const AutoSaveContext = createContext<AutoSaveContextType | undefined>(undefined);

const AUTOSAVE_ENABLED_KEY = 'sqlatch_autosave_enabled';
const AUTOSAVE_INTERVAL_KEY = 'sqlatch_autosave_interval';
const AUTOSAVE_STATE_KEY = 'sqlatch_autosave_workspace';
const DEFAULT_INTERVAL = 30000; // 30 seconds

interface AutoSaveProviderProps {
    children: ReactNode;
}

export function AutoSaveProvider({ children }: AutoSaveProviderProps) {
    const blockly = useBlocklyContext();
    const [isMounted, setIsMounted] = useState(false);

    // Lazy initialization - only runs once on mount
    const [isEnabled, setIsEnabled] = useState(() => {
        if (typeof window === 'undefined') return false;
        try {
            const enabled = localStorage.getItem(AUTOSAVE_ENABLED_KEY);
            return enabled === 'true';
        } catch {
            return false;
        }
    });

    const [interval, setIntervalState] = useState(() => {
        if (typeof window === 'undefined') return DEFAULT_INTERVAL;
        try {
            const savedInterval = localStorage.getItem(AUTOSAVE_INTERVAL_KEY);
            return savedInterval ? parseInt(savedInterval, 10) : DEFAULT_INTERVAL;
        } catch {
            return DEFAULT_INTERVAL;
        }
    });

    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Set mounted flag after hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Auto-save function
    const handleAutoSave = () => {
        if (!isMounted) return; // Don't save during hydration
        try {
            const workspaceState = blockly.getWorkspaceState();
            localStorage.setItem(AUTOSAVE_STATE_KEY, JSON.stringify(workspaceState));
            setLastSaved(new Date());
            console.log('-- Auto-save: Workspace saved --');
        } catch (error) {
            console.error('Auto-save error:', error);
        }
    };

    // Use auto-save hook - only enable after mount
    useAutoSave({
        enabled: isEnabled && isMounted,
        intervalMs: interval,
        onSave: handleAutoSave,
    });

    const toggleAutoSave = () => {
        const newEnabled = !isEnabled;
        setIsEnabled(newEnabled);
        localStorage.setItem(AUTOSAVE_ENABLED_KEY, String(newEnabled));
    };

    const setInterval = (newInterval: number) => {
        setIntervalState(newInterval);
        localStorage.setItem(AUTOSAVE_INTERVAL_KEY, String(newInterval));
    };

    const value: AutoSaveContextType = useMemo(
        () => ({
            isEnabled,
            interval,
            lastSaved,
            toggleAutoSave,
            setInterval,
        }),
        [isEnabled, interval, lastSaved]
    );

    return <AutoSaveContext.Provider value={value}>{children}</AutoSaveContext.Provider>;
}

export function useAutoSaveContext(): AutoSaveContextType {
    const context = useContext(AutoSaveContext);
    if (context === undefined) {
        throw new Error('useAutoSaveContext must be used within an AutoSaveProvider');
    }
    return context;
}

/**
 * Loads the auto-saved workspace if available
 * @returns The saved workspace state or null if not available
 */
export function loadAutoSavedWorkspace(): object | null {
    try {
        const saved = localStorage.getItem(AUTOSAVE_STATE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error loading auto-saved workspace:', error);
    }
    return null;
}
