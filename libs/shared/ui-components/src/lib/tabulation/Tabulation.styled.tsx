import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledTabulation = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    nav {
        background: ${colors.mainPurple};
        padding: 0 65px;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        height: 60px;
        z-index: 1;

        ul,
        li {
            list-style: none;
            padding: 0;
            margin: 0;
            text-transform: uppercase;
            font-family: 'SuisseIntlMono', serif;
            font-size: 12px;
        }
        .share {
            position: absolute;
            top: 22px;
            right: 75px;
            z-index: 2;
            .button-share {
                font-family: ${fonts.accent};
                font-weight: 400;
                font-size: 12px;
                line-height: 120%;
                letter-spacing: 0.015em;
                text-decoration-line: underline;
                text-transform: uppercase;
            }
            @media (${mediaScreen.tablet}) {
                display: none;
            }
        }

        ul {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            gap: 50px;
            overflow: hidden;
            li {
                display: flex;
                align-items: center;
                height: 100%;
                cursor: pointer;
                position: relative;
                user-select: none;

                .underline {
                    width: 100%;
                    height: 3px;
                    position: absolute;
                    bottom: 0px;
                    left: 0;
                    background-color: black;
                }

                &.selected {
                    background: transparent;
                }
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        nav {
            padding: 0 50px;
        }
    }
`;

export const StyledTabSelect = styled.li``;
