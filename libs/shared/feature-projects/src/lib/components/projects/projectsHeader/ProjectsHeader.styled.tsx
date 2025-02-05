import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { dashboard_bg } from '@breef/shared/assets';
import { css } from '@emotion/react';
import { projectBg } from '@breef/ui-kit';

interface StyledProjectsHeaderProps {
    isClient: boolean;
}

const MAX_WIDTH = 1130;

const centeredLayoutStyles = css`
    max-width: ${MAX_WIDTH}px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
`;

const clientStyles = css`
    justify-content: center;
    padding-top: 60px;
    background-image: unset;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 60px);
        background-image: url(${projectBg.src});
        background-size: cover;
        background-position: center;
        z-index: -1;
    }

    .title-section {
        ${centeredLayoutStyles};
    }

    .action-bar-section {
        ${centeredLayoutStyles};
        gap: 99px;

        @media (max-width: 1280px) {
            height: auto;
        }

        @media (${mediaScreen.laptop}) {
            flex-direction: column;
            gap: 45px;
            overflow: unset;
        }

        @media (${mediaScreen.tablet}) {
            gap: 35px;
            margin-bottom: 50px;
        }
    }
`;

export const StyledProjectsHeader = styled.div<StyledProjectsHeaderProps>`
    display: flex;
    flex-direction: column;
    background-image: url(${dashboard_bg.src});
    padding-top: 65px; //65px - without support ribbon
    margin-bottom: 0;
    position: relative;
    background-size: cover;

    @media (${mediaScreen.tablet}) {
        padding-top: 50px;
        margin-bottom: 0;
    }

    .title-section {
        justify-content: space-between;
        display: flex;
        padding-right: 100px;
        align-items: center;

        @media (${mediaScreen.tablet}) {
            flex-direction: column-reverse;
            align-items: baseline;
            padding-right: 0;
        }

        h1 {
            white-space: pre-wrap;
            font-weight: normal;
            margin: 0;
            text-transform: uppercase;
            line-height: 72px;
            font-size: 72px;
            max-width: 70%;
            word-wrap: break-word;
            overflow: hidden;
            @media (${mediaScreen.tablet}) {
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                max-width: 100%;
            }
        }

        > div {
            @media (${mediaScreen.tablet}) {
                margin-bottom: 20px;
            }
        }

        .logo-wrapper {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: relative;
            background-color: white;

            > img {
                object-fit: cover;
            }
        }
    }

    .action-bar-section {
        gap: 30px;
        display: flex;
        margin-top: 45px;
        margin-bottom: 60px;

        @media (max-width: 1280px) {
            height: 630px;
            flex-wrap: wrap;
        }

        @media (${mediaScreen.tablet}) {
            height: 300px;
            overflow-x: scroll;
            overflow-y: hidden;
            flex-wrap: nowrap;
            gap: 10px;
            bottom: 30px;
        }
        @media (pointer: coarse) {
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }

    ${({ isClient }) => isClient && clientStyles};
`;
