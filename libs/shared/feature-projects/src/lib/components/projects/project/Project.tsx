import {
    AgencySelectionPopup,
    BeforeKickoffPopup,
    ProjectAvailabilityPopup,
    PitchReviewPopupClient,
    usePopup,
    ProjectAvailabilityPopupAgency,
} from '@breef/shared/ui-components';
import {
    Choice,
    Filters,
    PitchProjectStatuses,
    PitchProjectStatusesWeight,
    PitchProjectTagsValues,
    PROJECT_EDIT_ROUTE,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import {
    getKeyByEnumValue,
    getPitchProjectStatusWeight,
} from '@breef/shared/utils';
import { ProjectData } from '../Projects';

import {
    useActionButtonProjectConfig,
    useRouteControl,
    useMediaContext,
} from '@breef/shared/hooks';
import CardForClient from './projectCards/cardForClient/CardForClient';
import CardForAgency from './projectCards/cardForAgency/CardForAgency';
import { FilterProjectsType } from '@breef/shared/types';
import React from 'react';

export interface ProjectProps extends ProjectData {
    role?: 'client' | 'agency';
    idx: number;
    clientName?: string;
    clientLogoUrl?: string;
    calendlyLink?: string;
    submissionDeadline?: string;
    filterProjects: FilterProjectsType;
    handleRedirectToProjectListening: (id: number) => void;
    isDisabledPayments?: boolean;
    isReviewedPitches?: boolean;
}

export function Project({
    data: { id, status, name, actionValue, created, budget, progress },
    pitchId,
    paymentId,
    kickoffId,
    role = 'client',
    clientName = '',
    clientLogoUrl = '',
    calendlyLink,
    submissionDeadline = '',
    filterProjects,
    tag,
    hoursToSubmissionDeadline,
    pitchStatus,
    paymentTotalAmount,
    handleRedirectToProjectListening,
    isDisabledPayments,
    isReviewedPitches,
}: ProjectProps) {
    const { changePage } = useRouteControl();
    const { isTablet } = useMediaContext();
    const agencySelectionPopupControl = usePopup();
    const beforeKickoffPopupControl = usePopup();
    const projectAvailabilityPopup = usePopup();
    const pitchesReviewPopup = usePopup();

    const {
        clientProjectActionButtonStatuses,
        agencyProjectActionButtonStatuses,
    } = useActionButtonProjectConfig({
        toggleAgencySelectionPopup: agencySelectionPopupControl.open,
        toggleBeforeKickoffPopup: beforeKickoffPopupControl.open,
        toggleProjectAvailabilityPopup: projectAvailabilityPopup.open,
        togglePitchesReviewPopup: pitchesReviewPopup.open,
        calendlyLink,
        isTablet,
        isDisabledPayments,
        isReviewedPitches,
    });

    const handleClickCard = () => {
        if (role === 'client' && status === ProjectStatuses.draft) {
            return changePage(
                PROJECT_EDIT_ROUTE.reverse({ projectId: id }) || '',
            );
        }

        if (role === 'client' && status === ProjectStatuses.archived) {
            return;
        } else if (
            role === 'agency' &&
            ((filterProjects.status === Filters.archived &&
                (pitchStatus === 'drafted' || !pitchStatus)) ||
                getPitchProjectStatusWeight(status as PitchProjectStatuses) <
                    PitchProjectStatusesWeight.pitchSubmitted)
        ) {
            return;
        }

        return handleRedirectToProjectListening(id);
    };

    const actionButtonConfig =
        role === 'client'
            ? clientProjectActionButtonStatuses[
                  getKeyByEnumValue(
                      ProjectClientActionStatuses,
                      actionValue as ProjectClientActionStatuses,
                  ) ??
                      getKeyByEnumValue(
                          ProjectClientActionStatuses,
                          ProjectClientActionStatuses.other,
                      )
              ]
            : agencyProjectActionButtonStatuses[
                  getKeyByEnumValue(
                      ProjectAgencyActionStatuses,
                      actionValue as ProjectAgencyActionStatuses,
                  )
              ];

    const actionButtonClick = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        if (actionButtonConfig?.onClick)
            return actionButtonConfig.onClick({
                projectId: id,
                pitchId: pitchId,
                paymentId: paymentId,
                kickoffId: kickoffId,
            });
        return undefined;
    };

    const isArchivedCard =
        (filterProjects.status || Filters.active) === Filters.archived;

    return (
        <>
            {pitchesReviewPopup.isOpen && (
                <PitchReviewPopupClient
                    projectId={id}
                    close={pitchesReviewPopup.close}
                />
            )}
            {projectAvailabilityPopup.isOpen && role === 'client' ? (
                <ProjectAvailabilityPopup
                    close={projectAvailabilityPopup.close}
                    projectId={id}
                />
            ) : null}
            {projectAvailabilityPopup.isOpen && role === 'agency' ? (
                <ProjectAvailabilityPopupAgency
                    close={projectAvailabilityPopup.close}
                    projectId={id}
                />
            ) : null}
            {agencySelectionPopupControl.isOpen && (
                <AgencySelectionPopup
                    projectId={id || 0}
                    close={agencySelectionPopupControl.close}
                />
            )}
            {beforeKickoffPopupControl.isOpen && (
                <BeforeKickoffPopup
                    projectId={id || 0}
                    userType={role}
                    close={beforeKickoffPopupControl.close}
                />
            )}
            {role === 'client' ? (
                <CardForClient
                    nextStep={actionButtonConfig?.nextStep}
                    handleClickCard={handleClickCard}
                    actionButtonClick={actionButtonClick}
                    name={name}
                    status={status as ProjectStatuses}
                    isDisabledButton={!actionButtonConfig?.onClick}
                    buttonTitle={actionButtonConfig?.text}
                    tag={
                        !isArchivedCard
                            ? actionButtonConfig?.tag
                            : 'project complete'
                    }
                    filterProjects={filterProjects.status || Filters.active}
                    progress={progress}
                    isAccessDenied={actionButtonConfig?.isAccessDenied}
                />
            ) : (
                <CardForAgency
                    actionButtonClick={actionButtonClick}
                    handleClickCard={handleClickCard}
                    buttonTitle={actionButtonConfig?.text}
                    status={status as PitchProjectStatuses}
                    filterProjects={
                        filterProjects.status || Filters.new_projects
                    }
                    name={name}
                    clientName={clientName}
                    clientLogoUrl={clientLogoUrl}
                    isDisabledButton={!actionButtonConfig?.onClick}
                    tag={
                        (tag as PitchProjectTagsValues) ||
                        PitchProjectTagsValues.newInvitation
                    }
                    hoursToSubmissionDeadline={hoursToSubmissionDeadline || 0}
                    submissionDeadline={submissionDeadline}
                    paymentTotalAmount={paymentTotalAmount}
                    budget={budget as Choice}
                    pitchStatus={pitchStatus}
                />
            )}
        </>
    );
}
