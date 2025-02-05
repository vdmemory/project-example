import { PlusIcon } from '@breef/shared/assets';
import React, { ReactNode } from 'react';
import { StyledLinkButton } from './LinkButton.styled';

interface LinkButtonProps {
    type?: 'submit' | 'button';
    name: string | ReactNode;
    onClick: (event: React.SyntheticEvent) => void;
    disabled?: boolean;
    icon?: 'plus' | 'none';
    line?: boolean;
    typeView?: 'default' | 'inner';
    className?: string;
    size?: 'big' | 'default';
}

export const LinkButton = ({
    type = 'button',
    name,
    onClick,
    disabled = false,
    icon = 'none',
    line = false,
    className,
    size = 'default',
    typeView = 'default',
}: LinkButtonProps) => {
    const handleClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(event);
    };
    return (
        <StyledLinkButton
            data-testid="link-button"
            line={line}
            typeView={typeView}
            disabled={disabled}
            type={type}
            onClick={handleClick}
            size={size}
            className={className}
        >
            {icon === 'plus' && <PlusIcon className="icon-plus" />}
            {name}
        </StyledLinkButton>
    );
};

export default LinkButton;
