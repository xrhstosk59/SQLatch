import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from '../common/BaseModal';
import {
    createStudentAnswerExport,
    downloadStudentAnswerExport,
    StudentAnswerExportFormat,
} from '../../utils/studentAnswerExport';

export interface StudentAnswerExportContext {
    exerciseTitle: string;
    sqlQuery: string;
    workspaceState?: object | null;
    allowTeamSubmission?: boolean;
    validationPassed?: boolean;
}

interface StudentAnswerExportModalProps {
    show: boolean;
    onHide: () => void;
    output: Record<string, unknown>[];
    exportContext: StudentAnswerExportContext;
}

export default function StudentAnswerExportModal({
    show,
    onHide,
    output,
    exportContext,
}: StudentAnswerExportModalProps) {
    const [studentNameOrTeam, setStudentNameOrTeam] = useState('');
    const [studentComment, setStudentComment] = useState('');
    const studentIdentityLabel = exportContext.allowTeamSubmission
        ? 'Ονοματεπώνυμο ή ομάδα'
        : 'Ονοματεπώνυμο';

    const handleDownload = (format: StudentAnswerExportFormat) => {
        const payload = createStudentAnswerExport({
            ...exportContext,
            executionResult: output,
            studentNameOrTeam,
            studentComment,
        });

        downloadStudentAnswerExport(payload, format);
        onHide();
    };

    const footer = (
        <>
            <Button variant="outline-secondary" onClick={onHide}>
                Άκυρο
            </Button>
            <Button variant="outline-primary" onClick={() => handleDownload('json')}>
                <i className="bi bi-filetype-json"></i> Λήψη JSON
            </Button>
            <Button variant="success" onClick={() => handleDownload('docx')}>
                <i className="bi bi-file-earmark-word"></i> Λήψη DOCX
            </Button>
        </>
    );

    return (
        <BaseModal
            show={show}
            onHide={onHide}
            title="Export απάντησης"
            size="lg"
            footer={footer}
            fullscreenMobile={true}
        >
            <Form>
                <Form.Group className="mb-3" controlId="studentNameOrTeam">
                    <Form.Label>{studentIdentityLabel}</Form.Label>
                    <Form.Control
                        value={studentNameOrTeam}
                        onChange={(event) => setStudentNameOrTeam(event.target.value)}
                        placeholder="Προαιρετικό"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentComment">
                    <Form.Label>Σχόλιο μαθητή</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={studentComment}
                        onChange={(event) => setStudentComment(event.target.value)}
                        placeholder="Γράψε ένα σύντομο σχόλιο για τη λύση σου"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exportSqlPreview">
                    <Form.Label>SQL query</Form.Label>
                    <Form.Control as="textarea" rows={4} value={exportContext.sqlQuery} readOnly />
                </Form.Group>
            </Form>
        </BaseModal>
    );
}
