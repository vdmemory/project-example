import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledTipProps {
    linesCount?: number;
}
export const StyledTip = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    > p,
    > h4 {
        margin: 0;
    }

    > h4 {
        ${mixinTypography.label.lS.labelSMedium};
        color: ${colors.grey.grey500};
    }

    > p {
        font-size: 18px;
        line-height: 28.8px;
        letter-spacing: 0.02em;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;

        ${({ linesCount }: StyledTipProps) =>
            !!linesCount &&
            css`
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: ${linesCount};
            `}
    }

    @media screen and (${mediaScreen.tablet}) {
        gap: 12px;

        > h4 {
            ${mixinTypography.mobile.label.mobileLabelXs};
        }
    }
`;
