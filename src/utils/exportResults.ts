/**
 * Utility functions for exporting query results
 */

/**
 * Converts array of objects to CSV format
 */
function convertToCSV(data: Record<string, unknown>[]): string {
    if (data.length === 0) return '';

    // Get headers from first object
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');

    // Convert rows to CSV format
    const csvRows = data.map((row) => {
        return headers
            .map((header) => {
                const value = row[header];
                // Handle values that contain commas or quotes
                const stringValue = String(value ?? '');
                if (stringValue.includes(',') || stringValue.includes('"')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            })
            .join(',');
    });

    return [csvHeaders, ...csvRows].join('\n');
}

/**
 * Exports query results as CSV file
 */
export function exportAsCSV(data: Record<string, unknown>[], filename?: string): void {
    if (data.length === 0) {
        alert('Δεν υπάρχουν δεδομένα για εξαγωγή');
        return;
    }

    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `sqlatch-results-${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Exports query results as JSON file
 */
export function exportAsJSON(data: Record<string, unknown>[], filename?: string): void {
    if (data.length === 0) {
        alert('Δεν υπάρχουν δεδομένα για εξαγωγή');
        return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `sqlatch-results-${Date.now()}.json`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Copies query results to clipboard as formatted text
 */
export async function copyResultsToClipboard(data: Record<string, unknown>[]): Promise<void> {
    if (data.length === 0) {
        throw new Error('Δεν υπάρχουν δεδομένα για αντιγραφή');
    }

    // Format as tab-separated values for better paste compatibility
    const headers = Object.keys(data[0]);
    const headerRow = headers.join('\t');

    const dataRows = data.map((row) => {
        return headers.map((header) => String(row[header] ?? '')).join('\t');
    });

    const formattedData = [headerRow, ...dataRows].join('\n');

    await navigator.clipboard.writeText(formattedData);
}
