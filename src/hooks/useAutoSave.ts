import { useEffect, useRef } from 'react';

interface UseAutoSaveOptions {
    enabled: boolean;
    intervalMs?: number;
    onSave: () => void;
}

const DEFAULT_INTERVAL = 30000; // 30 seconds

/**
 * Custom hook for auto-saving workspace
 * @param options - Configuration options for auto-save
 */
export function useAutoSave({ enabled, intervalMs = DEFAULT_INTERVAL, onSave }: UseAutoSaveOptions) {
    const savedCallback = useRef<() => void>();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = onSave;
    }, [onSave]);

    // Set up the interval
    useEffect(() => {
        if (!enabled) {
            return;
        }

        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        const id = setInterval(tick, intervalMs);
        return () => clearInterval(id);
    }, [enabled, intervalMs]);
}
