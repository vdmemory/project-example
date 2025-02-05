import { useState, useRef, useEffect } from 'react';
import { InlineWidget } from 'react-calendly';
import {
    StyledWidgetBookedCall,
    StyledWidgetCalendar,
} from './WidgetCalendar.styled';
import { useMediaContext } from '@breef/shared/hooks';

interface WidgetCalendarProps {
    onChange: (isSucceeded: boolean) => void;
    email?: string;
    isBookedCall?: boolean;
    widgetUrl?: string;
}

export const HubspotWidget = ({
    onChange,
    email = '',
    isBookedCall = false,
    widgetUrl = '',
}: WidgetCalendarProps) => {
    const { isMobile } = useMediaContext();
    const initialWidgetUrl = widgetUrl;

    const prefill = useRef({
        email: email,
    });

    const isLoading = {
        isLoading: false,
    };

    const getEvents = (event: MessageEvent<any>) => {
        if (
            !event.origin.includes('hubspot') &&
            !event.origin.includes('meetings.breef')
        )
            return;

        const isMeetingBookSucceeded = event.data.meetingBookSucceeded;
        isMeetingBookSucceeded && onChange(isMeetingBookSucceeded);
    };

    useEffect(() => {
        window.addEventListener('message', getEvents);
        return () => {
            window.removeEventListener('message', getEvents);
        };
    }, []);

    const styles = !isMobile ? { height: '480px' } : undefined;

    return (
        <StyledWidgetCalendar>
            <div className="wrapper-calendly-widget">
                {isBookedCall ? (
                    <StyledWidgetBookedCall>
                        <p>
                            {`Meeting time requested. Expect an email confirming your meeting request or suggesting a new meeting time.`}
                        </p>
                    </StyledWidgetBookedCall>
                ) : (
                    <InlineWidget
                        url={initialWidgetUrl}
                        prefill={prefill.current}
                        styles={styles}
                        {...isLoading}
                    />
                )}
            </div>
        </StyledWidgetCalendar>
    );
};
