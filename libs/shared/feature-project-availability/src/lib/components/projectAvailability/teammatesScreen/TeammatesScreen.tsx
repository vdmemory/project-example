import { FC, Fragment, ReactNode, useEffect } from 'react';
import { ScreenWrapper } from '../screenWrapper/ScreenWrapper';
import {
    StyledLeftSection,
    StyledRightSection,
    StyledTeammatesScreen,
} from './TeammatesScreen.styled';
import {
    Button,
    NavControl,
    ProjectAvailabilitySuccessPopup,
    TeammatesSelect,
    TipCard,
    usePopup,
} from '@breef/shared/ui-components';
import { useGetTeamMembersQuery } from '@breef/shared/data-access-profile';
import { BrandLeadFullType } from '@breef/shared/types';
import {
    useProjectAvailabilityActions,
    useProjectAvailabilitySelector,
} from '../../../store/hooks';
import {
    useSetBookingSlotMutation,
    useUpdateBookingSlotMutation,
} from '@breef/shared/data-access-project-availability';
import { useRouteControl } from '@breef/shared/hooks';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { toast } from 'react-toastify';
import { TeammatesSelectAgencySkeleton } from '@breef/ui-kit';

type ErrorType = {
    status: number;
    originalStatus: number;
    data: {
        detail: string | string[];
        time_slot: string | string[];
    };
};

interface TeammatesScreenProps {
    onNext: () => void;
    brandLead: BrandLeadFullType;
    renderNavigation?: () => ReactNode;
    onPrev?: () => void;
}

