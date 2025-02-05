import { FC, ReactNode } from 'react';
import { ListIcon24 } from '@breef/ui-kit';
import { StyledHeaderInfo } from './HeaderInfo.styled';

interface HeaderProps {
    title?: string;
    popupControl?: {
        isOpen: boolean;
        open: () => void;
        close: () => void;
    };
    popup?: ReactNode;
}

export const HeaderInfo: FC<HeaderProps> = ({ title, popupControl, popup }) => {
    const renderLinkButton = () =>
        !!popupControl && (
            <button className="link" onClick={popupControl.open}>
                <ListIcon24 />
                <span className="label">View Scope</span>
            </button>
        );

    return (
        <StyledHeaderInfo>
            {popupControl?.isOpen && popup}
            <h2>{title}</h2>
            {renderLinkButton()}
        </StyledHeaderInfo>
    );
};
