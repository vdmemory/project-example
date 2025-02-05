import moment from 'moment';
import {
    ErrorType,
    SlotListType,
    SlotType,
} from '../types/projectAvailabilityTypes';
import { sortTimeSlots } from '../utils/sortTimeSlots';

enum ErrorNames {
    OVERLAP_TIME_ERROR = `Times must not overlap`,
    EARLIER_TIME_ERROR = `Times must not overlap`,
    END_TIME_ERROR = `End time cannot be the same as start time`,
    MULTIPLE_TIME_ERROR = `Time slot should be at least 1 hour`,
    EMPTY_ERROR = 'empty',
}

export const useValidationError = () => {
    const getErrors = (days: SlotListType[]) => {
        if (!days || days.length === 0) return [];

        const errors: ErrorType[] = [];

        days.forEach(day => {
            const timeSlots = sortTimeSlots(day.timeSlots);
            const dayId = day.id;

            timeSlots.forEach((slot, index) => {
                const prevSlot = timeSlots[index - 1];
                const { to: prevSlotTo, id: prevSlotId } = {
                    ...prevSlot,
                };
                const {
                    from: currentSlotFrom,
                    to: currentSlotTo,
                    id: currentSlotId,
                } = { ...slot };
                const duration = moment.duration(
                    moment(currentSlotTo, 'HH:mm').diff(
                        moment(currentSlotFrom, 'HH:mm'),
                    ),
                );
                const hours = duration.asHours();

                if (currentSlotFrom > currentSlotTo) {
                    errors.push({
                        dayId,
                        id: currentSlotId,
                        from: ErrorNames.EARLIER_TIME_ERROR,
                        to: 'empty',
                    });
                }

                if (hours < 1) {
                    errors.push({
                        dayId,
                        id: currentSlotId,
                        from: ErrorNames.EMPTY_ERROR,
                        to: ErrorNames.MULTIPLE_TIME_ERROR,
                    });
                }

                if (
                    currentSlotFrom == currentSlotTo &&
                    currentSlotTo !== '00:00'
                ) {
                    errors.push({
                        dayId,
                        id: currentSlotId,
                        from: ErrorNames.END_TIME_ERROR,
                        to: ErrorNames.EMPTY_ERROR,
                    });
                }

                if (prevSlot && prevSlotTo > currentSlotFrom) {
                    errors.push({
                        dayId,
                        id: prevSlotId,
                        from: '',
                        to: 'empty',
                    });
                    errors.push({
                        dayId,
                        id: currentSlotId,
                        from: ErrorNames.OVERLAP_TIME_ERROR,
                        to: '',
                    });
                }
            });
        });

        return errors;
    };

    const getSlottingIsProhibited = (timeSlots: SlotType[]) => {
        if (!timeSlots || timeSlots.length === 0) return false;

        const sortedTimeSlots = sortTimeSlots(timeSlots);
        const lastTimeSlot = sortedTimeSlots[sortedTimeSlots.length - 1];
        const lastTimeSlotTo = lastTimeSlot.to;

        return (
            lastTimeSlotTo === '23:00' ||
            lastTimeSlotTo === '23:30' ||
            lastTimeSlotTo === '23:59'
        );
    };

    return { getErrors, getSlottingIsProhibited };
};
