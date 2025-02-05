import { StyledBookACallPopup } from './BookACallPopup.styled';
import { BookACall } from '../../widgetCalendar/bookACall/BookACall';
import { handPointerImage } from '@breef/shared/assets';
import { Popup } from '../Popup';
import { CSSProperties, FC } from 'react';
import { useMediaContext } from '@breef/shared/hooks';

interface BookACallPopupProps {
    close: () => void;
}

export const BookACallPopup: FC<BookACallPopupProps> = props => {
    const { isMobile } = useMediaContext();
    const popupStylePreset: CSSProperties = {
        overflow: !isMobile ? 'visible' : 'auto',
        maxWidth: '800px',
        minWidth: '280px',
        width: '100%',
    };
    return (
        <Popup style={popupStylePreset} {...props}>
            <StyledBookACallPopup>
                <div className="header-bar">
                    <h1>Book a call with breef</h1>

                    <span className="note">
                        Grab time below to chat through project needs, budgets,
                        questions and more!
                    </span>

                    <div className="image-support-wrapper">
                        <img src={handPointerImage.src} alt="Expert Support" />
                    </div>
                </div>
                <div className="modal-main-content-wrapper">
                    <BookACall />
                </div>
            </StyledBookACallPopup>
        </Popup>
    );
};
