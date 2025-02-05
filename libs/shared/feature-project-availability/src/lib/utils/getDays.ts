import { uniqueId } from 'lodash';
import moment from 'moment';
import { Moment } from 'moment';
import { SlotListType } from '../types/projectAvailabilityTypes';

export const defaultTimeSlots = (newId?: number) => [
    {
        id: newId || Number(uniqueId()),
        from: '09:00',
        to: '12:00',
        isBooked: false,
    },
];

export const getStartDay = (timezone: string, startWith?: number) => {
    const day = moment().tz(timezone).startOf('day');

    if (!startWith) return day;
    return day.add(startWith, 'days');
};

export const getEndDay = (
    timezone: string,
    endOn: number,
    startWith?: number,
) => {
    const day = moment().tz(timezone).startOf('day');

    if (!startWith) return day.add(endOn, 'days');
    return day.add(endOn + startWith, 'days');
};

export const getDays = (startDay: Moment) => {
    let newDay = startDay.clone();
    if (newDay.day() === 0 || newDay.day() === 6) {
        newDay = newDay.add(1, 'week').startOf('isoWeek');
    }

    return [
        {
            id: Number(uniqueId()),
            day: newDay,
            timeSlots: defaultTimeSlots(),
        },
    ];
};

export type DatesCalendarType = {
    id: number;
    date: Moment;
    isEditable: boolean;
};

export const generateCalendarDates = (
    start: moment.Moment,
    blocked: moment.Moment | null,
    days: SlotListType[],
) => {
    const dates: DatesCalendarType[] = [];
    const currentDate = start.clone();
    const SEGMENT_DAYS = 21;

    for (let i = 0; dates.length < SEGMENT_DAYS; ) {
        const day = days.find(day =>
            day.day.startOf('day').isSame(currentDate),
        );
        dates.push({
            id: i + 1,
            date: currentDate.clone(),
            isEditable: !!day,
        });
        i++;

        currentDate.add(1, 'days');
    }

    // exclude Blocked date and Weekends
    if (blocked) {
        const datesNotBlockedAndWeekends = dates.filter(
            date =>
                date.date.day() !== 0 &&
                date.date.day() !== 6 &&
                date.date.diff(blocked, 'days') > 0,
        );
        return datesNotBlockedAndWeekends;
    }

    // exclude Saturdays and Sundays
    const datesNotWeekends = dates.filter(
        date => date.date.day() !== 0 && date.date.day() !== 6,
    );
    return datesNotWeekends;
};
