import { mediaScreen } from '@breef/shared/assets/variables';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const spinnerCss = (w: string, h: string) => css`
    .spinner {
        width: ${w};
        height: ${h};
        right: 0;
        top: 50%;
        > div {
            width: ${w};
            height: ${h};
            margin: 0;
            border-width: 2px;
        }
    }
`;

export const StyledLeftSectionTable = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    border: 1px solid ${colors.grey.grey900};
    color: ${colors.grey.grey900};

    .table-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 24px 34px;
        border-bottom: 1px solid ${colors.grey.grey900};

        @media (${mediaScreen.maxMobile}) {
            display: none;
        }

        &-invoice {
            display: flex;
            align-items: flex-start;
            ${mixinTypography.text.tMd.textMdSemibold};

            &-loader {
                width: 24px;
                height: 24px;
                position: relative;
                margin-left: 4px;

                ${spinnerCss('20px', '20px')}
            }

            svg {
                width: 1em;
                height: 1em;
                font-size: 20px;
                margin-left: 8px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .table-body {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 24px 24px 34px;
        background-color: ${colors.white};
        border-bottom: 1px solid ${colors.grey.grey900};

        @media (${mediaScreen.maxMobile}) {
            padding: 16px;
        }

        &-agency {
            display: flex;
            justify-content: space-between;
            margin-bottom: 32px;

            @media (${mediaScreen.maxMobile}) {
                margin-bottom: 0;

                >div: last-of-type {
                    display: flex;
                    align-items: center;
                    width: 10%;
                    svg {
                        cursor: pointer;
                    }
                }
            }

            >div: first-of-type {
                width: 90%;

                @media (${mediaScreen.maxMobile}) {
                    ${mixinTypography.mobile.label.mobileLabelXs};
                }
            }

            .table-header-invoice-download {
                height: 24px;
            }

            &-info {
                display: flex;
                align-items: center;
                ${mixinTypography.text.tMd.textMdMedium};

                @media (${mediaScreen.maxMobile}) {
                    ${mixinTypography.mobile.text.mobileTextSm};
                }

                &-img {
                    min-width: 24px;
                    width: 24px;
                    min-height: 24px;
                    height: 24px;
                    overflow: hidden;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 8px;
                }
            }
            &-due {
                ${mixinTypography.text.tSmall.textSmallSemibold};
                margin: 0;
            }
        }

        &-services {
            display: flex;
            flex-direction: column;

            @media (${mediaScreen.maxMobile}) {
                display: none;
            }

            &-tab {
                width: fit-content;
                border: 1px solid ${colors.grey.grey900};
                border-bottom: none;
                padding: 8px;
                ${mixinTypography.text.tSmall.textSmallMedium};
            }
            &-deliverable {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px 12px;
                border: 1px solid ${colors.grey.grey900};

                &-description {
                    ${mixinTypography.text.tSmall.textSmallMedium};
                    margin: 0 0 12px;
                }
                &-type {
                    ${mixinTypography.text.tSmall.textSmallMedium};
                    text-transform: capitalize;
                    color: ${colors.grey.grey600};
                    margin: 0;
                }
                &-amount {
                    ${mixinTypography.text.tXs.textXsSemibold};
                }
            }
        }
    }

    .table-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        margin-top: auto;
        height: 112px;
        background: ${colors.secondary.secondary500};

        @media (${mediaScreen.maxMobile}) {
            height: 50px;
        }

        &-label {
            ${mixinTypography.label.lMd.labelMdMedium};
            margin: 0;

            @media (${mediaScreen.maxMobile}) {
                ${mixinTypography.mobile.label.mobileLabelXs};
            }
        }
        &-total {
            ${mixinTypography.display.dXs.displayXsSemibold};
            margin: 0;

            @media (${mediaScreen.maxMobile}) {
                font-size: 16px;
            }
        }
    }
`;

export const StyledLabel = styled.span`
    display: block;
    ${mixinTypography.label.lS.labelSMedium};
    color: ${colors.grey.grey600};
    margin-bottom: 8px;
`;
