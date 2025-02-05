import { fireEvent, render, screen } from '@testing-library/react';
import CardPaymentType from './CardPaymentType';

const selectHandler = jest.fn();
const props = {
    label: 'label',
    note: 'note',
    isSelected: false,
    onSelect: selectHandler,
};

describe('CardPaymentType', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CardPaymentType {...props} />);
        expect(baseElement).toBeTruthy();
        const cardPaymentType = screen.getByTestId('card-payment-type');
        expect(cardPaymentType).toBeTruthy();
        fireEvent.click(cardPaymentType);
        expect(selectHandler).toBeCalled();
    });
});
