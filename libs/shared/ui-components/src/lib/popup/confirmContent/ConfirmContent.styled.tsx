import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css, CSSObject } from '@emotion/react';
import { colors, mixinTypography } from '@breef/ui-kit';

interface ConfirmContentProps {
    textInformationStyle?: CSSObject;
    titleStyle?: CSSObject;
    descriptionStyle?: CSSObject;
    newDesign?: boolean;
    isRoundedButtons: boolean;
}

const newDesignStyle = css`
    display: flex;
    flex-direction: column;

    .text-information {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        padding: 24px;

        .title {
            ${mixinTypography.text.tMd.textMdMedium}
            color: ${colors.grey.grey900};

            text-transform: none;
            margin-bottom: 13px;
            margin-top: 0;
            white-space: pre-line;
            text-align: center;

            display: flex;
            align-items: flex-start;
            gap: 10px;

            svg {
                width: 24px;
                height: 24px;
            }
        }

        .description {
            ${mixinTypography.text.tMd.textMdRegular}
            color: ${colors.grey.grey900};

            margin-top: 0;
            white-space: pre-line;
            margin-bottom: 0;
            text-align: left;
        }
    }

    .buttons-wrapper {
        display: flex;
        border-top: none;
        padding: 0 24px 24px;
        width: 100%;
        gap: 8px;
        justify-content: flex-end;

        button {
            height: 42px;
            width: auto;

            :hover {
                opacity: 0.7;
            }

            svg {
                display: none;
            }

            ${mixinTypography.text.tSmall.textSmallRegular}
            text-transform: none;
            padding: 0 12px;
            margin: 0;

            transition: opacity 0.3s ease-in-out;
        }

        button:first-of-type {
            border-right: none;

            background-color: ${colors.white};
            color: ${colors.grey.grey900};
            border: 1px solid ${colors.grey.grey900};

            :hover {
                background-color: ${colors.white};
                color: ${colors.grey.grey900};
            }
        }

        button.error {
            background-color: ${colors.error.error100};
            color: ${colors.error.error900};
            border: 1px solid ${colors.error.error900};
        }
        button.success {
            background-color: ${colors.success.success100};
            color: ${colors.success.success900};
            border: 1px solid ${colors.success.success900};
        }

        @media (${mediaScreen.tablet}) {
            flex-direction: row;
        }
    }
`;

export const StyledConfirmContent = styled.div<ConfirmContentProps>`
    display: flex;
    flex-direction: column;

    .text-information {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 30px;

        .title {
            font-weight: normal;
            text-transform: uppercase;
            font-size: 48px;
            margin-bottom: 20px;

            ${({ titleStyle }) => (titleStyle ? css(titleStyle) : '')};
        }

        .description {
            margin-top: 0;
            font-weight: normal;
            font-size: 24px;

            ${({ descriptionStyle }) =>
                descriptionStyle ? css(descriptionStyle) : ''};
        }

        ${({ textInformationStyle }) =>
            textInformationStyle ? css(textInformationStyle) : ''};

        @media (${mediaScreen.tablet}) {
            padding: 45px 15px 20px;
            .title {
                font-weight: 450;
                font-size: 32px;
                letter-spacing: 0.002em;
            }
            .description {
                font-size: 22px;
                line-height: 120%;
                letter-spacing: 0.015em;
            }
        }
    }

    .buttons-wrapper {
        display: flex;
        border-top: 1px solid ${colors.black};

        button:first-of-type {
            border-right: 1px solid ${colors.black};
        }

        @media (${mediaScreen.tablet}) {
            flex-direction: column;
            > button {
                text-transform: capitalize;
            }
            button:first-of-type {
                border-right: none;
            }
        }
    }

    ${({ newDesign }) => (newDesign ? newDesignStyle : '')}

    button {
        border-radius: ${({ isRoundedButtons }: ConfirmContentProps) =>
            isRoundedButtons ? '4px' : 0};
    }
`;
