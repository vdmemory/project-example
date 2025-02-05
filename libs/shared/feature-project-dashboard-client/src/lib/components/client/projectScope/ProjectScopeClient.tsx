import { PUBLIC_PROJECT_ROUTE } from '@breef/shared/constants';
import { ProjectByIdType } from '@breef/shared/types';

import {
    useGetSharingProjectQuery,
    useUpdateIsSharingMutation,
} from '@breef/shared/data-access-project';
import {
    PageLoader,
    ReviewProjectCreation,
    SharedPopup,
    usePopup,
} from '@breef/shared/ui-components';
import { Button as ButtonUiKit, LinkIcon24 } from '@breef/ui-kit';
import React, { useEffect, useState } from 'react';
import { getHostName, getProjectData } from '@breef/shared/utils';
import styled from '@emotion/styled';
import { useDashboardSelector } from '../../../store/hooks';
import { useMediaContext } from '@breef/shared/hooks';

const StyledProjectScopeClient = styled.div`
    position: relative;
    padding: 60px 0 40px;
    width: 100%;
    max-width: 1130px;
    margin: -40px auto 0;

    @media screen and (max-width: 1100px) {
        padding: 110px 0 40px;
        margin-top: -90px;
    }

    @media screen and (max-width: 1024px) {
        padding: 20px 0 0;
        margin: 0 -20px -40px;
    }

    .project-shared-link {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        gap: 6px;
        align-items: center;

        @media screen and (max-width: 1100px) {
            left: 0;
            right: auto;
        }

        @media screen and (max-width: 1024px) {
            display: none;
        }

        :hover button {
            color: #eebba3;
            transition: none;
        }
        :hover svg path {
            stroke: #eebba3;
        }

        button {
            font-size: 12px;
            font-family: 'SuisseIntlMono';
            min-width: auto;
            padding: 0;
            color: #da6c37;
            transition: none;

            .label {
                text-decoration: underline;
            }
        }

        svg {
            margin-left: -3px;
        }
    }
`;

type Props = {
    projectId: number;
    projectData: ProjectByIdType | null;
    userType: 'client' | 'agency';
    companyName: string;
    isLoading?: boolean;
};

export const ProjectScopeClient: React.FC<Props> = ({
    projectId,
    projectData,
    userType,
    companyName,
    isLoading,
}) => {
    const hostName = getHostName();
    const sharePopupControl = usePopup();
    const { isMobile } = useMediaContext();

    const sharingProjectQuery = useGetSharingProjectQuery({
        projectId: projectId,
        userType,
    });
    const { brandLeadFullData } = useDashboardSelector(
        state => state.dashboard,
    );

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

    const dataProject =
        (companyName &&
            projectData &&
            getProjectData(projectData as ProjectByIdType)) ||
        null;

    const link = `${hostName}/public/${sharingProjectQuery.data?.token}${PUBLIC_PROJECT_ROUTE}`;

    if (isLoading) return <PageLoader />;
    if (!dataProject) return null;

    return (
        <StyledProjectScopeClient className="review-project">
            {sharePopupControl.isOpen && (
                <SharedPopup
                    title="Share project link"
                    isActiveShare={activeShare}
                    link={link}
                    setActiveShare={handleSetActiveSharing}
                    close={sharePopupControl.close}
                />
            )}
            <div className="project-shared-link">
                <LinkIcon24 />
                <ButtonUiKit
                    label="SHARE PROJECT"
                    size="large"
                    isUppercase
                    onClick={sharePopupControl.open}
                    variant="ghost"
                    isDisabled={false}
                />
            </div>
            <ReviewProjectCreation
                data={dataProject}
                brandLead={isMobile ? brandLeadFullData : null}
            />
        </StyledProjectScopeClient>
    );
};
