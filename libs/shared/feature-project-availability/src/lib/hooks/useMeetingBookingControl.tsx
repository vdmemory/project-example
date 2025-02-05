import { useGetAvailabilityQuery } from '@breef/shared/data-access-project-availability';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { uniqueId } from 'lodash';
import moment from 'moment';
import { Moment } from 'moment';
import { useContext, useEffect, useState } from 'react';
import {
    useProjectAvailabilitySelector,
    useProjectAvailabilityActions,
} from '../store/hooks';
import { DayType, SlotBookingType } from '../types/projectAvailabilityTypes';
import { getTimeToTimezone } from '../utils/transformTimeSlotsToTimezone';
import { tz } from 'moment-timezone';

export enum MeetingBookingScreen {
    CALENDAR = 'calendar',
    SLOTS = 'slots',
}

export const useMeetingBookingControl = () => {
    const { isMaxMobile } = useMediaContext();
    const { queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || -1;

    const [screenMobile, setScreenMobile] = useState<MeetingBookingScreen>(
        MeetingBookingScreen.CALENDAR,
    );
    const [currentSelectDay, setCurrentSelectDay] = useState<Moment | null>(
        null,
    );

    const availabilityQuery = useGetAvailabilityQuery(projectId, {
        refetchOnMountOrArgChange: true,
    });

    const {
        days,
        selectedBookingSlot,
        timezone,
        clientName,
        bookingSlots,
        isEditingBookingSlots,
        isLoadingData,
    } = useProjectAvailabilitySelector(state => state).projectAvailability;
    const { setSelectedBookingSlot, updateTimezone, setDays, setBookingSlots } =
        useProjectAvailabilityActions();

    const currentSlot = bookingSlots?.[0];

    const [currentBookingSlots, setCurrentBookingSlots] = useState<
        SlotBookingType[] | null
    >(filterCurrentSlots(bookingSlots, currentSlot));

    useEffect(() => {
        if (!timezone) return;

        if (selectedBookingSlot) {
            setCurrentBookingSlots(
                filterCurrentSlots(bookingSlots, selectedBookingSlot),
            );
            return;
        }

        const currentBookingDay = currentBookingSlots?.[0];
        if (currentBookingDay) {
            setCurrentBookingSlots(
                filterCurrentSlots(bookingSlots, currentBookingDay),
            );
        }

        const currentSlot = bookingSlots?.[0];
        if (!currentSlot) return;

        setCurrentBookingSlots(filterCurrentSlots(bookingSlots, currentSlot));
    }, [timezone, bookingSlots]);

    function filterCurrentSlots(
        slots: SlotBookingType[],
        currentSlot: SlotBookingType,
    ) {
        if (!currentSlot) return null;
        const filteringSlot: SlotBookingType[] = [];

        slots.forEach(slot => {
            const timeSlotFormat = moment(slot.fromTime)
                .utcOffset(slot.fromTime)
                .format('DD/MM/YYYY');

            const dayFormat = moment(currentSlot.fromTime)
                .utcOffset(currentSlot.fromTime)
                .format('DD/MM/YYYY');

            if (timeSlotFormat === dayFormat) {
                filteringSlot.push(slot);
            }
        });
        return filteringSlot ?? null;
    }

    const updateScreenMobile = (screen: MeetingBookingScreen) => {
        if (isMaxMobile) setScreenMobile(screen);
    };

    const handleSelectDay = (day: Moment) => {
        const filteringSlot: SlotBookingType[] = [];
        bookingSlots.forEach(slot => {
            const timeSlotFormat = moment(slot.fromTime)
                .utcOffset(slot.fromTime)
                .format('DD/MM/YYYY');

            const dayFormat = day.format('DD/MM/YYYY');
            if (timeSlotFormat === dayFormat) {
                filteringSlot.push(slot);
            }
        });
        setCurrentBookingSlots(filteringSlot ?? null);
        if (isMaxMobile) setScreenMobile(MeetingBookingScreen.SLOTS);
    };

    const handleBookSlot = (bookingSlot: SlotBookingType | null) => {
        setSelectedBookingSlot(bookingSlot);
    };

    const handleChangeTimezone = (timezone: string) => {
        updateTimezone(timezone);

        const newBookingSlots: SlotBookingType[] = [];
        bookingSlots.forEach(slot => {
            const newSlot = {
                ...slot,
                fromTime: tz(slot.fromTime, timezone).format(),
                toTime: tz(slot.toTime, timezone).format(),
            };
            newBookingSlots.push(newSlot);
        });

        newBookingSlots.sort((a, b) => {
            const aFromTime = moment(a.fromTime).utcOffset(a.fromTime);
            const bFromTime = moment(b.fromTime).utcOffset(b.fromTime);
            return aFromTime.diff(bFromTime);
        });

        let newSelectedBookingSlot: SlotBookingType | null = null;
        if (selectedBookingSlot) {
            newSelectedBookingSlot = {
                ...selectedBookingSlot,
                fromTime: tz(selectedBookingSlot.fromTime, timezone).format(),
                toTime: tz(selectedBookingSlot.toTime, timezone).format(),
            };
        }

        let newDays: DayType[] = [];
        newBookingSlots.forEach(slot => {
            const formatDay = moment(slot.fromTime).utcOffset(slot.fromTime);

            const day = newDays.find(d => d.day.isSame(formatDay, 'day'));
            if (day) {
                day.timeSlots.push({
                    id: slot.id,
                    from: getTimeToTimezone(formatDay, slot.fromTime, timezone),
                    to: getTimeToTimezone(formatDay, slot.toTime, timezone),
                    isBooked: slot.isBooked,
                });
            } else {
                newDays = [
                    ...newDays,
                    {
                        id: Number(uniqueId()),
                        day: formatDay,
                        timeSlots: [
                            {
                                id: slot.id,
                                from: getTimeToTimezone(
                                    formatDay,
                                    slot.fromTime,
                                    timezone,
                                ),
                                to: getTimeToTimezone(
                                    formatDay,
                                    slot.toTime,
                                    timezone,
                                ),
                                isBooked: slot.isBooked,
                            },
                        ],
                    },
                ];
            }
        });

        setSelectedBookingSlot(newSelectedBookingSlot);
        setBookingSlots(newBookingSlots);
        setDays({ days: newDays, type: 'days' });
    };

    const isNotAvailable =
        availabilityQuery.isSuccess &&
        availabilityQuery.data?.availabilities.length === 0;

    return {
        data: {
            days,
            timezone,
            bookingSlots: currentBookingSlots,
            selectedSlot: selectedBookingSlot,
            clientName,
            screenMobile,
        },
        methods: {
            handleBookSlot,
            handleSelectDay,
            handleChangeTimezone,
            updateScreenMobile,
        },
        isNotAvailable,
        loadingAvailability: availabilityQuery.isLoading || isLoadingData,
        isSuccessAvailability: availabilityQuery.isSuccess,
        isEditing: isEditingBookingSlots,
    };
};
