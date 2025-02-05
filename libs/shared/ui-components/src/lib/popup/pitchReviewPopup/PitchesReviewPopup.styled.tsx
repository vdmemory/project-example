import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledPitchesReviewPopup = styled.div`
    .popup-header {
        position: relative;
        padding: 46px 69px;
        display: flex;
        background: ${colors.mainPurple};

        &--content {
            max-width: 505px;

            h1 {
                font-style: normal;
                font-weight: 450;
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                white-space: pre;
                margin: 0 0 4px;
            }
            h4 {
                font-style: normal;
                font-weight: 450;
                font-size: 18px;
                line-height: 120%;
                letter-spacing: 0.015em;
                margin: 0;
            }
        }
        &--image {
            margin: 0 20px 0 auto;
        }
    }
    .popup-body {
        display: flex;
        .expanded-card {
            padding: 39px 38px 63px 54px;
            background: ${colors.mainWhite};
            min-width: calc(100% / 3);
        }
        &-title {
            font-style: normal;
            font-weight: 450;
            font-size: 32px;
            line-height: 110%;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            margin: 16px 0 22px;
            max-width: 250px;
            white-space: pre-line;
        }
        &-text {
            font-style: normal;
            font-weight: 450;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0.002em;
            margin: 0;
            max-width: 220px;
        }
    }
    .popup-button {
        height: 80px;
        font-weight: 500;
        font-size: 24px;
    }

    @media (${mediaScreen.tablet}) {
        .popup-header {
            padding: 30px 15px;
            h1 {
                font-size: 32px;
                margin-bottom: 10px;
                white-space: break-spaces;
                width: 80%;
            }
            h4 {
                font-size: 16px;
            }
            &--image {
                display: none;
            }
        }
        .popup-body {
            flex-direction: column;

            .expanded-card {
                padding: 30px 15px;
                min-width: 100%;

                .card-content {
                    .list-pitch-footer {
                        &-title {
                            font-size: 32px;
                            line-height: 110%;
                            letter-spacing: 0.002em;
                            margin: 14px 0;
                            min-width: 100%;
                        }
                        &-text {
                            line-height: 120%;
                        }
                    }
                }
            }
        }
    }
`;
