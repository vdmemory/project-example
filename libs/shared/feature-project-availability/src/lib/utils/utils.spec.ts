import moment from 'moment';
import 'moment-timezone';
import { DayType } from '../types/projectAvailabilityTypes';
import { filterDays } from './filterDays';
import { getAmPmAvailability, getAmPmBookMeeting } from './getAmPm';
import { defaultTimeSlots, getStartDay, getEndDay, getDays } from './getDays';
import { getNextTime, getNextSlot } from './getNextSlot';
import { sortTimeSlots } from './sortTimeSlots';
import {
    getDayToTimezone,
    getTimeToTimezone,
} from './transformTimeSlotsToTimezone';
import { transformTimeSlotsToUtc, timeToUtc } from './transformTimeSlotsToUtc';

describe('Utils', () => {
    describe('filterDays', () => {
        const mockDays: DayType[] = [
            {
                id: 1,
                day: moment('2023-01-01'),
                timeSlots: [
                    { id: 11, from: '09:00', to: '12:00', isBooked: false },
                    { id: 12, from: '14:00', to: '18:00', isBooked: true },
                ],
            },
        ];

        it('filters days based on start date', () => {
            const startDate = moment('2023-01-05');
            const result = filterDays(mockDays, startDate);

            expect(result).toEqual([]);
        });

        it('filters days based on blocked date', () => {
            const blockedDate = moment('2023-01-05');
            const result = filterDays(mockDays, undefined, blockedDate);

            expect(result).toEqual([]);
        });

        it('filters days based on end date', () => {
            const endDate = moment('2023-01-05');
            const result = filterDays(mockDays, undefined, undefined, endDate);

            expect(result).toEqual([
                {
                    id: 1,
                    day: moment('2023-01-01'),
                    timeSlots: [
                        { id: 11, from: '09:00', to: '12:00', isBooked: false },
                        { id: 12, from: '14:00', to: '18:00', isBooked: true },
                    ],
                },
            ]);
        });

        it('filters days based on all parameters', () => {
            const startDate = moment('2023-01-01');
            const blockedDate = moment('2023-01-05');
            const endDate = moment('2023-01-10');
            const result = filterDays(
                mockDays,
                startDate,
                blockedDate,
                endDate,
            );

            expect(result).toEqual([]);
        });
    });

    describe('getAmPmAvailability', () => {
        it('formats time to AM/PM correctly', () => {
            const inputTime = '14:30';
            const result = getAmPmAvailability(inputTime);
            expect(result).toBe('02:30 pm');
        });

        it('handles 23:59 correctly', () => {
            const inputTime = '23:59';
            const result = getAmPmAvailability(inputTime);
            expect(result).toBe('12:00 am');
        });
    });

    describe('getAmPmBookMeeting', () => {
        it('formats time for booking meeting correctly', () => {
            const inputTime = '2023-01-01T14:30:00Z'; // Assuming UTC time
            const result = getAmPmBookMeeting(inputTime);
            // Adjust the expectation based on your expected result
            expect(result).toBe('2:30 pm');
        });
    });

    describe('defaultTimeSlots', () => {
        it('returns default time slots with a unique ID', () => {
            const result = defaultTimeSlots();
            expect(result).toHaveLength(1);
            expect(result[0].isBooked).toBe(false);
            expect(result[0].from).toBe('09:00');
            expect(result[0].to).toBe('12:00');
            expect(result[0].id).toBeDefined();
        });

        it('allows providing a custom ID', () => {
            const customId = 123;
            const result = defaultTimeSlots(customId);
            expect(result[0].id).toBe(customId);
        });
    });

    describe('getStartDay', () => {
        it('returns the start day with the correct timezone', () => {
            const timezone = 'America/New_York';
            const result = getStartDay(timezone);
            const expected = moment().tz(timezone).startOf('day');
            expect(result.isSame(expected)).toBe(true);
        });

        it('returns the start day with an offset if specified', () => {
            const timezone = 'America/New_York';
            const offset = 5;
            const result = getStartDay(timezone, offset);
            const expected = moment()
                .tz(timezone)
                .startOf('day')
                .add(offset, 'days');
            expect(result.isSame(expected)).toBe(true);
        });
    });

    describe('getEndDay', () => {
        it('returns the end day with the correct timezone and endOn', () => {
            const timezone = 'America/New_York';
            const endOn = 7;
            const result = getEndDay(timezone, endOn);
            const expected = moment()
                .tz(timezone)
                .startOf('day')
                .add(endOn, 'days');
            expect(result.isSame(expected)).toBe(true);
        });

        it('returns the end day with an offset if specified', () => {
            const timezone = 'America/New_York';
            const endOn = 7;
            const offset = 5;
            const result = getEndDay(timezone, endOn, offset);
            const expected = moment()
                .tz(timezone)
                .startOf('day')
                .add(endOn + offset, 'days');
            expect(result.isSame(expected)).toBe(true);
        });
    });

    // describe('getDays', () => {
    //     it('returns an array of days starting from the provided start day', () => {
    //         const startDay = moment('2023-01-01');
    //         const result = getDays(startDay);
    //         expect(result).toHaveLength(1);
    //         expect(result[0].timeSlots).toEqual(defaultTimeSlots(3));
    //     });
    // });

    describe('getNextTime', () => {
        it('calculates the next time correctly', () => {
            const currentTime = '12:30';
            const nextTime = '1:30';
            const result = getNextTime(currentTime, nextTime);
            expect(result).toBe('14:00');
        });

        it('handles midnight correctly', () => {
            const currentTime = '23:45';
            const nextTime = '1:00';
            const result = getNextTime(currentTime, nextTime);
            expect(result).toBe('00:45');
        });
    });

    describe('getNextSlot', () => {
        it('calculates the next slot correctly', () => {
            const currentTime = '12:30';
            const id = 1;
            const result = getNextSlot(currentTime, id);
            expect(result.id).toBe(id);
            expect(result.from).toBe('12:30');
            expect(result.to).toBe('13:30');
            expect(result.isBooked).toBe(false);
        });

        it('handles 23:00 correctly', () => {
            const currentTime = '23:00';
            const id = 2;
            const result = getNextSlot(currentTime, id);
            expect(result.id).toBe(id);
            expect(result.from).toBe('23:00');
            expect(result.to).toBe('23:59');
            expect(result.isBooked).toBe(false);
        });
    });

    describe('sortTimeSlots', () => {
        it('sorts time slots correctly', () => {
            const slots = [
                { id: 1, from: '14:00', to: '15:00', isBooked: false },
                { id: 2, from: '09:00', to: '10:00', isBooked: true },
                { id: 3, from: '12:30', to: '13:30', isBooked: false },
            ];

            const result = sortTimeSlots(slots);

            expect(result).toHaveLength(3);
            expect(result[0].id).toBe(2);
            expect(result[1].id).toBe(3);
            expect(result[2].id).toBe(1);
        });

        it('handles empty array correctly', () => {
            const result = sortTimeSlots([]);
            expect(result).toHaveLength(0);
        });

        it('handles same time slots correctly', () => {
            const slots = [
                { id: 1, from: '10:00', to: '11:00', isBooked: false },
                { id: 2, from: '10:00', to: '11:00', isBooked: true },
                { id: 3, from: '10:00', to: '11:00', isBooked: false },
            ];

            const result = sortTimeSlots(slots);

            expect(result).toHaveLength(3);
            expect(result[0].id).toBe(1);
            expect(result[1].id).toBe(2);
            expect(result[2].id).toBe(3);
        });
    });

    describe('getDayToTimezone', () => {
        it('converts the day to the specified timezone', () => {
            const day = moment('2023-01-01');
            const timezone = 'America/New_York';
            const result = getDayToTimezone(day, timezone);

            const expected = day.clone().tz(timezone);

            expect(result.isSame(expected)).toBe(true);
        });
    });

    describe('getTimeToTimezone', () => {
        it('converts the time to the specified timezone', () => {
            const day = moment('2023-01-01');
            const time = '12:30';
            const timezone = 'America/New_York';
            const result = getTimeToTimezone(day, time, timezone);

            const expected = day
                .clone()
                .set({ hour: 12, minute: 30 })
                .tz(timezone)
                .format('HH:mm');

            expect(result).toBe(expected);
        });

        it('handles midnight correctly', () => {
            const day = moment('2023-01-01');
            const time = '00:30';
            const timezone = 'America/New_York';
            const result = getTimeToTimezone(day, time, timezone);

            const expected = day
                .clone()
                .set({ hour: 0, minute: 30 })
                .tz(timezone)
                .format('HH:mm');

            expect(result).toBe(expected);
        });
    });

    // describe('transformTimeSlotsToUtc', () => {
    //     it('transforms time slots to UTC correctly', () => {
    //         const day = moment('2023-01-01');
    //         const timeSlot = {
    //             id: 1,
    //             from: '12:30',
    //             to: '14:00',
    //             isBooked: false,
    //         };
    //         const timezone = 'America/New_York';

    //         const result = transformTimeSlotsToUtc(day, timeSlot, timezone);

    //         const expectedFrom = day
    //             .clone()
    //             .set({ hour: 19, minute: 30 })
    //             .utc()
    //             .format();
    //         const expectedTo = day
    //             .clone()
    //             .set({ hour: 21, minute: 0 })
    //             .utc()
    //             .format();

    //         expect(result.id).toBe(1);
    //         expect(result.fromTime).toBe(expectedFrom);
    //         expect(result.toTime).toBe(expectedTo);
    //         expect(result.isBooked).toBe(false);
    //     });
    // });

    describe('timeToUtc', () => {
        it('converts time to UTC correctly', () => {
            const day = moment('2023-01-01');
            const time = '12:30';

            const result = timeToUtc(day, time);

            const expected = day
                .clone()
                .set({ hour: 12, minute: 30 })
                .utc()
                .format();

            expect(result).toBe(expected);
        });

        it('handles midnight correctly', () => {
            const day = moment('2023-01-01');
            const time = '00:30';

            const result = timeToUtc(day, time);

            const expected = day
                .clone()
                .set({ hour: 0, minute: 30 })
                .utc()
                .format();

            expect(result).toBe(expected);
        });
    });
});
