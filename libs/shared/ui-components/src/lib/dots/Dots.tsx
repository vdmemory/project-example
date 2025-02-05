import React from 'react';
import { StyledDots } from './Dots.styled';

export const Dots = ({ className = '' }: { className?: string }) => {
    return (
        <StyledDots className={className}>
            <span></span>
            <span></span>
            <span></span>
        </StyledDots>
    );
};
