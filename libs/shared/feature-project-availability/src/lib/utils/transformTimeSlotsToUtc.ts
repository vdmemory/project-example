import { Moment } from 'moment';
import { SlotType } from '../types/projectAvailabilityTypes';

export const transformTimeSlotsToUtc = (
    day: Moment,
    timeSlot: SlotType,
    timezone: string,
) => {
    const zoneNumber = day.clone().tz(timezone).utcOffset() / 60;
    const newDay = day.clone().utcOffset(zoneNumber, true);
    const fromTime = timeToUtc(newDay, timeSlot.from);
    const toTime = timeToUtc(newDay, timeSlot.to);

    return { id: timeSlot.id, fromTime, toTime, isBooked: timeSlot.isBooked };
};

export const timeToUtc = (day: Moment, time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return day.clone().set({ hour, minute }).utc().format();
};
