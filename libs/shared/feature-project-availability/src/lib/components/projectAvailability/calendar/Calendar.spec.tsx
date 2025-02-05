import { fireEvent, render } from '@testing-library/react';
import moment from 'moment';
import { Calendar } from './Calendar';

const startDate = moment('2021-09-01');
const firstSectionDays = 7;
const selectedDays = [
    {
        id: 1,
        day: startDate,
        timeSlots: [],
    },
];
const nextSelectedDays = [
    {
        id: 1,
        day: startDate.clone().add(7, 'day'),
        timeSlots: [],
    },
];

const isDisabledUnselectedDays = true;
const blockedEndDate = moment('2021-09-03');
const isActiveWeekend = true;
const isStartToFirstSelectedDay = true;
const markedDay = moment('2021-09-03');
const isLimitLength = true;

describe('Calendar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Calendar startDate={startDate} />);
        expect(baseElement).toBeTruthy();
    });

    it('should displaying the first section of seven days and the next button', () => {
        const { getByText, baseElement } = render(
            <Calendar startDate={startDate} />,
        );

        const nextButton = baseElement.querySelector('.day.next');
        expect(nextButton).toBeInTheDocument();

        const weekendButton = baseElement.querySelector('.day.weekend');
        expect(weekendButton).toBeInTheDocument();

        const longMonth = startDate.format('MMMM YYYY');
        expect(getByText(longMonth)).toBeInTheDocument();

        const cloneDate = startDate.clone();
        for (let i = 0; i < firstSectionDays; i++) {
            const day = cloneDate.format('D');
            const month = cloneDate.format('ddd');

            expect(getByText(day)).toBeInTheDocument();
            expect(getByText(month)).toBeInTheDocument();

            cloneDate.add(1, 'day');
        }
    });

    it('action day button', () => {
        const handleClick = jest.fn();
        const { baseElement } = render(
            <Calendar startDate={startDate} onChange={handleClick} />,
        );

        const dayButton = baseElement.querySelector('.day');
        expect(dayButton).toBeInTheDocument();
        dayButton && fireEvent.click(dayButton);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should render successfully selectedDays prop', () => {
        const { baseElement } = render(
            <Calendar startDate={startDate} selectedDays={selectedDays} />,
        );
        const selectedButton = baseElement.querySelector('.day.selected');
        expect(selectedButton).toBeInTheDocument();
    });

    it('should render successfully isDisabledUnselectedDays prop', () => {
        const { baseElement } = render(
            <Calendar
                startDate={startDate}
                selectedDays={selectedDays}
                isDisabledUnselectedDays={isDisabledUnselectedDays}
            />,
        );
        const notSelectedButton =
            baseElement.querySelector('.day.not-selected');
        expect(notSelectedButton).toBeInTheDocument();
    });

    it('should render successfully blockedEndDate prop', () => {
        const { baseElement } = render(
            <Calendar
                startDate={startDate}
                selectedDays={selectedDays}
                blockedEndDate={blockedEndDate}
            />,
        );
        const blockedButton = baseElement.querySelector('.day.blocked');
        expect(blockedButton).toBeInTheDocument();
    });

    it('should render successfully isActiveWeekend prop', () => {
        const { baseElement } = render(
            <Calendar
                startDate={startDate}
                selectedDays={selectedDays}
                isActiveWeekend={isActiveWeekend}
            />,
        );
        const activeWeekendButton = baseElement.querySelector(
            '.day.active-weekend',
        );
        expect(activeWeekendButton).toBeInTheDocument();
    });

    it('should render successfully markedDay prop', () => {
        const { baseElement } = render(
            <Calendar
                startDate={startDate}
                selectedDays={selectedDays}
                markedDay={markedDay}
            />,
        );
        const markedDayButton = baseElement.querySelector(
            '.day.selected.marked',
        );
        expect(markedDayButton).toBeInTheDocument();
    });

    it('should render successfully isLimitLength prop', () => {
        const { baseElement } = render(
            <Calendar
                startDate={startDate}
                selectedDays={selectedDays}
                isLimitLength={isLimitLength}
            />,
        );
        const blockedDayButtons = baseElement.querySelectorAll('.day.blocked');
        expect(blockedDayButtons.length).toBe(firstSectionDays);
    });

    it('should render successfully isStartToFirstSelectedDay prop ', () => {
        const { getByText } = render(
            <Calendar
                startDate={startDate}
                selectedDays={nextSelectedDays}
                isStartToFirstSelectedDay={isStartToFirstSelectedDay}
            />,
        );

        const cloneDate = nextSelectedDays[0].day.clone();
        for (let i = 0; i < firstSectionDays - 1; i++) {
            const day = cloneDate.format('D');
            const month = cloneDate.format('ddd');

            expect(getByText(day)).toBeInTheDocument();
            expect(getByText(month)).toBeInTheDocument();

            cloneDate.add(1, 'day');
        }
    });

    it('next day section should have six days and two button (<-, ->)', () => {
        const { baseElement } = render(
            <Calendar
                startDate={startDate}
                selectedDays={nextSelectedDays}
                isStartToFirstSelectedDay={isStartToFirstSelectedDay}
            />,
        );

        const allButtons = baseElement.querySelectorAll('.day');
        expect(allButtons.length).toBe(firstSectionDays + 1);

        const prevButtons = baseElement.querySelector('.day.previous');
        expect(prevButtons).toBeInTheDocument();

        const nextButtons = baseElement.querySelector('.day.next');
        expect(nextButtons).toBeInTheDocument();
    });
});
