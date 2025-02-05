import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mixinTypography } from '@breef/ui-kit';

interface StyledFileItemProps {
    isClickable: boolean;
}
export const StyledFileItem = styled.div<StyledFileItemProps>`
    display: flex;
    gap: 8px;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    overflow: hidden;

    ${({ isClickable }) =>
        isClickable &&
        css`
            cursor: pointer;
        `};

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        ${mixinTypography.text.tSmall.textSmallMedium};
        margin: -4px 0;
    }
    > svg {
        width: 16px;
        min-width: 16px;
    }

    button {
        border: none;
        outline: none;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;

        svg {
            height: 16px;
            width: 16px;
            min-width: 16px;
            path,
            line {
                stroke: ${colors.error.error600};
            }
        }
    }
`;
