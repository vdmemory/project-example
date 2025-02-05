import styled from '@emotion/styled';
import { colors } from '../../styles';
import { ghostButton, outlinedButton } from './variant';
import { mediumButton, smallButton } from './size';

export type VariantButton = 'outlined' | 'ghost';
export type SizeButton = 'small' | 'medium';
interface StyledButtonProps {
    variant?: VariantButton;
    size?: SizeButton;
}

const getButtonVariant = (props: StyledButtonProps) => {
    switch (props.variant) {
        case 'outlined':
            return outlinedButton;
        case 'ghost':
            return ghostButton;
        default:
            return outlinedButton;
    }
};

const getButtonSize = (props: StyledButtonProps) => {
    switch (props.size) {
        case 'small':
            return smallButton;
        case 'medium':
            return mediumButton;
        default:
            return mediumButton;
    }
};

export const StyledButtonRound = styled.button<StyledButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    transition: all 200ms ease;
    background: none;
    border: none;
    padding: 5px;
    outline: none;

    svg {
        transition: all 200ms ease;
        transform: rotate(45deg);
        line {
            stroke: ${colors.primary.primary600};
        }
    }

    &:hover {
        background-color: ${colors.primary.primary500};
        svg {
            transform: rotate(225deg);
            line {
                stroke: ${colors.grey.grey900};
            }
        }
    }

    &:active {
        background-color: ${colors.primary.primary100};
        svg line {
            stroke: ${colors.grey.grey900};
        }
    }

    &:focus {
        background-color: ${colors.primary.primary100};
        svg line {
            stroke: ${colors.primary.primary600};
        }
    }

    &:disabled {
        cursor: not-allowed;
        svg {
            transform: rotate(45deg);
            line {
                stroke: ${colors.grey.grey200};
            }
        }
    }

    ${getButtonVariant};
    ${getButtonSize};
`;
