import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

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

export const getPopupStylePreset = (isMobile?: boolean) => {
    return {
        overflow: !isMobile ? 'visible' : 'auto',
        maxWidth: '788px',
        minWidth: '320px',
        width: '100%',
        borderRadius: '4px',
        boxShadow: isMobile
            ? '0px 4px 8px 0 rgba(0, 0, 0, 0.15)'
            : '0px 20px 28px 0 rgba(47, 57, 65, 0.35)',
        border: 'none',
    } as React.CSSProperties;
};

export const StyledBookACallModifiedPopup = styled.div`
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
        margin-bottom: 36px;

        @media screen and (max-width: 512px) {
            margin-bottom: 28px;
        }

        .group {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 34px;
            padding: 0 100px;

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
            letter-spacing: 0;
            margin: 0 0 11px;
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

        .description {
            margin: 0;
            ${mixinTypography.text.tLg.textLgMedium};
            color: ${colors.grey.grey600};

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
            top: 16px;
            right: 16px;

            @media screen and (max-width: 512px) {
                top: 5px;
                right: 5px;
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
        justify-content: center;
        position: relative;
        padding: 0;

        @media screen and (max-width: 700px) {
            padding: 0 25px;
        }

        @media screen and (max-width: 512px) {
            padding: 0 20px;
        }

        .wrapper-calendly-widget {
            outline: none;
        }
        * {
            min-height: 100%;
        }
    }

    .form-footer {
        display: flex;
        justify-content: center;
        margin: 46px auto 28px;

        .button-save {
            height: 40px;
            width: 100%;
            border-radius: 2px;
            border: none;
            min-width: 242px;

            @media screen and (max-width: 512px) {
                height: 38px;
                width: 100%;
                border-radius: 2px;
                margin-left: 7px;
            }

            span.label {
                ${mixinTypography.text.tMd.textMdMedium};
                -webkit-text-stroke-width: 0.2px;
                -webkit-text-stroke-color: ${colors.white};
            }
        }

        @media screen and (max-width: 512px) {
            margin: 46px auto 20px;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        overflow-y: hidden;
    }
`;
