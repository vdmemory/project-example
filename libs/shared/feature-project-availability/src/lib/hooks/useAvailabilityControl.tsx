import { DEFAULT_TIMEZONE } from '@breef/shared/constants';
import {
    useSetAvailabilityMutation,
    useUpdateAvailabilityMutation,
} from '@breef/shared/data-access-project-availability';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { uniqueId } from 'lodash';
import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    useProjectAvailabilitySelector,
    useProjectAvailabilityActions,
} from '../store/hooks';
import {
    DayType,
    SlotHistoryType,
    SlotType,
} from '../types/projectAvailabilityTypes';
import { filterDays } from '../utils/filterDays';
import { defaultTimeSlots } from '../utils/getDays';
import { transformTimeSlotsToUtc } from '../utils/transformTimeSlotsToUtc';

type ErrorType = {
    status: number;
    originalStatus: number;
    data: {
        detail: string[];
        availabilities: string[];
        delete_availabilities: string[];
        create_availabilities: {
            to_time?: string[];
            from_time?: string[];
        }[];
        non_field_errors: string[];
    };
};

export enum AvailabilityScreen {
    CALENDAR = 'calendar',
    SLOTS = 'slots',
}

export const useAvailabilityControl = ({
    cbFunction,
}: {
    cbFunction?: () => void;
}) => {
    const { isMaxMobile } = useMediaContext();
    const { queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || -1;
    const [screenMobile, setScreenMobile] = useState<AvailabilityScreen>(
        AvailabilityScreen.CALENDAR,
    );
    const [currentSelectDay, setCurrentSelectDay] = useState<Moment | null>(
        null,
    );

    const [
        setAvailability,
        {
            isLoading: loadingPostAvailability,
            error: errorPostAvailability,
            isSuccess: isSuccessPostAvailability,
            isError: isErrorPostAvailability,
        },
    ] = useSetAvailabilityMutation();

    const [
        updateAvailability,
        {
            isLoading: loadingUpdateAvailability,
            error: errorUpdateAvailability,
            isSuccess: isSuccessUpdateAvailability,
            isError: isErrorUpdateAvailability,
        },
    ] = useUpdateAvailabilityMutation();

    const {
        days,
        timeSlotsHistory,
        timezone,
        isEditingAvailability,
        isExistsAvailability,
        userType,
        inviteMembers,
        inviteTeammates,
        createdAt,
        dashboard: { addedTeammates, isDashboardScreen },
    } = useProjectAvailabilitySelector(state => state.projectAvailability);
    const { setIsEditingAvailability, setIsExistsAvailability } =
        useProjectAvailabilityActions();

    const { setDays, updateTimezone } = useProjectAvailabilityActions();

    useEffect(() => {
        if (isSuccessPostAvailability || isSuccessUpdateAvailability) {
            setIsEditingAvailability(true);
            setIsExistsAvailability(true);
        }
        if (isSuccessPostAvailability || isSuccessUpdateAvailability) {
            cbFunction?.();
        }
        if (isErrorPostAvailability || isErrorUpdateAvailability) {
            const fetchErrorUpdate = errorUpdateAvailability as ErrorType;
            const fetchErrorPost = errorPostAvailability as ErrorType;
            const fetchError = fetchErrorUpdate || fetchErrorPost;

            const createAvailableError =
                fetchError?.data?.create_availabilities;
            const createAvailableObject =
                typeof createAvailableError === 'object' &&
                createAvailableError.filter(f => Object.values(f).length)[0];

            const createAvailableMessage = createAvailableObject
                ? {
                      from: createAvailableObject.from_time?.[0],
                      to: createAvailableObject.to_time?.[0],
                  }
                : null;

            const errorDetail = Array.isArray(fetchError?.data?.detail)
                ? fetchError?.data?.detail?.[0]
                : fetchError?.data?.detail;

            const errorMessage =
                errorDetail ||
                fetchError?.data?.availabilities?.[0] ||
                createAvailableMessage?.from ||
                createAvailableMessage?.to ||
                fetchError?.data?.delete_availabilities?.[0] ||
                fetchError?.data?.non_field_errors?.[0] ||
                'Failed to save';

            toast.error(errorMessage);
        }
    }, [
        isSuccessPostAvailability,
        isSuccessUpdateAvailability,
        isErrorPostAvailability,
        isErrorUpdateAvailability,
    ]);

    const updateScreenMobile = (screen: AvailabilityScreen) => {
        if (isMaxMobile) {
            setScreenMobile(screen);
        }
    };

    const handleCurrentSelectDay = (day: Moment) => {
        setCurrentSelectDay(day);
        setScreenMobile(AvailabilityScreen.SLOTS);
    };

    const handleSubmit = async (
        startDateState: Moment,
        blockedDateState: Moment | null,
        endDateState: Moment | null,
    ) => {
        const currentSlots: SlotHistoryType[] = [];

        const filteredDays = filterDays(
            days,
            startDateState,
            blockedDateState,
            endDateState,
        );

        filteredDays.forEach(day => {
            day.timeSlots.forEach(timeSlot => {
                const timeSlotUtc = transformTimeSlotsToUtc(
                    day.day,
                    timeSlot,
                    timezone ?? DEFAULT_TIMEZONE,
                );
                currentSlots.push({
                    ...timeSlotUtc,
                });
            });
        });

        const currentSlotsIds = currentSlots.map(slot => slot.id);
        const savedSlotsIds = timeSlotsHistory.map(slot => slot.id as number);
        const createdSlots = currentSlots.filter(
            slot => !savedSlotsIds.includes(slot.id as number),
        );
        const deletedSlotsIds = savedSlotsIds.filter(
            id => !currentSlotsIds.includes(id),
        );

        try {
            if (isEditingAvailability || isExistsAvailability) {
                const basePayloadOfEditableAvailability = {
                    projectId,
                    availability: {
                        timeZone: timezone ?? DEFAULT_TIMEZONE,
                        deleteAvailabilities: deletedSlotsIds,
                        createAvailabilities: createdSlots,
                        teamMembers: inviteMembers
                            .filter(f => !f.isDisabled)
                            .map(member => member.id),
                        externalUsers: inviteTeammates
                            .filter(f => !f.isDisabled)
                            .map(teammate => teammate.email),
                    },
                };

                const dashboardPayloadOfEditableAvailability = {
                    projectId,
                    availability: {
                        timeZone: timezone ?? DEFAULT_TIMEZONE,
                        deleteAvailabilities: deletedSlotsIds,
                        createAvailabilities: createdSlots,
                        teamMembers: addedTeammates
                            .filter(f => !f.isExternal)
                            .map(member => member.id as number),
                        externalUsers: addedTeammates
                            .filter(f => f.isExternal)
                            .map(f => f.email),
                    },
                };

                await updateAvailability(
                    !isDashboardScreen
                        ? basePayloadOfEditableAvailability
                        : dashboardPayloadOfEditableAvailability,
                ).unwrap();
                return;
            }

            const basePayload = {
                projectId,
                availability: {
                    timeZone: timezone ?? DEFAULT_TIMEZONE,
                    createAvailabilities: createdSlots,
                    teamMembers: inviteMembers.map(member => member.id),
                    externalUsers: inviteTeammates.map(
                        teammate => teammate.email,
                    ),
                },
            };

            const dashboardPayload = {
                projectId,
                availability: {
                    timeZone: timezone ?? DEFAULT_TIMEZONE,
                    createAvailabilities: createdSlots,
                    teamMembers: addedTeammates
                        .filter(f => !f.isExternal)
                        .map(member => member.id as number),
                    externalUsers: addedTeammates
                        .filter(f => f.isExternal)
                        .map(f => f.email),
                },
            };

            await setAvailability(
                !isDashboardScreen ? basePayload : dashboardPayload,
            ).unwrap();
        } catch (e) {
            console.error(e);
        }
    };

    const handleChangeDay = (day: Moment) => {
        const dayAlreadySelected = days.find(
            d => d.day.format('DD/MM/YYYY') === day.format('DD/MM/YYYY'),
        );
        if (isMaxMobile && dayAlreadySelected) return;
        if (dayAlreadySelected) {
            const updatedDays = days.filter(
                d => !(d.day.format('DD/MM/YYYY') === day.format('DD/MM/YYYY')),
            );
            setDays({
                days: updatedDays,
                type: 'days',
            });
            return;
        }

        const updatedDays = [
            ...days,
            {
                id: Number(uniqueId()),
                day,
                timeSlots: defaultTimeSlots(Number(uniqueId())),
            },
        ];
        setDays({
            days: updatedDays,
            type: 'days',
        });
    };

    const handleChangeTimeSlot = (day: Moment, timeSlots: SlotType[]) => {
        const newState = days.map(d => {
            if (d.day.isSame(day, 'day')) {
                return { ...d, timeSlots };
            }
            return d;
        });

        setDays({ days: newState, type: 'timeSlots' });
    };

    const handleRemoveDay = (day: Moment) => {
        const updatedDays = days.filter(d => !d.day.isSame(day, 'day'));
        setDays({
            days: updatedDays,
            type: 'timeSlots',
        });
        updateScreenMobile(AvailabilityScreen.CALENDAR);
    };

    const handleChangeTimezone = (timezone: string) => {
        updateTimezone(timezone);

        const newDays: DayType[] = [];

        days.forEach(day => {
            const zoneNumber = day.day.clone().tz(timezone).utcOffset() / 60;
            const updateDay = day.day
                .clone()
                .utcOffset(zoneNumber, true)
                .startOf('day');

            const newDay = {
                id: Number(uniqueId()),
                day: updateDay,
            };

            const newTimeSlots: SlotType[] = [];
            day.timeSlots.forEach(slot => {
                const newSlot = {
                    ...slot,
                    id: Number(uniqueId()),
                };
                newTimeSlots.push(newSlot);
            });

            newDays.push({ ...newDay, timeSlots: newTimeSlots });
        });

        setDays({ days: newDays, type: 'days' });
    };

    const dataNotExist =
        addedTeammates.length === 0 ||
        filterDays(days, null, null, null).length === 0;

    return {
        data: {
            days,
            timezone,
            userType,
            scheduleCreatedAt: createdAt,
            screenMobile,
            currentSelectDay,
            addedTeammates,
        },
        methods: {
            handleChangeTimezone,
            handleChangeDay,
            handleChangeTimeSlot,
            handleRemoveDay,
            handleSubmit,
            handleCurrentSelectDay,
            updateScreenMobile,
        },
        isEditingAvailability,
        isSubmittedSetAvailability:
            loadingPostAvailability || loadingUpdateAvailability,
        isDisabledNext: dataNotExist && !isEditingAvailability,
    };
};
