import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const navGlobalStyles = css`
    body .nav-control {
        display: none;

        @media screen and (max-width: 512px) {
            display: flex;
            z-index: 9991;

            .left-section > a.link-logo {
                padding: 0 16px;

                svg {
                    width: 63px;
                }
            }

            .right-section {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
`;

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

export const getPopupStylePreset = (isMobile?: boolean) => {
    return {
        height: 'auto',
        maxHeight: isMobile ? '-webkit-fill-available' : 'auto',
        minHeight: isMobile ? 'auto' : 'unset',
        padding: isMobile ? '20px 25px 30px' : '43px 52px 45px 52px',
        backgroundColor: colors.white,
        margin: '0',
        minWidth: isMobile ? '-webkit-fill-available' : '989px',
        maxWidth: isMobile ? '-webkit-fill-available' : '989px',
        border: isMobile ? 'none' : 'none',
        borderRadius: '4px',
        boxShadow: '0px 20px 28px rgba(47, 57, 65, 0.35)',
    };
};
interface StyledFinishPitchPopupProps {
    bodyOffsetTop?: number;
    bodyOffsetBottom?: number;
}
export const StyledFinishPitchPopup = styled.div<StyledFinishPitchPopupProps>`
    @import url('https://fonts.cdnfonts.com/css/helvetica-neue-5');

    display: flex;
    gap: 52px;

    .divider {
        border-bottom: 1px solid #e9ebed;
        margin: 24px 0;
    }

    .left-section {
        display: flex;
        min-width: 340px;
        border-radius: 8px;

        @media screen and (max-width: 768px) {
            display: none;
        }

        .pitch-popup-start {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .right-section {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        margin-bottom: 0;

        @media screen and (max-width: 768px) {
            width: 100%;
        }

        .form-header {
            display: flex;
            justify-content: space-between;

            .title {
                font-family: 'NeueHaasDisplay';
                font-size: 36px;
                font-weight: 450;
                line-height: 43px;
                letter-spacing: 0em;
                margin: 0 0 12px;
                color: ${colors.black};

                @media screen and (max-width: 512px) {
                    font-size: 28px;
                    line-height: 34px;
                }
            }

            .description {
                margin: 0;
                ${mixinTypography.text.tLg.textLgMedium};
                color: #68737d;

                @media screen and (max-width: 512px) {
                    font-size: 14px;
                    line-height: 18px;
                }
            }

            .close-wrapper {
                display: flex;
                width: 30px;
                height: 30px;
                border: none;
                background-color: transparent;
                position: absolute;
                top: 30px;
                right: 34px;

                @media screen and (max-width: 1024px) {
                    top: 15px;
                    right: 12px;
                }

                :hover {
                    opacity: 0.6;
                }

                .close-button {
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                }
            }
        }

        .form-body {
            display: flex;
            flex-direction: row;
            gap: 20px;
            flex-wrap: wrap;
            flex: 1;

            @media screen and (max-width: 1024px) {
                justify-content: center;
            }
        }

        .form-footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 0;

            .button-save {
                height: 40px;
                width: auto;
                border: none;
                padding: 10px 26px;
                border: 1px solid #2f3941;
                background-color: #d96e34;

                @media screen and (max-width: 512px) {
                    height: 40px;
                    width: 100%;
                }

                span.label {
                    font-family: SuisseIntlMono;
                    font-size: 14px;
                    line-height: 20px;
                    color: ${colors.white};
                    text-transform: uppercase;
                }
            }
        }
    }
`;
