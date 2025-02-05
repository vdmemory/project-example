import { fireEvent, render, screen } from '@testing-library/react';
import { MeetingBookingList } from './MeetingBookingList';

const props = {
    list: [
        {
            id: 535,
            fromTime: '2023-10-13T09:00:00-07:00',
            toTime: '2023-10-13T12:00:00-07:00',
            isBooked: false,
        },
        {
            id: 536,
            fromTime: '2023-10-13T13:00:00-07:00',
            toTime: '2023-10-13T14:00:00-07:00',
            isBooked: false,
        },
    ],
    onSelect: jest.fn(),
};

const emptyProps = {
    list: [],
    onSelect: jest.fn(),
};

const selected = {
    id: 535,
    fromTime: '2023-10-13T09:00:00-07:00',
    toTime: '2023-10-13T12:00:00-07:00',
    isBooked: false,
};

describe('MeetingBookingList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<MeetingBookingList {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully placeholder when days empty', () => {
        const { baseElement, getByText } = render(
            <MeetingBookingList {...emptyProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(
            getByText('Please select a day first on the left.'),
        ).toBeInTheDocument();
    });

    it('should render successfully slot list', () => {
        render(<MeetingBookingList {...props} />);
        const first = screen.getByText(/9:00 am - 12:00 pm/gi);
        expect(first).toBeTruthy();

        const second = screen.getByText(/1:00 pm - 2:00 pm/gi);
        expect(second).toBeTruthy();
    });

    it('action button slot', () => {
        const { baseElement } = render(<MeetingBookingList {...props} />);

        const firstButton =
            baseElement.getElementsByClassName('booking-slot')[0];
        fireEvent.click(firstButton);
        expect(props.onSelect).toBeCalledTimes(1);

        const secondButton =
            baseElement.getElementsByClassName('booking-slot')[1];
        fireEvent.click(secondButton);
        expect(props.onSelect).toBeCalledTimes(2);
    });

    it('should render successfully selected booking slot', () => {
        const { baseElement } = render(
            <MeetingBookingList {...props} selected={selected} />,
        );

        const selectedButton =
            baseElement.getElementsByClassName('selected')[0];
        expect(selectedButton).toBeInTheDocument();
    });
});
