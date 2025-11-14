import { memo } from 'react';
import BaseModal, { ModalFooterActions } from '../common/BaseModal';

interface SQLPreviewModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    sqlCode: string;
}

function SQLPreviewModal({
    show,
    onHide,
    onConfirm,
    sqlCode,
}: SQLPreviewModalProps) {
    const footer = (
        <ModalFooterActions
            onCancel={onHide}
            onConfirm={onConfirm}
            confirmText="Εκτέλεση"
            confirmVariant="success"
            confirmDisabled={!sqlCode}
        />
    );

    return (
        <BaseModal show={show} onHide={onHide} title="Προεπισκόπηση SQL" size="lg" footer={footer}>
            <p style={{ marginBottom: '10px', color: '#666' }}>Το query που θα εκτελεστεί:</p>
            <pre
                style={{
                    background: '#f5f5f5',
                    padding: '15px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    maxHeight: '300px',
                    overflow: 'auto',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                }}
            >
                {sqlCode || 'Δεν βρέθηκαν blocks στο workspace!'}
            </pre>
        </BaseModal>
    );
}

export default memo(SQLPreviewModal);
