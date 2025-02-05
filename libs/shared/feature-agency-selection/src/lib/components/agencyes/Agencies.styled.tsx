import { colors, mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledAgencies = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    .header-title {
        max-height: 223px;
        padding-right: 200px;
        .step-number {
            min-width: 240px;
            width: 240px;
        }
        @media (${mediaScreen.tablet}) {
            padding-right: 20px;

            .step-title {
                display: flex;
                flex-direction: column;
                -webkit-box-pack: center;
                justify-content: center;
                font-size: 32px !important;
                line-height: 110% !important;
                align-items: flex-start !important;
                padding-left: 20px;
            }
        }
        @media (${mediaScreen.mobile}) {
            display: flex;
            flex-direction: column;
            min-height: auto;
            max-height: initial;
            padding: 20px 50px 20px 15px;

            .step-number {
                width: 100%;
                justify-content: flex-start;
                border: none;
                font-size: 18px;
                align-items: flex-start;
                height: auto !important;
                min-height: auto !important;
                line-height: 120% !important;
            }
            .step-title-wrapper {
                width: 100%;
            }
            .step-title {
                padding-left: 0;
            }
        }
    }
    .body-wrapper {
        display: flex;
        flex: 1;
        border-top: 1px solid black;
        @media (${mediaScreen.tablet}) {
            flex-direction: column;
        }
    }
    .step-post {
        flex: 1;
        border-left: 1px solid ${colors.mainBlack};

        @media (${mediaScreen.tablet}) {
            min-width: 100%;
            padding: 30px 15px;
            border-left: none;
        }
    }
    .scroll-bar {
        outline: none;
        width: 75%;
        @media (${mediaScreen.tablet}) {
            width: 100%;
            border-bottom: 1px solid black;
        }
    }
    .card-wrapper {
        margin: auto 0;
        > img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 10px;
        }
        .card {
            &-title {
                font-weight: 450;
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                white-space: pre-wrap;
                max-width: 280px;
                margin: 0;
            }
            &-location {
                font-style: normal;
                font-weight: 450;
                font-size: 18px;
                line-height: 160%;
                letter-spacing: 0.002em;
                max-width: 280px;
                margin: 0 0 5px;
            }
        }
    }

    .expanded-card {
        min-width: 490px;
        padding-left: 75px;

        .card-content {
            min-height: calc(100% - 60px);
            .accent-number {
                margin-bottom: 10px;
            }
        }

        @media (${mediaScreen.tablet}) {
            padding-left: 15px;
            min-width: 50%;
        }
    }
`;
