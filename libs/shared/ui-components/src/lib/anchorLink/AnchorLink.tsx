import React, { FC, ReactNode } from 'react';

export interface LinkProps {
    href?: string;
    className?: string;
    children: ReactNode;
}

export const AnchorLink: FC<LinkProps> = ({ href, children, className }) => (
    <a
        href={href}
        className={className}
        onClick={e => e.stopPropagation()}
        target="_blank"
        rel="noreferrer"
    >
        {children}
    </a>
);
