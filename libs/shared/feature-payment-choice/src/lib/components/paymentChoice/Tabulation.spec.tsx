import { render } from '@testing-library/react';
import { Tabulation } from './Tabulation';

const props = {
    amount: 200,
    onClick: jest.fn(),
    tabs: [
        {
            label: 'first',
            key: 'first',
        },
        {
            label: 'last',
            key: 'last',
        },
    ],
    paymentMethod: 'first',
};

describe('Tabulation Component', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Tabulation {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it(`should render successfully title`, async () => {
        const { getByText } = render(<Tabulation {...props} />);
        expect(getByText('Make Payment')).toBeInTheDocument();
    });
    it(`should render successfully title desc`, async () => {
        const { getByText } = render(<Tabulation {...props} />);
        expect(getByText('select a payment method')).toBeInTheDocument();
    });
    it(`should render successfully name tabs`, async () => {
        const { getByText } = render(<Tabulation {...props} />);
        expect(getByText('first')).toBeInTheDocument();
        expect(getByText('last')).toBeInTheDocument();
    });
    it(`should render successfully name tabs`, async () => {
        const { getByText } = render(
            <Tabulation {...props} isHideTabs={true} />,
        );
        expect(getByText('Payment total')).toBeInTheDocument();
        expect(getByText('$200')).toBeInTheDocument();
    });
});
