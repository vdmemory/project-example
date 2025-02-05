import { uniqueId } from 'lodash';
import { Moment } from 'moment';
import { SlotType } from '../types/projectAvailabilityTypes';
import { getNextSlot } from '../utils';

export const useTimeSlotControl = (
    day: Moment,
    totalTimeSlots: SlotType[],
    onChange?: (day: Moment, slots: SlotType[], id?: number) => void,
    onRemove?: (day: Moment, id: number) => void,
) => {
    const handleAddSlot = () => {
        const lastSlot = totalTimeSlots[totalTimeSlots.length - 1];
        const newState = [
            ...totalTimeSlots,
            getNextSlot(lastSlot.to, Number(uniqueId())),
        ];
        onChange?.(day, newState);
    };
    const handleRemoveSlot = (id: number) => {
        if (totalTimeSlots.length === 1) {
            onRemove?.(day, id);
            return;
        }
        const newState = totalTimeSlots.filter(slot => slot.id !== id);
        onChange?.(day, newState, id);
    };
    const handleChangeSlot = (slot: SlotType) => {
        const newState: SlotType[] = [];

        totalTimeSlots.forEach(prevSlot => {
            if (prevSlot.id === slot.id) {
                const filteredPrevSlots = totalTimeSlots.filter(
                    prevSlot => prevSlot.id !== slot.id,
                );
                const newSlot = {
                    ...filteredPrevSlots,
                    ...{
                        ...slot,
                        id: Number(uniqueId()),
                    },
                };
                newState.push(newSlot);
                return;
            }
            newState.push(prevSlot);
        });

        onChange?.(day as Moment, newState);
    };
    return {
        handleAddSlot,
        handleRemoveSlot,
        handleChangeSlot,
    };
};
