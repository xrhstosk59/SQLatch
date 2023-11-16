
import Blockly from "blockly";

import createJSON from './Blocks/create.json';
import selectJSON from './Blocks/select.json';
import whereJSON from './Blocks/where.json';
import columnJSON from './Blocks/column.json';
import toolboxJSON from './Blocks/toolbox.json';
import constrainJSON from './Blocks/constrain.json';

const SQL = new Blockly.Generator("SQL");
function parentIsType(block: Blockly.Block, allowedTypes: string[]) {
    //@ts-ignore Google recommended way
    let parentBlock = block.parentBlock_ 
    if (!parentBlock) return;
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

    const initGen = () => {
        SQL.forBlock["create"] = function (block) {
            let table = SQL.valueToCode(block, 'TABLE', 0);
            let columns = SQL.statementToCode(block, 'COLUMNS') || ' ';
            if (columns != ' ') columns = '(' + columns + ')';
            let code = 'CREATE TABLE ' + table + columns;
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
            let code = textValue + ' ' + type+' '+ constrain;
            return code;
        };
        SQL.forBlock["text"] = function (block) {
            const textValue = block.getFieldValue('TEXT');
            return [textValue, 0];
        };
        SQL.forBlock["constrain"] = function (block) {
            const textValue = block.getFieldValue('CONSTRAIN');
            console.log(textValue);
            return [textValue, 0];
        };
        // generate code for all blocks in statements
        //@ts-ignore Google recommended way
        SQL.scrub_ = function (block, code, thisOnly) {
            const nextBlock =
                block.nextConnection && block.nextConnection.targetBlock();

            if (nextBlock && !thisOnly) {
                if (nextBlock.type == "column") {
                    return code + ',' + SQL.blockToCode(nextBlock);
                }
            }
            return code;
        };
    };

    const setWorkspace = (workspace: Blockly.Workspace) => {
        BLWorkspace = workspace;
    }

    const setWorkspaceJSON = (state: object) => {
        console.log('-- Blockly: Setting state --');
        console.log(state);
        Blockly.serialization.workspaces.load(state, BLWorkspace);
    }

    const getToolbox = () => {
        return toolboxJSON;
    }

    const getWorkspaceJSON = (): object => {
        console.log('-- Blockly: Getting state --');
        const state = Blockly.serialization.workspaces.save(BLWorkspace);
        console.log(state);
        return state;
    }

    const runGen = (): string => {
        console.log('-- Blockly: Running Generator --');
        const code: string = SQL.workspaceToCode();
        console.log(code);
        return code;
    }

    return {
        initBlockly,
        initGen,
        setWorkspace,
        setWorkspaceJSON,
        getToolbox,
        getWorkspaceJSON,
        runGen
    }
}