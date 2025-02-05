import { PlusIcon } from '@breef/shared/assets';
import { useGetList, useMediaContext } from '@breef/shared/hooks';
import { Button, DropDown, TrashIcon } from '@breef/ui-kit';
import moment from 'moment';
import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useTimeSlotControl } from '../../../../hooks/useTimeSlotControl';
import {
    ErrorType,
    SlotListType,
    SlotType,
} from '../../../../types/projectAvailabilityTypes';
import { getAmPmAvailability } from '../../../../utils';
import {
    DatesCalendarType,
    generateCalendarDates,
} from '../../../../utils/getDays';
import {
    StyledDate,
    StyledDates,
    StyledDatesTimeSlots,
    StyledSlot,
} from './Dates.styled';
import { ChangeEvent } from 'react';
import { CheckMarkBoldWhite } from '@breef/shared/assets';

const useGenerateCalendarDays = (
    startDate: Moment,
    blockedDate: Moment | null,
    days: SlotListType[],
) => {
    const [dates, setDates] = useState<DatesCalendarType[]>([]);
    console.log('dates.length NotWeekends', dates.length);

    useEffect(() => {
        const dates = generateCalendarDates(startDate, blockedDate, days);
        setDates(dates);
    }, [startDate, blockedDate, days]);

    return dates;
};

type TimeSlotOptionType = {
    value: string;
    label: string;
};

interface DatesProps {
    startDate: Moment;
    blockedDate: Moment | null;
    days: SlotListType[];
    errorsSlots: ErrorType[];
    onChangeSlot?: (
        day: Moment,
        timeSlots: SlotType[],
        updateSlotId?: number,
    ) => void;
    onSelectDay?: (date: Moment) => void;
    onRemoveDay?: (day: Moment, removeSlotId?: number) => void;
}

export const Dates = ({
    startDate,
    blockedDate,
    onSelectDay,
    onChangeSlot,
    onRemoveDay,
    days,
    errorsSlots,
}: DatesProps) => {
    const { isMobile } = useMediaContext();
    const slotsOptions: TimeSlotOptionType[] = useGetList('timeSlots') as {
        value: string;
        label: string;
    }[];

    const datesList = useGenerateCalendarDays(startDate, blockedDate, days);

    const renderItems = (date: DatesCalendarType, index: number) => {
        const editable = () => {
            if (date.isEditable) return;
            onSelectDay?.(date.date);
        };

        const handleRemoveDay = (day: Moment, removeSlotId?: number) => {
            onRemoveDay?.(day, removeSlotId);
        };

        return (
            <StyledDate
                isEditable={date.isEditable}
                key={'date' + index}
                onClick={!date.isEditable ? editable : undefined}
            >
                {date.isEditable && (
                    <div
                        className="remove"
                        onClick={
                            date.isEditable
                                ? () => handleRemoveDay(date.date)
                                : undefined
                        }
                    ></div>
                )}
                <div className={'group'}>
                    <Checkbox checked={date.isEditable} />
                    <span className="date">
                        {date.date.format('dddd, M/D')}
                    </span>
                </div>
                {date.isEditable && (
                    <DatesTimeSlots
                        days={days}
                        currentDay={date.date}
                        errors={errorsSlots}
                        slotsOptions={slotsOptions}
                        onChange={onChangeSlot}
                        onRemove={handleRemoveDay}
                    />
                )}
                {!date.isEditable && (
                    <p>
                        {isMobile
                            ? '+ Add Times'
                            : 'Check box to add availability'}
                    </p>
                )}
            </StyledDate>
        );
    };

    if (!datesList.length) return <StyledDates></StyledDates>;
    return <StyledDates>{datesList.map(renderItems)}</StyledDates>;
};

interface DatesTimeSlotsProps {
    days: SlotListType[];
    currentDay: Moment;
    errors?: ErrorType[];
    slotsOptions: TimeSlotOptionType[];
    onChange?: (
        day: Moment,
        timeSlots: SlotType[],
        updateSlotId?: number,
    ) => void;
    onRemove?: (day: Moment, removeSlotId?: number) => void;
}

