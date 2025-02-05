import styled from '@emotion/styled';
import {
    colors as colorsShared,
    mediaScreen,
} from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

type ProjectCard = {
    isHoverCard: boolean;
    isArchivedCard: boolean;
};

export const StyledCardForClient = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    background: ${colors.white};
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;

    &:hover {
        cursor: ${({ isHoverCard }: ProjectCard) =>
            isHoverCard ? 'pointer' : 'default'};
        background: ${({ isHoverCard }: ProjectCard) =>
            isHoverCard ? colorsShared.mainWhite : colorsShared.mainPurple};
    }

    ${({ isArchivedCard }: ProjectCard) => {
        if (!isArchivedCard) return ``;
        return css`
            &:hover {
                background: ${colorsShared.mainWhite};
                cursor: default;
            }
        `;
    }};

    .project-card {
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        height: 101px;
        gap: 10px;

        @media (${mediaScreen.laptop}) {
            flex-direction: column;
            height: auto;
            padding: 22px 20px 20px;
        }

        .project-card-info {
            display: flex;
            justify-content: space-between;
            align-items: start;
            flex-direction: column;
            flex: 1;

            ${({ isArchivedCard }: ProjectCard) => {
                if (!isArchivedCard) return ``;
                return `
                        flex: 1.2;
                    `;
            }};
            @media (${mediaScreen.laptop}) {
                gap: 10px;
            }

            @media (${mediaScreen.tablet}) {
                gap: 20px;
            }

            .project-card-info-created,
            .project-card-info-budget,
            .project-card-info-client {
                font-style: normal;
                line-height: 100%;
                margin: 0;
            }

            .group-detail-name {
                display: flex;
                gap: 12px;
                align-items: center;

                @media (${mediaScreen.tablet}) {
                    flex-direction: column-reverse;
                    align-items: flex-start;
                    width: 100%;
                    gap: 16px;
                }

                .tag {
                    color: ${colors.grey.grey600};
                    font-size: 10px;
                    line-height: 13px;
                }

                .project-card-detail-name {
                    ${mixinTypography.display.dXs.displayXsMedium}
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    margin: 0;
                    max-width: 360px;

                    @media (${mediaScreen.tablet}) {
                        max-width: 100%;
                        font-size: 20px;
                        line-height: 20px;
                    }
                }
            }

            @media (${mediaScreen.tablet}) {
                .project-card-progress {
                    flex-direction: column;
                    padding: 0;
                    padding-left: 8px;
                    padding-top: 8px;
                    align-items: flex-start;
                    gap: 20px;

                    .label {
                        font-size: 12px;
                    }

                    svg.arrow {
                        display: none;
                    }
                }
            }
        }
        .project-card-detail {
            max-width: 465px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            gap: 40px;
            padding: 15.5px 20px 7.5px 0;

            ${({ isArchivedCard }: ProjectCard) => {
                if (!isArchivedCard) return ``;
                return `
                        flex: 0.8;
                    `;
            }};
            @media (${mediaScreen.laptop}) {
                padding: 10px 20px 0 0;
            }

            @media (${mediaScreen.tablet}) {
                align-items: flex-start;
                flex-direction: column;
                gap: 18px;
                padding: 15px 20px 0 0;
            }

            @media (${mediaScreen.maxMobile}) {
                padding: 15px 0 0;
            }

            .project-card-next-step {
                letter-spacing: 0.3px;

                span {
                    display: inline-block;
                    :first-letter {
                        text-transform: capitalize;
                    }
                }

                @media (${mediaScreen.tablet}) {
                    font-size: 14px;

                    b {
                        margin-right: 5px;
                    }
                }
            }

            > button,
            .access-denied-wrapper button {
                height: 40px;
                text-transform: initial;
                font-size: 16px;
                border-radius: 4px;
                margin-left: auto;

                @media (${mediaScreen.maxMobile}) {
                    width: 100%;
                }

                .label a {
                    color: ${colors.grey.grey900};
                }
            }
        }
    }
`;
