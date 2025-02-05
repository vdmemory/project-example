import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledHelpUsPopup = styled.form`
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

        .group {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 63px;
            padding: 0 64px;

            @media screen and (max-width: 700px) {
                padding: 0 25px;
                text-align: center;
                margin-bottom: 20px;
            }

            @media screen and (max-width: 512px) {
                margin-top: 20px;
                padding: 0 20px;
            }
        }

        .title {
            ${mixinTypography.display.dMd.displayMdMedium};
            color: ${colors.grey.grey900};
            white-space: pre-wrap;
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.grey.grey900};
            margin: -9px 0;

            @media screen and (max-width: 512px) {
                font-size: 28px;
                line-height: 36px;
                margin: 0;
            }
        }

        .subtitle {
            margin: -5.5px 0;
            ${mixinTypography.text.tLg.textLgMedium};
            color: ${colors.grey.grey600};
            padding-top: 24px;

            @media screen and (max-width: 512px) {
                ${mixinTypography.mobile.text.mobileTextSm};
                padding-top: 12px;
                margin: 0;
            }
        }

        .divider {
            width: 100%;
            height: 1px;
            background-color: #e0dedb;
            margin: 20px 0 40px;

            @media screen and (max-width: 700px) {
                padding: 0 25px;
                display: none;
            }

            @media screen and (max-width: 512px) {
                padding: 0 20px;
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
                top: 5px;
                right: 5px;
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
        min-height: 427px;
        padding: 0 64px;
        gap: 40px;

        @media screen and (max-width: 700px) {
            padding: 0 25px;
            gap: 20px;

            .rectangle-wrapper {
                max-width: 235px;
            }
        }

        @media screen and (max-width: 512px) {
            padding: 0 20px;
            min-height: 530px;
        }
    }

    .form-footer {
        display: flex;
        justify-content: center;
        padding: 0 64px;
        margin: 40px 0 105px;

        .button-save {
            height: 40px;
            width: 100%;
            border-radius: 2px;
            border: none;
            max-width: 242px;
            margin-left: auto;

            @media screen and (max-width: 512px) {
                height: 38px;
                width: 100%;
                max-width: 216px;
                border-radius: 2px;
                margin-left: 7px;
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

            svg {
                transform: rotate(180deg);
                width: 18px;
                height: 16px;
            }
        }

        @media screen and (max-width: 512px) {
            margin: 32px 0 32px;
            padding: 0 20px;
            justify-content: space-between;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        overflow-y: hidden;
    }
`;

export const getPopupStylePreset = (isMobile?: boolean) => {
    return {
        overflow: !isMobile ? 'visible' : 'auto',
        maxWidth: '788px',
        minWidth: '320px',
        maxHeight: '100%',
        width: '100%',
        borderRadius: '4px',
        boxShadow: isMobile
            ? '0px 4px 8px 0 rgba(0, 0, 0, 0.15)'
            : '0px 20px 28px 0 rgba(47, 57, 65, 0.35)',
        border: 'none',
    } as React.CSSProperties;
};
