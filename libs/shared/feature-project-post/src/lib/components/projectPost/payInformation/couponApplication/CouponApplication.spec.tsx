import { fireEvent, render, screen } from '@testing-library/react';
import CouponApplication from './CouponApplication';

const onClick = jest.fn();
const props = {
    couponName: 'WELCOME',
    onClick,
    discount: null,
    onRemove: jest.fn(),
};
class ResizeObserverMock {
    observe() {
        return;
    }
    unobserve() {
        return;
    }
    disconnect() {
        return;
    }
}
beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock;
});
afterEach(() => {
    jest.restoreAllMocks();
});
describe('CouponApplication', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <CouponApplication {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('WELCOME'));
    });
    it('should call remove coupon on click remove button successfully', () => {
        const { baseElement } = render(<CouponApplication {...props} />);
        const btnRemove = screen.getByTestId('btn-remove');
        fireEvent.click(btnRemove);
        expect(onClick).toBeCalledWith(null);
    });
    it('the apply button should be always active', () => {
        render(<CouponApplication {...props} />);
        const btnApply = screen.getByRole('button');
        expect(btnApply).not.toBeDisabled();
    });
    it('should call apply coupon with on click apply button', () => {
        const { getByText, getByDisplayValue, getByPlaceholderText } = render(
            <CouponApplication {...props} couponName="" />,
        );
        const input = getByPlaceholderText('Enter a discount code');
        fireEvent.change(input, { target: { value: 'test coupon' } });
        expect(getByDisplayValue('test coupon')).toBeInTheDocument();
        const btnApply = getByText('Apply');
        fireEvent.click(btnApply);
        expect(onClick).toBeCalledWith('test coupon');
    });
});
