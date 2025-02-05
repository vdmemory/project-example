import moment from 'moment';
import { SlotType } from '../types/projectAvailabilityTypes';

export const sortTimeSlots = (slots: SlotType[]) => {
    if (!slots || slots.length === 0) return [];
    const formattedSlots = slots.map(slot => {
        const from = moment(slot.from, 'HH:mm');
        const to = moment(slot.to, 'HH:mm');
        return { ...slot, from: from.format('HH:mm'), to: to.format('HH:mm') };
    });
    return formattedSlots.sort((a, b) => {
        const aTime = moment(a.from, 'HH:mm');
        const bTime = moment(b.from, 'HH:mm');

        if (aTime.isBefore(bTime)) return -1;
        if (aTime.isAfter(bTime)) return 1;
        return 0;
    });
};
