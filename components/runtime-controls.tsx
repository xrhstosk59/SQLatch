import styles from '../styles/runtime-controls.module.css';
import { generateCodeFromWorkspace } from './blockly-field';
import { useSQL } from '../modules/SQLite';

export default function RuntimeControls() {
    const useDB = useSQL();

    const onClickRun = () => {
        console.log('Executing...');
        const blocklyOut: string = generateCodeFromWorkspace();
        console.log(blocklyOut);
        useDB.queryDB(blocklyOut);
    }

    return (
        <div className={styles.container}>
            <button className={styles.run} onClick={onClickRun}>RUN</button>
        </div>
    )
}

