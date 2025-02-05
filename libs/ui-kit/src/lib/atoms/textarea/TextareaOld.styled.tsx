import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { mixinTypography } from '../../styles/mixins/typography.styled';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';

export type DirectionType = 'left' | 'right';

interface StyledTextareaProps {
    isError?: boolean;
    isWarning?: boolean;
    direction?: DirectionType;
}

const errorStyle = css`
    border-color: ${colors.error.error700};
`;

export const StyledTextareaOld = styled.div<StyledTextareaProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    position: relative;

    textarea {
        padding: 14px 20px;
        ${mixinTypography.text.tMd.textMdMedium};
        border: 1px solid ${colors.grey.grey900};
        border-radius: 4px;
        letter-spacing: 0.01em;
        text-align: ${({ direction }) => direction};
        overflow: auto;
        resize: none;

        :hover {
            background-color: ${colors.secondary.secondary200};
        }
        :active,
        :focus {
            outline: none;
            border-color: ${colors.primary.primary500};
        }
        ::placeholder {
            color: ${colors.grey.grey600};
        }
        :disabled {
            border-color: ${colors.grey.grey100};
            color: ${colors.grey.grey200};
            background-color: ${colors.grey.grey50};
            cursor: not-allowed;

            ::placeholder {
                color: ${colors.grey.grey200};
            }
        }
        :read-only {
            cursor: not-allowed;
        }

        ${({ isError }) => isError && errorStyle}
    }

    .warning-message,
    .warning-message-right,
    .error-message,
    .error-message-right {
        ${mixinTypography.text.tXs.textXsRegular};
    }

    .warning-message,
    .warning-message-right {
        color: ${colors.warning.warning500};
    }

    .error-message,
    .error-message-right {
        color: ${colors.error.error700};
    }

    .error-message,
    .warning-message {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .error-message-right,
    .warning-message-right {
        text-align: right;
    }

    .count {
        ${mixinTypography.text.tXs.textXsRegular};
        //TODO: font-family: "Helvetica Neue";
        color: ${colors.grey.grey400};
        text-align: right;
    }

    @media screen and (${mediaScreen.tablet}) {
        ${mixinTypography.mobile.text.mobileTextMd};
    }
`;
