import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import { AnimationOpacity } from '@breef/shared/ui-components';
import { colors, mixinTypography } from '@breef/ui-kit';

export const globalStyles = css`
    footer.navigation-section {
        position: static !important;
    }
`;

export const StyledReviewStep = styled(AnimationOpacity)`
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 1214px;
    width: 100%;
    margin: 0 30px 100px;

    .header {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 20px;
        margin-bottom: 35px;

        > h1 {
            ${mixinTypography.display.dMd.displayMdMedium};
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.grey.grey900};
            color: ${colors.grey.grey900};
            margin: -9px 0;
        }

        > p {
            ${mixinTypography.text.tLg.textLgMedium};
            margin: -5.5px 0;
            color: ${colors.grey.grey600};
        }
    }

    .button-post,
    .button-book-call {
        height: 39px;
        border-radius: 2px;

        .label {
            ${mixinTypography.text.tSmall.textSmallMedium};
        }
    }

    .button-post {
        border: none;

        .label {
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.white};
        }
    }

    .button-book-call {
        border-color: ${colors.primary.primary500};
        color: ${colors.primary.primary500};
        -webkit-text-stroke-width: 0.2px;
        -webkit-text-stroke-color: ${colors.primary.primary500};
        background-color: ${colors.white};

        :hover {
            color: ${colors.white};
            -webkit-text-stroke-color: ${colors.white};
            border-color: #e69d79;
            background-color: #e69d79;

            @media screen and (${mediaScreen.tablet}) {
                border-color: ${colors.primary.primary500};
                color: ${colors.primary.primary500};
                -webkit-text-stroke-color: ${colors.primary.primary500};
                background-color: ${colors.white};
            }
        }
    }

    .review-body-wrapper {
        display: flex;
        gap: 64px;

        .right-section {
            width: auto;
            max-width: 380px;
            min-width: 280px;

            .next-step {
                margin: -5.5px 0;

                .next-step-title,
                .next-step-content {
                    ${mixinTypography.text.tLg.textLgMedium};
                    color: ${colors.grey.grey900};
                }

                .next-step-title {
                    -webkit-text-stroke-width: 0.5px;
                    -webkit-text-stroke-color: ${colors.black};
                    margin-right: 11px;
                }
            }

            .tip-post {
                margin-top: 20px;
            }

            .tip-book-call {
                margin-top: 18px;
                margin-bottom: 20px;
            }

            .save-project-question {
                margin-top: 20px;
            }
        }

        .review-section {
            display: flex;
            flex-direction: column;
            width: 100%;

            .review-project-scope {
                width: 100%;
                max-width: 770px;
                min-width: 680px;
            }

            .edit-project-question {
                margin: 32px auto 0;
            }
        }
    }

    @media screen and (max-width: 1320px) {
        .review-body-wrapper {
            gap: 20px;
        }
    }

    @media screen and (max-width: 1150px) {
        margin: 0 20px 100px;

        .review-body-wrapper {
            gap: 20px;

            .review-section {
                .review-project-scope {
                    max-width: 680px;
                }
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        margin: 0 15px;
        overflow: hidden;

        .edit-project-question {
            display: none;
        }

        .save-project-question {
            margin: 24px auto 0;
        }

        .header {
            margin-top: 24px;
            margin-bottom: 24px;
            gap: 20px;

            > h1 {
                font-size: 26px;
                font-weight: 450;
                line-height: 28px;
                margin: -4.5px 0;
            }

            > p {
                ${mixinTypography.text.tLg.textLgMedium};
                margin: -5.5px 0;
            }
        }

        .review-body-wrapper {
            .review-section {
                .review-project-scope {
                    min-width: auto;
                }
            }

            .right-section {
                display: none;
            }
        }
    }
`;

export const StyledFooterMobile = styled.div`
    display: none;

    @media screen and (${mediaScreen.tablet}) {
        display: flex;
        padding: 20px;
        gap: 20px;
        justify-content: center;
        align-items: center;
        width: 100vw;
        margin: 36px -15px 0;
        border-top: 1px solid ${colors.grey.grey100};

        .button-post,
        .button-book-call {
            height: 39px;
            width: 127.5px;
            min-width: 127.5px;
        }
    }
`;
