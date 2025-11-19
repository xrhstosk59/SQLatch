import { ReactNode, useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export interface BaseModalProps {
    show: boolean;
    onHide: () => void;
    title: string;
    children: ReactNode;
    size?: 'sm' | 'lg' | 'xl';
    centered?: boolean;
    footer?: ReactNode;
    closeButton?: boolean;
    ariaLabel?: string;
    fullscreenMobile?: boolean; // Use fullscreen on mobile
}

/**
 * Reusable base modal component
 * Provides consistent styling and behavior for all modals in the application
 * Includes accessibility features: focus management, ARIA labels, keyboard support
 */
export default function BaseModal({
    show,
    onHide,
    title,
    children,
    size = 'lg',
    centered = true,
    footer,
    closeButton = true,
    ariaLabel,
    fullscreenMobile = false,
}: BaseModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 576);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Focus management: focus modal when it opens
    useEffect(() => {
        if (show && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                (focusableElements[0] as HTMLElement).focus();
            }
        }
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size}
            centered={centered}
            fullscreen={fullscreenMobile && isMobile ? true : undefined}
            aria-labelledby="modal-title"
            aria-describedby="modal-body"
            aria-label={ariaLabel || title}
            keyboard={true}
            backdrop="static"
        >
            <div ref={modalRef}>
                <Modal.Header closeButton={closeButton}>
                    <Modal.Title id="modal-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body">{children}</Modal.Body>
                {footer && <Modal.Footer>{footer}</Modal.Footer>}
            </div>
        </Modal>
    );
}

/**
 * Helper component for creating modal footers with action buttons
 */
interface ModalFooterActionsProps {
    onCancel?: () => void;
    onConfirm?: () => void;
    cancelText?: string;
    confirmText?: string;
    confirmVariant?: string;
    confirmDisabled?: boolean;
}

export function ModalFooterActions({
    onCancel,
    onConfirm,
    cancelText = 'Ακύρωση',
    confirmText = 'OK',
    confirmVariant = 'primary',
    confirmDisabled = false,
}: ModalFooterActionsProps) {
    return (
        <>
            {onCancel && (
                <Button variant="secondary" onClick={onCancel}>
                    {cancelText}
                </Button>
            )}
            {onConfirm && (
                <Button variant={confirmVariant} onClick={onConfirm} disabled={confirmDisabled}>
                    {confirmText}
                </Button>
            )}
        </>
    );
}
