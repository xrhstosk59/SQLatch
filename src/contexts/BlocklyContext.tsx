import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import * as Blockly from 'blockly';

import createJSON from '../modules/Blockly/Blocks/create.json';
import selectJSON from '../modules/Blockly/Blocks/select.json';
import whereJSON from '../modules/Blockly/Blocks/where.json';
import columnJSON from '../modules/Blockly/Blocks/column.json';
import toolboxJSON from '../modules/Blockly/Blocks/toolbox.json';
import insertJSON from '../modules/Blockly/Blocks/insert.json';
import valueJSON from '../modules/Blockly/Blocks/value.json';
import columnNameJSON from '../modules/Blockly/Blocks/column_name.json';
import updateJSON from '../modules/Blockly/Blocks/update.json';
import deleteJSON from '../modules/Blockly/Blocks/delete.json';
import orderByJSON from '../modules/Blockly/Blocks/order_by.json';
import setJSON from '../modules/Blockly/Blocks/set.json';
import combinerJSON from '../modules/Blockly/Blocks/combiner.json';
import setClauseJSON from '../modules/Blockly/Blocks/set_clause.json';

const SQL = new Blockly.Generator('SQL');

function parentIsType(block: Blockly.Block, allowedTypes: string[]) {
    // Access internal property with type assertion
    const parentBlock = (block as unknown as { parentBlock_?: Blockly.Block | null }).parentBlock_;
    if (!parentBlock) return false;
    return allowedTypes.includes(parentBlock.type);
}

let BLWorkspace: Blockly.Workspace;
let lastSelectedBlock: Blockly.Block | null = null;

interface BlocklyContextType {
    initBlockly: () => void;
    initGen: () => void;
    setWorkspace: (workspace: Blockly.Workspace) => void;
    loadWorkspaceFile: (path: string) => Promise<void>;
    loadWorkspaceState: (state: object) => void;
    getToolbox: () => Blockly.utils.toolbox.ToolboxDefinition;
    getWorkspaceState: () => object;
    runGen: () => string;
    runGenSelected: () => string;
}

const BlocklyContext = createContext<BlocklyContextType | undefined>(undefined);

interface BlocklyProviderProps {
    children: ReactNode;
}

