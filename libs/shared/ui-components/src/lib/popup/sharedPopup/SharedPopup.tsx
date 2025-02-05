import React from 'react';
import { toast } from 'react-toastify';
import Button from '../../button/Button';
import PopupField from '../popupField/PopupField';
import Switch from '../../switch/Switch';
import { StyledSharedPopup } from './SharedPopup.styled';
import { withPopup } from '../Popup';

interface SharedPopupProps {
    title: string;
    isActiveShare: boolean;
    link: string;
    setActiveShare: () => void;
    close: () => void;
}

export const SharedPopup: React.FC<SharedPopupProps> = ({
    title,
    isActiveShare,
    link,
    setActiveShare,
    close,
}) => {
    const handleGetLink = () => {
        setActiveShare();
    };
    const handleCopyLink = () => {
        if (link) {
            navigator.clipboard.writeText(link);
            toast.success('link copied to clipboard', {
                delay: 1,
            });
            close();
        }
    };
    return (
        <StyledSharedPopup isActive={isActiveShare && !!link}>
            <div className="shared-top--section">
                <h1 className="shared-title">{title}</h1>
                <Switch
                    data-testid="switch-button-share"
                    active={isActiveShare}
                    onChange={handleGetLink}
                />
            </div>
            <div className="shared-bottom--section">
                <PopupField
                    type="text"
                    label="URL"
                    value={link ? link : ''}
                    onChange={() => null}
                    placeholder="URL"
                    disabled={true}
                />
                <Button
                    data-testid="button-copy-link-share"
                    type="button"
                    onClick={handleCopyLink}
                    arrowRight
                    withAnimate
                    className="shared-button"
                >
                    Copy Link
                </Button>
            </div>
        </StyledSharedPopup>
    );
};

export default withPopup(SharedPopup);
