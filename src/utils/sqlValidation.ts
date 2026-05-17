const splitSqlStatements = (query: string): string[] =>
    query
        .split(';')
        .map((statement) => statement.trim())
        .filter((statement) => statement.length > 0);

const isCreateTableStatement = (statement: string): boolean =>
    /^CREATE\s+TABLE\b/i.test(statement.replace(/\s+/g, ' ').trim());

const getCreateTableBody = (statement: string): string =>
    statement.replace(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?/i, '').trim();

const createTableUsesSelect = (createTableBody: string): boolean =>
    /\bAS\s+SELECT\b/i.test(createTableBody);

const createTableHasName = (createTableBody: string): boolean => {
    const tableName = createTableBody.split(/\s|\(/, 1)[0];
    return tableName.length > 0;
};

const createTableHasColumns = (createTableBody: string): boolean => {
    if (createTableUsesSelect(createTableBody)) {
        return true;
    }

    const openParenIndex = createTableBody.indexOf('(');
    const closeParenIndex = createTableBody.lastIndexOf(')');

    if (openParenIndex === -1 || closeParenIndex === -1 || closeParenIndex < openParenIndex) {
        return false;
    }

    return createTableBody.slice(openParenIndex + 1, closeParenIndex).trim().length > 0;
};

export const getSQLClientValidationError = (query: string): string => {
    const statements = splitSqlStatements(query);

    for (const statement of statements) {
        if (!isCreateTableStatement(statement)) {
            continue;
        }

        const createTableBody = getCreateTableBody(statement);

        if (!createTableHasName(createTableBody)) {
            return 'Το CREATE TABLE χρειάζεται όνομα πίνακα. Σύνδεσε ένα text block στη θέση του ονόματος πίνακα.';
        }

        if (!createTableHasColumns(createTableBody)) {
            return 'Το CREATE TABLE χρειάζεται τουλάχιστον μία στήλη. Σύνδεσε ένα block COLUMN κάτω από το CREATE TABLE και βάλε όνομα στήλης.';
        }
    }

    return '';
};
