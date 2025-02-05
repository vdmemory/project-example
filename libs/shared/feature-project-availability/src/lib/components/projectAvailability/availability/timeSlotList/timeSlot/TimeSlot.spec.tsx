import { fireEvent, render } from '@testing-library/react';
import { mockConfiguredStore } from '../../../../../utils';
import { Provider } from 'react-redux';
import { TimeSlot } from './TimeSlot';
import moment from 'moment';

const day = moment('2021-09-09');

const props = {
    day,
    totalTimeSlots: [
        {
            id: 1,
            from: '13:00',
            to: '13:30',
            isBooked: false,
        },
        {
            id: 2,

            from: '13:30',
            to: '14:00',
            isBooked: false,
        },
    ],
    onChange: jest.fn(),
};

const errors = [
    {
        dayId: 1,
        id: 1,
        to: 'Invalid time slot',
        from: 'empty',
    },
];

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('TimeSlot', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully current date', () => {
        const { getByText } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} />
            </Provider>,
        );
        expect(getByText(day.format('MM.DD.YY'))).toBeInTheDocument();
        expect(getByText(day.format('dddd'))).toBeInTheDocument();
    });

    it('should render successfully current time slots', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} />
            </Provider>,
        );
        const inputs = baseElement.querySelectorAll('input');
        expect(inputs.length).toBe(4);
        expect(inputs[0].value).toBe('1:00 pm');
        expect(inputs[1].value).toBe('01:30 pm');
        expect(inputs[2].value).toBe('1:30 pm');
        expect(inputs[3].value).toBe('02:00 pm');
    });

    it('should render successfully add and delete button', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} />
            </Provider>,
        );
        const deleteButtons = baseElement.querySelectorAll('.delete');
        deleteButtons.forEach(btn => {
            expect(btn).toBeInTheDocument();
        });
        const addButton = baseElement.querySelector('.add');
        expect(addButton).toBeInTheDocument();
    });

    it('actions add and delete buttons', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} />
            </Provider>,
        );

        const addButton = baseElement.querySelector('.add');
        addButton && fireEvent.click(addButton);
        expect(props.onChange).toBeCalledTimes(1);

        const deleteButtons = baseElement.querySelectorAll('.delete');
        deleteButtons[0] && fireEvent.click(deleteButtons[0]);
        expect(props.onChange).toBeCalledTimes(2);
        deleteButtons[1] && fireEvent.click(deleteButtons[1]);
        expect(props.onChange).toBeCalledTimes(3);
    });

    it('should render successfully errors prop', () => {
        const { getByText } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} errors={errors} />
            </Provider>,
        );
        expect(getByText('* Invalid time slot')).toBeInTheDocument();
    });

    it('should render successfully isBlocked prop', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} isBlocked />
            </Provider>,
        );
        const attrButton = baseElement
            .querySelector('.add')
            ?.getAttributeNames();
        expect(attrButton).toContain('disabled');
    });

    it('should render successfully list time slots', () => {
        const { baseElement, getByText } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlot {...props} isBlocked />
            </Provider>,
        );

        const dropDown = baseElement.querySelector('.dropdown');
        dropDown && fireEvent.click(dropDown);

        const options = baseElement.querySelector('.options');
        expect(options).toBeInTheDocument();
        expect(getByText('12:00 am')).toBeInTheDocument();
        expect(getByText('11:00 pm')).toBeInTheDocument();
    });
});
