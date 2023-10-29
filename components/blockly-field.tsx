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
        kind: "flyoutToolbox",
        contents: [
            {
                kind: "block",
                type: "text",
            },
            {
                kind: "block",
                type: "select",
            },
            {
                kind: "block",
                type: "where",
            }
        ],
    };
    let primaryWorkspace = useRef(null);

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

    SQL["select"] = function (block) {
        var columns = SQL.valueToCode(block, "COLUMNS", 0);
        var table = SQL.valueToCode(block, "TABLE", 0);
        var parameters = SQL.statementToCode(block, "PARAMETERS") || " ";
        var code = 'SELECT ' + columns + ' FROM ' + table + parameters + ';';
        return code;
    };
    SQL["where"] = function (block) {
        const textValue = SQL.valueToCode(block, 'CONDITION', 0);
        var code = 'WHERE ' + textValue;
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