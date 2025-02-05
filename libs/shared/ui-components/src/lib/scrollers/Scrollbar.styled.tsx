import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

type StyledScrollBarProps = {
    scroll: 'horizontal' | 'vertical';
    overflow: 'hidden' | 'scroll';
};

const scrollbarVertical = css`
    flex-direction: column;

    .scrollbar {
        width: 100%;
        height: 100%;
        scrollbar-width: none;
        scroll-behavior: smooth;
        z-index: 1;

        ::-webkit-scrollbar {
            display: none;
        }
    }
`;

const scrollbarHorizontal = css`
    flex-direction: row;

    .scrollbar {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        scrollbar-width: none;
        scroll-behavior: smooth;
        z-index: 1;

        ::-webkit-scrollbar {
            display: none;
        }

        .content-wrapper {
            flex-wrap: nowrap;
            flex: 1;
            > * {
                flex-wrap: nowrap;
            }
        }
    }
`;

export const StyledScrollBar = styled.div<StyledScrollBarProps>`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    outline: 1px solid black;

    .scrollbar {
        overflow: ${({ overflow }) => overflow};
        display: flex;

        .content-wrapper {
            display: flex;
            height: fit-content;
            min-height: 100%;
        }
    }

    ${({ scroll }) => scroll === 'vertical' && scrollbarVertical};
    ${({ scroll }) => scroll === 'horizontal' && scrollbarHorizontal};
`;

type StyledNavElementProps = {
    direction: 'left' | 'right' | 'up' | 'down';
    title: string;
};

const directionUp = css`
    border-top: none;
    position: absolute;
    top: 0;
    z-index: 9;
    width: 50px;
    height: 46px;
    background-color: ${colors.mainWhite};
    transition: all 300ms ease;

    :hover svg {
        margin-bottom: 5px;
    }

    svg {
        transform: rotate(90deg);
        transition: all 300ms ease;
    }
`;
const directionDown = css`
    position: absolute;
    bottom: 1px;
    z-index: 9;
    width: 50px;
    height: 46px;
    background-color: ${colors.mainWhite};
    transition: all 300ms ease;
    border-bottom: none;

    :hover svg {
        margin-top: 5px;
    }

    svg {
        transform: rotate(-90deg);
        transition: all 300ms ease;
    }
`;
const directionLeft = css`
    background-color: ${colors.mainWhite};
    position: absolute;
    z-index: 9;
    width: 50px;
    height: 46px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 300ms ease;
    border-left: none;

    svg {
        transition: all 300ms ease;
    }

    :hover svg {
        margin-right: 5px;
    }
`;
const directionRight = css`
    background-color: ${colors.mainWhite};
    position: absolute;
    z-index: 9;
    width: 50px;
    height: 46px;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 300ms ease;
    border-right: none;

    svg {
        transform: rotate(180deg);
        transition: all 300ms ease;
    }

    :hover svg {
        margin-left: 5px;
    }
`;

const titleExist = css`
    position: static;
    height: 57px;
    width: 100%;
    font-size: 18px;
    background-color: ${colors.mainPurple};
    transition: all 300ms ease;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: none;

    :hover {
        background-color: ${colors.mainWhite};

        svg {
            margin-top: 5px;
        }
    }

    svg {
        transform: rotate(-90deg);
        margin-left: 10px;
        transition: all 300ms ease;
    }
`;

export const StyledNavElement = styled.div<StyledNavElementProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.mainBlack};
    cursor: pointer;

    ${({ direction }) => direction === 'left' && directionLeft};
    ${({ direction }) => direction === 'right' && directionRight};
    ${({ direction }) => direction === 'up' && directionUp};
    ${({ direction }) => direction === 'down' && directionDown};
    @media screen and (min-width: 1024px) {
        ${({ title }) => title && titleExist};
    }
    :hover {
        background-color: ${colors.mainBlack};
        color: ${colors.mainWhite};

        svg {
            path {
                transition: all 300ms ease;
            }

            path:first-of-type {
                fill: white;
            }

            path:last-of-type {
                stroke: white;
            }
        }
    }
    @media screen and (max-width: 1024px) {
        ${({ title }) =>
            title &&
            css`
                span {
                    display: none;
                }
                svg {
                    margin: 0;
                }
            `}

        :hover {
            background-color: ${colors.mainWhite};
            color: ${colors.mainBlack};
            svg {
                path:first-of-type {
                    fill: ${colors.mainBlack};
                }

                path:last-of-type {
                    stroke: ${colors.mainBlack};
                }
            }
        }
    }
`;
