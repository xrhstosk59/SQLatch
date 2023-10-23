import styles from '../styles/blockly.module.css';

import React from 'react';
import { useEffect, useRef } from 'react';
import Blockly from "blockly";


export default function BlocklyField() {
    const blocklyDiv = useRef();
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
    let primaryWorkspace = useRef();

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
    SQL.ORDER_NONE = 0;
    SQL["select"] = function (block) {
        var columns = SQL.valueToCode(block, "COLUMNS", SQL.ORDER_NONE);
        console.log(columns);
        var table = SQL.valueToCode(block, "TABLE", SQL.ORDER_NONE);
        console.log(table);
        var code = "SELECT " + columns + " FROM " + table;
        console.log(code);
        return code;
    };
    SQL["text"] = function (block) {
        const textValue = block.getFieldValue('TEXT');
        return [textValue, SQL.ORDER_NONE];
    };


    const generateCode = () => {
        var code = SQL.workspaceToCode(
            primaryWorkspace.current
        );
        console.log(code);
    }

    useEffect(() => {
        primaryWorkspace.current = Blockly.inject(blocklyDiv.current, { toolbox: toolbox });
    }, [primaryWorkspace, toolbox, blocklyDiv]);


    return (
        <div className={styles.container}>
            <div ref={blocklyDiv} id="blocklyDiv" />
        </div>
    )
}