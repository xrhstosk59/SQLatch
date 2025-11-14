/**
 * Utility functions for file operations (save, load, etc.)
 */

/**
 * Downloads a JSON object as a file
 */
export function downloadJSON(data: object, filename: string): void {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    link.download = filename;
    link.click();
}

/**
 * Opens a file picker and reads the selected JSON file
 * Returns a promise that resolves with the parsed JSON content
 */
export function loadJSONFile(): Promise<object> {
    return new Promise((resolve, reject) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';

        fileInput.onchange = () => {
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];

                // Validate file type
                if (!file.name.endsWith('.json')) {
                    reject(new Error('Invalid file type. Please select a .json file'));
                    return;
                }

                const reader = new FileReader();
                reader.readAsText(file);

                reader.onload = (e) => {
                    if (e.target) {
                        try {
                            const fileContent = JSON.parse(e.target.result as string);
                            resolve(fileContent);
                        } catch (error) {
                            reject(
                                new Error('Invalid JSON file. Please select a valid SQLatch file.')
                            );
                        }
                    }
                };

                reader.onerror = () => {
                    reject(new Error('Error reading file'));
                };
            }
        };

        fileInput.click();
    });
}

/**
 * Shows a confirmation dialog
 * Returns true if user confirms, false otherwise
 */
export function confirmAction(message: string): boolean {
    return window.confirm(message);
}

/**
 * Generates a shareable URL with encoded workspace state
 */
export function generateShareURL(workspaceState: object): string {
    const encBL = btoa(JSON.stringify(workspaceState));
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}/?bl=${encBL}`;
}
