import { screen, render, fireEvent } from '@testing-library/react';
import BreefPaySection from './BreefPaySection';

const handleClick = jest.fn();

const props = {
    tabs: [
        {
            label: 'Payment pay',
            key: 'breef-pay',
        },
    ],
    onClick: handleClick,
    paymentMethod: 'breef-pay',
    amount: 1000,
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('BreefPaySection', () => {
    it('should render BreefPaySection successfully', () => {
        const { baseElement } = render(<BreefPaySection {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Make Payment')).toBeInTheDocument();
    });

    it('should render BreefPaySection successfully with actions button tabs', () => {
        render(<BreefPaySection {...props} />);
        const tab = screen.getAllByRole('button')[0];
        fireEvent.click(tab);
        expect(handleClick).toBeCalled();
    });
});