export function BlocklyProvider({ children }: BlocklyProviderProps) {
    const initBlockly = () => {
        Blockly.Blocks['create'] = {
            init: function () {
                this.jsonInit(createJSON);
            },
        };
        Blockly.Blocks['select'] = {
            init: function () {
                this.jsonInit(selectJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (parentIsType(this, ['create', 'column'])) this.unplug();
            },
        };
        Blockly.Blocks['where'] = {
            init: function () {
                this.jsonInit(whereJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ['select', 'delete'])) {
                    this.unplug();
                }
            },
        };
        Blockly.Blocks['column'] = {
            init: function () {
                this.jsonInit(columnJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ['create', 'column'])) {
                    this.unplug();
                }
            },
        };
        Blockly.Blocks['insert'] = {
            init: function () {
                this.jsonInit(insertJSON);
            },
        };
        Blockly.Blocks['value'] = {
            init: function () {
                this.jsonInit(valueJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ['insert', 'value'])) {
                    this.unplug();
                }
            },
        };
        Blockly.Blocks['column_name'] = {
            init: function () {
                this.jsonInit(columnNameJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ['insert', 'column_name'])) {
                    this.unplug();
                }
            },
        };
        Blockly.Blocks['update'] = {
            init: function () {
                this.jsonInit(updateJSON);
            },
        };
        Blockly.Blocks['delete'] = {
            init: function () {
                this.jsonInit(deleteJSON);
            },
        };
        Blockly.Blocks['order_by'] = {
            init: function () {
                this.jsonInit(orderByJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ['select'])) {
                    this.unplug();
                }
            },
        };
        Blockly.Blocks['set'] = {
            init: function () {
                this.jsonInit(setJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ['update', 'set'])) {
                    this.unplug();
                }
            },
        };
        Blockly.Blocks['combiner'] = {
            init: function () {
                this.jsonInit(combinerJSON);
            },
        };
        Blockly.Blocks['set_clause'] = {
            init: function () {
                this.jsonInit(setClauseJSON);
            },
            onchange: function (e: Blockly.Events.Abstract) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ['update', 'set_clause'])) {
                    this.unplug();
                }
            },
        };
    };

    const initGen = () => {
        SQL.forBlock['create'] = function (block) {
            const table = SQL.valueToCode(block, 'TABLE', 0);
            let columns = SQL.statementToCode(block, 'COLUMNS') || ' ';
            if (columns != ' ') columns = '(' + columns + ')';
            const code = 'CREATE TABLE ' + table + columns;
            return code + ';';
        };
        SQL.forBlock['insert'] = function (block) {
            const table = SQL.valueToCode(block, 'TABLE', 0);
            let columns = SQL.statementToCode(block, 'COLUMNS') || ' ';
            let values = SQL.statementToCode(block, 'VALUES') || ' ';
            if (columns != ' ') columns = '(' + columns + ')';
            if (values != ' ') values = '(' + values + ')';
            const code = 'INSERT INTO ' + table + columns + ' VALUES ' + values;
            return code + ';';
        };
        SQL.forBlock['select'] = function (block) {
            const columns = SQL.valueToCode(block, 'COLUMNS', 0);
            const table = SQL.valueToCode(block, 'TABLE', 0);
            const parameters = SQL.statementToCode(block, 'PARAMETERS') || ' ';
            const code = 'SELECT ' + columns + ' FROM ' + table + parameters;
            return code;
        };
        SQL.forBlock['where'] = function (block) {
            const textValue = SQL.valueToCode(block, 'CONDITION', 0);
            const code = 'WHERE ' + textValue;
            return code;
        };
        SQL.forBlock['column'] = function (block) {
            const textValue = SQL.valueToCode(block, 'COLUMN', 0);
            const type = block.getFieldValue('TYPE');
            const constrain = block.getFieldValue('CONSTRAIN');
            const code = textValue + ' ' + type + ' ' + constrain;
            return code;
        };
        SQL.forBlock['text'] = function (block) {
            const textValue = block.getFieldValue('TEXT');

            // Check the parent block type to determine if we need quotes
            const parentBlock = (block as any).parentBlock_;
            const parentType = parentBlock?.type;

            // Add quotes ONLY for values inside VALUE blocks (actual data)
            // Everything else is an identifier (table names, column names, etc.)
            const isNumber = !isNaN(Number(textValue));
            const isInsideValueBlock = parentType === 'value';

            // Only add quotes for string values inside VALUE blocks
            const needsQuotes = !isNumber && isInsideValueBlock;
            const sqlValue = needsQuotes ? `'${textValue}'` : textValue;

            return [sqlValue, 0];
        };
        SQL.forBlock['value'] = function (block) {
            const textValue = SQL.valueToCode(block, 'VALUE', 0);
            return textValue;
        };
        SQL.forBlock['column_name'] = function (block) {
            const textValue = SQL.valueToCode(block, 'COLUMN', 0);
            return textValue;
        };
        SQL.forBlock['update'] = function (block) {
            const table = SQL.valueToCode(block, 'TABLE', 0);
            let setClause = SQL.statementToCode(block, 'SET_CLAUSES') || '';
            const whereClause = SQL.statementToCode(block, 'UPDATE_CONDITION') || '';
            const code = 'UPDATE ' + table + ' SET ' + setClause + ' ' + whereClause;
            return code + ';';
        };
        SQL.forBlock['delete'] = function (block) {
            const table = SQL.valueToCode(block, 'TABLE', 0);
            const whereClause = SQL.statementToCode(block, 'WHERE') || '';
            const code = 'DELETE FROM ' + table + ' ' + whereClause;
            return code + ';';
        };
        SQL.forBlock['order_by'] = function (block) {
            const column = SQL.valueToCode(block, 'COLUMN', 0);
            const direction = block.getFieldValue('DIRECTION');
            const code = 'ORDER BY ' + column + ' ' + direction;
            return code;
        };
        SQL.forBlock['set'] = function (block) {
            const column = SQL.valueToCode(block, 'COLUMN', 0);
            const value = SQL.valueToCode(block, 'VALUE', 0);
            const code = column + ' = ' + value;
            return code;
        };
        SQL.forBlock['combiner'] = function (block) {
            const first = SQL.valueToCode(block, 'FIRST', 0);
            const operation = block.getFieldValue('OPERATION');
            const second = SQL.valueToCode(block, 'SECOND', 0);
            const code = '(' + first + ' ' + operation + ' ' + second + ')';
            return [code, 0];
        };
        SQL.forBlock['set_clause'] = function (block) {
            const column = SQL.valueToCode(block, 'COLUMN_NAME', 0);
            const value = SQL.valueToCode(block, 'COLUMN_VALUE', 0);
            const code = column + ' = ' + value;
            return code;
        };
        // generate code for all blocks in statements
        SQL.scrub_ = function (block, code, thisOnly) {
            const nextBlock = block.nextConnection && block.nextConnection.targetBlock();

            if (nextBlock && !thisOnly) {
                if (
                    nextBlock.type == 'column' ||
                    nextBlock.type == 'column_name' ||
                    nextBlock.type == 'value' ||
                    nextBlock.type == 'set' ||
                    nextBlock.type == 'set_clause'
                ) {
                    return code + ', ' + SQL.blockToCode(nextBlock);
                }
            }
            return code;
        };
    };

    const setWorkspace = (workspace: Blockly.Workspace) => {
        BLWorkspace = workspace;

        // Track block selection
        workspace.addChangeListener((event: Blockly.Events.Abstract) => {
            if (event.type === Blockly.Events.SELECTED) {
                const selectedEvent = event as any;
                if (selectedEvent.newElementId) {
                    const block = workspace.getBlockById(selectedEvent.newElementId);
                    if (block) {
                        lastSelectedBlock = block;
                        console.log('-- Blockly: Block selected:', block.type);
                    }
                }
            }
        });
    };

    const loadWorkspaceFile = async (path: string) => {
        console.log('-- Blockly: Loading workspace from:', path);
        if (path === '') {
            console.log('-- Blockly: Clearing workspace --');
            BLWorkspace.clear();
        } else {
            try {
                const response = await fetch(path);
                const text = await response.text();
                const state = JSON.parse(text);
                console.log('-- Blockly: Parsed workspace state:', state);
                loadWorkspaceState(state);
                // Center the workspace after loading
                if (
                    'scrollCenter' in BLWorkspace &&
                    typeof (BLWorkspace as Blockly.WorkspaceSvg).scrollCenter === 'function'
                ) {
                    (BLWorkspace as Blockly.WorkspaceSvg).scrollCenter();
                }
            } catch (error) {
                console.error('-- Blockly: Error loading workspace from:', path);
                console.error('-- Blockly: Error details:', error);
                BLWorkspace.clear();
            }
        }
    };

    const loadWorkspaceState = (state: object) => {
        console.log('-- Blockly: Setting state --');
        Blockly.serialization.workspaces.load(state, BLWorkspace);
    };

    const getToolbox = (): Blockly.utils.toolbox.ToolboxDefinition => {
        return toolboxJSON as Blockly.utils.toolbox.ToolboxDefinition;
    };

    const getWorkspaceState = (): object => {
        console.log('-- Blockly: Getting state --');
        const state = Blockly.serialization.workspaces.save(BLWorkspace);
        return state;
    };

    const runGen = (): string => {
        console.log('-- Blockly: Running Generator --');
        const code: string = SQL.workspaceToCode(BLWorkspace);
        console.log(code);
        return code;
    };

    const runGenSelected = (): string => {
        console.log('-- Blockly: Running Generator (Selected Only) --');

        if (!BLWorkspace) {
            console.log('-- Blockly: Workspace not initialized --');
            return '';
        }

        console.log('-- Blockly: Last selected block:', lastSelectedBlock?.type);

        if (!lastSelectedBlock) {
            console.log('-- Blockly: No block selected, running all blocks --');
            return runGen();
        }

        // Verify block still exists in workspace
        const blockExists = BLWorkspace.getBlockById(lastSelectedBlock.id);
        if (!blockExists) {
            console.log('-- Blockly: Selected block no longer exists, running all blocks --');
            lastSelectedBlock = null;
            return runGen();
        }

        // Get the top-level block (in case a child block is selected)
        let topBlock = lastSelectedBlock;
        while (topBlock.getParent()) {
            topBlock = topBlock.getParent()!;
        }

        console.log('-- Blockly: Top-level block:', topBlock.type);

        // Generate code only for this block
        const code = SQL.blockToCode(topBlock);
        console.log('-- Blockly: Generated code:', code);

        return typeof code === 'string' ? code : code[0];
    };

    const value: BlocklyContextType = useMemo(
        () => ({
            initBlockly,
            initGen,
            setWorkspace,
            loadWorkspaceFile,
            loadWorkspaceState,
            getToolbox,
            getWorkspaceState,
            runGen,
            runGenSelected,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return <BlocklyContext.Provider value={value}>{children}</BlocklyContext.Provider>;
}

export function useBlocklyContext(): BlocklyContextType {
    const context = useContext(BlocklyContext);
    if (context === undefined) {
        throw new Error('useBlocklyContext must be used within a BlocklyProvider');
    }
    return context;
}
