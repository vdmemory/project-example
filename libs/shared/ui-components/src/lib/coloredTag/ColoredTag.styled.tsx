import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { css } from '@emotion/react';
import { TagColorType } from './ColoredTag';

interface StyledColoredTagProps {
    color?: TagColorType;
}

const shortColorsToDefaultCss = (
    background: string,
    color: string,
    border: string,
) => css`
    background: ${background};
    color: ${color};
    border: 1px solid ${border};
`;

const colorToCss = ({ color }: StyledColoredTagProps) => {
    switch (color) {
        case 'green':
            return shortColorsToDefaultCss(
                colors.transparentGreen,
                colors.green,
                colors.green,
            );
        case 'orange':
            return shortColorsToDefaultCss(
                colors.transparentOrange,
                colors.mainOrange,
                colors.mainOrange,
            );
        case 'purple-black':
            return shortColorsToDefaultCss(
                colors.darkPurple,
                colors.mainBlack,
                colors.strokeGray,
            );
        case 'purple':
            return shortColorsToDefaultCss(
                colors.darkPurple,
                colors.solidPurple,
                colors.solidPurple,
            );
        case 'blue':
            return shortColorsToDefaultCss(
                colors.lightBlue,
                colors.darkBlue,
                colors.darkBlue,
            );
        case 'yellow-green':
            return shortColorsToDefaultCss(
                colors.lightYellow,
                colors.yellowGreen,
                colors.yellowGreen,
            );
        case 'green-transparent':
            return shortColorsToDefaultCss(
                'transparent',
                colors.green,
                colors.green,
            );
        case 'purple-transparent':
            return shortColorsToDefaultCss(
                'transparent',
                colors.solidPurple,
                colors.solidPurple,
            );
        case 'dark-green-transparent':
            return shortColorsToDefaultCss(
                'transparent',
                colors.yellowGreen,
                colors.yellowGreen,
            );
        case 'orange-transparent':
            return shortColorsToDefaultCss(
                'transparent',
                colors.mainOrange,
                colors.mainOrange,
            );
        case 'blue-transparent':
            return shortColorsToDefaultCss(
                'transparent',
                colors.darkBlue,
                colors.darkBlue,
            );
        case 'turquoise':
            return shortColorsToDefaultCss(
                'transparent',
                colors.turquoise,
                colors.turquoise,
            );
        default:
            return shortColorsToDefaultCss(
                colors.transparentGrey,
                colors.mainBlack,
                colors.strokeGray,
            );
    }
};

export const StyledColoredTag = styled.p`
    ${colorToCss};
    font-family: ${fonts.accent};
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.05em;
    line-height: 16px;
    text-transform: uppercase;
    padding: 4px 12px;
    display: inline;
    white-space: nowrap;
`;
