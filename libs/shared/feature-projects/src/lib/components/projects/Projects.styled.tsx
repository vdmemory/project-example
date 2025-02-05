import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledProjectsProps {
    isClient: boolean;
    isProjects: boolean;
}

const MAX_WIDTH = 1130;

const centeredLayoutStyles = css`
    max-width: ${MAX_WIDTH}px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
`;

const clientStyles = css`
    .main-content-wrapper-block {
        padding-bottom: 60px;

        @media (${mediaScreen.tablet}) {
            padding-bottom: 45px;
        }

        .projects-view-settings-bar,
        .projects-list-wrapper {
            ${centeredLayoutStyles};
            gap: 20px;
        }
        .projects-list-wrapper {
            min-height: 103px;
        }
    }
`;

export const StyledProjects = styled.div`
    display: flex;
    background-color: ${colors.mainPurple};
    flex-direction: column;
    flex: 1;

    .border-box {
        border-top: 1px solid ${colors.mainBlack};
    }

    > * {
        padding-left: 75px;
        padding-right: 75px;

        @media (${mediaScreen.tablet}) {
            padding-left: 15px;
            padding-right: 15px;
        }
    }

    .answers {
        @media (${mediaScreen.tablet}) {
            padding-left: 0;
            padding-right: 0;
        }
    }

    .footer-project {
        @media (${mediaScreen.tablet}) {
            padding-left: 0;
            padding-right: 0;
        }
    }

    > button {
        height: 60px;
        width: 300px;
        margin-bottom: 100px;
    }

    .main-content-wrapper-block {
        padding-top: 0;
        padding-bottom: 60px;

        .projects-list-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 60px;
            min-height: 200px;
        }
    }

    .main-content-wrapper {
        padding-bottom: 120px;

        @media (${mediaScreen.tablet}) {
            padding-top: 30px;
        }
    }

    ${({ isClient }: StyledProjectsProps) => isClient && clientStyles};
    ${({ isClient, isProjects }: StyledProjectsProps) =>
        isClient &&
        !isProjects &&
        css`
            .main-content-wrapper-block {
                display: none;
            }
        `};

    ${({ isClient }: StyledProjectsProps) => {
        if (isClient) {
            return `
                .tips-and-tricks {display: none};
                .tips-and-tricks-client {display: flex};
                .answers {display: none};
                .answers-client {display: flex};

                    @media (${mediaScreen.tablet}) {
                        .tips-and-tricks {display: flex;}
                        .tips-and-tricks-client {display: none;}
                        .answers {display: flex; padding-left: 0;}
                        .answers-client {display: none;}
                    }
                `;
        }

        return `
            .tips-and-tricks {display: flex};
            .tips-and-tricks-client {display: none};
            .answers {display: flex};
            .answers-client {display: none};
            `;
    }};
`;

export const StyledProjectsFooter = styled.div`
    @media (min-width: 1024px) {
        display: none;
    }
    display: flex;
    flex-direction: column;
    background: ${colors.mainWhite};
    text-align: center;
    padding: 0;
    .footer-brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid ${colors.mainBlack};
        > svg {
            margin-left: 15px;
        }
    }

    > a,
    .footer-brand {
        font-style: normal;
        font-weight: 450;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.002em;
        color: ${colors.mainBlack};
        padding: 15px;
        text-decoration: none;
        border-bottom: 1px solid ${colors.mainBlack};
    }
    > a {
        &:last-of-type {
            border-bottom: none;
        }
    }
`;
