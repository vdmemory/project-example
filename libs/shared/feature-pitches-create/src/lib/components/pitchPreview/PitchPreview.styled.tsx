import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { projectPreviewFooterBackground } from '@breef/shared/assets';
import { css } from '@emotion/react';
import { colors } from '@breef/ui-kit';

const setIconColor = (color: string) => css`
    svg path {
        stroke: ${color};
        fill: unset;
    }

    svg line {
        stroke: ${color};
        fill: unset;
    }
`;

const setSizeIcon = (size: number) => css`
    svg {
        width: ${size}px;
        min-width: ${size}px;
        height: ${size}px;
    }
`;

interface StyledPitch {
    isAccept: boolean;
}

export const StyledPitchPreview = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${({ isAccept }: StyledPitch) =>
        !isAccept ? 'space-between' : 'flex-start'};

    .review-scope {
        width: 100%;
        margin: 0 auto;
    }

    .buttons-group {
        display: flex;
        gap: 20px;
        margin-left: -180px;

        @media screen and (max-width: 768px) {
            margin-left: 0;
            padding-right: 16px;
        }

        @media screen and (max-width: 414px) {
            padding-right: 0;
        }

        button {
            border-radius: 4px;
            min-width: 170px;
            font-size: 16px;
            line-height: 20px;
            height: 40px;

            @media screen and (max-width: 768px) {
                min-width: unset;
                font-size: 14px;
                line-height: 18px;
            }

            .icon-wrapper.icon-wrapper-left {
                width: 20px;
                height: 20px;
                position: relative;

                @media screen and (max-width: 414px) {
                    display: none;
                }

                > svg {
                    position: absolute;

                    top: 50%;
                    left: 50%;
                    display: flex;
                    transform: translate(-50%, -50%);
                }
            }
        }

        button:first-of-type {
            background-color: ${colors.white};
            color: ${colors.primary.primary400};
            ${setIconColor(colors.primary.primary400)};
            border-color: ${colors.primary.primary400};
            ${setSizeIcon(34)}

            &:hover {
                color: ${colors.white};
                background-color: ${colors.primary.primary200};
                ${setIconColor(colors.white)};
                border-color: ${colors.primary.primary200};

                @media screen and (${mediaScreen.tablet}) {
                    background-color: ${colors.white};
                    color: ${colors.primary.primary400};
                    ${setIconColor(colors.primary.primary400)};
                    border-color: ${colors.primary.primary400};
                }
            }
        }

        button:last-of-type {
            ${setSizeIcon(26)}
            border-color: ${colors.primary.primary500};
            ${setIconColor(colors.white)};

            &:hover {
                border-color: ${colors.primary.primary300};

                @media screen and (${mediaScreen.tablet}) {
                    border-color: ${colors.primary.primary500};
                }
            }
        }
    }
`;

export const StyledSection = styled.section`
    position: relative;
    padding: 0 75px 78px;
    background-color: ${colors.beige};

    .row-group {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        margin: 58px auto 0;
        width: 100%;
        max-width: 1140px;

        @media (${mediaScreen.tablet}) {
            margin: 24px auto 0;
        }

        .title {
            font-size: 56px;
            line-height: 72px;
            margin: 0;
            font-weight: 500;
            color: ${colors.black};

            @media (${mediaScreen.tablet}) {
                font-size: 26px;
                line-height: 29px;
                padding: 0 16px;
            }
        }

        .subtitle {
            font-size: 20px;
            line-height: 28px;
            color: ${colors.grey.grey600};
            margin: 0;

            @media (${mediaScreen.tablet}) {
                margin-top: 2px;
                padding: 0 16px;
            }
        }

        .divider {
            width: 100%;
            height: 40px;

            @media (${mediaScreen.tablet}) {
                height: 24px;
            }
        }
    }

    @media (${mediaScreen.tablet}) {
        padding: 0;
    }
`;
