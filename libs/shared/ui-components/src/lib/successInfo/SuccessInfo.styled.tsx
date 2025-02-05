import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
export const StyledSuccessInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.mainPurple};
    .link-buttons-wrapper {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        margin-top: 10px;
        height: 30px;
        min-height: 30px;
        max-height: 30px;
        margin-right: 20px;

        > button {
            font-weight: 400;
            font-size: 12px;
            line-height: 160%;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            font-family: ${fonts.accent};
        }
    }
    .header-onboarding-success-wrapper {
        padding: 25px 75px 65px !important;
        border-bottom: 1px solid ${colors.mainBlack};

        h1 {
            font-size: 72px;
            text-transform: uppercase;
            margin-bottom: 10px;
            font-weight: 450;
            margin-top: 0;
            line-height: 72px;
        }

        span {
            font-size: 24px;
            line-height: 29px;
            display: flex;
            max-width: 720px;
        }

        @media (${mediaScreen.tablet}) {
            padding: 30px 15px !important;

            h1 {
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
            }
        }
    }

    .content-onboarding-success-wrapper {
        display: flex;
        flex: 1;
        > div + div {
            border-left: 1px solid ${colors.mainBlack};
        }

        .image-wrapper {
            margin-bottom: 20px;
        }

        @media (${mediaScreen.tablet}) {
            .image-wrapper {
                margin-bottom: 0;
                > img {
                    margin-left: 0;
                }
            }
        }
    }

    .button-group {
        display: flex;
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
        z-index: 100;
        border-top: 1px solid ${colors.mainBlack};
    }

    @media screen and (max-width: 1024px) {
        .link-buttons-wrapper {
            display: none;
        }
        .header-onboarding-success-wrapper {
            padding: 30px 15px 25px;
            h1 {
                font-size: 48px;
                line-height: 53px;
                white-space: pre-wrap;
            }
            span {
                font-size: 22px;
                line-height: 26px;
            }
        }
        .content-onboarding-success-wrapper {
            flex-direction: column;
            > div + div {
                border-left: none;
                border-top: 1px solid ${colors.mainBlack};
            }
        }
    }
`;
