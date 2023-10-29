import styles from '../styles/blockly.module.css';

import React from 'react';
import { useEffect, useRef } from 'react';
import Blockly from "blockly";

import { useBlockly } from '../modules/Blockly/Blockly';

export default function BlocklyField() {
    const useBL = useBlockly();

    let primaryWorkspace = useRef(null);
    const blocklyDiv = useRef(null);

    useEffect(() => {
        useBL.initBlockly();
        useBL.initGen();
        primaryWorkspace.current = Blockly.inject(blocklyDiv.current, { toolbox: useBL.getToolbox() });
    }, [primaryWorkspace, useBL.getToolbox(), blocklyDiv]);


    return (
        <div className={styles.container} ref={blocklyDiv} id="blocklyDiv" />
    )
}