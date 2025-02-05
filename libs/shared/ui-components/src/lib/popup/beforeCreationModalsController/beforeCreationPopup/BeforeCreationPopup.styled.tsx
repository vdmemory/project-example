import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledBeforeCreationPopup = styled.div`
    width: 990px;

    @media (${mediaScreen.laptop}) {
        width: 100%;
    }

    .header-modal {
        position: relative;
        border-bottom: 1px solid ${colors.mainBlack};
        background-color: ${colors.mainPurple};
        padding: 0 70px 0;
        display: flex;
        justify-content: space-between;

        .header-right-container {
            position: relative;
            min-width: 288px;
            width: 288px;
            img {
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }

        .header-left-container {
            display: flex;
            flex-direction: column;
            padding-top: 45px;
            padding-bottom: 40px;
            white-space: pre-wrap;
            .label {
                font-size: 48px;
                text-transform: uppercase;
                letter-spacing: 0.002em;
            }
            .note {
                font-size: 20px;
                line-height: 28.8px;
                margin-top: 8px;
                letter-spacing: 0.015em;
                margin-bottom: 20px;
            }
        }
    }

    .content-modal {
        display: flex;

        .tips-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 1px;
            > * {
                outline: 1px solid black;
                width: calc(50% - 0.5px);
            }
        }
    }

    .footer-modal {
        border-top: 1px solid ${colors.mainBlack};
    }

    @media screen and (max-width: 1024px) {
        max-width: 100%;
        max-height: 100%;

        .header-modal {
            padding: 20px;
            .header-right-container {
                display: none;
            }

            .header-left-container {
                padding: 0;
                .label {
                    font-size: 32px;
                    line-height: 35px;
                    padding-right: 70px;
                }
                .note {
                    margin-bottom: 3px;
                    font-size: 18px;
                }
            }
        }
    }

    @media screen and (${mediaScreen.maxMobile}) {
        button.normal .main-content-text {
            font-size: 22px;
            margin-right: 10%;
        }
    }
`;
