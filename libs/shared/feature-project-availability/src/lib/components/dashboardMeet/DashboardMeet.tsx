import { useRouteControl } from '@breef/shared/hooks';
import { useEffect, useState } from 'react';
import {
    DashboardMeetScreenHistory,
    DashboardMeetScreenNames,
} from '../../types/projectAvailabilityTypes';
import { DASHBOARD_PITCHES_ROUTE } from '@breef/shared/constants';
import { StyledDashboardMeet } from './DashboardMeet.styled';
import { IntroCallAvailability } from './introCallAvailability/IntroCallAvailability';
import { ScheduledCallsList } from './scheduledCallsList/ScheduledCallsList';
import { useProjectAvailabilitySelector } from '../../store/hooks';

export const DashboardMeet = () => {
    const { changePage, queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || -1;

    const { isEditingAvailability } = useProjectAvailabilitySelector(
        state => state.projectAvailability,
    );

    const [screenHistory, setScreenHistory] =
        useState<DashboardMeetScreenHistory>([null]);

    const screen = screenHistory[screenHistory.length - 1];

    useEffect(() => {
        if (isEditingAvailability === null) return;
        if (isEditingAvailability) {
            setScreenHistory([DashboardMeetScreenNames.SELECT_TEAM]);
            return;
        }

        setScreenHistory([DashboardMeetScreenNames.AVAILABILITY]);
    }, [isEditingAvailability]);

    const handleToSelectTeam = () => {
        setScreenHistory([
            ...screenHistory,
            DashboardMeetScreenNames.SELECT_TEAM,
        ]);
    };

    const handleToAvailability = () => {
        setScreenHistory([
            ...screenHistory,
            DashboardMeetScreenNames.AVAILABILITY,
        ]);
    };

    const handleNext = handleToSelectTeam;
    const handlePrev = () => {
        if (screenHistory.length === 1) {
            changePage(
                DASHBOARD_PITCHES_ROUTE.reverse({ projectId }) as string,
            );
            return;
        }

        const newScreenHistory = [...screenHistory];
        newScreenHistory.pop();
        setScreenHistory(newScreenHistory);
    };

    const renderScreen = () => {
        switch (screen) {
            case DashboardMeetScreenNames.AVAILABILITY:
                return (
                    <IntroCallAvailability
                        key="intro-call-availability"
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                );
            case DashboardMeetScreenNames.SELECT_TEAM:
                return (
                    <ScheduledCallsList
                        key="agencies-list-screen"
                        updateScreen={handleToAvailability}
                    />
                );
            default:
                return null;
        }
    };

    return <StyledDashboardMeet>{renderScreen()}</StyledDashboardMeet>;
};
