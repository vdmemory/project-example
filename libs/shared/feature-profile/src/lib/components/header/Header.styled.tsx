import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { profileHeaderBackgroundImage } from '@breef/shared/assets';

export const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    height: 250px;
    background-color: ${colors.darkPurple};
    background-size: cover;
    background-image: url(${profileHeaderBackgroundImage.src});
    @media (${mediaScreen.tablet}) {
        height: 173px;
    }

    h1 {
        text-transform: uppercase;
        font-family: ${fonts.default};
        font-weight: normal;
        font-size: 72px;
        line-height: 72px;
        margin: 60px 0 0 75px;
        @media (${mediaScreen.tablet}) {
            font-size: 48px;
            line-height: 110%;
            letter-spacing: 0.002em;
            margin: 30px 0 0 10px;
        }
    }

    .tabs-nav .tabs-inner {
        > button {
            .icon-wrapper {
                @media (${mediaScreen.tablet}) {
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
            @media (${mediaScreen.tablet}) {
                margin-left: 8px;
            }
        }
        .row {
            display: flex;
            position: absolute;
            bottom: 0;
            height: 10px;
            width: 100%;
            border-top: 1px solid ${colors.mainBlack};
            border-bottom: 1px solid ${colors.mainBlack};
            background-color: ${colors.mainWhite};
        }
    }
`;

export const StyledTabsNav = styled.div`
    display: flex;
    margin-top: auto;
    position: relative;
    font-family: ${fonts.accent};
    button + button {
        margin-left: 10px;
    }
    .tabs-inner {
        display: flex;
        margin-left: 75px;
        @media (${mediaScreen.tablet}) {
            max-width: 100%;
            margin: 0 auto 0 0;
            overflow-x: scroll;
            > button {
                &:last-of-type {
                    margin-right: 50px;
                }
            }
        }
        @media (pointer: coarse) {
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .row {
        display: flex;
        position: absolute;
        bottom: 0;
        height: 10px;
        width: 100%;
        border-top: 1px solid ${colors.mainBlack};
        border-bottom: 1px solid ${colors.mainBlack};
        background-color: ${colors.mainWhite};
    }
`;
