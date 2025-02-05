import { CloseIcon } from '@breef/shared/assets';
import {
    SizeButton,
    StyledButtonRound,
    VariantButton,
} from './ButtonRound.styled';

export interface ButtonRoundProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: VariantButton;
    size?: SizeButton;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export function ButtonRound({
    type = 'button',
    variant = 'outlined',
    size = 'medium',
    ...rest
}: ButtonRoundProps) {
    return (
        <StyledButtonRound
            data-testid="button-round"
            {...rest}
            type={type}
            variant={variant}
            size={size}
        >
            <CloseIcon />
        </StyledButtonRound>
    );
}