export const TeammatesScreen: FC<TeammatesScreenProps> = ({
    onNext,
    brandLead,
    renderNavigation,
    onPrev,
}) => {
    const { changePage, queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || -1;

    const { data: teamMembersData, isFetching: isLoadingTeamMembers } =
        useGetTeamMembersQuery();

    const controlFinalPopUp = usePopup();

    const [
        saveSelectedSlot,
        {
            isLoading: loadingSaveSelectedSlot,
            error: errorSaveSelectedSlot,
            isSuccess: isSuccessSaveSelectedSlot,
            isError: isErrorSaveSelectedSlot,
        },
    ] = useSetBookingSlotMutation();

    const [
        updateSelectedSlot,
        {
            isLoading: loadingUpdateSelectedSlot,
            error: errorUpdateSelectedSlot,
            isSuccess: isSuccessUpdateSelectedSlot,
            isError: isErrorUpdateSelectedSlot,
        },
    ] = useUpdateBookingSlotMutation();

    useEffect(() => {
        if (isSuccessSaveSelectedSlot || isSuccessUpdateSelectedSlot) {
            controlFinalPopUp.open();
        }
        if (isErrorSaveSelectedSlot || isErrorUpdateSelectedSlot) {
            const fetchErrorUpdate = errorSaveSelectedSlot as ErrorType;
            const fetchErrorPost = errorUpdateSelectedSlot as ErrorType;
            const fetchError = fetchErrorUpdate || fetchErrorPost;

            const errorDetail = Array.isArray(fetchError?.data?.detail)
                ? fetchError?.data?.detail?.[0]
                : fetchError?.data?.detail;

            const errorMessage =
                errorDetail ||
                fetchError?.data?.time_slot?.[0] ||
                'Failed to save';
            toast.error(errorMessage);
        }
    }, [
        isSuccessSaveSelectedSlot,
        isSuccessUpdateSelectedSlot,
        isErrorSaveSelectedSlot,
        isErrorUpdateSelectedSlot,
    ]);

    const {
        inviteTeammates,
        inviteMembers,
        teammatesList,
        initialInviteTeammates,
        userType,
        selectedBookingSlot,
        isEditingBookingSlots,
        clientName,
    } = useProjectAvailabilitySelector(state => state).projectAvailability;

    const {
        changeInviteMembers,
        changeInviteTeammates,
        addTeammate,
        resetAvailability,
    } = useProjectAvailabilityActions();

    const onChangeTeammates = (teammate: { id?: number; email: string }) => {
        if (teammate.id !== undefined) {
            changeInviteMembers({ ...teammate, id: teammate.id });
        } else {
            changeInviteTeammates(teammate);
        }
    };

    const handleNext = () => {
        if (userType === 'client') return onNext();

        if (isEditingBookingSlots) {
            updateSelectedSlot({
                projectId,
                bookingSlotId: selectedBookingSlot?.id || null,
                teamMembers: inviteMembers
                    .filter(f => !f.isDisabled)
                    .map(member => member.id),
                externalUsers: inviteTeammates
                    .filter(f => !f.isDisabled)
                    .map(teammate => teammate.email),
            });
            return;
        }

        saveSelectedSlot({
            projectId,
            bookingSlotId: selectedBookingSlot?.id || null,
            teamMembers: inviteMembers.map(member => member.id),
            externalUsers: inviteTeammates.map(teammate => teammate.email),
        });
    };

    const teamMembers:
        | {
              isDisabled?: boolean;
              id: number;
              email: string;
              firstName: string;
              lastName: string;
              phoneNumber?: string | undefined;
              position: string;
          }[]
        | undefined = [];

    teamMembersData?.teamMembers.forEach(teamMember => {
        const isDisabled = initialInviteTeammates.some(
            inviteMember => inviteMember === teamMember.id,
        );

        teamMembers.push({
            ...teamMember,
            isDisabled,
        });
    });

    const teamList = teamMembers ? [...teamMembers, ...teammatesList] : [];
    const selectedTeammates = [...inviteTeammates, ...inviteMembers];
    const isValidScreen = selectedTeammates.length > 0;

    const getTipDescription = () => {
        if (userType === 'client')
            return 'This is a great time to introduce your team to your favorite agencies.';
        return `This is a great time to introduce your team to the ${clientName}.`;
    };

    const getHeaderDescription = () => {
        if (userType === 'client')
            return 'Who should join you on the agency intro calls? Add team members below.';
        return `Who should join you on the client intro call? Add team members below.`;
    };

    const handleClick = () => {
        controlFinalPopUp.close();
        changePage(PROJECTS_ROUTE);
        resetAvailability();
    };

    const isSubmitting = loadingSaveSelectedSlot || loadingUpdateSelectedSlot;

    return (
        <Fragment>
            {renderNavigation ? (
                <NavControl key="nav-control-booking" handleBack={onPrev}>
                    {renderNavigation()}
                </NavControl>
            ) : null}

            <ScreenWrapper
                title="ADD YOUR TEAM MEMBERS"
                description={getHeaderDescription()}
            >
                {controlFinalPopUp.isOpen && (
                    <ProjectAvailabilitySuccessPopup
                        userType={userType}
                        onClick={handleClick}
                    />
                )}
                <StyledTeammatesScreen>
                    <div className="screen-content">
                        <StyledLeftSection>
                            <TipCard
                                leadFirstName={brandLead.firstName}
                                leadLastName={brandLead.lastName}
                                logoUrl={brandLead.brandLead.logoUrl}
                                className="teammates-screen-tip"
                                tip={{
                                    title: 'QUICK TIP:',
                                    description: getTipDescription(),
                                }}
                            />
                        </StyledLeftSection>
                        <StyledRightSection>
                            {!isLoadingTeamMembers ? (
                                <TeammatesSelect
                                    onChange={onChangeTeammates}
                                    onAdd={addTeammate}
                                    selectedTeammates={selectedTeammates}
                                    teammatesList={teamList}
                                />
                            ) : (
                                <TeammatesSelectAgencySkeleton />
                            )}
                        </StyledRightSection>
                    </div>
                    <Button
                        disabled={
                            isLoadingTeamMembers ||
                            !isValidScreen ||
                            isSubmitting
                        }
                        isSubmitting={isSubmitting}
                        className="medium"
                        onClick={handleNext}
                        title="Next"
                        arrowRight
                        withAnimate
                    />
                </StyledTeammatesScreen>
            </ScreenWrapper>
        </Fragment>
    );
};
