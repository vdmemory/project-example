import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

interface StyledChipButtonProps {
    icon: boolean;
    action: 'remove' | 'add';
    isDisabled: boolean;
}

export const StyledChipButton = styled.div<StyledChipButtonProps>`
    border: 1px solid ${colors.grey.grey900};
    border-radius: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ icon }) => (icon ? '0 35px 0 20px' : '0 20px')};
    background-color: ${({ action }) =>
        action === 'remove' ? ' #f9f7f3;' : '#F1EAFB'};
    font-size: 14px;
    color: ${colors.primary.primary500};
    position: relative;
    cursor: pointer;

    opacity: ${({ isDisabled }) => (isDisabled ? '0.5' : '1')};

    svg {
        width: 30px;
        position: absolute;
        right: 0;
        line {
            stroke: ${colors.primary.primary500};
        }
    }

    svg.plus-icon {
        width: 20px;
        height: 20px;
        right: 5px;
    }

    :hover {
        background-color: ${colors.black};
        color: ${colors.white};
        svg line {
            stroke: ${colors.white};
        }

        cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
    }
`;
