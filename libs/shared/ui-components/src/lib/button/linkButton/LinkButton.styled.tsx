import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledLinkButtonProps {
    line?: boolean;
    size: 'big' | 'default';
    typeView: 'default' | 'inner';
}

export const StyledLinkButton = styled.button`
    font-size: 18px;
    color: ${colors.mainOrange};
    border: none;
    box-shadow: none;
    background: none;
    text-decoration: ${({ line = true }: StyledLinkButtonProps) =>
        line ? 'underline' : 'none'};
    line-height: 30px;
    margin-top: 0;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    transition: all 200ms ease;

    :hover,
    :active {
        text-decoration: underline;

        :disabled {
            text-decoration: none;
        }
    }

    :disabled {
        color: ${colors.strokeGray};
        text-decoration: none;
    }

    svg {
        min-width: 20px;
        width: 20px;
        margin-right: 13px;
        height: 20px;

        line {
            stroke: ${colors.mainOrange};
        }
    }

    ${({ size }: StyledLinkButtonProps) =>
        size === 'big' &&
        css`
            font-size: 24px;
            svg {
                min-width: 38px;
                width: 38px;
                height: 38px;
            }
        `}
    ${({ typeView }: StyledLinkButtonProps) =>
        typeView === 'inner' &&
        css`
            outline: 1px solid ${colors.mainBlack};
            justify-content: center;
            height: 80px;
        `}
`;
