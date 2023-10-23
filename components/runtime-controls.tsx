import styles from '../styles/runtime-controls.module.css';
import { generateCodeFromWorkspace } from './blockly-field';

import { useState } from 'react';

export default function RuntimeControls() {
    const onClickRun = () => {
        console.log('Executing...');
        console.log(generateCodeFromWorkspace());
    }

    return (
        <div className={styles.container}>
            <button className={styles.run} onClick={onClickRun}>RUN</button>
        </div>
    )
}

