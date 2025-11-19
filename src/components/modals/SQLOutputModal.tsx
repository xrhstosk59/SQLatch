import { memo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import BaseModal from '../common/BaseModal';
import { exportAsCSV, exportAsJSON, copyResultsToClipboard } from '../../utils/exportResults';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface SQLOutputModalProps {
    show: boolean;
    onHide: () => void;
    output: Record<string, unknown>[];
}

function SQLOutputModal({ show, onHide, output }: SQLOutputModalProps) {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleExportCSV = () => {
        exportAsCSV(output);
    };

    const handleExportJSON = () => {
        exportAsJSON(output);
    };

    const handleCopy = async () => {
        try {
            await copyResultsToClipboard(output);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            alert('Αποτυχία αντιγραφής στο clipboard');
            console.error('Copy error:', error);
        }
    };

    const footer = (
        <>
            <Dropdown as={ButtonGroup}>
                <Button variant="primary" onClick={handleCopy} disabled={output.length === 0}>
                    <i className={`bi bi-${copySuccess ? 'check-lg' : 'clipboard'}`}></i>{' '}
                    {copySuccess ? 'Αντιγράφηκε!' : 'Αντιγραφή'}
                </Button>

                <Dropdown.Toggle
                    split
                    variant="primary"
                    id="dropdown-export"
                    disabled={output.length === 0}
                />

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleExportCSV}>
                        <i className="bi bi-filetype-csv"></i> Εξαγωγή ως CSV
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleExportJSON}>
                        <i className="bi bi-filetype-json"></i> Εξαγωγή ως JSON
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="secondary" onClick={onHide}>
                Κλείσιμο
            </Button>
        </>
    );

    return (
        <BaseModal
            show={show}
            onHide={onHide}
            title="Έξοδος"
            size="lg"
            footer={footer}
            fullscreenMobile={true}
        >
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        {output[0] != null &&
                            Object.keys(output[0]).map((column, colIndex) => (
                                <th key={colIndex}>{column}</th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {output[0] != null &&
                        output.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td key={rowIndex * 100}>{rowIndex}</td>
                                {Object.values(row).map((value, valueIndex) => (
                                    <td key={valueIndex}>{String(value)}</td>
                                ))}
                            </tr>
                        ))}
                </tbody>
                </Table>
            </div>
        </BaseModal>
    );
}

export default memo(SQLOutputModal);
