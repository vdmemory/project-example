import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

export const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
`;

export const StyledCompanyInfo = styled.div`
    display: flex;
    align-items: center;

    .image-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 55px;
        height: 55px;
        min-width: 55px;
        border-radius: 50%;
        overflow: hidden;

        @media (${mediaScreen.maxMobile}) {
            min-width: 51px !important;
            width: 51px !important;
            height: 51px !important;
        }

        .logo {
            width: inherit;
            height: inherit;
            object-fit: cover;
        }
    }

    .company-content-wrapper {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        justify-content: space-between;
        gap: 6px;

        .group {
            display: flex;
            flex-direction: row;
            gap: 12px;

            @media (${mediaScreen.maxMobile}) {
                flex-direction: column;
                gap: 4px;
            }
        }

        @media (${mediaScreen.maxMobile}) {
            justify-content: center;
            gap: 4px;
        }

        h3 {
            ${mixinTypography.display.dXs.displayXsMedium};
            margin: 0;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            @media (${mediaScreen.maxMobile}) {
                ${mixinTypography.mobile.text.mobileTextLg};
                font-weight: 600;
                max-width: 150px;
            }
        }

        .company-location {
            display: flex;
            align-items: center;
            max-width: 150px;

            @media (${mediaScreen.maxMobile}) {
                margin-left: -2px;
            }

            svg {
                min-width: 16px;
                width: 16px;
                margin-left: -2px;
            }

            span {
                text-overflow: ellipsis;
                white-space: nowrap;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: 400;
                line-height: 14px;
                letter-spacing: 0.015em;
                font-family: ${fonts.accent};
                overflow: hidden;
            }
        }

        .link {
            display: flex;
            gap: 6px;

            button {
                font-size: 12px;
                line-height: 14px;
                font-family: 'SuisseIntlMono';
                min-width: auto;
                padding: 0;

                .label {
                    text-decoration: underline;
                }
            }

            svg {
                margin-left: -3px;
            }
        }
    }

    .loader {
        animation: spin 0.75s linear infinite;
        width: 12px;

        > path {
            fill: ${colors.primary.primary500};
        }
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
