// This module generates database schema for visualization

interface TableColumnConfig {
    name: string;
    description: string;
    type: string;
    key: boolean;
}

interface TableConfig {
    name: string;
    columns: TableColumnConfig[];
    schemaColor: string;
}

interface EdgeConfig {
    source: string;
    target: string;
    sourceKey: string;
    targetKey: string;
    relation: string;
}

export interface DatabaseConfig {
    tables: TableConfig[];
    edgeConfigs: EdgeConfig[];
    schemaColors: Record<string, string>;
    tablePositions: Record<string, { x: number; y: number }>;
}

interface SQLiteContextType {
    getTableNames: () => Record<string, unknown>[];
    getColumnNames: (name: string) => Record<string, unknown>[];
    getForeignKeys: (name: string) => Record<string, unknown>[];
}

const convertSchema = (useDB: SQLiteContextType): DatabaseConfig => {
    const table_names = useDB.getTableNames();

    const tables: TableConfig[] = table_names.map((row: any) => {
        const name = row['name'];
        const columns = useDB.getColumnNames(name).map((row: any) => {
            return {
                name: row['name'],
                description: '',
                type: row['type'] ?? '',
                key: Boolean(row['pk']) ?? false,
            };
        });
        return { name, columns, schemaColor: '#91C4F2' } as TableConfig;
    });

    const tablePositions: Record<string, { x: number; y: number }> = {};
    table_names.forEach((row: any, index: number) => {
        const name = row['name'];
        tablePositions[name] = { x: index * 200, y: 0 };
    });

    const edgeConfigs = table_names.map((row: any) => {
        const name = row['name'];
        return useDB.getForeignKeys(name).map((row: any) => {
            return {
                source: `public.${row['table']}`,
                target: `public.${name}`,
                sourceKey: row['to'],
                targetKey: row['from'],
                relation: 'hasOne',
            } as EdgeConfig;
        });
    });

    const db: DatabaseConfig = {
        tables,
        edgeConfigs: edgeConfigs.flat(),
        schemaColors: { DEFAULT: '#91C4F2' },
        tablePositions,
    };

    return db;
};

export default convertSchema;
