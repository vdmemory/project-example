import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import {
    ExpandedStepperNavigation,
    NavControl,
    PageLoader,
    ReviewProjectPopup,
    usePopup,
} from '@breef/shared/ui-components';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useProjectInfoControl } from '../../hooks/useProjectInfoControl';
import {
    AvailabilityScreenHistory,
    AvailabilityScreenNames,
} from '../../types/projectAvailabilityTypes';
import { Availability } from './availability/Availability';
import { StyledProjectAvailability } from './ProjectAvailability.styled';
import { TeammatesScreen } from './teammatesScreen/TeammatesScreen';
import {
    BrandLeadFullType,
    PitchPreviewResponse,
    ProjectByIdType,
} from '@breef/shared/types';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { AnimatePresence } from 'framer-motion';
import { useProjectAvailabilitySelector } from '../../store/hooks';
import { MeetingBooking } from './meetingBooking/MeetingBooking';
import { useGetAvailabilityQuery } from '@breef/shared/data-access-project-availability';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { defaultErrorHandler } from '@breef/shared/utils';

export const ProjectAvailability = () => {
    const { isMaxMobile } = useMediaContext();
    const { changePage, queryParams } = useRouteControl();
    const projectPopup = usePopup();

    const projectId = (queryParams as { projectId?: number }).projectId || -1;

    const availabilityQuery = useGetAvailabilityQuery(projectId, {
        refetchOnMountOrArgChange: true,
    });

    const { userType } = useProjectAvailabilitySelector(
        state => state,
    ).projectAvailability;

    const getInitScreen = () => {
        if (userType === 'agency') return AvailabilityScreenNames.MEETINGS;
        return AvailabilityScreenNames.TEAMMATES;
    };

    const [screenHistory, setScreenHistory] =
        useState<AvailabilityScreenHistory>([getInitScreen()]);
    const screen = screenHistory[screenHistory.length - 1];

    const handleNext = () => {
        if (userType === 'agency') {
            setScreenHistory([
                ...screenHistory,
                AvailabilityScreenNames.TEAMMATES,
            ]);
            return;
        }

        setScreenHistory([
            ...screenHistory,
            AvailabilityScreenNames.AVAILABILITY,
        ]);
    };
    const handlePrev = () => {
        if (screenHistory.length === 1) {
            changePage(PROJECTS_ROUTE);
            return;
        }

        const newScreenHistory = [...screenHistory];
        newScreenHistory.pop();
        setScreenHistory(newScreenHistory);
    };

    const {
        project: {
            projectInfoAgency,
            projectInfoClient,
            companyInfo,
            loadingProject,
            errorGetProject,
        },
    } = useProjectInfoControl({
        userType,
    });

    const renderNavigation = (): ReactNode => {
        return (
            <ExpandedStepperNavigation
                title={projectInfoClient?.name ?? projectInfoAgency?.name ?? ''}
                readOnly
                onButtonClick={() => changePage(PROJECTS_ROUTE)}
                isShowIconInfo
                customPopup={renderPopupProject()}
                customPopupControl={projectPopup}
            />
        );
    };

    const renderScreen = (brandLead: BrandLeadFullType) => {
        switch (screen) {
            case AvailabilityScreenNames.TEAMMATES:
                return (
                    <TeammatesScreen
                        key="teammate-screen"
                        onNext={handleNext}
                        brandLead={brandLead}
                        renderNavigation={
                            isMaxMobile ? renderNavigation : undefined
                        }
                        onPrev={isMaxMobile ? handlePrev : undefined}
                    />
                );
            case AvailabilityScreenNames.AVAILABILITY:
                return (
                    <Availability
                        key="availability-screen"
                        renderNavigation={
                            isMaxMobile ? renderNavigation : undefined
                        }
                        onPrev={isMaxMobile ? handlePrev : undefined}
                    />
                );
            case AvailabilityScreenNames.MEETINGS:
                return (
                    <MeetingBooking
                        key="meeting-booking-screen"
                        onNext={handleNext}
                        renderNavigation={
                            isMaxMobile ? renderNavigation : undefined
                        }
                        onPrev={isMaxMobile ? handlePrev : undefined}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        const error = (availabilityQuery.error ||
            errorGetProject) as FetchBaseQueryError;
        if (error) {
            changePage(PROJECTS_ROUTE).finally(() => {
                if (error.status === 403) {
                    toast.error('403 - Permission denied to load this page');
                } else {
                    defaultErrorHandler(error);
                }
            });
        }
    }, [availabilityQuery.error, errorGetProject]);

    if (
        loadingProject ||
        availabilityQuery.isLoading ||
        availabilityQuery.isError ||
        !!errorGetProject
    )
        return <PageLoader />;

    const renderPopupProject = () => {
        const data =
            (projectInfoClient as ProjectByIdType) ??
            (projectInfoAgency as PitchPreviewResponse);

        return (
            <ReviewProjectPopup projectData={data} close={projectPopup.close} />
        );
    };

    return (
        <StyledProjectAvailability>
            {!isMaxMobile && (
                <NavControl handleBack={handlePrev}>
                    {renderNavigation()}
                </NavControl>
            )}
            <AnimatePresence exitBeforeEnter>
                {companyInfo && renderScreen(companyInfo.brandLead)}
            </AnimatePresence>
        </StyledProjectAvailability>
    );
};
