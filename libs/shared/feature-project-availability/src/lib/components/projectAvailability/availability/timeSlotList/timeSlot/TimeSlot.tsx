import { StyledTimeSlot } from './TimeSlot.styled';
import { Moment } from 'moment';
import { useGetList } from '@breef/shared/hooks';
import { AddCircleIcon, DeleteCircleIcon, DropDown } from '@breef/ui-kit';
import {
    ErrorType,
    SlotType,
} from '../../../../../types/projectAvailabilityTypes';
import { getNextSlot, getAmPmAvailability } from '../../../../../utils';
import { uniqueId } from 'lodash';
import moment from 'moment';
import { useTimeSlotControl } from '../../../../../hooks/useTimeSlotControl';

interface TimeSlotProps {
    day?: Moment;
    onChange?: (
        day: Moment,
        timeSlots: SlotType[],
        updateSlotId?: number,
    ) => void;
    onRemove?: (day: Moment, removeSlotId?: number) => void;
    totalTimeSlots: SlotType[];
    errors?: ErrorType[];
    isBlocked?: boolean;
}

export const TimeSlot = ({
    day,
    totalTimeSlots,
    onChange,
    onRemove,
    errors,
    isBlocked,
}: TimeSlotProps) => {
    const timeSlotsOptions = useGetList('timeSlots') as {
        value: string;
        label: string;
    }[];

    const { handleAddSlot, handleRemoveSlot, handleChangeSlot } =
        useTimeSlotControl(day as Moment, totalTimeSlots, onChange, onRemove);

    const handleChangeTo = (slot: SlotType, value: string) => {
        if (value === '00:00') {
            handleChangeSlot({
                ...slot,
                to: '23:59',
            });
            return;
        }
        handleChangeSlot({ ...slot, to: value });
    };

    if (!day) return null;

    const renderTimeSlots = (slot: SlotType) => {
        const errorMessageFrom = errors?.find(
            error => error.id === slot.id && error.from,
        )?.from;

        const errorMessageTo = errors?.find(
            error => error.id === slot.id && error.to,
        )?.to;

        const getTimeSlotClassName = () => {
            if (
                (errorMessageFrom && errorMessageFrom !== 'empty') ||
                (errorMessageTo && errorMessageTo !== 'empty')
            ) {
                return 'time-slot error';
            }
            return 'time-slot';
        };

        const filterFromTimeOptions = () =>
            timeSlotsOptions.filter(option => option.value !== '23:30');

        const filterToTimeOptions = () => {
            const from = moment(slot.from, 'HH:mm');

            return timeSlotsOptions.filter(timeSlotOption => {
                const to = moment(timeSlotOption.value, 'HH:mm');
                const duration = moment.duration(to.diff(from));
                const hours = duration.asHours();

                if (hours < 1) return false;
                return true;
            });
        };

        const optionFrom = {
            value: slot.from,
            label: getAmPmAvailability(slot.from),
        };

        const optionTo = {
            value: slot.to,
            label: getAmPmAvailability(slot.to),
        };

        return (
            <div
                key={slot.id + slot.from + slot.to}
                className={getTimeSlotClassName()}
            >
                <DropDown
                    scrollId={slot.id + 'from'}
                    errorOutside={errorMessageFrom}
                    options={filterFromTimeOptions()}
                    option={optionFrom}
                    onSelect={option =>
                        handleChangeSlot({ ...slot, from: option.value })
                    }
                />
                <p className="text">to</p>
                <DropDown
                    scrollId={slot.id + 'to'}
                    errorOutside={errorMessageTo}
                    options={filterToTimeOptions()}
                    option={optionTo}
                    onSelect={option => handleChangeTo(slot, option.value)}
                />
                <button
                    onClick={() => handleRemoveSlot(slot.id)}
                    className="delete"
                >
                    <DeleteCircleIcon />
                </button>
            </div>
        );
    };

    return (
        <StyledTimeSlot className="availability">
            <div className="day">
                <div className="day-number">{day.format('MM.DD.YY')}</div>
                <div className="day-name">{day.format('dddd')}</div>
            </div>
            <div className="group">
                <div className="time-slots">
                    {totalTimeSlots && totalTimeSlots?.map(renderTimeSlots)}
                </div>
                <button
                    disabled={isBlocked}
                    onClick={handleAddSlot}
                    className="add"
                >
                    <AddCircleIcon />
                </button>
            </div>
        </StyledTimeSlot>
    );
};
