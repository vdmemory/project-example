import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestStatusPage, {
    type StatusCheckoutPageProps,
    InfoBlock,
} from './StatusCheckoutPage';

const mockHandleClickButton = jest.fn();

const defaultProps: StatusCheckoutPageProps = {
    status: 'success',
    successBody: {
        transaction: '12345',
        amount: '100',
        name: 'John Doe',
        last4: '1234',
    },
    handleClickButton: mockHandleClickButton,
    withCardFee: true,
    setIsSuccessTag: jest.fn(),
};

const renderComponent = (props: Partial<StatusCheckoutPageProps> = {}) => {
    return render(<RequestStatusPage {...defaultProps} {...props} />);
};

describe('RequestStatusPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders success state correctly', () => {
        renderComponent();

        expect(screen.getByText('Project Posted')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Your Strategist will be in touch with information about your agency pitches + next steps.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByTestId('custom-button')).toBeInTheDocument();
        expect(screen.getByText('RETURN TO DASHBOARD')).toBeInTheDocument();
    });

    it('renders failed state correctly', () => {
        renderComponent({ status: 'failed' });

        expect(screen.getByText('Payment failed')).toBeInTheDocument();
        expect(screen.getByTestId('custom-button')).toBeInTheDocument();
        expect(screen.getByText('RETRY PAYMENT')).toBeInTheDocument();
    });

    it('calls handleClickButton when button is clicked', () => {
        renderComponent();

        fireEvent.click(screen.getByText('RETURN TO DASHBOARD'));
        expect(mockHandleClickButton).toHaveBeenCalled();
    });

    it('does not display transaction details if successBody is null', () => {
        renderComponent({ successBody: null });

        expect(screen.getByText('Project Posted')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Your Strategist will be in touch with information about your agency pitches + next steps.',
            ),
        ).toBeInTheDocument();
    });
});

describe('Info', () => {
    it('renders the label and value correctly', () => {
        const label = 'amount paid';
        const value = '$100.00';

        render(<InfoBlock label={label} value={value} />);

        expect(screen.getByText(`${label}:`)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('renders the correct classes', () => {
        const label = 'amount paid';
        const value = '$100.00';

        render(<InfoBlock label={label} value={value} />);

        const labelElement = screen.getByText(`${label}:`);
        const valueElement = screen.getByText(value);

        expect(labelElement).toHaveClass('payment-info-item-key');
        expect(valueElement.parentElement).toHaveClass(
            'payment-info-item-value',
        );
    });
});
