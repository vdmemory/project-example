import React from 'react';
import { closeIcon, NextNavArrow } from '@breef/shared/assets';
import { StyledFieldButton } from './FieldButton.styled';

interface FieldButtonProps {
    wrapperClassName?: string;
    className?: string;
    onClick: (e: React.SyntheticEvent) => void;
    isDisabled?: boolean;
    type?: 'button' | 'submit';
    view?: 'arrow' | 'close' | 'check';
}

export const FieldButton = ({
    wrapperClassName,
    className,
    onClick,
    isDisabled = false,
    type = 'button',
    view = 'arrow',
}: FieldButtonProps) => {
    const handleClick = (e: React.SyntheticEvent) => {
        if (type === 'submit') return;
        onClick(e);
    };

    let icon = null;
    if (view === 'arrow') {
        icon = <NextNavArrow className={`arrow icon ${className}`} />;
    }
    if (view === 'close') {
        icon = (
            <img
                src={closeIcon}
                className={`close icon ${className}`}
                alt="Close"
            />
        );
    }

    return (
        <StyledFieldButton
            data-testid="field-button"
            type={type}
            className={wrapperClassName}
            onClick={handleClick}
            disabled={isDisabled}
        >
            {icon}
        </StyledFieldButton>
    );
};

export default FieldButton;
