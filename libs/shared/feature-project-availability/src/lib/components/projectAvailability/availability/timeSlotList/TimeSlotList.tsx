import { Moment } from 'moment';
import { TimeSlot } from './timeSlot/TimeSlot';
import {
    DayType,
    ErrorType,
    SlotListType,
    SlotType,
} from '../../../../types/projectAvailabilityTypes';
import styled from '@emotion/styled';
import { useValidationError } from '../../../../hooks/useValidationError';
import { Placeholder } from '../../placeholder/Placeholder';
import { useEffect, useState } from 'react';
import { mediaScreen } from '@breef/shared/assets/variables';
import { simpleAnimation } from '@breef/shared/assets';

export const StyledTimeSlotList = styled.div`
    width: 100%;
`;

interface TimeSlotListProps {
    days: SlotListType[];
    errorsDays: ErrorType[];
    onChange?: (
        day: Moment,
        timeSlots: SlotType[],
        updateSlotId?: number,
    ) => void;
    onRemove?: (day: Moment, removeSlotId?: number) => void;
}

const PLACEHOLDER_TITLE = `Please select a day\n first on the left.`;

export const TimeSlotList = ({
    days,
    errorsDays,
    onChange,
    onRemove,
}: TimeSlotListProps) => {
    const { getSlottingIsProhibited } = useValidationError();

    if (!days || days.length === 0)
        return <Placeholder title={PLACEHOLDER_TITLE} />;

    const renderTimeSlots = ({ id, day, timeSlots }: SlotListType) => {
        const errors = errorsDays.filter(f => f.dayId === id);
        const isBlocked = getSlottingIsProhibited(timeSlots);

        return (
            <TimeSlot
                errors={errors}
                onChange={onChange}
                onRemove={onRemove}
                key={id + day.format('x')}
                day={day}
                totalTimeSlots={timeSlots}
                isBlocked={isBlocked}
            />
        );
    };

    return <StyledTimeSlotList>{days.map(renderTimeSlots)}</StyledTimeSlotList>;
};

const StyledSlotMobile = styled.div`
    display: none;

    @media (${mediaScreen.maxMobile}) {
        display: flex;

        max-width: 100%;

        .availability {
            flex-direction: column;
            border: none;

            .day {
                padding: 25px 16px;
                width: 100%;
                border: none;
            }

            .group {
                flex-direction: column;
                width: 100%;

                .time-slots {
                    padding: 0 16px 16px;

                    .time-slot {
                        gap: 10px;

                        .dropdown {
                            min-width: auto;
                            max-width: 100%;
                        }
                    }
                }

                .add {
                    margin: 16px auto 32px;
                }
            }
        }
    }

    ${simpleAnimation}
`;

export const SlotMobile = ({
    selectedDay,
    days,
    errorsDays,
    onChange,
    onRemove,
}: {
    selectedDay: Moment | null;
    days: SlotListType[];
    errorsDays: ErrorType[];
    onChange?: (
        day: Moment,
        timeSlots: SlotType[],
        updateSlotId?: number,
    ) => void;
    onRemove?: (day: Moment, removeSlotId?: number) => void;
}) => {
    if (!selectedDay) return null;
    const [dayFound, setDayFound] = useState<DayType | null>(null);

    useEffect(() => {
        const day = days.find(f => {
            return (
                f.day.format('DD-MM-YYYY') === selectedDay.format('DD-MM-YYYY')
            );
        });

        setDayFound(day || null);
    }, [selectedDay, days]);

    const { getSlottingIsProhibited } = useValidationError();

    const errors = errorsDays.filter(f => f.dayId === dayFound?.id);
    const isBlocked = getSlottingIsProhibited(dayFound?.timeSlots || []);

    return (
        <StyledSlotMobile>
            <TimeSlot
                errors={errors}
                onChange={onChange}
                onRemove={onRemove}
                day={dayFound?.day}
                totalTimeSlots={dayFound?.timeSlots || []}
                isBlocked={isBlocked}
            />
        </StyledSlotMobile>
    );
};
