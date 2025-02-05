import { Moment } from 'moment';

export const getDayToTimezone = (day: Moment, timezone: string) => {
    return day.clone().tz(timezone);
};

export const getTimeToTimezone = (
    day: Moment,
    time: string,
    timezone: string,
) => {
    const [hour, minute] = time.split(':').map(Number);
    return day.clone().set({ hour, minute }).tz(timezone).format('HH:mm');
};
