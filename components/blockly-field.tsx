import styles from '../styles/blockly.module.css';

import React from 'react';
import { useEffect, useRef } from 'react';
import Blockly from "blockly";

const SQL = new Blockly.Generator("SQL");

export function generateCodeFromWorkspace(): string {
    return SQL.workspaceToCode();
}

export default function BlocklyField() {
    const blocklyDiv = useRef(null);
    const toolbox = {
        "kind": "categoryToolbox",
        "contents": [
            {
                kind: "category",
                name: "Main",
                contents: [
                    {
                        kind: "block",
                        type: "create",
                    },
                    {
                        kind: "block",
                        type: "select",
                    }
                ],
            },
            {
                kind: "category",
                name: "Input",
                contents: [
                    {
                        kind: "block",
                        type: "text",
                    }
                ],
            },
            {
                kind: "category",
                name: "Logic",
                contents: [
                    {
                        kind: "block",
                        type: "column",
                    },                
                    {
                        kind: "block",
                        type: "where",
                    }
                ],
            }
        ]
    };
    let primaryWorkspace = useRef(null);

    Blockly.Blocks["create"] = {
        init: function () {
            this.jsonInit({
                "type": "create",
                "message0": "CREATE TABLE %1 %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "TABLE",
                        "check": "String"
                    },
                    {
                        "type": "input_statement",
                        "name": "COLUMNS",
                    }
                ],

                "inputsInline": false,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
        },
    };

    Blockly.Blocks["column"] = {
        init: function () {
            this.jsonInit({
                "type": "col",
                "message0": "COLUMN: %1 TYPE: %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "COLUMN",
                        "check": "String"
                    },
                    {
                        "type": "input_value",
                        "name": "TYPE",
                        "check": "String"
                    }
                ],

                "previousStatement": null,
                "inputsInline": true,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
        },
    };

    Blockly.Blocks["select"] = {
        init: function () {
            this.jsonInit({
                "type": "select",
                "message0": "SELECT %1 FROM %2 %3",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "COLUMNS",
                        "check": "String"
                    },
                    {
                        "type": "input_value",
                        "name": "TABLE",
                        "check": "String"
                    },
                    {
                        "type": "input_statement",
                        "name": "PARAMETERS",
                    }
                ],

                "previousStatement": null,
                "inputsInline": false,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
        },
    };

    Blockly.Blocks["where"] = {
        init: function () {
            this.jsonInit({
                "type": "where",
                "message0": "WHERE %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "CONDITION",
                        "check": "String"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
        },
    };

    SQL["create"] = function (block) {
        let table = SQL.valueToCode(block, 'TABLE', 0);
        let columns = SQL.statementToCode(block, 'COLUMNS') || ' ';
        if (columns != ' ') {
            columns = '(' + columns + ')';
        }

        let code = 'CREATE TABLE ' + table + columns;
        return code;
    };
    SQL["column"] = function (block) {
        const textValue = SQL.valueToCode(block, 'COLUMN', 0);
        let type = SQL.valueToCode(block, 'TYPE', 0);
        let code = textValue + ' ' + type;
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
    SQL["text"] = function (block) {
        const textValue = block.getFieldValue('TEXT');
        return [textValue, 0];
    };

    useEffect(() => {
        primaryWorkspace.current = Blockly.inject(blocklyDiv.current, { toolbox: toolbox });
    }, [primaryWorkspace, toolbox, blocklyDiv]);



    return (
        <div className={styles.container} ref={blocklyDiv} id="blocklyDiv" />
    )
}