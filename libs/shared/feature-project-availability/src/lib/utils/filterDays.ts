import moment from 'moment';
import { Moment } from 'moment';
import { DayType } from '../types/projectAvailabilityTypes';

export const filterDays = (
    days: DayType[],
    start?: Moment | null,
    blocked?: Moment | null,
    end?: Moment | null,
): DayType[] => {
    let filteredDays = days.filter(f => {
        if (!start) return true;
        const day = moment(f.day).startOf('day');

        return start.diff(day, 'days') <= 0;
    });

    filteredDays = filteredDays.filter(f => {
        if (!blocked) return true;
        const day = moment(f.day).startOf('day');

        return day.diff(blocked, 'days') > 0;
    });

    filteredDays = filteredDays.filter(f => {
        if (!end) return true;
        const day = moment(f.day).startOf('day');

        return day.diff(end, 'days') <= 0;
    });

    return filteredDays;
};
