import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { motion } from 'framer-motion';

type StyledLinkProps = {
    type: 'orange' | 'normal' | 'float';
    width: 'fixed' | 'auto';
    notice?: number | null;
    marker?: boolean;
    disabled?: boolean;
};

const normal = css`
    background: ${colors.mainWhite};
    border-left: 1px solid black;

    &:hover a {
        text-decoration: line-through;

        @media screen and (max-width: 512px) {
            text-decoration: unset;
        }
    }
    a {
        height: 100%;
        color: ${colors.mainBlack};
    }
`;

const orange = css`
    background: ${colors.mainOrange};
    border-left: 1px solid black;
    &:hover a {
        text-decoration: line-through;

        @media screen and (max-width: 512px) {
            text-decoration: unset;
        }
    }
    a {
        color: ${colors.mainWhite};
    }
`;

const float = css`
    border-left: none;
    padding: 0 40px;
    @media screen and (max-width: 1024px) {
        padding: 0 15px;
    }

    a {
        color: ${colors.mainBlack};
        height: 100%;
        padding-top: 5px;
    }
`;

const fixed = css`
    min-width: 155px;
`;

const auto = css`
    min-width: auto;
    padding: 0 20px;
    a svg {
        margin-left: 0;
    }
`;

const noticeCss = css`
    background: ${colors.mainOrange};
    color: ${colors.mainWhite};
    border-radius: 50%;
    width: 21px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    margin-left: 3px;
    padding-top: 1px;
`;

const markerCss = css`
    height: 8px;
    width: 8px;
    background: ${colors.mainOrange};
    border-radius: 50%;
    position: absolute;
    top: 4px;
    right: 1px;
`;

const checkIsDisabledLink = ({ disabled }: StyledLinkProps) =>
    disabled &&
    css`
        pointer-events: none;
        a {
            color: ${colors.mainPlaceholder};
        }
    `;

export const StyledLink = styled(motion.li)<StyledLinkProps>`
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    line-height: 30px;
    cursor: pointer;

    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;

        svg {
            margin-left: 5px;
        }
    }

    button {
        .main-content {
            &-text {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                position: relative;
                letter-spacing: 0.7px;
                line-height: 30px;
                svg {
                    margin-left: 5px;
                }
            }
        }
        &:hover {
            text-decoration: line-through;

            @media screen and (max-width: 512px) {
                text-decoration: unset;
            }
        }
    }

    .notice {
        ${({ notice }) => (notice ? noticeCss : '')}
    }

    .marker {
        ${({ marker }) => (marker ? markerCss : css``)}
    }

    ${({ width }) => width === 'auto' && auto};
    ${({ width }) => width === 'fixed' && fixed};
    ${({ type }) => type === 'normal' && normal};
    ${({ type }) => type === 'orange' && orange};
    ${({ type }) => type === 'float' && float};
    ${checkIsDisabledLink};
`;

export const StyledActiveLine = styled(motion.span)`
    width: 100%;
    height: 4px;
    position: absolute;
    bottom: 0px;
    left: 0;
    background-color: black;
`;