const DatesTimeSlots = ({
    days,
    currentDay,
    errors,
    slotsOptions,
    onChange,
    onRemove,
}: DatesTimeSlotsProps) => {
    const [timeSlots, setTimeSlots] = useState<SlotType[]>([]);

    useEffect(() => {
        const day = days.find(day => day.day.startOf('day').isSame(currentDay));
        if (!day) return;
        setTimeSlots(day.timeSlots);
    }, [days, currentDay]);

    if (!timeSlots.length) return null;

    const { handleAddSlot, handleRemoveSlot, handleChangeSlot } =
        useTimeSlotControl(currentDay, timeSlots, onChange, onRemove);

    return (
        <StyledDatesTimeSlots className="wrapper-time-slots">
            <div className="timeSlots">
                {timeSlots &&
                    timeSlots.map((timeSlot, index) => (
                        <Slot
                            key={timeSlot.id + index}
                            slot={timeSlot}
                            errors={errors}
                            options={slotsOptions}
                            onChange={handleChangeSlot}
                            onRemove={handleRemoveSlot}
                        />
                    ))}
            </div>
            <Button
                variant="ghost"
                className="add-slot"
                label="Add Slot"
                size="small"
                onClick={handleAddSlot}
                iconPlacement="left"
                icon={<PlusIcon />}
            />
        </StyledDatesTimeSlots>
    );
};

interface SlotProps {
    slot: SlotType;
    errors?: ErrorType[];
    options: TimeSlotOptionType[];
    onChange: (slot: SlotType) => void;
    onRemove: (id: number) => void;
}

const Slot = ({ slot, errors, options, onChange, onRemove }: SlotProps) => {
    const handleChangeTo = (slot: SlotType, value: string) => {
        if (value === '00:00') {
            onChange({
                ...slot,
                to: '23:59',
            });
            return;
        }
        onChange({ ...slot, to: value });
    };

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
        options.filter(option => option.value !== '23:30');

    const filterToTimeOptions = () => {
        const from = moment(slot.from, 'HH:mm');

        return options.filter(timeSlotOption => {
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

    const OPTION_DISTANCE = 17;

    const renderErrorMessage = (message?: string, className?: string) => {
        if (!message) return null;
        if (message === 'empty') return null;

        const classes = className ? `error ${className}` : 'error';

        return <div className={classes}>* {message}</div>;
    };

    return (
        <StyledSlot
            key={slot.id + slot.from + slot.to}
            className={getTimeSlotClassName()}
        >
            <div className="group-slot">
                <DropDown
                    isSearchable
                    optionDistance={OPTION_DISTANCE}
                    className="date"
                    scrollId={slot.id + 'from'}
                    options={filterFromTimeOptions()}
                    option={optionFrom}
                    onSelect={option =>
                        onChange({ ...slot, from: option.value })
                    }
                />
                <p className="text">to</p>
                <DropDown
                    isSearchable
                    optionDistance={OPTION_DISTANCE}
                    className="date"
                    scrollId={slot.id + 'to'}
                    options={filterToTimeOptions()}
                    option={optionTo}
                    onSelect={option => handleChangeTo(slot, option.value)}
                />
                <button
                    onClick={() => onRemove(slot.id)}
                    className="trash-button"
                >
                    <TrashIcon />
                </button>
            </div>
            {renderErrorMessage(errorMessageFrom, 'common')}
            {renderErrorMessage(errorMessageTo, 'common')}
        </StyledSlot>
    );
};

import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';

export const StyledCheckbox = styled.div`
    display: flex;
    width: 26px;
    height: 26px;
    border: 1px solid ${colors.black};
    background-color: transparent;
    cursor: pointer;
    border-radius: 2px;

    svg {
        margin-top: 4px;
        margin-left: 2px;
    }

    input {
        display: none;
    }

    :has(input:checked) {
        border-color: ${colors.primary.primary500};
        background-color: ${colors.primary.primary500};
    }
`;

interface CheckboxProps {
    checked: boolean;
    onChange?: (e: ChangeEvent) => void;
}
const Checkbox = ({ checked, onChange }: CheckboxProps) => {
    const handleChange = (e: ChangeEvent) => onChange?.(e);

    return (
        <StyledCheckbox className="label">
            <CheckMarkBoldWhite />
            <input
                data-testid="input-checkbox"
                onChange={handleChange}
                checked={checked}
                type="checkbox"
            />
        </StyledCheckbox>
    );
};

export default Checkbox;
