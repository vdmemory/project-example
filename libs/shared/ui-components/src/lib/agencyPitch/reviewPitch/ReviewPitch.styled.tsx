import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';

const getDynamicFontSizeCss = (taglineLength: number) => {
    if (60 <= taglineLength && taglineLength <= 72)
        return css`
            font-size: 20px;
            line-height: 24px;
        `;
    if (73 < taglineLength)
        return css`
            font-size: 14px;
            line-height: 18px;
        `;

    return css`
        font-size: 24px;
        line-height: 28px;
    `;
};

interface StyledReviewPitchProps {
    taglineLength?: number;
    isEditable?: boolean;
}

export const StyledNotAddedYet = styled.span`
    color: ${colors.grey.grey500};
`;

export const StyledReviewPitch = styled.div<StyledReviewPitchProps>`
    @import url('https://fonts.cdnfonts.com/css/helvetica-neue-5');

    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 850px;
    flex: 1;

    .row {
        display: flex;
        gap: 20px;
    }

    .card {
        background-color: ${colors.white};
        position: relative;

        .main-section > .title {
            font-weight: 600 !important;
        }
    }

    .main-section {
        position: relative;

        > svg {
            position: absolute;
            top: 23px;
            left: 0;
        }
    }

    .logo-card {
        width: 148px;
        min-width: 148px;
        padding: 16px;

        .main-section {
            margin: 0 !important;
            min-width: 80px;
            align-items: center;
            justify-content: center;
        }

        .logo-wrapper {
            width: 108px;
            height: 108px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0px 0px 0px 3px #f0f0f0;
            margin: 3px;
        }
    }

    .company-info-card {
        display: flex;
        flex: 1;

        .main-section {
            gap: 10px;
        }

        .main-info-wrapper {
            display: flex;
            gap: 12px;
            align-items: center;
            overflow: hidden;
            max-width: 100%;
            flex-wrap: wrap;
            ${({ isEditable }: StyledReviewPitchProps) =>
                isEditable &&
                css`
                    margin-right: 30px;
                `}

            > h3 {
                margin: 0;
                ${mixinTypography.display.dXs.displayXsMedium};
                max-width: 250px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-weight: 600;
            }

            .company-location {
                display: flex;
                align-items: center;

                svg {
                    min-width: 16px;
                }

                span {
                    display: block;
                    font: ${fonts.accent};
                    font-size: 12px;
                    font-weight: 400;
                    letter-spacing: 0.015em;
                    text-transform: uppercase;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 200px;
                }
            }
        }

        .budget {
            ${mixinTypography.label.lS.labelSMedium};
            color: ${colors.grey.grey900};
            display: flex;
            align-items: center;
            margin-left: -6px;
            gap: 4px;
        }

        .tagline-content {
            font-style: italic;
            font-weight: 300;
            letter-spacing: 0em;
            margin: 0;
            font-family: 'Helvetica Neue', sans-serif;

            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 400px;
            max-width: 100%;

            @media (max-width: 1330px) {
                width: 350px;
            }

            @media (max-width: 1280px) {
                width: 300px;
            }

            ${({ taglineLength }) =>
                taglineLength && getDynamicFontSizeCss(taglineLength)}
        }
    }

    .company-links-card {
        display: flex;
        align-items: flex-start;
        width: 158px;

        ${({ isEditable }: StyledReviewPitchProps) =>
            isEditable &&
            css`
                padding-top: 25px;
                width: 170px;
            `};

        .main-section {
            margin-right: 0;
            height: 100%;
        }

        .links-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;

            a {
                display: flex;
                color: ${colors.primary.primary500};
                gap: 8px;
                align-items: center;
                font-family: ${fonts.accent};
                font-size: 14px;
                font-weight: 400;
                line-height: 24px;
                letter-spacing: -0.02em;
                text-transform: uppercase;
                height: 19px;

                :hover {
                    color: ${colors.primary.primary300};

                    .instagram-icon path {
                        fill: ${colors.primary.primary300};
                        stroke: ${colors.primary.primary300};
                    }

                    .portfolio-icon path {
                        stroke: ${colors.primary.primary300};
                    }

                    .website-icon path {
                        stroke: ${colors.primary.primary300};
                    }
                }
            }
        }
    }

    .agency-fit-tags-wrapper {
        margin-top: 20px;
        display: flex;
        flex: 1;
        justify-content: start;
        gap: 12px;

        > div {
            height: 25px;
            font-size: 12px;

            @media (${mediaScreen.maxMobile}) {
                height: 32px;
            }
        }
    }

    .review-link {
        font-size: 16px;
        -webkit-text-stroke-width: 0.2px;
        line-height: 20px;
        letter-spacing: 0.01em;
        text-decoration: underline;
        color: ${colors.primary.primary500};
        :hover {
            color: ${colors.primary.primary300};
        }
    }

    .agency-approach-card {
        .approach-wrapper {
            display: flex;
            flex-direction: column;
            margin-top: 5px;

            .skills-wrapper {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;

                .pill {
                    background-color: ${colors.grey.grey50};
                    font-family: 'NeueHaasDisplayWeb', sans-serif;
                    letter-spacing: 0.01em;
                    height: 32px;
                    :hover {
                        background-color: ${colors.grey.grey50}!important;
                        color: inherit;
                    }
                }
            }

            h4 {
                margin: 0;
                ${mixinTypography.text.tLg.textLgMedium};
                font-weight: 600;
                text-transform: unset;
                font-size: 18px;
            }

            .approach {
                margin-top: 16px;

                @media (${mediaScreen.maxMobile}) {
                    margin-top: 8px;
                }
            }

            .review-link {
                :first-of-type {
                    margin-top: 20px;
                }

                + .review-link {
                    margin-top: 10px;
                }

                @media (${mediaScreen.maxMobile}) {
                    margin-top: 12px;
                }
            }
        }
        .skill-wrapper + .skill-wrapper {
            margin-top: 20px;
        }
    }
    .portfolio-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .attachments-wrapper {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;

        @media (${mediaScreen.maxMobile}) {
            flex-direction: column;
        }
    }

    .additional-links-wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .line-breef-note {
        width: 107px;
        height: auto;
    }

    .things-wrapper {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        max-width: 800px;
        justify-content: flex-start;

        @media (${mediaScreen.maxMobile}) {
            > div {
                display: block;
                padding: 7px 8px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }

    @media (max-width: 1240px) {
        .row.wrap {
            flex-direction: column;
        }
        .agency-fit-tags-wrapper {
            flex-wrap: wrap;
        }
    }

    @media (${mediaScreen.maxMobile}) {
        max-width: 100%;
        width: 100%;

        .logo-card {
            display: none;
        }

        .card {
            padding: 20px 12px;
        }

        .group {
            display: flex;
            gap: 20px;

            .main-info-wrapper {
                overflow: hidden;
            }

            &.last {
                justify-content: space-between;
                margin-top: 5px;
            }
        }

        .info {
            .logo-wrapper,
            img {
                width: 54px;
                height: 54px;
                border-radius: 50%;
            }

            .logo-wrapper {
                box-shadow: 0px 0px 0px 1px #f0f0f0;
                margin: 1px;
            }

            .main-info-wrapper {
                display: flex;
                align-items: center;
                gap: 4px;
                flex-wrap: wrap;
                height: fit-content;
                min-height: 100%;

                ${({ isEditable }: StyledReviewPitchProps) =>
                    isEditable &&
                    css`
                        margin-right: 35px;
                    `};

                h3 {
                    margin: 0;
                    ${mixinTypography.mobile.display.mobileDisplayMd};
                    font-weight: 600;
                }

                .company-location {
                    ${mixinTypography.mobile.text.mobileTextSm};
                    display: flex;
                    align-items: center;
                    text-transform: uppercase;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .tagline-content {
                font-style: italic;
                font-weight: 300;
                letter-spacing: 0em;
                margin: 0;
                font-family: 'Helvetica Neue', sans-serif;
                font-size: 18px;
                line-height: 32px;
                margin: 10px 0;
            }

            .budget {
                ${mixinTypography.label.lS.labelSMedium};
                color: ${colors.grey.grey900};
                display: flex;
                align-items: center;
                margin-left: -7px;
                gap: 4px;

                svg {
                    min-width: 30px;
                    min-height: 30px;
                }

                span {
                    flex: 1;
                }
            }
        }
        .company-links-card {
            width: auto;
            ${({ isEditable }) =>
                isEditable &&
                css`
                    padding-right: 45px;
                `};

            .links-wrapper {
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                justify-content: space-between;
                gap: 12px;
                flex-direction: row;

                a {
                    text-decoration: none;
                    font-size: 12px;
                }

                svg {
                    width: 19px;
                    height: 19px;
                }
                @media screen and (max-width: 390px) {
                    justify-content: flex-start;
                }
            }
        }
    }
`;

interface StyledColoredTagProps {
    isSmall?: boolean;
}
export const StyledColoredTag = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
    padding: 0 8px;
    border-radius: 2px;
    border: 1px solid ${colors.grey.grey100};
    color: ${colors.grey.grey900};
    background-color: ${colors.grey.grey50};
  ${({ isSmall }: StyledColoredTagProps) =>
      isSmall
          ? css`
                height: 20px;
                ${mixinTypography.label.lS.labelSMedium};
            `
          : css`
                height: 32px;
                ${mixinTypography.label.lMd.labelMdMedium};
            `}};
`;
