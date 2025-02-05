import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledReviewPitchesProps {
    hasIntrosBtn?: boolean;
    isFetching?: boolean;
    isSinglePitch?: boolean;
}

export const StyledReviewPitchesPublic = styled.div<StyledReviewPitchesProps>`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.beige};

    ${({ isSinglePitch }) =>
        isSinglePitch &&
        css`
            border-bottom: 1px solid ${colors.black};
        `}

    .side-bar {
        display: flex;
        ${({ isSinglePitch }) =>
            isSinglePitch
                ? css`
                      height: calc(100vh - 60px);
                  `
                : css`
                      height: calc(100vh - 60px - 81px);
                  `}

        min-width: 400px !important;
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

    .layout {
        display: flex;
        width: 100%;

        .key-info-item {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 4px;

            .title {
                font-size: 18px;
                font-weight: bolder;
                line-height: 20.59px;
                letter-spacing: 0;
            }

            .value {
                font-size: 14px;
                font-weight: 450;
                line-height: 16px;
                letter-spacing: 0;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
            .value {
                color: #68737d;
            }
            .website-link {
                color: ${colors.primary.primary500};

                :hover {
                    color: ${colors.primary.primary300};
                }

                &-disabled {
                    color: #68737d;
                    text-decoration: underline;
                    cursor: not-allowed;
                }
            }
        }

        .group-block {
            display: flex;
            flex-direction: column;

            .nav-list {
                gap: 12px;

                .list {
                    padding: 0;
                    height: fit-content;
                }
            }
        }

        .pitch-details {
            opacity: 1;
            width: 100%;

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

    .navigation {
        border-top: 1px solid ${colors.grey.grey100};
        border-bottom: 1px solid ${colors.grey.grey100};
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

        .button-nav.prev,
        .button-nav.next {
            display: none;
        }

        .schedule-intros-btn {
            min-width: 250px;
            max-width: 100%;
            margin: auto;
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
    }
`;
