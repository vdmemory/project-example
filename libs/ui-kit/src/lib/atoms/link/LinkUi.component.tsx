import React, { ReactNode } from 'react';
import { LinkUiStyled } from './LinkUi.styled';

interface LinkUiProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: 'standalone' | 'inline' | 'button' | 'decoration-none';
    size?: 'medium' | 'small' | 'default';
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    iconLeftArrow?: boolean;
    iconRightArrow?: boolean;
    isDisabled?: boolean;
}

export const LinkUi: React.FC<LinkUiProps> = ({
    variant = 'standalone',
    size = 'default',
    iconLeft,
    iconRight,
    iconLeftArrow = false,
    iconRightArrow = false,
    children,
    isDisabled = false,
    ...rest
}) => {
    return (
        <LinkUiStyled
            className={isDisabled ? 'link-disabled' : 'link'}
            href={rest.href}
            variant={variant}
            size={size}
            data-testid="link"
            {...rest}
        >
            {iconLeft}
            <span className="link-children">
                {children || rest.title || ''}
            </span>
            {iconRight}
        </LinkUiStyled>
    );
};
