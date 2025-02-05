import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestStatusPage, {
    type RequestStatusProps,
    Info,
} from './RequestStatusPage';

const mockHandleClickButton = jest.fn();

const defaultProps: RequestStatusProps = {
    status: 'success',
    successBody: {
        transaction: '12345',
        amount: '100',
        name: 'John Doe',
        last4: '1234',
    },
    typeData: 'card',
    handleClickButton: mockHandleClickButton,
    withCardFee: true,
    setIsSuccessTag: jest.fn(),
};

const renderComponent = (props: Partial<RequestStatusProps> = {}) => {
    return render(<RequestStatusPage {...defaultProps} {...props} />);
};

describe('RequestStatusPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders success state correctly', () => {
        renderComponent();

        expect(screen.getByText('Payment successful!')).toBeInTheDocument();
        expect(
            screen.getByText('Transaction number: 12345'),
        ).toBeInTheDocument();
        expect(screen.getByText('amount paid:')).toBeInTheDocument();
        expect(screen.getByText('$103')).toBeInTheDocument();
        expect(screen.getByText('card:')).toBeInTheDocument();
        expect(screen.getByText('•••• 1234')).toBeInTheDocument();
        expect(screen.getByText('BACK TO DASHBOARD')).toBeInTheDocument();
    });

    it('renders failed state correctly', () => {
        renderComponent({ status: 'failed' });

        expect(screen.getByText('Payment failed')).toBeInTheDocument();
        expect(
            screen.getByText(
                'It looks like there was an issue with the payment information provided. Please double-check and try again',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('RETRY PAYMENT')).toBeInTheDocument();
    });

    it('calls handleClickButton when button is clicked', () => {
        renderComponent();

        fireEvent.click(screen.getByText('BACK TO DASHBOARD'));
        expect(mockHandleClickButton).toHaveBeenCalled();
    });

    it('does not display transaction details if successBody is null', () => {
        renderComponent({ successBody: null });

        expect(screen.getByText('Payment successful!')).toBeInTheDocument();
        expect(
            screen.getByText('Your agency will receive funds shortly'),
        ).toBeInTheDocument();
    });
});

describe('Info', () => {
    it('renders the label and value correctly', () => {
        const label = 'amount paid';
        const value = '$100.00';

        render(<Info label={label} value={value} />);

        expect(screen.getByText(`${label}:`)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('renders the correct classes', () => {
        const label = 'amount paid';
        const value = '$100.00';

        render(<Info label={label} value={value} />);

        const labelElement = screen.getByText(`${label}:`);
        const valueElement = screen.getByText(value);

        expect(labelElement).toHaveClass('payment-info-item-key');
        expect(valueElement).toHaveClass('payment-info-item-value');
    });
});
