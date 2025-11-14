import { Button, ButtonProps } from 'react-bootstrap';
import { ReactNode } from 'react';

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
    icon: string;
    label: string;
    iconOnly?: boolean;
}

/**
 * Reusable button component with icon support
 * Uses Bootstrap Icons class names (e.g., "bi-floppy", "bi-trash")
 */
export default function IconButton({
    icon,
    label,
    iconOnly = false,
    ...buttonProps
}: IconButtonProps) {
    return (
        <Button {...buttonProps}>
            <i className={`bi ${icon}`}></i>
            {!iconOnly && <> {label}</>}
        </Button>
    );
}

interface ActionButtonProps extends ButtonProps {
    children: ReactNode;
}

/**
 * Pre-styled button variants for common actions
 */
export function PrimaryActionButton({ children, ...props }: ActionButtonProps) {
    return (
        <Button variant="primary" {...props}>
            {children}
        </Button>
    );
}

export function DangerActionButton({ children, ...props }: ActionButtonProps) {
    return (
        <Button variant="danger" {...props}>
            {children}
        </Button>
    );
}

export function SuccessActionButton({ children, ...props }: ActionButtonProps) {
    return (
        <Button variant="success" {...props}>
            {children}
        </Button>
    );
}

export function SecondaryActionButton({ children, ...props }: ActionButtonProps) {
    return (
        <Button variant="secondary" {...props}>
            {children}
        </Button>
    );
}
