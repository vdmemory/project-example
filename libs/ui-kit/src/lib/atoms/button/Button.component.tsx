import {
    IconPlacement,
    SizeButton,
    StyledButton,
    VariantButton,
} from './Button.styled';
import { SpinnerIcon } from '../../icons';
import { ReactNode, SyntheticEvent } from 'react';

export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: VariantButton;
    size?: SizeButton;
    className?: string;
    label: string | ReactNode;
    onClick?: (e: SyntheticEvent) => void;
    isSubmitted?: boolean;
    isDisabled?: boolean;
    isUppercase?: boolean;
    icon?: ReactNode;
    iconPlacement?: IconPlacement;
    isAbsoluteIconPosition?: boolean;
}

export function Button({
    label,
    isDisabled = false,
    isSubmitted = false,
    iconPlacement = 'both',
    type = 'button',
    icon,
    onClick,
    ...rest
}: ButtonProps) {
    const isIconLeft =
        icon && (iconPlacement === 'both' || iconPlacement === 'left');
    const isIconRight =
        icon && (iconPlacement === 'both' || iconPlacement === 'right');

    return (
        <StyledButton
            {...rest}
            onClick={onClick}
            type={type}
            disabled={isDisabled || isSubmitted}
            data-testid="button-container"
        >
            <span className="label">
                {isIconLeft && (
                    <div className="icon-wrapper icon-wrapper-left">{icon}</div>
                )}
                {label}
                {isIconRight && !isSubmitted && (
                    <div className="icon-wrapper icon-wrapper-right">
                        {icon}
                    </div>
                )}
                {isSubmitted && (
                    <SpinnerIcon className="loader" data-testid="loader" />
                )}
            </span>
        </StyledButton>
    );
}

export default Button;
