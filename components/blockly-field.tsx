import styles from '../styles/blockly.module.css';

import React from 'react';
import { useEffect, useRef } from 'react';
import Blockly from "blockly";


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

    const SQL = new Blockly.Generator("SQL");
    SQL["select"] = function (block) {
        var columns = SQL.valueToCode(block, "COLUMNS", 0);
        console.log(columns);
        var table = SQL.valueToCode(block, "TABLE", 0);
        console.log(table);
        var code = "SELECT " + columns + " FROM " + table;
        console.log(code);
        return code;
    };
    SQL["text"] = function (block) {
        const textValue = block.getFieldValue('TEXT');
        return [textValue, 0];
    };


    const generateCode = () => {
        var code = SQL.workspaceToCode(
            primaryWorkspace.current
        );
        console.log(code);
    }

    useEffect(() => {
        primaryWorkspace.current = Blockly.inject(blocklyDiv.current, { toolbox: toolbox });
        primaryWorkspace.current.addChangeListener(generateCode);
    }, [primaryWorkspace, toolbox, blocklyDiv]);



    return (
        <div className={styles.container}>
            <div className={styles.container_blockly} ref={blocklyDiv} id="blocklyDiv" />
        </div>
    )
}