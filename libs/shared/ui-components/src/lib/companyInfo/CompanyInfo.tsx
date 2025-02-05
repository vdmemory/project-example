import { useState } from 'react';
import {
    StyledCompanyInfo,
    tooltipPopupStyleCssPreset,
} from './CompanyInfo.styled';
import {
    AvatarImage,
    Button,
    colors,
    ListIcon24,
    SpinnerIcon,
} from '@breef/ui-kit';
import { LocationSmallIcon } from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';
import { useLazyGetAgencyPitchQuery } from '@breef/shared/data-access-project';
import { toast } from 'react-toastify';
import { usePopup } from '../popup/usePopup';
import { getDefaultStylesPopupPreset, Popup } from '../popup/Popup';
import ReviewPitch from '../agencyPitch/reviewPitch/ReviewPitch';

export interface CompanyInfoProps {
    pitchId: number;
    projectId: number;
    companyLogoUrl: string;
    companyName: string;
    officeLocation: string | null;
    isDisplayListIcon?: boolean;
}

export const CompanyInfo = ({
    pitchId,
    projectId,
    companyLogoUrl,
    companyName,
    officeLocation,
    isDisplayListIcon,
}: CompanyInfoProps) => {
    const { isMobile } = useMediaContext();
    const tooltipPopupControl = usePopup();
    const [innerHeight, setInnerHeight] = useState('0px');

    const [getAgencyPitch, { data: agencyPitch, isFetching: isFetchingPitch }] =
        useLazyGetAgencyPitchQuery();

    const handleShowTooltipPopup = async () => {
        try {
            await getAgencyPitch({ projectId, pitchId }).unwrap();
            setInnerHeight(window.innerHeight + 'px');
            tooltipPopupControl.open();
        } catch (error) {
            toast.error('A data retrieval error has occurred.');
        }
    };

    return (
        <StyledCompanyInfo className="company-info">
            {tooltipPopupControl.isOpen && agencyPitch && (
                <Popup
                    close={tooltipPopupControl.close}
                    style={getDefaultStylesPopupPreset(isMobile, innerHeight)}
                    styleCss={tooltipPopupStyleCssPreset}
                >
                    <ReviewPitch
                        className="pitch-details"
                        pitchData={agencyPitch}
                    />
                </Popup>
            )}
            <div className="image-wrapper">
                <AvatarImage
                    className="logo"
                    src={companyLogoUrl}
                    alt="Company Logo"
                    width={55}
                    height={55}
                />
            </div>
            <div className="company-content-wrapper">
                <h3 title={companyName}>{companyName}</h3>
                <div className="group">
                    {officeLocation && (
                        <div className="company-location">
                            <LocationSmallIcon />
                            <span title={officeLocation}>{officeLocation}</span>
                        </div>
                    )}
                    <div className="link">
                        {isDisplayListIcon && <ListIcon24 />}
                        <Button
                            label="View Pitch"
                            size="large"
                            isUppercase
                            onClick={handleShowTooltipPopup}
                            variant="ghost"
                            isDisabled={false}
                        />
                        {isFetchingPitch && (
                            <SpinnerIcon
                                className="loader"
                                data-testid="loader"
                            />
                        )}
                    </div>
                </div>
            </div>
        </StyledCompanyInfo>
    );
};

export default CompanyInfo;
