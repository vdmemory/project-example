import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledHeaderDashboardProps {
    isPublicPage: boolean;
}

export const StyledHeaderDashboard = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 340px;
    background-color: ${colors.mainPink};
    @media (${mediaScreen.tablet}) {
        min-height: 220px;
    }

    ${({ isPublicPage }: StyledHeaderDashboardProps) =>
        isPublicPage &&
        css`
            min-height: auto;
            border-bottom: 1px solid ${colors.mainBlack};
        `}

    .dashboard-left_block {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 61px 0 61px;
        padding-left: 75px;
        h1 {
            text-transform: uppercase;
            word-break: break-word;
            font-family: ${fonts.default};
            font-weight: normal;
            font-size: 72px;
            line-height: 72px;
            margin: 0 30px 0 0;
            max-width: 940px;
            width: 100%;
            white-space: pre-wrap;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        @media (${mediaScreen.tablet}) {
            margin: 30px 0 30px;
            padding-left: 15px;
            padding-right: 15px;

            h1 {
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                margin: 0 0 0 0;
            }
        }
    }
    .dashboard-right_block {
        font-family: ${fonts.default};
        max-width: 385px;
        > p {
            font-style: normal;
            font-weight: 450;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0.002em;
            margin: 0 0 20px;

            .next-step-content {
                text-transform: lowercase;
                display: inline-block;
                :first-letter {
                    text-transform: capitalize;
                }
            }
        }
        > button,
        .access-denied-wrapper button {
            min-width: 242px;
            font-weight: 450;
            font-size: 18px;
            line-height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.002em;
            height: 48px;
            margin: 0;
            padding: 0 20px;
            border: 1px solid ${colors.mainBlack};
        }
    }
    .tabs-navigation {
        @media (${mediaScreen.tablet}) {
            .tabs-container {
                max-width: 100%;
                padding-left: 20px;

                .icon-wrapper {
                    display: none;
                }
            }
        }
    }

    .profile-navigation {
        display: flex;
        margin-top: auto;
        position: relative;
        button:first-of-type {
            margin-left: 75px;
        }
        button + button {
            margin-left: 10px;
        }
        .row {
            display: flex;
            position: absolute;
            bottom: 0;
            height: 10px;
            width: 100%;
            border-top: 1px solid ${colors.mainBlack};
            border-bottom: 1px solid ${colors.mainBlack};
        }
    }
`;
