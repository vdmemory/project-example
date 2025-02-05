import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledPayInformation = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 43px;
    align-items: center;

    h1 {
        ${mixinTypography.display.dSm.displaySmMedium};
        margin: -6.5px 0 13.5px;
        display: flex;
        align-items: center;

        @media (${mediaScreen.mobile}) {
            ${mixinTypography.mobile.display.mobileDisplayXs};
        }
    }

    .coupon-section {
        display: flex;
        justify-content: space-between;
        background-color: ${colors.white};
        border: 0.6px solid #87929d;
        border-radius: 2px;
        padding: 40px;
        margin-top: 12px;
        flex-direction: column;
        max-width: 626px;

        @media (${mediaScreen.mobile}) {
            padding: 20px 16px;
            margin-left: -16px;
            margin-right: -16px;
            border-radius: 0;
            border: none;
        }

        .img-wrapper {
            height: 222px;
            width: 151px;

            @media (${mediaScreen.mobile}) {
                display: none;
            }

            img {
                width: inherit;
                height: inherit;
                object-fit: cover;
            }
        }

        & .title {
            font-family: 'NeueHaasDisplay';
            font-size: 20px;
            line-height: 28px;
            margin: 0 0 12px;
            font-weight: normal;
            color: ${colors.black};

            @media (${mediaScreen.mobile}) {
                font-size: 20px;
                line-height: 25px;
                margin: 0 0 14px;
            }
        }

        & .description {
            font-family: 'NeueHaasDisplay';
            font-size: 14px;
            line-height: 18px;
            font-weight: normal;
            margin: 0;
            color: #68737d;
        }

        & .divider {
            width: 100%;
            height: 1px;
            background-color: #e0dedb;
            margin: 20px 0;
        }

        .payment-info-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 0;
            overflow: hidden;

            @media (${mediaScreen.mobile}) {
                width: 100%;
                padding: 0;
            }

            .payment-info-row {
                display: flex;
                justify-content: space-between;
                ${mixinTypography.text.tMd.textMdMedium};

                font-size: 14px;
                line-height: 16px;
                color: #68737d;

                @media (${mediaScreen.mobile}) {
                    ${mixinTypography.mobile.text.mobileTextSm};
                }

                &.total-value {
                    font-size: 18px;
                    line-height: 20px;
                    color: ${colors.black};
                }
            }

            .coupon-block {
                margin: 16px 0 0;

                .button-add {
                    font-family: 'NeueHaasDisplay';
                    font-size: 16px;
                    text-transform: capitalize;

                    svg {
                        min-width: 18px;
                        width: 18px;
                        margin-right: 6px;
                        height: 18px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1076px) {
        .coupon-section {
            .payment-info-wrapper {
                max-width: 100%;
            }
            .img-wrapper {
                display: none;
            }
        }
    }
`;

export const StyledNextStepSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;

    @media (${mediaScreen.mobile}) {
        align-items: center;
    }

    .title {
        font-size: 36px;
        line-height: 44px;
        color: ${colors.black};
        font-weight: 400;
        white-space: pre-wrap;
        text-align: center;
        justify-content: center;
        margin: 0;

        @media screen and (max-width: 1078px) {
            font-size: 32px;
        }

        @media (${mediaScreen.mobile}) {
            font-size: 24px;
            line-height: 30px;
        }
    }

    .benefits {
        display: flex;
        gap: 20px;
        margin: 16px 0 28px;
        justify-content: center;

        @media screen and (max-width: 1078px) {
            gap: 12px;
        }

        @media (${mediaScreen.mobile}) {
            font-size: 24px;
            line-height: 30px;
            margin: 8px 0 28px;
            gap: 8px;
            flex-wrap: wrap;
            max-width: 320px;
        }
    }

    .benefit-row {
        display: flex;
        gap: 5px;
        font-size: 14px;
        font-weight: 450;
        line-height: 16px;
        letter-spacing: 0;
        color: ${colors.grey.grey600};
        align-items: center;

        svg {
            width: 18px;
            min-width: 18px;
            height: 17px;
            transform: rotate(-6deg);

            path {
                fill: ${colors.grey.grey600};
            }
        }
    }

    .screen {
        transform: scale(1.5);
        margin: 36px auto 54px;

        @media screen and (max-width: 1214px) {
            transform: scale(1.4);
            margin: 34px auto 54px;
        }

        @media screen and (max-width: 1078px) {
            transform: scale(1.3);
            margin: 30px auto 54px;
        }

        @media (${mediaScreen.mobile}) {
            transform: scale(1.39);
        }

        @media screen and (max-width: 768px) {
            transform: scale(1.2);
            margin: 16px auto 34px;
        }

        @media screen and (max-width: 512px) {
            transform: scale(1.02);
            margin: 0 auto 28px;
        }
    }
`;
