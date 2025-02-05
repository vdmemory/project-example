import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const popupGlobalStyles = css`
    body .modal-overlay {
        background-color: rgb(249 247 243 / 89%) !important;
        backdrop-filter: unset !important;

        @media screen and (max-width: 512px) {
            padding: 20px !important;
            background-color: rgb(249 247 243) !important;
        }
    }

    @media screen and (max-width: 512px) {
        body .popup-wrapper {
            padding: 95px 20px 20px !important;
            align-items: baseline !important;
        }
    }
`;

export const getPopupStylePreset = (isMobile?: boolean, height?: string) => {
    return {
        height: 'auto',
        maxHeight: isMobile ? '-webkit-fill-available' : 'auto',
        minHeight: isMobile ? 'auto' : 'unset',
        padding: isMobile ? '28px 25px 22px' : '40px 56px',
        backgroundColor: colors.white,
        margin: '0',
        minWidth: isMobile ? '-webkit-fill-available' : '743px',
        maxWidth: isMobile ? '-webkit-fill-available' : '743px',
        border: isMobile ? 'none' : 'none',
        borderRadius: '4px',
        boxShadow: '0px 20px 28px rgba(47, 57, 65, 0.35)',
    };
};

export const StyledPreviousWorkForm = styled.div`
    .form-header {
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 36px;
            font-weight: normal;
            line-height: 43px;
            letter-spacing: 0em;
            margin: 12px 0;
            color: ${colors.grey.grey900};
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.grey.grey900};

            @media screen and (max-width: 512px) {
                font-size: 28px;
                line-height: 34px;
            }
        }

        .description {
            margin: 0;
            margin-bottom: 8px;
            ${mixinTypography.text.tLg.textLgMedium};
            color: ${colors.grey.grey700};

            @media screen and (max-width: 512px) {
                font-size: 14px;
                line-height: 18px;
            }
        }

        .close-wrapper {
            display: flex;
            width: 38px;
            height: 38px;
            border: none;
            background-color: transparent;
            position: absolute;
            top: 10px;
            right: 10px;

            :hover {
                opacity: 0.6;
            }

            .close-button {
                cursor: pointer;
                width: 38px;
                height: 38px;
            }
        }
    }

    .form-body {
        display: flex;
        flex-direction: row;
        margin: 26px 0;
        gap: 20px;
        flex-wrap: wrap;

        @media screen and (max-width: 1024px) {
            justify-content: center;
            margin: 20px 0;
        }

        .select-btn {
            width: 100%;
            max-width: 303px;
            border-radius: 2px;
            border: 1px solid ${colors.grey.grey100};
            padding: 16px;
            min-height: 80px;

            @media screen and (max-width: 512px) {
                max-width: 100%;
                min-height: 78px;
                border: 1px solid ${colors.grey.grey100};
                background-color: rgb(211 211 211 / 20%);
            }

            :hover {
                border: 1px solid ${colors.grey.grey100};

                background-color: rgb(211 211 211 / 20%);
                color: ${colors.grey.grey900};
            }

            label .checkbox {
                border: 1px solid ${colors.grey.grey100};

                &.checkbox-selected {
                    border: none;
                }
            }

            .group {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .label {
                ${mixinTypography.text.tLg.textLgMedium};
                font-size: 14px;
                line-height: 16px;
                text-transform: none;
                font-weight: normal;
                color: ${colors.black};
            }

            .description {
                ${mixinTypography.text.tLg.textLgMedium};
                font-size: 12px;
                line-height: 14px;
                text-transform: none;
                color: ${colors.grey.grey700};
            }
        }
    }

    .form-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 0;

        .button-save {
            height: 48px;
            width: 100%;
            border-radius: 2px;
            border: none;

            @media screen and (max-width: 512px) {
                height: 40px;
                width: 100%;
                border-radius: 2px;
            }

            span.label {
                ${mixinTypography.text.tMd.textMdMedium};
            }
        }
    }
`;
