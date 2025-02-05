import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = css`
    @media (${mediaScreen.mobile}) {
        .content-wrapper .right-section {
            background: ${colors.beige} !important;

            & > div {
                padding-top: 37px !important;
            }
        }
        .section-status-request button.button {
            border-radius: 2px !important;
        }
    }
`;

export const StyledStatusCheckoutPage = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background: ${colors.white};
    padding: 40px 48px;
    color: ${colors.grey.grey900};
    width: 100%;
    margin-top: 52px;

    @media (${mediaScreen.mobile}) {
        padding: 54px 16px 44px;
        margin-top: 0;
        width: 100%;
        flex: none;

        border-radius: 6px;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);

        button.button {
            margin-top: 12px !important;
        }

        @media screen and (max-width: 512px) {
            padding: 32px 16px 24px;
        }
    }

    .page-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 434px;
        width: 100%;

        @media (${mediaScreen.mobile}) {
            flex: 1;
        }
    }

    svg {
        width: 40px;
        height: 40px;
        font-size: 120px;

        @media (${mediaScreen.mobile}) {
            font-size: 80px;
            margin: auto 0 0;
        }
    }

    h3 {
        ${mixinTypography.display.dSm.displaySmMedium};
        font-size: 30px;
        line-height: 22px;
        margin: 20px 0 16px;

        @media (${mediaScreen.mobile}) {
            ${mixinTypography.mobile.display.mobileDisplayMd};
            margin: 16px 0;
        }

        @media screen and (max-width: 512px) {
            font-size: 24px;
            margin: 8px 0 4px;
        }
    }

    .foot-text,
    .body-text {
        ${mixinTypography.text.tLg.textLgMedium};
        font-size: 14px;
        line-height: 18px;
        color: ${colors.grey.grey600};
        text-align: center;
        margin: 0;
        max-width: 300px;
        white-space: break-spaces;

        & strong {
            color: ${colors.grey.grey900};
        }

        @media (${mediaScreen.mobile}) {
            ${mixinTypography.mobile.text.mobileTextMd};
            max-width: 500px;
        }

        @media screen and (max-width: 512px) {
            max-width: 300px;
            font-size: 14px;
            line-height: 18px;
        }
    }

    .foot-text {
        font-size: 16px;
        line-height: 20px;
        margin-top: 32px;

        & strong {
            color: ${colors.grey.grey900};
            font-size: 14px;
            line-height: 18px;
        }

        @media screen and (max-width: 512px) {
            margin-top: 16px;
        }
    }

    .divider {
        width: 100%;
        border-top: 1px solid #d3d3d3;
        margin: 24px 0;
    }

    .payment-info {
        display: flex;
        flex-direction: column;
        width: 100%;

        gap: 12px;

        &-item {
            display: flex;
            justify-content: space-between;

            &:last-of-type {
                margin-bottom: 0;
            }

            &-key,
            &-value {
                margin: 0;
                font-size: 14px;
                line-height: 18px;
                text-transform: capitalize;
                color: ${colors.grey.grey600};
            }
        }

        & strong {
            color: ${colors.grey.grey900};
        }
    }

    .page-wrapper.failed {
        margin-top: 60px;

        @media (${mediaScreen.mobile}) {
            margin-top: 0;
        }

        .body-text {
            max-width: 100%;
            margin-bottom: 30px;
        }
    }
`;
