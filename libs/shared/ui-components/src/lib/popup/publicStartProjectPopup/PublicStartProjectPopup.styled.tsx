import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const getPopupStylePreset = (isMobile?: boolean) => {
    return {
        height: 'auto',
        maxHeight: isMobile ? '-webkit-fill-available' : 'auto',
        minHeight: isMobile ? 'auto' : 'unset',
        padding: '0',
        backgroundColor: colors.white,
        margin: '0',
        minWidth: isMobile ? '-webkit-fill-available' : '872px',
        maxWidth: isMobile ? '-webkit-fill-available' : '872px',
        border: isMobile ? 'none' : 'none',
        borderRadius: '4px',
        boxShadow: '0px 20px 28px 0px rgba(47, 57, 65, 0.35)',
    } as React.CSSProperties;
};

export const popupGlobalStyles = css`
    body .modal-overlay {
        background-color: rgb(249 247 243 / 89%) !important;
        backdrop-filter: unset !important;

        @media screen and (max-width: 512px) {
            padding: 20px 15px !important;
            background-color: rgb(249 247 243) !important;
        }
    }

    @media screen and (max-width: 512px) {
        body .popup-wrapper {
            padding: 105px 17.5px 20px !important;
            align-items: baseline !important;
        }
    }
`;

export const navGlobalStyles = css`
    body .nav-control {
        display: none;

        @media screen and (max-width: 512px) {
            display: flex;
            z-index: 9991;
            height: 74px;
            border: none;

            .left-section > a.link-logo {
                padding: 0 16px;

                svg {
                    width: 76px;
                }
            }

            .right-section {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
`;

export const StyledPublicStartProjectPopup = styled.div`
    display: flex;
    gap: 50px;
    position: relative;
    padding: 50px;

    .close-button {
        position: absolute;
        top: 20px;
        right: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        outline: none;
        background-color: transparent;
        border: none;
        :hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }

    .left-section {
        display: flex;
        flex-direction: column;
        padding: 30px 28px;
        border-radius: 8px;
        max-width: 340px;

        @media screen and (${mediaScreen.tablet}) {
            padding-top: 0;
            padding-bottom: 10px;
            display: none;
        }
    }

    .lead-info-wrapper {
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;

        @media screen and (${mediaScreen.tablet}) {
            justify-content: center;
        }

        .logo {
            width: 94px;
            height: 94px;
            object-fit: cover;
            border-radius: 50%;
        }

        .lead-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
            justify-content: center;

            .lead-name {
                font-family: ${fonts.biroScriptPlus};
                font-weight: 400;
                font-size: 24px;
                line-height: 24px;
                letter-spacing: 0;
            }

            .lead-position {
                font-size: 12px;
                font-weight: 450;
                line-height: 10px;
                letter-spacing: 0.01em;
                text-align: left;
                color: ${colors.grey.grey500};
            }
        }
    }

    .lead-message {
        margin: 0;
        padding: 15px 0 24px;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0;
        color: #68737d;
        border-bottom: 1px solid #e9ebed;
        white-space: pre-wrap;
        text-align: center;
        font-style: italic;
    }

    .benefits-title {
        font-size: 18px;
        font-weight: 450;
        line-height: 21px;
        letter-spacing: 0;
        margin: 24px 0 17px;

        @media screen and (${mediaScreen.tablet}) {
            font-size: 14px;
            line-height: 16px;
        }
    }

    .benefit-row {
        display: flex;
        gap: 8px;
        font-size: 14px;
        font-weight: 450;
        line-height: 16px;
        letter-spacing: 0;

        > span {
            color: #2f3941;
        }

        + .benefit-row {
            margin-top: 12px;
        }

        @media screen and (${mediaScreen.tablet}) {
            font-size: 12px;
            line-height: 12px;
        }
    }

    .mobile-section {
        display: none;
        width: 100%;
        justify-content: space-between;
        max-width: 377px;

        @media screen and (${mediaScreen.tablet}) {
            display: flex;
        }

        .text-info {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .benefits-title {
                margin: 0 0 7px;
            }

            .benefit-row + .benefit-row {
                margin-top: 0;
            }
        }

        .lead-info-wrapper .logo {
            width: 40px;
            height: 40px;
        }
    }

    .right-section {
        display: flex;
        flex-direction: column;
        margin-top: 25px;

        @media screen and (${mediaScreen.tablet}) {
            max-width: 377px;
            width: 100%;
            margin-top: 0;
        }

        > h3 {
            margin: 0 0 16px;
            font-size: 36px;
            font-weight: 450;
            line-height: 41px;
            letter-spacing: 0;
            color: #2f3941;
            -webkit-text-stroke-width: 0.3px;

            @media screen and (${mediaScreen.tablet}) {
                font-size: 32px;
            }

            @media screen and (max-width: 512px) {
                font-size: 28px;
            }
        }

        .step-tips-wrapper {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 38px;

            @media screen and (${mediaScreen.tablet}) {
                margin-bottom: 20px;
            }

            .step-tip {
                display: flex;
                flex-direction: column;
                padding: 16px 16px 21px;
                border: 1px solid #87929d;
                border-radius: 2px;
                height: 100px;

                @media screen and (${mediaScreen.tablet}) {
                    height: auto;
                    padding: 16px;
                }

                .step {
                    font-size: 14px;
                    font-weight: 450;
                    line-height: 16px;
                    letter-spacing: 0;
                    color: ${colors.orange.orange};
                }
                > h4 {
                    margin: 6px 0 4px;
                    font-size: 18px;
                    font-weight: 450;
                    line-height: 21px;
                    letter-spacing: 0;
                    color: ${colors.grey.grey900};
                    -webkit-text-stroke-width: 0.3px;
                }
                > p {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 450;
                    line-height: 16px;
                    letter-spacing: 0;
                    color: ${colors.grey.grey900};

                    @media screen and (${mediaScreen.tablet}) {
                        font-size: 12px;
                        line-height: 14px;
                        color: ${colors.black};
                    }
                }
            }
        }

        button {
            height: 40px;
            width: 150px;
            font-family: ${fonts.accent};
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 1px;
            margin-left: auto;

            @media screen and (${mediaScreen.tablet}) {
                width: 100%;
                height: 48px;
                border-radius: 2px;
                font-size: 16px;
                border: none;
                margin-top: 20px;
                font-family: ${fonts.default};
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;
        gap: 0;
        align-items: center;
        padding: 20px;

        .close-button {
            top: 10px;
            right: 10px;
        }
    }

    @media screen and (max-width: 512px) {
        .close-button {
            display: none;
        }
    }
`;
