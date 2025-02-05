import { StyledSaveButton } from './SaveButton.styled';
import { CheckBlackIcon, ThreeDotsIcon } from '@breef/shared/assets';
import React, { useEffect, useState } from 'react';

/* eslint-disable-next-line */
interface SaveButtonProps {
    type: 'submit' | 'button';
    onClick?: () => void;
    title?: string;
    titleSubmitting?: string;
    titleSuccess?: string;
    isSubmitting: boolean;
    isSuccess: boolean;
    disabled: boolean;
    className?: string;
}

export const SaveButton = ({
    type,
    onClick,
    title = 'Save',
    titleSubmitting = 'Saving',
    titleSuccess = 'Saved',
    isSubmitting,
    isSuccess,
    disabled,
    className,
}: SaveButtonProps) => {
    const [isSuccessState, setIsSuccessState] = useState(false);
    const displayTitle = isSubmitting
        ? titleSubmitting
        : isSuccessState
        ? titleSuccess
        : title;

    useEffect(() => {
        setIsSuccessState(isSuccess);
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessState) {
            setTimeout(() => {
                setIsSuccessState(false);
            }, 3000);
        }
    }, [isSuccessState]);

    return (
        <StyledSaveButton
            data-testid="custom-save-button"
            isSuccess={isSuccessState}
            isSubmitting={isSubmitting}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={className}
        >
            <div className="main-content">
                <CheckBlackIcon className="check-icon" />
                <span>{displayTitle}</span>
                <ThreeDotsIcon className="three-dots-icon" />
            </div>
        </StyledSaveButton>
    );
};

export default SaveButton;
