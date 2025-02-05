import React, { useEffect, useState } from 'react';

import {
    AgencyPitch,
    LinkButton,
    PageLoader,
    SharedPopup,
    usePopup,
} from '@breef/shared/ui-components';
import { useMyPitchTab } from '../../../hooks/useMyPitchTab';
import { StyledMyPitchTab } from './MyPitchTab.styled';

interface MyPitchTabProps {
    skills: {
        id: number;
        name: string;
        note: string;
    }[];
    pitchId?: number | null;
    userType: 'client' | 'agency';
}

const MyPitchTab = ({ pitchId, userType, skills }: MyPitchTabProps) => {
    const sharePopupControl = usePopup();
    const [activeShare, setActiveShare] = useState(false);

    const {
        getSharingPitchQuery,
        data,
        companyInfoData,
        isLoading,
        isLoadingCompanyInfo,
        link,
        handleSetActiveSharing,
    } = useMyPitchTab({
        userType: userType,
        pitchId: pitchId,
        activeShare: activeShare,
    });

    useEffect(() => {
        if (getSharingPitchQuery.data) {
            setActiveShare(getSharingPitchQuery.data.isSharing);
        }
    }, [getSharingPitchQuery.data, getSharingPitchQuery.data?.isSharing]);

    if (isLoading || isLoadingCompanyInfo || !pitchId) return <PageLoader />;

    if (data && companyInfoData)
        return (
            <StyledMyPitchTab className="pitch-tab">
                {sharePopupControl.isOpen && (
                    <SharedPopup
                        data-testid="share-popup"
                        title="Share project link"
                        isActiveShare={activeShare}
                        link={link}
                        setActiveShare={handleSetActiveSharing}
                        close={sharePopupControl.close}
                    />
                )}
                <LinkButton
                    name="SHARE"
                    className="button-share"
                    onClick={sharePopupControl.open}
                />
                <AgencyPitch
                    pitchData={{
                        ...data,
                        companyName: companyInfoData.companyName ?? '',
                        companyLocation:
                            companyInfoData.officeLocations?.[0]?.name ?? '',
                        companyLogo: {
                            id: companyInfoData.logo,
                            url: companyInfoData.logoUrl,
                        },
                        skills,
                        noteToBreef: undefined,
                    }}
                    className="review-pitch"
                />
            </StyledMyPitchTab>
        );
    return null;
};

export default MyPitchTab;
