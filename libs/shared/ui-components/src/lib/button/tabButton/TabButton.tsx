import { StyledTabButton } from './TabButton.styled';
import { ArrowIcon } from '@breef/shared/assets';
import React from 'react';

/* eslint-disable-next-line */
export interface TabButtonProps {
    title: string;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
}

export function TabButton({
    title,
    onClick,
    isActive = false,
    disabled = false,
}: TabButtonProps) {
    return (
        <StyledTabButton
            onClick={onClick}
            isActive={isActive}
            disabled={disabled}
        >
            {title}
            <div className="icon-wrapper">
                <ArrowIcon className="arrow-bottom arrow" />
            </div>
        </StyledTabButton>
    );
}
