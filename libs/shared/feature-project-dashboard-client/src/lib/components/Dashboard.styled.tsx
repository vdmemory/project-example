import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

export const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
    padding: 0 !important;

    .review-scope {
        max-width: 100%;
        width: 100%;
    }
`;

const MAX_WIDTH = 1130;

export const StyledDashboard = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    animation: fadeIn 1s;
    background-color: ${colors.beige};
    padding: 60px 20px 40px;

    @media screen and (max-width: 912px) {
        padding: 20px 20px 40px;
    }

    @media screen and (max-width: 512px) {
        padding: 20px 16px 38px;
    }

    .header,
    .tabs {
        width: 100%;
        max-width: ${MAX_WIDTH}px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;

        @media screen and (max-width: 1024px) {
            margin-bottom: 32px;
        }

        .group {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .project-info {
            display: flex;
            flex-direction: column;
            gap: 10px;

            @media screen and (max-width: 1024px) {
                gap: 8px;
            }

            .company-logo {
                border-radius: 50%;
                width: 32px;
                height: 32px;

                @media screen and (max-width: 1024px) {
                    width: 20px !important;
                    height: 20px !important;
                }
            }

            .company-name {
                ${mixinTypography.text.tLg.textLgMedium};
                color: #2f2f2f;

                @media screen and (max-width: 1024px) {
                    font-size: 12px;
                    line-height: 16px;
                }
            }

            .project-name {
                ${mixinTypography.display.dMd.displayMdMedium};
                color: #2f2f2f;
                margin-right: 8px;

                @media screen and (max-width: 1024px) {
                    font-size: 24px;
                    line-height: 32px;
                }
            }

            .project-details-link {
                display: flex;
                gap: 6px;

                @media screen and (max-width: 1024px) {
                    display: none;
                }

                :hover button {
                    color: #eebba3;
                    transition: none;
                }
                :hover svg path {
                    stroke: #eebba3;
                }

                button {
                    font-size: 12px;
                    font-family: 'SuisseIntlMono';
                    min-width: auto;
                    padding: 0;
                    color: #da6c37;
                    transition: none;

                    .label {
                        text-decoration: underline;
                    }
                }

                svg {
                    margin-left: -3px;
                }
            }

            .project-budget {
                color: #666666;
                font-size: 14px;
                line-height: 18px;
                font-family: 'SuisseIntlMono';
                text-transform: uppercase;

                @media screen and (max-width: 1024px) {
                    font-size: 12px;
                }
            }
        }

        .brand-lead-info {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 12px;
            height: min-content;

            @media screen and (max-width: 1024px) {
                display: none;
            }

            label {
                color: #666666;
                font-size: 14px;
                line-height: 18px;
                font-family: 'SuisseIntlMono';
                text-transform: uppercase;
            }

            .info {
                display: flex;
                align-items: center;
                gap: 22px;
                padding-left: 4px;
            }

            .brand-lead-logo {
                height: 40px;
                width: 40px;
                border-radius: 50%;
            }

            .brand-lead-name {
                font-family: ${fonts.biroScriptPlus};
                font-size: 22px;
                font-weight: 400;
                line-height: 28.6px;
                width: max-content;
            }

            .group-buttons {
                display: flex;
                width: fit-content;
                gap: 20px;
                align-items: center;
                justify-content: center;
                position: absolute;
                bottom: -30px;
                right: 2px;

                .only-icon {
                    width: 20px;
                    padding: 0;

                    svg#chat path#back {
                        fill: ${colors.white};
                    }

                    svg#chat path#edit {
                        transition: none;
                    }

                    :hover svg#chat path#edit {
                        fill: #eebba3;
                    }

                    :hover svg#chat circle {
                        fill: #eebba3;
                    }

                    svg#phone path#edit {
                        transition: none;
                    }

                    svg#phone svg#phone path#back {
                        fill: ${colors.white};
                    }

                    :hover svg#phone path#edit {
                        stroke: #eebba3;
                    }
                }

                .only-icon:first-of-type {
                    width: 24px;
                }
            }
        }
    }

    .review-project > div {
        max-width: ${MAX_WIDTH}px!important;
    }
`;
