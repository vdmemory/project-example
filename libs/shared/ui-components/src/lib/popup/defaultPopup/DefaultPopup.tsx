import { StyledDefaultPopup } from './DefaultPopup.styled';
import React, { ReactNode } from 'react';
import { Button } from '../../button/Button';

export interface DefaultPopupProps {
    onSubmit?: () => void;
    label: string | ReactNode;
    isDisabledBtn: boolean;
    children: ReactNode | ReactNode[];
    typeButton?: 'submit' | 'button';
    buttonView?: 'uppercase' | 'default';
    onClick?: () => void;
    buttonTitle?: string;
}

export const DefaultPopup: React.FC<DefaultPopupProps> = ({
    onSubmit,
    label,
    isDisabledBtn,
    children,
    typeButton = 'submit',
    buttonView = 'default',
    onClick,
    buttonTitle = 'Add',
}) => {
    return (
        <StyledDefaultPopup onSubmit={onSubmit}>
            <div className="header-popup">{label}</div>
            {children}
            <div className="footer-popup">
                <Button
                    title={buttonTitle}
                    type={typeButton}
                    className={`normal ${
                        buttonView === 'uppercase' && 'button-uppercase'
                    }`}
                    arrowRight={buttonView === 'default'}
                    disabled={isDisabledBtn}
                    onClick={onClick}
                    withAnimate
                />
            </div>
        </StyledDefaultPopup>
    );
};
