import {
    Button,
    LipsLoader,
    NavControl,
    ProjectAvailabilitySuccessPopup,
    usePopup,
} from '@breef/shared/ui-components';
import {
    AvailabilityScreen,
    useAvailabilityControl,
} from '../../../hooks/useAvailabilityControl';
import { getEndDay, getStartDay } from '../../../utils/getDays';
import { ScreenWrapper } from '../screenWrapper/ScreenWrapper';
import { StyledAvailability } from './Availability.styled';
import Calendar from '../calendar/Calendar';
import { SlotMobile, TimeSlotList } from './timeSlotList/TimeSlotList';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { useProjectAvailabilityActions } from '../../../store/hooks';
import { Moment } from 'moment';
import {
    useGetList,
    useMediaContext,
    useRouteControl,
} from '@breef/shared/hooks';
import { DropDown, PickDateTextMobile } from '@breef/ui-kit';
import { ListTimezonesType } from '@breef/shared/types';
import { TitleSection } from '../titleSection/TitleSection';
import { useValidationError } from '../../../hooks/useValidationError';
import moment from 'moment';
import { filterDays } from '../../../utils/filterDays';
import { DayType } from '../../../types/projectAvailabilityTypes';

export const START_WITH = 2;
export const END_ON = 20;

export const Availability = ({
    renderNavigation,
    onPrev,
}: {
    renderNavigation?: () => ReactNode;
    onPrev?: () => void;
}) => {
    const { isMaxMobile } = useMediaContext();
    const controlFinalPopUp = usePopup();
    const [startDateState, setStartDateState] = useState<Moment | null>(null);
    const [endDateState, setEndDateState] = useState<Moment | null>(null);
    const [blockedDateState, setBlockedDateState] = useState<Moment | null>(
        null,
    );
    const listTimezones = useGetList('groupedTimezones') as ListTimezonesType[];

    const [filteredDays, setFilteredDays] = useState<DayType[]>([]);

    const {
        data: {
            days,
            timezone,
            userType,
            scheduleCreatedAt,
            screenMobile,
            currentSelectDay,
        },
        methods: {
            handleChangeTimezone,
            handleChangeDay,
            handleChangeTimeSlot,
            handleRemoveDay,
            handleSubmit,
            handleCurrentSelectDay,
            updateScreenMobile,
        },
        isSubmittedSetAvailability,
        isEditingAvailability,
    } = useAvailabilityControl({ cbFunction: controlFinalPopUp.open });

    const { changePage } = useRouteControl();

    const { resetAvailability } = useProjectAvailabilityActions();
    const { getErrors } = useValidationError();

    useEffect(() => {
        const filteredDays = filterDays(
            days,
            startDateState,
            blockedDateState,
            endDateState,
        );

        setFilteredDays(filteredDays);
    }, [days, startDateState, blockedDateState, endDateState]);

    useEffect(() => {
        if (!isMaxMobile) return;
        updateScreenMobile(AvailabilityScreen.CALENDAR);
    }, [isMaxMobile]);

    const errorsDaysFromListSlot = getErrors(filteredDays);

    useEffect(() => {
        if (!timezone) return;

        let start = START_WITH;
        if (isEditingAvailability) start = 0;

        const blockedDate = scheduleCreatedAt
            ? moment(scheduleCreatedAt)
                  .tz(timezone)
                  .add(START_WITH - 1, 'day')
                  .startOf('day')
            : null;
        setBlockedDateState(blockedDate);

        const startDate = getStartDay(timezone, start);
        setStartDateState(startDate);
        const endDate = getEndDay(timezone, END_ON);
        setEndDateState(endDate);
    }, [timezone]);

    const handleClick = () => {
        controlFinalPopUp.close();
        changePage(PROJECTS_ROUTE);
        resetAvailability();
    };

    const titles = {
        title: 'SET your availability',
        description: !isMaxMobile
            ? 'We recommend selecting multiple hour blocks across a few days.'
            : '',
    };

    const isLoading = !timezone || !startDateState;
    if (isLoading) return <LipsLoader />;

    const optionTimezone = {
        value: timezone,
        label: timezone,
    };

    const isDaysEmpty = !filteredDays || filteredDays.length === 0;
    const isDisabledByDays = isDaysEmpty && !isEditingAvailability;

    const disabledButton =
        isSubmittedSetAvailability ||
        errorsDaysFromListSlot.length > 0 ||
        isDisabledByDays;

    const handlePrev = () => {
        if (isMaxMobile) {
            if (screenMobile === AvailabilityScreen.SLOTS) {
                updateScreenMobile(AvailabilityScreen.CALENDAR);
                return;
            }
            onPrev?.();
            return;
        }
        onPrev?.();
    };

    const renderDesktop = () => {
        return [
            <StyledAvailability
                key="availability-desktop"
                className="group-availability"
            >
                <div className="left-section">
                    <TitleSection title="1. SELECT YOUR DAYS" />
                    <div className="timezone-dropdown-wrapper">
                        <DropDown
                            small
                            isGrouped
                            options={listTimezones}
                            option={optionTimezone}
                            onSelect={option =>
                                handleChangeTimezone(option.value)
                            }
                            placeholder="Select timezone"
                        />
                    </div>
                    <Calendar
                        onChange={(day: Moment) => {
                            handleChangeDay(day);
                            handleCurrentSelectDay(day);
                        }}
                        startDate={startDateState}
                        selectedDays={filteredDays}
                        lastDate={endDateState}
                        blockedEndDate={blockedDateState}
                    />
                </div>
                <div className="right-section">
                    <TitleSection title="2. SET YOUR TIMES" />
                    <TimeSlotList
                        days={filteredDays}
                        errorsDays={errorsDaysFromListSlot}
                        onChange={handleChangeTimeSlot}
                        onRemove={handleRemoveDay}
                    />
                </div>
            </StyledAvailability>,
            <Button
                key="button-availability-desktop"
                disabled={disabledButton}
                isSubmitting={isSubmittedSetAvailability}
                className="medium"
                onClick={() =>
                    handleSubmit(startDateState, blockedDateState, endDateState)
                }
                title={`NEXT`}
                arrowRight
                withAnimate
            />,
        ];
    };

    const renderMobile = () => {
        switch (screenMobile) {
            case AvailabilityScreen.CALENDAR:
                return [
                    <StyledAvailability
                        key="availability-mobile"
                        className="group-availability"
                    >
                        <div className="timezone-dropdown-wrapper">
                            <DropDown
                                small
                                isGrouped
                                options={listTimezones}
                                option={optionTimezone}
                                onSelect={option =>
                                    handleChangeTimezone(option.value)
                                }
                                placeholder="Select timezone"
                            />
                        </div>
                        <Calendar
                            onChange={(day: Moment) => {
                                handleChangeDay(day);
                                handleCurrentSelectDay(day);
                            }}
                            startDate={startDateState}
                            selectedDays={filteredDays}
                            lastDate={endDateState}
                            blockedEndDate={blockedDateState}
                        />
                        {isDaysEmpty && (
                            <PickDateTextMobile className="placeholder-mobile" />
                        )}
                    </StyledAvailability>,
                    <Button
                        key="button-availability-mobile"
                        disabled={disabledButton}
                        isSubmitting={isSubmittedSetAvailability}
                        className="medium"
                        onClick={() =>
                            handleSubmit(
                                startDateState,
                                blockedDateState,
                                endDateState,
                            )
                        }
                        title={isDaysEmpty ? `NEXT` : `FINISH`}
                        arrowRight
                        withAnimate
                    />,
                ];
            case AvailabilityScreen.SLOTS:
                return [
                    <SlotMobile
                        key="slot-mobile"
                        selectedDay={currentSelectDay}
                        days={filteredDays}
                        errorsDays={errorsDaysFromListSlot}
                        onChange={handleChangeTimeSlot}
                        onRemove={handleRemoveDay}
                    />,
                    <Button
                        key="button-slot-mobile"
                        disabled={disabledButton}
                        isSubmitting={isSubmittedSetAvailability}
                        className="medium"
                        onClick={() =>
                            updateScreenMobile(AvailabilityScreen.CALENDAR)
                        }
                        title={'GO BACK'}
                        arrowLeft
                        withAnimate
                    />,
                ];
            default:
                return null;
        }
    };

    return (
        <Fragment>
            {renderNavigation ? (
                <NavControl key="nav-control-booking" handleBack={handlePrev}>
                    {renderNavigation()}
                </NavControl>
            ) : null}
            <ScreenWrapper {...titles}>
                {controlFinalPopUp.isOpen && (
                    <ProjectAvailabilitySuccessPopup
                        userType={userType}
                        onClick={handleClick}
                    />
                )}

                {isMaxMobile ? renderMobile() : renderDesktop()}
            </ScreenWrapper>
        </Fragment>
    );
};
