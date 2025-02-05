import React, { FC } from 'react';
import { StyledColoredTag } from './ColoredTag.styled';

export type TagColorType =
    | 'orange'
    | 'green'
    | 'purple'
    | 'blue'
    | 'purple-black'
    | 'yellow-green'
    | 'green-transparent'
    | 'purple-transparent'
    | 'dark-green-transparent'
    | 'orange-transparent'
    | 'blue-transparent'
    | 'turquoise';

interface ColoredTagProps {
    tag: string;
    color?: TagColorType;
    className?: string;
}

export const ColoredTag: FC<ColoredTagProps> = ({ color, tag, className }) => {
    return (
        <StyledColoredTag color={color} className={className}>
            {tag}
        </StyledColoredTag>
    );
};
