import Blockly from "blockly";

import createJSON from './Blocks/create.json';
import selectJSON from './Blocks/select.json';
import whereJSON from './Blocks/where.json';
import columnJSON from './Blocks/column.json';
import toolboxJSON from './Blocks/toolbox.json';
import constrainJSON from './Blocks/constrain.json';
import insertJSON from './Blocks/insert.json';
import valueJSON from './Blocks/value.json';
import columnNameJSON from './Blocks/column_name.json'

const SQL = new Blockly.Generator("SQL");
function parentIsType(block: Blockly.Block, allowedTypes: string[]) {
    //@ts-ignore Google recommended way
    let parentBlock = block.parentBlock_
    if (!parentBlock) return false;
    return allowedTypes.includes(parentBlock.type);
}

let BLWorkspace: Blockly.Workspace;

export const useBlockly = () => {

    const initBlockly = () => {
        Blockly.Blocks["create"] = {
            init: function () {
                this.jsonInit(createJSON);
            },
        };
        Blockly.Blocks["select"] = {
            init: function () {
                this.jsonInit(selectJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (parentIsType(this, ["create", "column"])) this.unplug()
            }
        };
        Blockly.Blocks["where"] = {
            init: function () {
                this.jsonInit(whereJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ["select"])) { this.unplug() }
            },
        };
        Blockly.Blocks["column"] = {
            init: function () {
                this.jsonInit(columnJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ["create", "column"])) { this.unplug() }
            },
        };
        Blockly.Blocks["constrain"] = {
            init: function () {
                this.jsonInit(constrainJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ["column"])) { this.unplug() }
            },
        };
        Blockly.Blocks["insert"] = {
            init: function () {
                this.jsonInit(insertJSON);
            }
        };
        Blockly.Blocks["value"] = {
            init: function () {
                this.jsonInit(valueJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ["insert", "value"])) { this.unplug() }
            },
        };
        Blockly.Blocks["column_name"] = {
            init: function () {
                this.jsonInit(columnNameJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this, ["insert", "column_name"])) { this.unplug() }
            },
        };
    };

    const initGen = () => {
        SQL.forBlock["create"] = function (block) {
            let table = SQL.valueToCode(block, 'TABLE', 0);
            let columns = SQL.statementToCode(block, 'COLUMNS') || ' ';
            if (columns != ' ') columns = '(' + columns + ')';
            let code = 'CREATE TABLE ' + table + columns;
            return code + ';';
        };
        SQL.forBlock["insert"] = function (block) {
            let table = SQL.valueToCode(block, 'TABLE', 0);
            let columns = SQL.statementToCode(block, 'COLUMNS') || ' ';
            let values = SQL.statementToCode(block, 'VALUES') || ' ';
            if (columns != ' ') columns = '(' + columns + ')';
            if (values != ' ') values = '(' + values + ')';
            let code = 'INSERT INTO ' + table + columns + ' VALUES ' + values;
            return code + ';';
        };
        SQL.forBlock["select"] = function (block) {
            let columns = SQL.valueToCode(block, "COLUMNS", 0);
            let table = SQL.valueToCode(block, "TABLE", 0);
            let parameters = SQL.statementToCode(block, "PARAMETERS") || " ";
            let code = 'SELECT ' + columns + ' FROM ' + table + parameters;
            return code;
        };
        SQL.forBlock["where"] = function (block) {
            const textValue = SQL.valueToCode(block, 'CONDITION', 0);
            let code = 'WHERE ' + textValue;
            return code;
        };
        SQL.forBlock["column"] = function (block) {
            const textValue = SQL.valueToCode(block, 'COLUMN', 0);
            let type = block.getFieldValue('TYPE');
            const constrain = SQL.valueToCode(block, 'CONSTRAIN', 0);
            let code = textValue + ' ' + type + ' ' + constrain;
            return code;
        };
        SQL.forBlock["text"] = function (block) {
            const textValue = block.getFieldValue('TEXT');
            return [textValue, 0];
        };
        SQL.forBlock["value"] = function (block) {
            const textValue = SQL.valueToCode(block, "VALUE", 0);
            return textValue;
        };
        SQL.forBlock["column_name"] = function (block) {
            const textValue = SQL.valueToCode(block, "COLUMN", 0);
            return textValue;
        };
        SQL.forBlock["constrain"] = function (block) {
            const textValue = block.getFieldValue('CONSTR');

            return [textValue, 0];
        };
        // generate code for all blocks in statements
        //@ts-ignore Google recommended way
        SQL.scrub_ = function (block, code, thisOnly) {
            const nextBlock =
                block.nextConnection && block.nextConnection.targetBlock();

            if (nextBlock && !thisOnly) {
                if (nextBlock.type == "column" || nextBlock.type == "column_name" || nextBlock.type == "value") {
                    return code + ',' + SQL.blockToCode(nextBlock);
                }
            }
            return code;
        };
    };

    const setWorkspace = (workspace: Blockly.Workspace) => {
        BLWorkspace = workspace;
    }

    const loadWorkspaceFile = async (path: string) => {
        console.log('-- Blockly: Setting state --');
        if (path == '') {
            BLWorkspace.clear();
        }
        else {
            try {
                const response = await fetch(path);
                const text = await response.text();
                loadWorkspaceState(JSON.parse(text));
            } catch (error) {
                console.error('Error fetching the file: ', error);
                BLWorkspace.clear();
            }
        }
    }

    const loadWorkspaceState = (state: object) => {
        console.log('-- Blockly: Setting state --');
        Blockly.serialization.workspaces.load(state, BLWorkspace);
    }

    const getToolbox = () => {
        return toolboxJSON;
    }

    const getWorkspaceState = (): object => {
        console.log('-- Blockly: Getting state --');
        const state = Blockly.serialization.workspaces.save(BLWorkspace);
        return state;
    }

    const runGen = (): string => {
        console.log('-- Blockly: Running Generator --');
        const code: string = SQL.workspaceToCode();
        return code;
    }

    return {
        initBlockly,
        initGen,
        setWorkspace,
        loadWorkspaceFile,
        loadWorkspaceState,
        getToolbox,
        getWorkspaceState,
        runGen
    }
}