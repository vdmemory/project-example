import React, { FC } from 'react';
import { StyledSuccessPopup } from './SuccessPopup.styled';
import { Button, CloseIcon } from '@breef/ui-kit';
import { Popup } from '../Popup';
import { SuccessIcon } from '@breef/shared/assets';
import { getPopupStylePreset } from '../createPasswordPopup/CreatePasswordPopup.styled';
import { useMediaContext } from '@breef/shared/hooks';

interface SuccessPopupProps {
    title: string;
    subtitle: string;
    buttonTitle: string;
    onClick: () => void;
    onClose: () => void;
}

export const SuccessPopup: FC<SuccessPopupProps> = ({
    buttonTitle,
    title,
    subtitle,
    onClick,
    onClose,
}) => {
    const { isMobile } = useMediaContext();

    return (
        <Popup style={getPopupStylePreset(isMobile)} isClosable={false}>
            <StyledSuccessPopup>
                <div className="close-wrapper">
                    <CloseIcon
                        className="close-button"
                        role="button"
                        onClick={onClose}
                    />
                </div>
                <div className="popup-body">
                    <SuccessIcon />
                    <h3>{title}</h3>
                    <span>{subtitle}</span>
                </div>
                <Button
                    label={buttonTitle}
                    size="medium"
                    onClick={onClick}
                    className="button-save"
                />
            </StyledSuccessPopup>
        </Popup>
    );
};
