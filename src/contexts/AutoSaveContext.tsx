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
    const [isEnabled, setIsEnabled] = useState(false);
    const [interval, setIntervalState] = useState(DEFAULT_INTERVAL);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const enabled = localStorage.getItem(AUTOSAVE_ENABLED_KEY);
            const savedInterval = localStorage.getItem(AUTOSAVE_INTERVAL_KEY);

            if (enabled !== null) {
                setIsEnabled(enabled === 'true');
            }
            if (savedInterval !== null) {
                setIntervalState(parseInt(savedInterval, 10));
            }
        } catch (error) {
            console.error('Error loading auto-save settings:', error);
        }
    }, []);

    // Auto-save function
    const handleAutoSave = () => {
        try {
            const workspaceState = blockly.getWorkspaceState();
            localStorage.setItem(AUTOSAVE_STATE_KEY, JSON.stringify(workspaceState));
            setLastSaved(new Date());
            console.log('-- Auto-save: Workspace saved --');
        } catch (error) {
            console.error('Auto-save error:', error);
        }
    };

    // Use auto-save hook
    useAutoSave({
        enabled: isEnabled,
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
