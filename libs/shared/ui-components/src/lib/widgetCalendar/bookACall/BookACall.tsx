import { useEffect } from 'react';
import { StyledBookACall } from './BookACall.styled';
import CalendlyWidget from '../CalendlyWidget';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import LipsLoader from '../../loader/lipsLoader/LipsLoader';
import { HubspotWidget } from '../HubspotWidget';

interface BookACallProps {
    height?: string;
    isBookedCall?: boolean;
    bookCallCallback?: (isSucceeded: boolean) => void;
    isBorder?: boolean;
    widgetUrl?: string;
    getEmail?: (email: string) => void;
    isHubspotMeetings?: boolean;
}

export const BookACall = ({
    bookCallCallback,
    isBookedCall = false,
    isBorder = false,
    widgetUrl,
    getEmail,
    isHubspotMeetings,
}: BookACallProps) => {
    const { data: selfData, isLoading: isLoadingSelf } = useGetSelfQuery();
    const { data: companyData, isLoading: isLoadingProfile } =
        useGetCompanyInfoQuery(
            { companyType: selfData?.companyType || '' },
            { skip: !selfData },
        );

    const handleChange = (isSucceeded: boolean) => {
        if (bookCallCallback) bookCallCallback(isSucceeded);
    };

    useEffect(() => {
        getEmail && selfData && getEmail(selfData.email);
    }, [selfData]);
    const isLoading = isLoadingSelf || isLoadingProfile;

    const renderWidget = () => {
        if (isLoading && !selfData && !companyData) return <LipsLoader />;
        if (isHubspotMeetings)
            return (
                <HubspotWidget
                    widgetUrl={
                        widgetUrl ??
                        companyData?.brandLead.brandLead.calendlyLink
                    }
                    onChange={handleChange}
                    email={selfData?.email}
                    isBookedCall={isBookedCall}
                />
            );

        return (
            <CalendlyWidget
                widgetUrl={
                    widgetUrl
                        ? widgetUrl
                        : companyData?.brandLead.brandLead.calendlyLink
                }
                onChange={handleChange}
                email={selfData?.email}
                companyName={companyData?.companyName}
                projectTypes={companyData?.companyRole || ''}
                phoneNumber={selfData?.phoneNumber}
                firstName={selfData?.firstName}
                lastName={selfData?.lastName}
                isBookedCall={isBookedCall}
            />
        );
    };

    return (
        <StyledBookACall
            data-testid="book-a-call"
            className="calendar"
            isBorder={isBorder}
        >
            {renderWidget()}
        </StyledBookACall>
    );
};

export default BookACall;
