import { fireEvent, render, screen } from '@testing-library/react';
import { AccountBillingDetail } from './AccountBillingDetail';

const onClick = jest.fn();
const props = {
    onClick,
    billingDetail: {
        line1: 'test line 1',
        city: 'test city',
        country: 'US',
    },
};
describe('AccountBillingDetail', () => {
    it('should render successfully', () => {
        render(<AccountBillingDetail {...props} />);
        expect(screen.getByText('test line 1')).toBeInTheDocument();
        expect(
            screen.getByText('test city, United States'),
        ).toBeInTheDocument();
    });
    it('should call onClick on container click successfully', () => {
        render(<AccountBillingDetail {...props} />);
        const wrapper = screen.getByTestId('billing-detail-wrapper');
        fireEvent.click(wrapper);
        expect(onClick).toBeCalled();
    });
});
