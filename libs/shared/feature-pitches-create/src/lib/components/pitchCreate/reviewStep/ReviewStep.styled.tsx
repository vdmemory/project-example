import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { AnimationOpacity } from '@breef/shared/ui-components';

export const StyledReviewStep = styled(AnimationOpacity)`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    padding-bottom: 30px;
    max-width: calc(100vw - 304px);

    .header,
    .review-content-wrapper {
        margin-left: 132px;
        margin-right: 32px;
        width: 850px;
        max-width: calc(100% - 145px - 32px);
        margin-top: 40px;
    }

    .header {
        margin-top: -16px;
        margin-bottom: -16px;
        padding-top: 49px;
        padding-bottom: 25px;

        @media screen and (${mediaScreen.mobile}) {
            margin: auto;
            margin-top: 20px;
        }

        .header-title-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;

            h1 {
                font-size: 56px;
                font-weight: 450;
                line-height: 72px;
                letter-spacing: -0.02em;
                text-align: left;
                margin: 0;

                @media screen and (${mediaScreen.mobile}) {
                    font-size: 26px;
                    font-weight: 450;
                    line-height: 30px;
                    letter-spacing: 0;
                }
            }

            button {
                height: 40px;
                border-radius: 2px;
                border: none !important;
                width: 250px;

                @media screen and (${mediaScreen.mobile}) {
                    display: none;
                }
            }
        }
    }

    .divider {
        width: 850px;
        border-bottom: 1px solid ${colors.grey.grey100};
        margin-left: 132px;
        margin-right: 32px;
        max-width: calc(100% - 145px - 32px);

        @media screen and (${mediaScreen.mobile}) {
            display: none;
        }
    }
    .review-content-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;

        @media screen and (${mediaScreen.mobile}) {
            margin: auto;
            margin-top: 20px;
        }

        .terms {
            align-self: center;
            margin: 40px 30px 40px;
            max-width: 650px;
            text-align: center;
            ${mixinTypography.text.tLg.textLgMedium};

            @media screen and (${mediaScreen.mobile}) {
                margin: 50px 0;
            }

            a {
                color: ${colors.primary.primary500};
                text-decoration: underline;
                font-weight: bolder;
            }
        }
    }
    .button-submit {
        width: 100%;
        border: none !important;
        border-radius: 2px;
    }

    @media screen and (${mediaScreen.mobile}) {
        max-width: 100vw;
        padding-bottom: 28px;
        .review-content-wrapper {
            margin: 0;
            width: 100%;
            max-width: 100%;
            padding: 0 16px;
        }
        .header {
            margin: 0;
            padding: 24px 16px 24px;
            width: 100%;
            max-width: 100%;
        }
    }
`;
