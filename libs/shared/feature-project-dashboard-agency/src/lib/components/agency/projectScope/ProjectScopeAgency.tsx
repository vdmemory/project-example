import { PUBLIC_PROJECT_ROUTE } from '@breef/shared/constants';
import {
    useGetSharingProjectQuery,
    useUpdateIsSharingMutation,
} from '@breef/shared/data-access-project';
import {
    LinkButton,
    PageLoader,
    ReviewProjectCreation,
    SharedPopup,
    usePopup,
} from '@breef/shared/ui-components';
import React, { useEffect, useState } from 'react';
import { PitchPreviewResponse } from '@breef/shared/types';

type Props = {
    projectId: number;
    projectData: PitchPreviewResponse | null;
    userType: 'client' | 'agency';
};

const ProjectScopeAgency: React.FC<Props> = ({
    projectId,
    projectData,
    userType,
}) => {
    const sharePopupControl = usePopup();
    const { location } = window;
    const hostName =
        location.hostname === 'localhost'
            ? 'localhost:4200'
            : `https://${location.hostname}`;

    const sharingProjectQuery = useGetSharingProjectQuery({
        projectId: projectId,
        userType,
    });
    const [fetchUpdateIsSharing] = useUpdateIsSharingMutation();
    const [activeShare, setActiveShare] = useState(false);

    useEffect(() => {
        if (sharingProjectQuery.data) {
            setActiveShare(sharingProjectQuery.data.isSharing);
        }
    }, [sharingProjectQuery.data, sharingProjectQuery.data?.isSharing]);

    const handleSetActiveSharing = () => {
        fetchUpdateIsSharing({
            id: projectId,
            isSharing: !activeShare,
            userType,
        });
    };

    const link = `${hostName}/public/${sharingProjectQuery.data?.token}${PUBLIC_PROJECT_ROUTE}`;
    return !projectData?.description ? (
        <PageLoader />
    ) : projectData?.isAcceptedTerms ? (
        <div className="review-project">
            {sharePopupControl.isOpen && (
                <SharedPopup
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
            <ReviewProjectCreation data={projectData} />
        </div>
    ) : null;
};

export default ProjectScopeAgency;
