import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

export default function SQLOutputModal({ show, onHide, error, output }) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Έξοδος
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span style={{ fontWeight: 'bold', color: 'red' }}> {error != '' ? error : <></>} </span>
                {error == '' ?  <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            {output[0] != null && Object.keys(output[0]).map((column, colIndex) => <th key={colIndex}>{column}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {output[0] != null && output.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td key={rowIndex * 100}>
                                    {rowIndex}
                                </td>
                                {Object.values(row).map((value: string, valueIndex) => <td key={valueIndex}>{value}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </Table>:''}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}