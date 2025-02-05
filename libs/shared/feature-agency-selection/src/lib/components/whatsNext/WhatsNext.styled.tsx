import { colors, mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledWhatsNext = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    .header-title {
        max-height: 223px;
        padding-right: 200px;
        border-bottom: 1px solid ${colors.mainBlack};
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
    .card {
        display: flex;
        flex: 1;
        &-wrapper {
            display: flex;
            flex: 1;
            width: calc(100% / 3);
            border-right: 1px solid ${colors.mainBlack};
            padding: 46px 65px 35px 75px;
            background: ${colors.mainPurple};
            &:last-child {
                border-right: none;
            }
        }

        &-item {
            margin: auto 0;
            > img {
                height: 130px;
                margin-bottom: 27px;
            }
            &--title {
                font-style: normal;
                font-weight: 450;
                font-size: 32px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                margin: 0 0 14px;
            }
            &--subtitle {
                font-style: normal;
                font-weight: 450;
                font-size: 18px;
                line-height: 160%;
                letter-spacing: 0.002em;
                margin: 0;
            }
        }

        @media (${mediaScreen.tablet}) {
            flex-direction: column;
            &-wrapper {
                width: 100%;
                padding: 30px 15px;
                border-right: none;
                border-bottom: 1px solid ${colors.mainBlack};
                &:last-child {
                    border-right: none;
                    border-bottom: none;
                }
            }
        }
    }
`;
