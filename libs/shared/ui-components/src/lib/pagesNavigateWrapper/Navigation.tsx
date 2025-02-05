import { StyledNavigation } from './Navigation.styled';
import React from 'react';

/* eslint-disable-next-line */
export interface NavigationProps {
    children: React.ReactNode;
    parent: 'header' | 'footer';
    type?: 'normal' | 'float';
}

export function Navigation({
    children,
    parent,
    type = 'normal',
}: NavigationProps) {
    return (
        <StyledNavigation parent={parent} type={type}>
            <ul className="navigation">{children}</ul>
        </StyledNavigation>
    );
}

export default Navigation;
