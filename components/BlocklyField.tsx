import styles from '../styles/blockly.module.css';

import React from 'react';
import { useEffect, useRef } from 'react';

import Blockly from "blockly";
import { useBlockly } from '../modules/Blockly/Blockly';
import {ZoomToFitControl} from '@blockly/zoom-to-fit';
import {ContinuousToolbox,ContinuousFlyout,ContinuousMetrics} from '@blockly/continuous-toolbox';
import DarkTheme from '@blockly/theme-dark';

import Container from 'react-bootstrap/Container';

export default function BlocklyField() {
    const useBL = useBlockly();

    let primaryWorkspace = useRef(null);
    const blocklyDiv = useRef(null);

    useEffect(() => {
        useBL.initBlockly();
        useBL.initGen();
        primaryWorkspace.current = Blockly.inject(blocklyDiv.current, { 
            toolbox: useBL.getToolbox(), 
            plugins: {
                'toolbox': ContinuousToolbox,
                'flyoutsVerticalToolbox': ContinuousFlyout,
                'metricsManager': ContinuousMetrics,
            },
            theme: DarkTheme,
            zoom: {
                controls: true,
            }
        });
        useBL.setWorkspace(primaryWorkspace.current);
        const zoomToFit = new ZoomToFitControl(primaryWorkspace.current);
        zoomToFit.init();

    }, [primaryWorkspace, useBL.getToolbox(), blocklyDiv]);

    return (
        <Container>
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.container} ref={blocklyDiv} id="blocklyDiv" />
        </Container>
    )
}