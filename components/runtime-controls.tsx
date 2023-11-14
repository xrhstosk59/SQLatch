import styles from '../styles/runtime-controls.module.css';
import { useBlockly } from '../modules/Blockly/Blockly';
import { useSQL } from '../modules/SQLite';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';

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
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.container}>
            <Button variant="success" onClick={onClickRun}>Εκτέλεση</Button>
        </Container>
    )
}

