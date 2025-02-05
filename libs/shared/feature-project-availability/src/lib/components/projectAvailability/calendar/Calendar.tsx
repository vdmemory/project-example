import { SmallArrow } from '@breef/ui-kit';
import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { DayType } from '../../../types/projectAvailabilityTypes';
import { StyledCalendar } from './Calendar.styled';

interface CalendarProps {
    startDate: Moment;
    lastDate?: Moment | null;
    onChange?: (day: Moment) => void;
    selectedDays?: DayType[];
    isDisabledUnselectedDays?: boolean;
    blockedEndDate?: Moment | null;
    isActiveWeekend?: boolean;
    activeDaySelectedSlot?: Moment | null;
    markedDay?: Moment | null;
    isStartToFirstSelectedDay?: boolean;
    isLimitLength?: boolean;
}

export const Calendar = ({
    startDate,
    lastDate,
    onChange,
    selectedDays = [],
    isDisabledUnselectedDays,
    isActiveWeekend,
    activeDaySelectedSlot,
    markedDay,
    isStartToFirstSelectedDay,
    blockedEndDate,
    isLimitLength,
}: CalendarProps) => {
    const firstDate = startDate;

    const daysInFirstSegment = 7;
    const daysInSubsequentSegments = daysInFirstSegment - 1;

    const [selectedDaysState, setSelectedDayState] =
        useState<DayType[]>(selectedDays);
    const [currentDate, setCurrentDate] = useState(firstDate);

    useEffect(() => {
        setCurrentDate(firstDate);

        if (markedDay) {
            setNewStartDate(markedDay, firstDate, setCurrentDate);
            return;
        }

        if (isStartToFirstSelectedDay && selectedDays.length > 0) {
            const firstSelectedDay = selectedDays[0].day;
            setNewStartDate(firstSelectedDay, firstDate, setCurrentDate);
            return;
        }
    }, [firstDate]);

    useEffect(() => {
        setSelectedDayState(selectedDays);

        if (markedDay) {
            setNewStartDate(markedDay, firstDate, setCurrentDate);
            return;
        }

        if (isStartToFirstSelectedDay && selectedDays.length > 0) {
            const firstSelectedDay = selectedDays[0].day;
            setNewStartDate(firstSelectedDay, firstDate, setCurrentDate);
            return;
        }
    }, [selectedDays]);

    const setNewStartDate = (
        day: Moment,
        start: Moment,
        callBack: (data: Moment) => void,
    ) => {
        const dayIsFirstSegment = getIsFirstSegmentSearchDay(day, start);
        if (dayIsFirstSegment) return;

        const newStartDate = getIsNextSegmentSearchDay(day, start);
        callBack(newStartDate);
    };

    const handleSelectDay = (day: Moment) => {
        onChange?.(day);
    };

    const renderDays = (start: Moment, segmentLength: number) => {
        const days = [];

        const getIsBlockedPeriod = (
            createdAt: Moment | null | undefined,
            current: Moment,
        ) => {
            if (!createdAt) return false;
            const withoutTimeCreatedAt = createdAt.clone().startOf('day');
            return current.isSameOrBefore(withoutTimeCreatedAt, 'day');
        };

        for (let i = 0; i < segmentLength; i++) {
            const currentDay = start.clone().add(i, 'days');
            const isWeekend = [0, 6].includes(currentDay.day());
            const isMarked =
                markedDay &&
                markedDay.format('DD/MM/YYYY') ===
                    currentDay.format('DD/MM/YYYY');

            const isActive =
                activeDaySelectedSlot &&
                activeDaySelectedSlot.format('DD/MM/YYYY') ===
                    currentDay.format('DD/MM/YYYY');

            const isSelected = selectedDaysState.find(
                d =>
                    d.day.format('DD/MM/YYYY') ===
                    currentDay.format('DD/MM/YYYY'),
            );

            const getBlockedNextDays = () => {
                if (lastDate) return currentDay.isAfter(lastDate, 'day');
                if (isLimitLength && selectedDaysState.length > 0) {
                    const lastSelectedDay =
                        selectedDaysState[selectedDaysState.length - 1].day;
                    return currentDay.isAfter(lastSelectedDay, 'day');
                }
                return false;
            };

            const isBlockedNextDays = getBlockedNextDays();
            const isBlockedEndDays = getIsBlockedPeriod(
                blockedEndDate,
                currentDay,
            );

            const getActiveClass = () => {
                if (activeDaySelectedSlot) return 'not-active';
                return '';
            };
            const getSelectedClass = () => {
                if (isMarked) return 'selected marked';
                if (isSelected) return 'selected';
                if (!isSelected && isDisabledUnselectedDays)
                    return 'not-selected';
                return '';
            };
            const getActiveWeekendClass = () => {
                if (isActiveWeekend && isWeekend) return 'active-weekend';
                if (!isActiveWeekend && isWeekend) return 'weekend';
                return '';
            };
            const getIsDisabled = () => {
                if (activeDaySelectedSlot) return !isActive;
                if (isDisabledUnselectedDays) return !isSelected;
                if (isWeekend && !isActiveWeekend) return true;
                return false;
            };

            const classNames = [
                getSelectedClass(),
                getActiveWeekendClass(),
                getActiveClass(),
                isBlockedNextDays ? 'blocked' : '',
                isBlockedEndDays ? 'blocked' : '',
            ];

            days.push(
                <button
                    onClick={() => handleSelectDay(currentDay)}
                    key={currentDay.format('x')}
                    className={`day ${classNames.join(' ').trim()}`}
                    disabled={
                        getIsDisabled() || isBlockedNextDays || isBlockedEndDays
                    }
                >
                    <div className="day-name">{currentDay.format('ddd')}</div>
                    <div className="day-number">{currentDay.format('D')}</div>
                </button>,
            );
        }

        return days;
    };

    const goToNextSegment = () => {
        const newDate = currentDate.clone().add(currentSegmentLength(), 'days');
        setCurrentDate(newDate);
    };

    const goToPreviousSegment = () => {
        if (currentDate.isSameOrBefore(firstDate, 'day')) return;

        const previousStartDate = currentDate
            .clone()
            .subtract(
                prevDayIsFirstSegment
                    ? daysInFirstSegment
                    : daysInSubsequentSegments,
                'days',
            );
        setCurrentDate(previousStartDate);
    };

    // Calculate the number of days for the current segment
    const getIsLastSegment = () => {
        if (lastDate) {
            return currentDate.isSameOrAfter(lastDate, 'day');
        }
        if (isLimitLength && selectedDaysState.length > 0) {
            const lastSelectedDay =
                selectedDaysState[selectedDaysState.length - 1].day;
            return currentDate.isSameOrAfter(lastSelectedDay, 'day');
        }
        return false;
    };
    const isFirstSegment = currentDate.isSame(firstDate, 'day');
    const isLastSegment = getIsLastSegment();

    const currentSegmentLength = () => {
        if (isFirstSegment && isLimitLength && !nextDayIsActiveSegment) {
            return daysInFirstSegment + 1;
        }

        const IsActiveSegment =
            (lastDate && !nextDayIsActiveSegment) ||
            (isLimitLength && !nextDayIsActiveSegment);
        if (isFirstSegment || IsActiveSegment || isLastSegment)
            return daysInFirstSegment;

        return daysInSubsequentSegments;
    };

    const prevDayIsFirstSegment = currentDate
        .clone()
        .subtract(daysInFirstSegment, 'days')
        .isSame(firstDate, 'day');

    const getNextDayIsActiveSegment = () => {
        if (lastDate) {
            return currentDate
                .clone()
                .add(daysInFirstSegment, 'days')
                .isSameOrBefore(lastDate, 'day');
        }
        if (isLimitLength && selectedDaysState.length > 0) {
            const lastSelectedDay =
                selectedDaysState[selectedDaysState.length - 1].day;
            return currentDate
                .clone()
                .add(daysInFirstSegment, 'days')
                .isSameOrBefore(lastSelectedDay, 'day');
        }
        return false;
    };
    const nextDayIsActiveSegment = getNextDayIsActiveSegment();

    const getIsFirstSegmentSearchDay = (
        searchDay: Moment,
        firstDate: Moment,
    ) => {
        if (!searchDay) return false;
        const endDay = firstDate.clone().add(daysInFirstSegment - 1, 'days');
        return (
            searchDay?.isBetween(firstDate, endDay, 'day', '[]') ||
            searchDay?.isSame(firstDate, 'day')
        );
    };

    const getIsNextSegmentSearchDay = (
        searchDay: Moment,
        firstDate: Moment,
    ) => {
        if (!searchDay) return firstDate;
        if (searchDay.isSameOrBefore(firstDate, 'day')) return firstDate;

        const startDateSearch = firstDate
            .clone()
            .add(daysInFirstSegment, 'days');

        const endDateSearch = startDateSearch
            .clone()
            .add(daysInSubsequentSegments - 1, 'days');

        while (
            !searchDay.isBetween(startDateSearch, endDateSearch, 'day', '[]')
        ) {
            startDateSearch.add(daysInSubsequentSegments, 'days');
            endDateSearch.add(daysInSubsequentSegments, 'days');
        }

        return startDateSearch;
    };

    const renderNextButton = () => {
        if (!nextDayIsActiveSegment && lastDate) return null;
        if (!nextDayIsActiveSegment && isLimitLength) return null;
        return (
            <button className="day next" onClick={goToNextSegment}>
                <SmallArrow />
            </button>
        );
    };

    return (
        <StyledCalendar className="calendar">
            <h2 className="title">
                {`${currentDate.format('MMMM')} ${currentDate.format('YYYY')}`}
            </h2>
            <div className="days">
                {!isFirstSegment && (
                    <button
                        className="day previous"
                        onClick={goToPreviousSegment}
                    >
                        <SmallArrow />
                    </button>
                )}
                {renderDays(currentDate, currentSegmentLength())}
                {!isLastSegment && renderNextButton()}
            </div>
        </StyledCalendar>
    );
};

export default Calendar;
