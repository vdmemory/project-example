import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledPaymentSummary = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    ${simpleAnimation}
    margin-top: 16px;
    color: ${colors.grey.grey900};

    .payment-summary {
        display: flex;
        flex-direction: column;
        font-size: 18px;

        .payment-bank {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            &-name {
                ${mixinTypography.text.tLg.textLgMedium};
                margin-left: 15px;
            }

            svg {
                width: auto;
                height: 30px !important;
            }
            @media (${mediaScreen.tablet}) {
                &-name {
                    ${mixinTypography.text.tLg.textLgMedium};
                }
            }
        }

        &-wrapper {
            border: 1px solid ${colors.grey.grey900};

            .label-wrapper {
                min-height: 70px;
                height: 70px;
                padding: 12px;
                border-bottom: 1px solid ${colors.grey.grey900};

                @media (${mediaScreen.maxMobile}) {
                    height: 77px;
                }

                &:last-of-type {
                    border-bottom: unset;
                }

                .label-container {
                    padding: 0;
                    margin-bottom: 8px;

                    .label-text {
                        ${mixinTypography.label.lS.labelSMedium};
                        color: ${colors.grey.grey500};

                        @media (${mediaScreen.tablet}) {
                            ${mixinTypography.mobile.text.mobileTextXs};
                            text-transform: capitalize;
                        }
                    }
                }
                .payment-content {
                    display: flex;
                    align-items: center;
                    padding: 0;
                    ${mixinTypography.text.tMd.textMdMedium};
                    @media (${mediaScreen.tablet}) {
                        ${mixinTypography.mobile.text.mobileTextMd};
                    }

                    .tooltip {
                        width: 18px;
                        height: 18px;
                    }

                    .Tooltip {
                        ${mixinTypography.text.tXs.textXsMedium};
                        padding: 8px !important;
                        background: ${colors.primary.primary500} !important;
                        color: ${colors.white};

                        #arrow {
                            left: calc(50% - 4px) !important;
                            top: calc(100% - 4px) !important;
                            width: 8px;
                            height: 8px;
                        }
                    }

                    svg {
                        width: 1em;
                        height: 1em;
                        font-size: 18px;
                        margin-left: 9px;

                        &:hover {
                            cursor: pointer;
                            background: ${colors.secondary.secondary500};
                        }
                    }
                }
            }
        }

        &-dropzone {
            margin-top: 16px;
            .dropzone-wrapper {
                .dropzone {
                    height: 118px;
                    background-color: ${colors.secondary.secondary200};
                    border-color: ${colors.grey.grey300};
                    .wrap-icon-upload {
                        width: 24px;
                        height: 24px;
                        margin-bottom: 8px;
                    }
                    .label-drop {
                        ${mixinTypography.text.tMd.textMdMedium};
                    }
                }
            }
        }

        &-document {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 78px;
            padding: 16px;
            border: 1px solid ${colors.grey.grey900};

            &-info {
                display: flex;
                align-items: center;
                ${mixinTypography.text.tMd.textMdMedium};
                color: ${colors.primary.primary500};

                .document-icon {
                    margin-right: 5px;
                }
            }
            .trash-icon {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`;
