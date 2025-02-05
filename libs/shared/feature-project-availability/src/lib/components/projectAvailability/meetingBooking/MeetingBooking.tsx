import { useGetList, useMediaContext } from '@breef/shared/hooks';
import { ListTimezonesType } from '@breef/shared/types';
import {
    Button,
    LipsLoader,
    NavControl,
    TipCard,
} from '@breef/shared/ui-components';
import { DropDown } from '@breef/ui-kit';
import moment from 'moment';
import { Moment } from 'moment';
import { Fragment, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    MeetingBookingScreen,
    useMeetingBookingControl,
} from '../../../hooks/useMeetingBookingControl';
import { getStartDay } from '../../../utils/getDays';
import Calendar from '../calendar/Calendar';
import { ScreenWrapper } from '../screenWrapper/ScreenWrapper';
import { TitleSection } from '../titleSection/TitleSection';
import { StyledMeetingBooking } from './MeetingBooking.styled';
import { MeetingBookingList } from './meetingBookingList/MeetingBookingList';

export const MeetingBooking = ({
    onNext,
    renderNavigation,
    onPrev,
}: {
    onNext?: () => void;
    renderNavigation?: () => ReactNode;
    onPrev?: () => void;
}) => {
    const { isMaxMobile } = useMediaContext();

    const [startDateCalendar, setStartDateCalendar] = useState<Moment | null>(
        null,
    );
    const [markedCalendarDay, setMarkedCalendarDay] = useState<Moment | null>(
        null,
    );

    const listTimezones = useGetList('groupedTimezones') as ListTimezonesType[];

    const {
        data: {
            days,
            timezone,
            bookingSlots,
            selectedSlot,
            clientName,
            screenMobile,
        },
        methods: {
            handleBookSlot,
            handleSelectDay,
            handleChangeTimezone,
            updateScreenMobile,
        },
        loadingAvailability,
        isEditing,
        isNotAvailable,
    } = useMeetingBookingControl();

    useEffect(() => {
        if (!isNotAvailable) return;
        toast.info(`Sorry, we don't have available time slots`);
    }, [isNotAvailable]);

    useEffect(() => {
        if (!timezone) return;
        const startDate = getStartDay(timezone);
        const selectedBookingDay = selectedSlot
            ? moment(selectedSlot?.fromTime).utcOffset(selectedSlot?.fromTime)
            : null;
        setMarkedCalendarDay(selectedBookingDay || null);
        setStartDateCalendar(startDate);
    }, [timezone]);

    useEffect(() => {
        if (!bookingSlots) return;
        if (selectedSlot) return;
        if (isMaxMobile) {
            setMarkedCalendarDay(null);
            return;
        }

        const selectedBookingDay =
            bookingSlots[0]?.fromTime !== null && bookingSlots[0] !== undefined
                ? moment(bookingSlots[0]?.fromTime).utcOffset(
                      bookingSlots[0]?.fromTime,
                  )
                : null;
        setMarkedCalendarDay(selectedBookingDay);
    }, [bookingSlots, isMaxMobile]);

    useEffect(() => {
        if (!timezone) return;
        if (!selectedSlot && isMaxMobile) {
            setMarkedCalendarDay(null);
            setStartDateCalendar(getStartDay(timezone));
            return;
        }
        if (!selectedSlot) return;

        setMarkedCalendarDay(
            moment(selectedSlot?.fromTime).utcOffset(selectedSlot?.fromTime),
        );
        setStartDateCalendar(getStartDay(timezone));
    }, [selectedSlot]);

    const activeDaySelectedSlot = () => {
        if (
            !selectedSlot ||
            selectedSlot?.fromTime === null ||
            selectedSlot === undefined ||
            isMaxMobile
        )
            return null;

        return moment(selectedSlot?.fromTime).utcOffset(selectedSlot?.fromTime);
    };

    const handleSubmit = () => {
        onNext?.();
    };

    const dateTitleSection = markedCalendarDay
        ? markedCalendarDay.format('dddd, MMMM D')
        : null;

    const titles = {
        title: 'SCHEDULE AN INTRO MEETING',
        description: !isMaxMobile
            ? `Book your meeting below. This is a great way to introduce yourself to ${clientName}.`
            : '',
    };

    const tipDescription = 'Be sure to confirm the correct\ntimezone above.';

    const isLoading = loadingAvailability || !timezone || !startDateCalendar;

    if (isLoading) return <LipsLoader />;

    const optionTimezone = {
        value: timezone,
        label: timezone,
    };

    const handlePrev = () => {
        if (isMaxMobile) {
            if (screenMobile === MeetingBookingScreen.SLOTS) {
                updateScreenMobile(MeetingBookingScreen.CALENDAR);
                return;
            }
            onPrev?.();
            return;
        }
        onPrev?.();
    };

    const renderDesktop = () => {
        return (
            <StyledMeetingBooking
                className="group-availability"
                key="meeting-booking-desktop"
            >
                <div className="left-section">
                    <TitleSection title="Available DATES" />
                    <Calendar
                        isLimitLength
                        isActiveWeekend
                        onChange={handleSelectDay}
                        startDate={startDateCalendar}
                        selectedDays={days}
                        isDisabledUnselectedDays
                        isStartToFirstSelectedDay
                        activeDaySelectedSlot={activeDaySelectedSlot()}
                        markedDay={markedCalendarDay}
                    />
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
                    <TipCard
                        hideAuthor
                        key="tip-card"
                        className="screen-tip"
                        tip={{
                            title: 'QUICK TIP:',
                            description: tipDescription,
                        }}
                    />
                </div>
                <div className="right-section">
                    <TitleSection
                        title="Available times"
                        date={dateTitleSection}
                    />
                    <MeetingBookingList
                        list={bookingSlots}
                        onSelect={handleBookSlot}
                        selected={selectedSlot}
                    />
                </div>
            </StyledMeetingBooking>
        );
    };

    const renderMobile = () => {
        switch (screenMobile) {
            case MeetingBookingScreen.CALENDAR:
                return (
                    <StyledMeetingBooking
                        className="group-availability"
                        key="meeting-booking-mobile"
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
                            isLimitLength
                            isActiveWeekend
                            onChange={handleSelectDay}
                            startDate={startDateCalendar}
                            selectedDays={days}
                            isDisabledUnselectedDays
                            isStartToFirstSelectedDay
                            activeDaySelectedSlot={activeDaySelectedSlot()}
                            markedDay={markedCalendarDay}
                        />
                        <TipCard
                            hideAuthor
                            key="tip-card"
                            className="screen-tip"
                            tip={{
                                title: 'QUICK TIP:',
                                description: tipDescription,
                            }}
                        />
                    </StyledMeetingBooking>
                );
            case MeetingBookingScreen.SLOTS:
                return (
                    <MeetingBookingList
                        list={bookingSlots}
                        onSelect={handleBookSlot}
                        selected={selectedSlot}
                    />
                );
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
                {isMaxMobile ? renderMobile() : renderDesktop()}
                <Button
                    disabled={!selectedSlot && !isEditing}
                    key="button-meeting-booking"
                    className="medium"
                    onClick={handleSubmit}
                    title={`NEXT`}
                    arrowRight
                    withAnimate
                />
            </ScreenWrapper>
        </Fragment>
    );
};
