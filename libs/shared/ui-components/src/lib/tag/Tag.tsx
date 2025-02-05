import React, { FC, ReactNode } from 'react';
import { StyledTag } from './Tag.styled';

interface ChipProps {
    children?: ReactNode;
    title?: string;
    tooltip?: string;
    className?: string;
}
export const Tag: FC<ChipProps> = ({ children, tooltip, title, className }) => {
    return (
        <StyledTag title={tooltip} className={className}>
            {title ? <span>{title}</span> : children}
        </StyledTag>
    );
};

export default Tag;
