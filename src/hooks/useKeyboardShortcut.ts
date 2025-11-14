import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
}

/**
 * Hook for handling keyboard shortcuts
 */
export function useKeyboardShortcut(
    shortcut: KeyboardShortcut,
    callback: () => void,
    enabled: boolean = true
) {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!enabled) return;

            const {
                key,
                ctrl = false,
                alt = false,
                shift = false,
                meta = false,
            } = shortcut;

            const matches =
                event.key.toLowerCase() === key.toLowerCase() &&
                event.ctrlKey === ctrl &&
                event.altKey === alt &&
                event.shiftKey === shift &&
                event.metaKey === meta;

            if (matches) {
                event.preventDefault();
                callback();
            }
        },
        [shortcut, callback, enabled]
    );

    useEffect(() => {
        if (enabled) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown, enabled]);
}

/**
 * Hook for handling multiple keyboard shortcuts
 */
export function useKeyboardShortcuts(
    shortcuts: Array<{ shortcut: KeyboardShortcut; callback: () => void }>,
    enabled: boolean = true
) {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!enabled) return;

            for (const { shortcut, callback } of shortcuts) {
                const {
                    key,
                    ctrl = false,
                    alt = false,
                    shift = false,
                    meta = false,
                } = shortcut;

                const matches =
                    event.key.toLowerCase() === key.toLowerCase() &&
                    event.ctrlKey === ctrl &&
                    event.altKey === alt &&
                    event.shiftKey === shift &&
                    event.metaKey === meta;

                if (matches) {
                    event.preventDefault();
                    callback();
                    break;
                }
            }
        },
        [shortcuts, enabled]
    );

    useEffect(() => {
        if (enabled) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown, enabled]);
}
