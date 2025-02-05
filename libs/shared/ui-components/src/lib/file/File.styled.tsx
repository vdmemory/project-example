import styled from '@emotion/styled';
import { mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

interface StyledFileProps {
    isLink: boolean;
    size?: 'small';
}
export const StyledFile = styled.div<StyledFileProps>`
    display: flex;
    gap: 20px;
    align-items: center;
    cursor: ${({ isLink }: StyledFileProps) => (isLink ? 'pointer' : 'auto')};
    width: fit-content;
    max-width: 100%;

    > span {
        ${mixinTypography.text.tLg.textLgMedium};
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    svg {
        width: 40px;
        min-width: 40px;
    }

    > img {
        width: 40px;
        height: auto;
    }

    ${({ size }) =>
        size === 'small' &&
        css`
            > span {
                ${mixinTypography.text.tSmall.textSmallMedium};
            }
            svg {
                width: 34px;
                min-width: 34px;
            }
            > img {
                width: 34px;
            }
        `};
`;
