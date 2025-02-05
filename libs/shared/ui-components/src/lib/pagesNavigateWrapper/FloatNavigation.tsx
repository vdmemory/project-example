import { StyledFloatNavigation } from './Navigation.styled';
import React from 'react';

/* eslint-disable-next-line */
export interface FloatNavigationProps {
    children: React.ReactNode;
    parent: 'header' | 'footer';
}

export function FloatNavigation({ children, parent }: FloatNavigationProps) {
    return (
        <StyledFloatNavigation parent={parent}>
            <ul className="float-navigation">{children}</ul>
        </StyledFloatNavigation>
    );
}

export default FloatNavigation;
