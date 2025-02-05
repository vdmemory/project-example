import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';

export const StyledTabsNavigation = styled.div`
    display: flex;
    margin-top: auto;
    position: relative;
    font-family: ${fonts.accent};
    button + button {
        margin-left: 10px;
    }
    .tabs-container {
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
