import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledReviewPitchesProps {
    hasIntrosBtn?: boolean;
    isFetching?: boolean;
}

export const StyledReviewPitches = styled.div<StyledReviewPitchesProps>`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.beige};

    .side-bar {
        display: flex;
        height: calc(100vh - 60px - 81px);

        min-width: 400px !important;
    }

    .layout {
        display: flex;
        width: 100%;

        .group-block {
            display: flex;
            flex-direction: column;
        }

        .schedule-intros-btn {
            height: 0;
            border-radius: 2px;
            padding: 0 16px;
            margin: 0;
            font-size: 0;
            border: none;
            transition: all 0.3s ease-in-out;

            ${({ hasIntrosBtn }) =>
                hasIntrosBtn &&
                css`
                    height: 40px;
                    padding: 15px 16px;
                    border: 1px solid ${colors.primary.primary500};
                    font-size: 16px;
                    margin: 28px 0 0 0;
                `};
        }

        .pitch-details {
            opacity: 1;

            ${({ isFetching }) =>
                isFetching &&
                css`
                    opacity: 0.5;
                `}
        }

        .content {
            display: flex;
            flex: 1;
            padding: 40px 75px;
            justify-content: center;
            position: relative;
            overflow: hidden;

            .company-links-card .links-wrapper a {
                font-size: 14px;
            }

            .pitch-details {
                gap: 12px;

                .pill span {
                    font-size: 16px;
                }

                .row {
                    gap: 12px;
                }
            }
        }
    }

    @media (max-width: 1240px) {
        .content .logo-card {
            display: none;
        }
    }

    @media (${mediaScreen.maxMobile}) {
        .layout {
            flex-direction: column;
            max-width: 650px;
            margin: auto;
            overflow: hidden;

            ${({ isFetching }) => css`
                pointer-events: ${isFetching ? 'none' : 'auto'};
                margin: 0 auto auto;
            `};

            .side-bar {
                min-width: 100% !important;
                height: auto;
                position: static;
                padding: 20px 16px 0;
                gap: 20px;
                border: none;
            }

            .content {
                padding: 20px 16px 20px;
                justify-content: flex-start;
                flex-direction: column;
                gap: 20px;

                .pitch-details {
                    gap: 24px;

                    .row {
                        gap: 24px;
                    }
                }
            }

            .down-section {
                display: flex;
                padding-bottom: 47.5px;

                .card {
                    width: 100%;
                }

                .main-section {
                    position: relative;
                    font-weight: 600;

                    .title {
                        font-weight: 600;
                    }

                    > svg {
                        position: absolute;
                        top: 23px;
                        left: 0;
                    }
                }
            }
        }

        .layout + section {
            height: 80px;

            > div {
                flex-direction: column;
                gap: 14px;

                p.text {
                    margin: 0;
                    font-size: 14px;
                }
            }
        }

        .group-block .schedule-intros-btn {
            margin-top: 20px;
            margin-bottom: 4px;
            max-width: 400px;
            width: 100%;
        }

        .button-nav.prev,
        .button-nav.next {
            display: none;
        }
    }

    @media (max-width: 512px) {
        .layout {
            max-width: 100%;
        }
        .layout + section {
            justify-content: space-between;

            > div {
                width: 100%;
            }
        }
        .group-block .schedule-intros-btn {
            max-width: 100%;
        }
    }
`;
