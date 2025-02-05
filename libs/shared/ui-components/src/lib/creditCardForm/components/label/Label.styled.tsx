import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

interface StyledLabelProps {
    hasInputWrapper?: boolean;
    isError?: boolean;
    isFocus?: boolean;
    isReadonly?: boolean;
    isRedesign: boolean;
}

const inputCss = css`
    padding: 14px 12px;
    border: 1px solid ${colors.grey.grey900};
`;
const inputCssRedesign = css`
    padding: 13.4px 20px;
    border: 1px solid ${colors.grey.grey900};
`;

const errorCss = css`
    border: 1px solid ${colors.error.error500};
    color: ${colors.error.error500};
    z-index: 1;
`;

const focusCss = css`
    border: 1px solid ${colors.primary.primary200};
    outline: 0;
    box-shadow: 0 0 0 3px ${colors.primary.primary100};
    z-index: 2;
`;

const readonlyCss = css`
    border: 1px solid ${colors.grey.grey400};
    > * {
        color: ${colors.grey.grey400};
    }
`;

export const StyledLabel = styled.div<StyledLabelProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    .label {
        margin: 0 0 4px;
        ${({ isRedesign }) =>
            isRedesign &&
            css`
                ${mixinTypography.text.tSmall.textSmallMedium};
                font-weight: 600;
                margin: 0 0 12px;
                line-height: 10px;
            `}
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        background-color: ${colors.white};
        ${({ hasInputWrapper, isRedesign }) =>
            hasInputWrapper && (isRedesign ? inputCssRedesign : inputCss)};
        ${({ isError }) => isError && errorCss};
        ${({ isFocus }) => isFocus && focusCss};
        ${({ isReadonly }) => isReadonly && readonlyCss};
    }

    .error {
        margin-top: 0.25rem;
        ${mixinTypography.text.tXs.textXsMedium};
        color: ${colors.error.error500};
    }
`;
