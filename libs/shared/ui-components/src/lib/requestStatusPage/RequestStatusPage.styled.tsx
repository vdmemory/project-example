import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledRequestStatusPage = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background: ${colors.white};
    padding: 133px 18px;
    color: ${colors.grey.grey900};

    @media (${mediaScreen.mobile}) {
        padding: 0;
        width: 100%;
    }

    .page-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 468px;
        width: 100%;

        @media (${mediaScreen.mobile}) {
            max-width: unset;
            justify-content: center;
            flex: 1;
            margin: 20px 0 100px;
        }
    }

    svg {
        width: 1em;
        height: 1em;
        font-size: 120px;

        @media (${mediaScreen.mobile}) {
            font-size: 80px;
        }
    }

    h3 {
        ${mixinTypography.display.dSm.displaySmMedium};
        margin: 29px 0;
        @media (${mediaScreen.mobile}) {
            ${mixinTypography.mobile.display.mobileDisplayMd};
            margin: 16px 0;
        }
    }

    .body-text {
        ${mixinTypography.text.tLg.textLgMedium};
        color: ${colors.grey.grey600};
        text-align: center;
        margin: 0;
        padding: 0 65px;
        @media (${mediaScreen.mobile}) {
            ${mixinTypography.mobile.text.mobileTextMd};
            padding: 0;
        }
    }

    .divider {
        width: 100%;
        border-top: 1px dashed ${colors.grey.grey300};
        margin: 24px 0;
        @media (${mediaScreen.mobile}) {
            margin: 16px 0;
        }
    }

    .payment-info {
        display: flex;
        flex-direction: column;
        width: 100%;
        &-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;

            &:last-of-type {
                margin-bottom: 0;
            }

            &-key,
            &-value {
                margin: 0;
            }
            &-key {
                ${mixinTypography.label.lMd.labelMdMedium};
                color: ${colors.grey.grey500};
            }
            &-value {
                ${mixinTypography.text.tMd.textMdSemibold};
                text-transform: capitalize;
            }

            @media (${mediaScreen.mobile}) {
                margin-bottom: 20px;
                &-key {
                    ${mixinTypography.mobile.label.mobileLabelSm};
                }
            }
        }
    }

    .button {
        height: 63px;
        margin-top: 40px;
        ${mixinTypography.text.tMd.textMdMedium};
        border: 1px solid ${colors.grey.grey900};
        border-radius: 4px;

        @media (${mediaScreen.mobile}) {
            height: 47px;
            margin-bottom: 0;
        }
    }
`;
