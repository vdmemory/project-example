import { TransformGetAvailabilityResponseType } from '@breef/shared/types';
import { uniqueId } from 'lodash';
import moment from 'moment';
import { tz } from 'moment-timezone';
import { DayType, SlotBookingType } from '../types/projectAvailabilityTypes';
import { sortTimeSlots } from '../utils/sortTimeSlots';

export const sortDate = (days: DayType[], type?: 'days' | 'timeSlots') => {
    if (type === 'days') return sortDays(days);
    if (type === 'timeSlots') return sortDaysTimeSlots(days);

    const newDays = sortDays(days);
    const newDaysTimeSlots = sortDaysTimeSlots(newDays);
    return newDaysTimeSlots;
};

const sortDays = (days: DayType[]) => {
    return days.sort((a, b) => {
        if (a.day > b.day) return 1;
        if (a.day < b.day) return -1;
        return 0;
    });
};

const sortDaysTimeSlots = (days: DayType[]) => {
    const newDays = [...days];

    days.forEach((day, index) => {
        if (day.id === newDays[index].id) {
            const newTimeSlots = sortTimeSlots(day.timeSlots);
            newDays.splice(index, 1, {
                ...newDays[index],
                timeSlots: newTimeSlots,
            });
        }
        return newDays;
    });

    return newDays;
};

export const replacementDays = (
    payload: TransformGetAvailabilityResponseType,
) => {
    const newDays: DayType[] = [];

    payload.availabilities.forEach(item => {
        const day = tz(item.fromTime, payload.timeZone);
        const dayIndex = newDays.findIndex(dayItem =>
            dayItem.day.isSame(day, 'day'),
        );

        if (dayIndex === -1) {
            newDays.push({
                id: Number(uniqueId()),
                day,
                timeSlots: [
                    {
                        id: item.id as number,
                        from: tz(item.fromTime, payload.timeZone).format(
                            'HH:mm',
                        ),
                        to: tz(item.toTime, payload.timeZone).format('HH:mm'),
                        isBooked: item.isBooked,
                    },
                ],
            });
        } else {
            newDays[dayIndex].timeSlots.push({
                id: item.id as number,
                from: tz(item.fromTime, payload.timeZone).format('HH:mm'),
                to: tz(item.toTime, payload.timeZone).format('HH:mm'),
                isBooked: item.isBooked,
            });
        }
    });

    return sortDate(newDays);
};

export const replacementDaysToAgency = (
    payload: TransformGetAvailabilityResponseType,
    timezone: string,
) => {
    const newDays: DayType[] = [];

    payload.availabilities.forEach(item => {
        const day = tz(item.fromTime, timezone);
        const dayIndex = newDays.findIndex(dayItem =>
            dayItem.day.isSame(day, 'day'),
        );

        if (dayIndex === -1) {
            newDays.push({
                id: Number(uniqueId()),
                day,
                timeSlots: [
                    {
                        id: item.id as number,
                        from: tz(item.fromTime, timezone).format('HH:mm'),
                        to: tz(item.toTime, timezone).format('HH:mm'),
                        isBooked: item.isBooked,
                    },
                ],
            });
        } else {
            newDays[dayIndex].timeSlots.push({
                id: item.id as number,
                from: tz(item.fromTime, timezone).format('HH:mm'),
                to: tz(item.toTime, timezone).format('HH:mm'),
                isBooked: item.isBooked,
            });
        }
    });

    return sortDate(newDays);
};

export const replacementBookingSlots = (
    payload: TransformGetAvailabilityResponseType,
    timezone: string,
) => {
    const newTimeSlots: SlotBookingType[] = [];

    payload.availabilities.forEach(item => {
        newTimeSlots.push({
            id: item.id as number,
            fromTime: tz(item.fromTime, timezone).format(),
            toTime: tz(item.toTime, timezone).format(),
            isBooked: item.isBooked,
        });
    });

    newTimeSlots.sort((a, b) => {
        const aFromTime = moment(a.fromTime).utcOffset(a.fromTime);
        const bFromTime = moment(b.fromTime).utcOffset(b.fromTime);
        return aFromTime.diff(bFromTime);
    });

    return newTimeSlots;
};

export const replacementSelectedBookingSlot = (
    payload: TransformGetAvailabilityResponseType,
    timezone: string,
) => {
    const bookedSlot = payload.availabilities.find(item => item.isBooked);
    if (!bookedSlot) return null;
    const transformBookedSlot = {
        id: bookedSlot.id as number,
        fromTime: tz(bookedSlot.fromTime, timezone).format(),
        toTime: tz(bookedSlot.toTime, timezone).format(),
        isBooked: bookedSlot.isBooked,
    };

    return transformBookedSlot;
};
