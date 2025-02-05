import { StyledBeforeCreationPopup } from './BeforeCreationPopup.styled';
import { Button } from '../../../button/Button';
import { ReactNode } from 'react';

export interface BeforeCreationPopupProps {
    children: ReactNode;
    label: string;
    note?: string;
    headerImageUrl?: string;
    completeButtonLabel: string;
    onClickComplete: () => void;
    isDisableComplete?: boolean;
    isSubmitting?: boolean;
}

export function BeforeCreationPopup({
    children,
    label,
    note,
    headerImageUrl,
    onClickComplete,
    completeButtonLabel,
    isDisableComplete = false,
    isSubmitting = false,
}: BeforeCreationPopupProps) {
    return (
        <StyledBeforeCreationPopup data-testid="before-creation-popup">
            <div className="header-modal">
                <div className="header-left-container">
                    <span className="label">{label}</span>
                    {note && <span className="note">{note}</span>}
                </div>
                {headerImageUrl && (
                    <div className="header-right-container">
                        <img src={headerImageUrl} alt="" />
                    </div>
                )}
            </div>
            <div className="content-modal">{children}</div>
            <div className="footer-modal">
                <Button
                    title={completeButtonLabel}
                    type="button"
                    arrowRight
                    className="normal"
                    onClick={onClickComplete}
                    disabled={isDisableComplete}
                    withAnimate
                    isSubmitting={isSubmitting}
                />
            </div>
        </StyledBeforeCreationPopup>
    );
}
