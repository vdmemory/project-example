import { render } from '@testing-library/react';
import CardController, { cardTypes } from './CardController';

const onChange = jest.fn();
const defaultProps = {
    data: {
        id: 'id',
        name: 'Test Name',
        description: 'description',
        isTagged: false,
    },
    type: 'checkbox' as 'radio' | 'checkbox',
    isChecked: false,
    onChange,
    cardNumber: 1,
};
describe('CardController', () => {
    it('should render Card successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <CardController {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('card-input')).toBeInTheDocument();
        expect(getByText('Test Name')).toBeInTheDocument();
    });
    it('should render CardTemplate successfully', () => {
        const { getByTestId } = render(
            <CardController
                {...defaultProps}
                cardType={cardTypes.cardTemplate}
            />,
        );
        expect(getByTestId('card-template-input')).toBeInTheDocument();
    });
    it('should render CardTemplate successfully', () => {
        const { getByTestId } = render(
            <CardController
                {...defaultProps}
                cardType={cardTypes.expandedCard}
            />,
        );
        expect(getByTestId('expanded-card-input')).toBeInTheDocument();
    });
});
