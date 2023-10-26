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
        ],
    };
    let primaryWorkspace = useRef(null);

    Blockly.Blocks["select"] = {
        init: function () {
            this.jsonInit({
                type: "select",
                message0: "select %1 from %2",
                args0: [
                    {
                        type: "input_value",
                        name: "COLUMNS",
                    },
                    {
                        type: "input_value",
                        name: "TABLE",
                    },
                ],
                inputsInline: true,
                colour: 230,
                tooltip: "",
                helpUrl: "",
            });
        },
    };

    SQL["select"] = function (block) {
        var columns = SQL.valueToCode(block, "COLUMNS", 0);
        var table = SQL.valueToCode(block, "TABLE", 0);
        var code = "SELECT " + columns + " FROM " + table;
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