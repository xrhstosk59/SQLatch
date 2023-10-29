import styles from '../styles/runtime-controls.module.css';
import { useBlockly } from '../modules/Blockly/Blockly';
import { useSQL } from '../modules/SQLite';
import Button from 'react-bootstrap/Button'

export default function RuntimeControls() {
    const useDB = useSQL();
    const useBL = useBlockly();

    const onClickRun = () => {
        console.log('Executing...');
        const blocklyOut: string = useBL.runGen();
        console.log(blocklyOut);
        useDB.queryDB(blocklyOut);
    }

    return (
        <div className={styles.container}>
            <Button variant="success" onClick={onClickRun}>RUN</Button>
        </div>
    )
}

