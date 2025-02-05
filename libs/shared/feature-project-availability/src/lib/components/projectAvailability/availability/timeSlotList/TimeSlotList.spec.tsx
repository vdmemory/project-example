import { fireEvent, render } from '@testing-library/react';
import { mockConfiguredStore } from '../../../../utils';
import { Provider } from 'react-redux';
import { TimeSlotList } from './TimeSlotList';
import moment from 'moment';

const props = {
    days: [
        {
            id: 11,
            day: moment('2021-09-09'),
            timeSlots: [
                {
                    id: 1,
                    from: '13:00',
                    to: '13:30',
                    isBooked: false,
                },
            ],
        },
    ],
    errorsDays: [],
};

const emptyProps = {
    days: [],
    errorsDays: [],
};

describe('TimeSlotList', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlotList {...props} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(
            getByText(props.days[0].day.format('MM.DD.YY')),
        ).toBeInTheDocument();
        expect(getByText(props.days[0].day.format('dddd'))).toBeInTheDocument();
    });

    it('should render successfully placeholder when days empty', () => {
        const { baseElement, getByText } = render(
            <Provider store={mockConfiguredStore()}>
                <TimeSlotList {...emptyProps} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(
            getByText('Please select a day first on the left.'),
        ).toBeInTheDocument();
    });
});
