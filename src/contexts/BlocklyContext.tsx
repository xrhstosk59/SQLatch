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

const SQL = new Blockly.Generator('SQL');

function parentIsType(block: Blockly.Block, allowedTypes: string[]) {
    // Access internal property with type assertion
    const parentBlock = (block as unknown as { parentBlock_?: Blockly.Block | null }).parentBlock_;
    if (!parentBlock) return false;
    return allowedTypes.includes(parentBlock.type);
}

let BLWorkspace: Blockly.Workspace;

interface BlocklyContextType {
    initBlockly: () => void;
    initGen: () => void;
    setWorkspace: (workspace: Blockly.Workspace) => void;
    loadWorkspaceFile: (path: string) => Promise<void>;
    loadWorkspaceState: (state: object) => void;
    getToolbox: () => Blockly.utils.toolbox.ToolboxDefinition;
    getWorkspaceState: () => object;
    runGen: () => string;
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
            return [textValue, 0];
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
            let setClause = SQL.statementToCode(block, 'SET') || '';
            const code = 'UPDATE ' + table + ' SET ' + setClause;
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
        // generate code for all blocks in statements
        SQL.scrub_ = function (block, code, thisOnly) {
            const nextBlock = block.nextConnection && block.nextConnection.targetBlock();

            if (nextBlock && !thisOnly) {
                if (
                    nextBlock.type == 'column' ||
                    nextBlock.type == 'column_name' ||
                    nextBlock.type == 'value' ||
                    nextBlock.type == 'set'
                ) {
                    return code + ', ' + SQL.blockToCode(nextBlock);
                }
            }
            return code;
        };
    };

    const setWorkspace = (workspace: Blockly.Workspace) => {
        BLWorkspace = workspace;
    };

    const loadWorkspaceFile = async (path: string) => {
        console.log('-- Blockly: Setting state --');
        if (path === '') {
            BLWorkspace.clear();
        } else {
            try {
                const response = await fetch(path);
                const text = await response.text();
                loadWorkspaceState(JSON.parse(text));
                // Center the workspace after loading
                if (
                    'scrollCenter' in BLWorkspace &&
                    typeof (BLWorkspace as Blockly.WorkspaceSvg).scrollCenter === 'function'
                ) {
                    (BLWorkspace as Blockly.WorkspaceSvg).scrollCenter();
                }
            } catch (error) {
                console.error('Error fetching the file: ', error);
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
