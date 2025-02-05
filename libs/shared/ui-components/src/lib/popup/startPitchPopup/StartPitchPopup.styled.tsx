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
        padding: isMobile ? '30px 20px 30px' : '50px 36px 50px 50px',
        backgroundColor: colors.white,
        margin: '0',
        minWidth: isMobile ? '-webkit-fill-available' : '872px',
        maxWidth: isMobile ? '-webkit-fill-available' : '872px',
        border: isMobile ? 'none' : 'none',
        borderRadius: '4px',
        boxShadow: '0px 20px 28px rgba(47, 57, 65, 0.35)',
    } as React.CSSProperties;
};
interface StyledStartPitchPopupProps {
    bodyOffsetTop?: number;
    bodyOffsetBottom?: number;
    heightButtonSave?: number;
    fontSizeTitle?: number;
    fontSizeDescription?: number;
}
export const StyledStartPitchPopup = styled.div<StyledStartPitchPopupProps>`
    @import url('https://fonts.cdnfonts.com/css/helvetica-neue-5');

    display: flex;
    gap: 46px;

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
        margin-top: ${({ bodyOffsetTop }) =>
            bodyOffsetTop ? bodyOffsetTop : 0}px;
        margin-bottom: ${({ bodyOffsetBottom }) =>
            bodyOffsetBottom ? bodyOffsetBottom : 0}px;

        @media screen and (max-width: 768px) {
            width: 100%;
        }

        .form-header {
            display: flex;
            justify-content: space-between;
            margin-left: 6px;

            @media screen and (${mediaScreen.mobile}) {
                margin-left: 2px;
            }

            .title {
                font-size: 36px;
                font-weight: normal;
                line-height: 43px;
                letter-spacing: 0;
                margin: 0 0 11px;
                color: ${colors.black};
                white-space: pre-wrap;

                ${({ fontSizeTitle }) =>
                    fontSizeTitle && `font-size: ${fontSizeTitle}px;`};

                @media screen and (max-width: 512px) {
                    font-size: 28px;
                    line-height: 34px;
                    margin: 0 20px 8px 0;
                }
            }

            .description {
                margin: 0;
                ${mixinTypography.text.tLg.textLgMedium};
                color: #68737d;

                ${({ fontSizeDescription }) =>
                    fontSizeDescription &&
                    `font-size: ${fontSizeDescription}px;`};

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
                height: 38px;
                width: 100%;
                border-radius: 2px;
                border: none;

                ${({ heightButtonSave }) =>
                    heightButtonSave && `height: ${heightButtonSave}px;`};

                @media screen and (max-width: 512px) {
                    height: 38px;
                    width: 100%;
                    border-radius: 2px;
                    margin-left: 7px;

                    ${({ heightButtonSave }) =>
                        heightButtonSave && `height: ${heightButtonSave}px;`};
                }

                span.label {
                    ${mixinTypography.text.tMd.textMdMedium};
                }
            }
        }
    }
`;
