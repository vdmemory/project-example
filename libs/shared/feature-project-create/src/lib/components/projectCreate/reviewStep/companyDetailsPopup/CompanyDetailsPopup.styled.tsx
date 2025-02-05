import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

export const popupGlobalStyles = css`
    body .modal-overlay {
        background-color: rgb(249 247 243 / 89%) !important;
        backdrop-filter: unset !important;

        @media screen and (max-width: 512px) {
            padding: 20px !important;
            background-color: rgb(249 247 243) !important;
        }
    }
`;

export const getPopupStylePreset = (isMobile?: boolean) => {
    return {
        overflow: !isMobile ? 'visible' : 'auto',
        maxWidth: '788px',
        minWidth: '320px',
        maxHeight: '-webkit-fill-available',
        width: '100%',
        borderRadius: '4px',
        boxShadow: isMobile
            ? '0px 4px 8px 0 rgba(0, 0, 0, 0.15)'
            : '0px 20px 28px 0 rgba(47, 57, 65, 0.35)',
        border: 'none',
    } as React.CSSProperties;
};

interface StyledCompanyDetailsPopupProps {
    justifyButtons?: boolean;
}

export const StyledCompanyDetailsPopup = styled.div<StyledCompanyDetailsPopupProps>`
    display: flex;
    flex-direction: column;

    margin-top: 0;
    margin-bottom: 0;

    @media screen and (max-width: 768px) {
        width: 100%;
    }

    .form-header {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 1;
        margin-bottom: 20px;

        @media screen and (max-width: 512px) {
            margin-bottom: 20px;
        }

        .group {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 105px;
            padding: 0 64px;

            @media screen and (max-width: 700px) {
                padding: 0 25px;
            }

            @media screen and (max-width: 512px) {
                margin-top: 20px;
                padding: 0 20px;
            }
        }

        .title {
            font-size: 36px;
            font-weight: normal;
            line-height: 43px;
            letter-spacing: -0.8px;
            margin: 0 0 9px;
            color: ${colors.grey.grey900};
            white-space: pre-wrap;
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.grey.grey900};

            @media screen and (max-width: 512px) {
                font-size: 28px;
                line-height: 34px;
                margin: 0 0 12px;
            }
        }

        .subtitle {
            margin: 0;
            ${mixinTypography.text.tLg.textLgMedium};
            color: ${colors.grey.grey600};

            @media screen and (max-width: 512px) {
                font-size: 14px;
                line-height: 18px;
            }
        }

        .divider {
            width: 100%;
            height: 1px;
            background-color: #e0dedb;
            margin: 14px 0 0;
            padding: 0 64px;

            @media screen and (max-width: 700px) {
                padding: 0 25px;
            }

            @media screen and (max-width: 512px) {
                padding: 0 20px;
                display: none;
            }
        }

        .close-wrapper {
            display: flex;
            width: 28px;
            height: 28px;
            border: none;
            background-color: transparent;
            position: absolute;
            top: 20px;
            right: 20px;

            @media screen and (max-width: 512px) {
                display: none;
            }

            :hover {
                opacity: 0.6;
            }

            .close-button {
                cursor: pointer;
                width: 28px;
                height: 28px;
            }
        }
    }

    .form-body {
        display: flex;
        flex-direction: column;
        position: relative;
        min-height: 440px;
        padding: 0 64px;
        gap: 20px;

        @media screen and (max-width: 700px) {
            padding: 0 25px;
        }

        @media screen and (max-width: 512px) {
            padding: 0 20px;
            min-height: auto;
        }

        .wrapper-calendly-widget {
            outline: none;
        }

        .input-wrapper {
            margin-top: 7px;

            .placeholder-icon-wrapper {
                top: 51.1%;
                left: 12.4px;
            }

            & + span {
                padding-top: 7px;
            }

            & input {
                border-radius: 2px;
                padding-top: 15px;
                letter-spacing: 0;

                ::placeholder {
                    color: #8d8d8d;
                }
            }
        }

        .textarea-wrapper {
            & textarea {
                border-radius: 2px;
                height: 137.5px;
                padding: 8px 12px;
                line-height: 17px;
                letter-spacing: 0;

                ::placeholder {
                    color: #c2c8cc;
                }
            }
        }

        label .label-text {
            color: #2f3941;
            letter-spacing: 0;
        }

        label .label-subtext {
            color: #68737d;
            padding-bottom: 6px;
            line-height: 17px;
            letter-spacing: 0;
        }

        label .count {
            padding-top: 8px;
        }
    }

    .form-footer {
        display: flex;
        justify-content: center;
        margin: 32px auto 105px;

        ${({ justifyButtons }) =>
            justifyButtons &&
            css`
                justify-content: space-between;
                align-items: center;
                margin: 32px 0 105px;

                padding: 0 64px;
            `}

        @media screen and (max-width: 700px) {
            padding: 0 25px;
        }

        @media screen and (max-width: 512px) {
            padding: 0 20px;
            margin: 32px 0;
        }

        .button-save {
            height: 40px;
            width: 100%;
            border-radius: 2px;
            border: none;
            min-width: 242px;

            ${({ justifyButtons }) =>
                justifyButtons &&
                css`
                    max-width: 242px;
                `}

            @media screen and (max-width: 512px) {
                min-width: 216px;

                ${({ justifyButtons }) =>
                    justifyButtons &&
                    css`
                        max-width: 216px;
                    `}
            }

            span.label {
                ${mixinTypography.text.tMd.textMdMedium};
                -webkit-text-stroke-width: 0.2px;
                -webkit-text-stroke-color: ${colors.white};
            }
        }

        .button-back {
            cursor: pointer;
            width: 46px;
            height: 40px;
            border-radius: 2px;
            border: none;
            background-color: transparent;

            &:hover {
                opacity: 0.6;
            }

            svg {
                transform: rotate(180deg);
                width: 16px;
                height: 14px;
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        overflow-y: hidden;
    }
`;
