
import Blockly from "blockly";

import createJSON from './Blocks/create.json';
import selectJSON from './Blocks/select.json';
import whereJSON from './Blocks/where.json';
import columnJSON from './Blocks/column.json';
import toolboxJSON from './Blocks/toolbox.json';

const SQL = new Blockly.Generator("SQL");
function parentIsType (block:object , allowedTypes: string[]) {
    let parentBlock = block.parentBlock_
    if (!parentBlock) return;
    return allowedTypes.includes(parentBlock.type);
}
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
                if (parentIsType(this,["create","column"])) this.unplug()
            }
        };
        Blockly.Blocks["where"] = {
            init: function () {
                this.jsonInit(whereJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this,["select"])) { this.unplug()}
            },
        };
        Blockly.Blocks["column"] = {
            init: function () {
                this.jsonInit(columnJSON);
            },
            onchange: function (e) {
                if (this.workspace.isDragging()) return;
                if (e.type !== Blockly.Events.BLOCK_MOVE) return;
                if (!parentIsType(this,["create","column"])) { this.unplug()}
            },


        };
    };

    const initGen = () => {
        SQL["create"] = function (block) {
            let table = SQL.valueToCode(block, 'TABLE', 0);
            let columns = SQL.statementToCode(block, 'COLUMNS') || ' ';
            if (columns != ' ') columns = '(' + columns + ')';
            let code = 'CREATE TABLE ' + table + columns;
            return code;
        };
        SQL["select"] = function (block) {
            let columns = SQL.valueToCode(block, "COLUMNS", 0);
            let table = SQL.valueToCode(block, "TABLE", 0);
            let parameters = SQL.statementToCode(block, "PARAMETERS") || " ";
            let code = 'SELECT ' + columns + ' FROM ' + table + parameters;
            return code;
        };
        SQL["where"] = function (block) {
            const textValue = SQL.valueToCode(block, 'CONDITION', 0);
            let code = 'WHERE ' + textValue;
            return code;
        };
        SQL["column"] = function (block) {
            const textValue = SQL.valueToCode(block, 'COLUMN', 0);
            let type = SQL.valueToCode(block, 'TYPE', 0);
            let code = textValue + ' ' + type;
            return code;
        };
        SQL["text"] = function (block) {
            const textValue = block.getFieldValue('TEXT');
            return [textValue, 0];
        };
    };

    const getToolbox = () => {
        return toolboxJSON;
    }

    const runGen = (): string => {
        return SQL.workspaceToCode();
    }

    return {
        initBlockly,
        initGen,
        getToolbox,
        runGen
    }
}