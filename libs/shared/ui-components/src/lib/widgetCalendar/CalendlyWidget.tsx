import { useState, useRef } from 'react';
import { useCalendlyEventListener, InlineWidget } from 'react-calendly';
import {
    StyledWidgetBookedCall,
    StyledWidgetCalendar,
} from './WidgetCalendar.styled';
import { CALENDLY_URL } from '@breef/shared/constants';
import { useMediaContext } from '@breef/shared/hooks';

export type CalendlyEvents = {
    event: {
        uri: string;
    };
    invitee: {
        uri: string;
    };
};

interface WidgetCalendarProps {
    onChange: (isSucceeded: boolean) => void;
    email?: string;
    companyName?: string;
    firstName?: string;
    lastName?: string;
    projectTypes?: string;
    phoneNumber?: string;
    height?: string;
    isBookedCall?: boolean;
    widgetUrl?: string;
}

export const CalendlyWidget = ({
    onChange,
    email = '',
    companyName = '',
    firstName = '',
    lastName = '',
    projectTypes = '',
    phoneNumber = '',
    isBookedCall = false,
    widgetUrl = '',
}: WidgetCalendarProps) => {
    const { isMobile } = useMediaContext();
    const [isBookedCallEarlier] = useState(isBookedCall);
    const initialWidgetUrl = widgetUrl ? widgetUrl : CALENDLY_URL;

    const pageSettings = useRef({
        primaryColor: 'D96E34',
        textColor: '000000',
        backgroundColor: 'ffffff',
        hideLandingPageDetails: true,
        hideEventTypeDetails: true,
        hideGdprBanner: true,
    });

    const prefill = useRef({
        firstName: firstName,
        lastName: lastName,
        email: email,

        customAnswers: {
            a1: companyName,
            a2: phoneNumber,
            a3: projectTypes,
        },
    });

    useCalendlyEventListener({
        onProfilePageViewed: () => console.log('onProfilePageViewed'),
        onEventTypeViewed: () => console.log('onEventTypeViewed'),
        onEventScheduled: e => {
            console.log('onEventScheduled', e.data.payload);
            onChange(true);
        },
    });

    const isLoading = {
        isLoading: false,
    };

    const styles = !isMobile ? { height: '480px' } : undefined;

    return (
        <StyledWidgetCalendar>
            <div className="wrapper-calendly-widget">
                {isBookedCallEarlier ? (
                    <StyledWidgetBookedCall>
                        <p>
                            Confirmed - A calendar invitation has been sent to
                            your email address
                        </p>
                    </StyledWidgetBookedCall>
                ) : (
                    <InlineWidget
                        url={initialWidgetUrl}
                        pageSettings={pageSettings.current}
                        prefill={prefill.current}
                        styles={styles}
                        {...isLoading}
                    />
                )}
            </div>
        </StyledWidgetCalendar>
    );
};

export default CalendlyWidget;
