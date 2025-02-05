import {
    CLIENT_AGENCY_SELECTION_ROUTE,
    ProjectStatuses,
    ProjectStatusesWeight,
    ScheduledCallsStatusNames,
} from '@breef/shared/constants';
import { useGetScheduledCallsListQuery } from '@breef/shared/data-access-project-availability';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { ScheduledCallsListType } from '@breef/shared/types';
import { CompanyInfo } from '@breef/shared/ui-components';
import { getProjectStatusWeight } from '@breef/shared/utils';
import { Button, ScheduledCallsListSkeleton } from '@breef/ui-kit';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useProjectAvailabilitySelector } from '../../../store/hooks';
import {
    getNameActionButton,
    getNameStatus,
} from '../../../utils/helperFunction';
import {
    StyledItem,
    StyledScheduledCallsList,
} from './ScheduledCallsList.styled';

interface AgenciesSelectionListProps {
    updateScreen?: () => void;
}

export const ScheduledCallsList = ({
    updateScreen,
}: AgenciesSelectionListProps) => {
    const { queryParams, changePage } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || 0;
    const { isLoading, isError } = useGetScheduledCallsListQuery(projectId);

    useEffect(() => {
        if (!isError) return;
        toast.error('An error occurred while loading data from the server');
    }, [isError]);

    const {
        dashboard: { scheduledCallsList },
        projectStatus,
    } = useProjectAvailabilitySelector(state => state).projectAvailability;

    if (!scheduledCallsList.length) return null;

    const handleUpdateAvailability = () => {
        updateScreen?.();
    };

    const redirectToAgenciesSelection = () =>
        changePage(
            CLIENT_AGENCY_SELECTION_ROUTE.reverse({
                projectId,
            }) || '0',
        );

    if (isLoading) return <ScheduledCallsListSkeleton />;

    const renderItem = (item: ScheduledCallsListType) => {
        return (
            <Item
                key={item.id}
                projectId={projectId}
                projectStatus={projectStatus}
                data={item}
                onClick={handleUpdateAvailability}
                onSubmit={redirectToAgenciesSelection}
            />
        );
    };

    return (
        <StyledScheduledCallsList>
            <ul className="list">{scheduledCallsList.map(renderItem)}</ul>
        </StyledScheduledCallsList>
    );
};

interface DatesProps {
    data: ScheduledCallsListType;
    projectId: number;
    projectStatus: string | null;
    onSubmit: (pitchId: number) => Promise<void>;
    isLoading?: boolean;
    onClick: () => void;
}

const Item = ({
    data: {
        id,
        status,
        timeSlotDate,
        pitchId,
        agency: { name, logoUrl, officeLocation },
        isArchived,
    },
    projectId,
    projectStatus,
    onSubmit,
    isLoading,
    onClick,
}: DatesProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { isMobile } = useMediaContext();
    const handleSelectTeam = async () => {
        setIsSubmitted(true);
        await onSubmit(pitchId);
        setIsSubmitted(false);
    };

    const projectStatusWeight = projectStatus
        ? getProjectStatusWeight(projectStatus as ProjectStatuses)
        : undefined;
    const isExistProjectStatus = projectStatusWeight !== undefined;

    const showButtons =
        !isExistProjectStatus ||
        projectStatusWeight < ProjectStatusesWeight.teamSelected;

    const showActionSubmit = !isArchived;
    const showSelectButton =
        status === ScheduledCallsStatusNames.MEETING_COMPLETED && !isArchived;
    const showArchivePlaceholder = isArchived;

    const renderStatus = () => (
        <div className="status">{getNameStatus(status, timeSlotDate)}</div>
    );

    return (
        <StyledItem className="item" key={`${status}-${id}`}>
            {isMobile && renderStatus()}
            <CompanyInfo
                companyName={name}
                officeLocation={officeLocation}
                companyLogoUrl={logoUrl}
                projectId={projectId}
                pitchId={pitchId}
            />
            <div className="group">
                {!isMobile && renderStatus()}
                {showButtons && (
                    <div className="buttons">
                        {showActionSubmit && (
                            <Button
                                variant={isMobile ? 'outlined' : 'ghost'}
                                className="action-btn"
                                label={getNameActionButton(status)}
                                size="medium"
                                onClick={onClick}
                            />
                        )}
                        {showSelectButton && (
                            <Button
                                className="select-btn"
                                label="Select Agency"
                                size="medium"
                                onClick={
                                    !isLoading ? handleSelectTeam : undefined
                                }
                                isSubmitted={isSubmitted}
                            />
                        )}
                        {showArchivePlaceholder && (
                            <div className="archive-placeholder">
                                Pitch was archived
                            </div>
                        )}
                    </div>
                )}
            </div>
        </StyledItem>
    );
};
