import {
    getPopupStylePreset,
    StyledBookACallModifiedPopup,
} from './BookACallModifiedPopup.styled';
import { BookACall } from '../../widgetCalendar/bookACall/BookACall';
import { CloseIcon } from '@breef/shared/assets';
import { Popup } from '../Popup';
import { useMediaContext } from '@breef/shared/hooks';
import { Button } from '@breef/ui-kit';
import { useState } from 'react';

interface BookACallModifiedPopupProps {
    onClose: () => void;
    onSelectMeeting?: (isSucceeded: boolean) => void;
    selectMeeting?: boolean;
    onNext: () => void;
}

export const BookACallModifiedPopup = ({
    onClose,
    onSelectMeeting,
    selectMeeting,
    onNext,
}: BookACallModifiedPopupProps) => {
    const { isMobile } = useMediaContext();
    const [calendarSelect, setCalendarSelect] = useState<boolean>(false);
    const [hasBookedCall] = useState(selectMeeting);

    const handleBookCall = (isSucceeded: boolean) => {
        setCalendarSelect(isSucceeded);
        onSelectMeeting?.(isSucceeded);
    };

    const isSubmitDisplay = !!onNext;
    const isSubmitDisable = !calendarSelect && !hasBookedCall;
    const isCloseButtonDisplay = !!onClose;

    const title = 'Book a planning call';
    const description = 'Finalize your project with a Breef Strategist';

    return (
        <Popup
            key={'popup-book-a-call-modified'}
            style={getPopupStylePreset(isMobile)}
            isClosable={false}
        >
            <StyledBookACallModifiedPopup>
                <div className="form-header">
                    <div className="group">
                        <h3 className="title">{title}</h3>
                        <p className="description">{description}</p>
                    </div>
                    {isCloseButtonDisplay && (
                        <div className="close-wrapper">
                            <CloseIcon
                                className="close-button"
                                role="button"
                                onClick={onClose}
                            />
                        </div>
                    )}
                </div>
                <div className="form-body">
                    <BookACall
                        bookCallCallback={handleBookCall}
                        isHubspotMeetings
                        isBookedCall={hasBookedCall}
                    />
                </div>
                <div className="form-footer">
                    {isSubmitDisplay && (
                        <Button
                            label="Next"
                            size="medium"
                            isDisabled={isSubmitDisable}
                            onClick={onNext}
                            className="button-save"
                            iconPlacement="right"
                        />
                    )}
                </div>
            </StyledBookACallModifiedPopup>
        </Popup>
    );
};
