import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const getPopupStylePreset = (isMobile?: boolean) => {
    return {
        height: 'auto',
        width: '100%',
        maxHeight: isMobile ? '-webkit-fill-available' : 'auto',
        minHeight: isMobile ? 'auto' : 'unset',
        padding: '0',
        backgroundColor: colors.white,
        margin: '0',
        minWidth: isMobile ? '-webkit-fill-available' : 'auto',
        maxWidth: isMobile ? '-webkit-fill-available' : '989px',
        border: isMobile ? `1px solid ${colors.grey.grey50}` : 'none',
        borderRadius: '4px',
        boxShadow: isMobile
            ? '0px 2px 10px 0px rgba(0, 0, 0, 0.10)'
            : '0px 20px 28px 0px rgba(47, 57, 65, 0.35)',
    } as React.CSSProperties;
};

export const StartProjectPopupStyled = styled.div`
    display: flex;
    position: relative;
    padding: 42.25px 52px 44.25px;
    gap: 51.63px;

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
        width: 340.16px;
        height: 511.5px;
        img {
            width: inherit;
            height: inherit;
            object-fit: cover;
        }
    }

    .right-section {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-top: 29.75px;

        h3.title {
            margin: -9px 0;
            ${mixinTypography.display.dMd.displayMdMedium};
            color: ${colors.grey.grey900};
        }

        p.subtitle {
            margin: -4.5px 0;
            padding-top: 16px;
            color: ${colors.grey.grey600};
            ${mixinTypography.text.tMd.textMdMedium};
            letter-spacing: 0.01em;
        }

        .divider {
            border-top: 1px solid #e9ebed;
            margin: 24px 0;
        }

        .next-steps-title {
            display: flex;
            align-items: center;
            padding: 0 2px;
            height: 9px;
            margin-bottom: 12px;
            color: ${colors.grey.grey900};
            font-family: ${fonts.accent};
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            letter-spacing: -0.24px;
            text-transform: uppercase;
        }

        .step-tips-wrapper {
            display: flex;
            flex-direction: column;

            .step-tip {
                display: flex;
                padding: 16px;
                align-items: center;

                .step {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 28px;
                    width: 28px;
                    height: 28px;
                    color: #d96e34;
                    background-color: #f5dbcc;
                    border-radius: 50%;
                    font-feature-settings: 'clig' off, 'liga' off;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 450;
                    line-height: normal;
                }

                .tip-content {
                    display: flex;
                    flex-direction: column;
                    padding-left: 24px;
                    gap: 4px;

                    > h4 {
                        margin: 0;
                        color: ${colors.grey.grey900};
                        font-feature-settings: 'clig' off, 'liga' off;
                        font-size: 22px;
                        font-style: normal;
                        font-weight: 450;
                        line-height: normal;
                    }
                    > p {
                        margin: 0;
                        color: ${colors.grey.grey600};
                        font-feature-settings: 'clig' off, 'liga' off;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 450;
                        line-height: 14px;
                    }
                }
            }
        }

        .next-button {
            border: none;
            border-radius: 2px;
            ${mixinTypography.text.tMd.textMdMedium};
            text-transform: capitalize;
            margin-top: auto;
            margin-bottom: 7.75px;
            height: 40px;
            width: 242px;
            margin-left: auto;
            -webkit-text-stroke-width: 0.1px;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;
        gap: 0;
        padding: 20px 20px 35px;

        .left-section {
            display: none;
        }

        .close-button {
            display: none;
        }

        .right-section {
            padding-top: 0;

            h3.title {
                ${mixinTypography.mobile.display.mobileDisplayMd};
                -webkit-text-stroke-width: 0.2px;
                -webkit-text-stroke-color: ${colors.grey.grey900};
                margin: 0;
            }

            p.subtitle {
                padding-top: 12px;
                ${mixinTypography.mobile.text.mobileTextSm};
                margin: 0;
            }

            .divider {
                margin: 20px 0;
            }

            .next-steps-title {
                margin-bottom: 20px;
            }

            .step-tips-wrapper {
                display: flex;
                flex-direction: column;
                gap: 20px;

                .step-tip {
                    display: flex;
                    padding: 0;
                    align-items: flex-start;

                    .step {
                        min-width: 20px;
                        width: 20px;
                        height: 20px;
                        ${mixinTypography.text.tXs.textXsMedium};
                    }

                    .tip-content {
                        display: flex;
                        flex-direction: column;
                        padding-left: 24px;
                        gap: 8px;

                        > h4 {
                            margin: -5.5px 0;
                            ${mixinTypography.text.tLg.textLgMedium};
                        }
                        > p {
                            margin: -1.5px 0;
                            ${mixinTypography.text.tXs.textXsMedium};
                        }
                    }
                }
            }

            .next-button {
                margin-top: 20px;
                margin-bottom: 0;
                width: 100%;
                margin-left: 0;
            }
        }
    }
`;
