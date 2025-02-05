import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { keyframes } from '@emotion/react';

const rotateBack = keyframes`
    from {
        transform: rotate(0);
    }
    to{
        transform: rotate(-360deg);
    }
`;

export const StyledGetStarted = styled.div`
    max-width: 1068px;

    .header-modal {
        position: relative;
        border-bottom: 1px solid ${colors.mainBlack};
        background-color: ${colors.mainPurple};
        padding: 55px 55px 45px;
        display: flex;
        justify-content: space-between;

        .next-step-arrow-image {
            position: absolute;
            left: 60px;
            bottom: -20px;
            height: 80px;
        }

        .header-right-container {
            margin-right: 70px;

            > svg {
                animation: ${rotateBack} 6s infinite linear;
            }

            .img-cloud {
                position: absolute;
                right: 20px;
                top: -34px;
                width: 300px;
                height: 220px;
            }
        }

        .header-left-container {
            display: flex;
            flex-direction: column;

            .note {
                margin-bottom: 15px;
                font-size: 14px;
                font-family: ${fonts.default};
                letter-spacing: 0.01em;
                line-height: 16px;
                &-agency {
                    text-transform: uppercase;
                    font-size: 12px;
                    font-family: ${fonts.accent};
                }
            }

            .label {
                font-size: 48px;
                text-transform: uppercase;
            }
        }
    }

    .content-modal {
        display: flex;

        .complete-info-block {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: calc(100% / 3);
            padding: 175px 45px 70px;
            border-right: 1px solid ${colors.mainBlack};

            > img {
                position: absolute;
                top: 0;
                left: 40px;
            }

            .content {
                text-transform: uppercase;
                font-size: 32px;
                margin-top: 20px;
                line-height: 35.2px;
                text-align: center;
            }
        }

        .next-steps-wrapper {
            display: flex;
            flex-wrap: wrap;
            width: calc(100% / 3 * 2);
            gap: 1px;
            > * {
                outline: 1px solid black;
                width: calc(50% - 0.5px);
            }
        }
    }

    .footer-modal {
        border-top: 1px solid ${colors.mainBlack};
        button {
            text-transform: uppercase;
        }
    }

    @media screen and (max-width: 768px) {
        max-width: 100%;
        max-height: 100%;

        .header-modal {
            padding: 20px 100px 20px 20px;
            .header-right-container {
                display: none;
            }

            .header-left-container {
                .note {
                    margin-bottom: 3px;
                }
                .label {
                    font-size: 32px;
                    line-height: 35px;
                }
            }

            .next-step-arrow-image {
                right: 7px;
                left: auto;
                bottom: -30px;
            }
        }

        .content-modal {
            flex-direction: column;
            .complete-info-block {
                width: 100%;
                border: none;
                padding: 50px 165px 50px 20px;
                align-items: flex-start;
                > img {
                    right: -19px;
                    top: -17px;
                    left: unset;
                    transform: scale(0.75);
                }
                .content {
                    margin-top: 5px;
                    font-size: 24px;
                    line-height: 22px;
                    text-align: left;
                }
            }
            .next-steps-wrapper {
                width: 100%;

                > * {
                    width: 100%;
                    align-items: flex-start;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    padding-right: 5px;
                    .icon-wrapper {
                        margin-top: 7px;
                    }
                    .label-next-step {
                        white-space: normal;
                        font-size: 22px;
                        text-align: left;
                    }
                }
            }
        }
    }
`;
