import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Card from './Card';

const onChange = jest.fn();
const defaultProps = {
    data: {
        id: 'input-id',
        name: 'test name',
    },
    type: 'checkbox' as 'checkbox' | 'radio',
    isChecked: false,
    onChange,
};

describe('Card', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <Card {...defaultProps}>
                <div>test children</div>
            </Card>,
        );
        expect(baseElement).toBeTruthy();
        expect(document.querySelector('#input-id')).toBeInTheDocument();
        expect(getByText('test children'));
    });
    it('should call onChange fn on card click successfully', () => {
        const { getByTestId } = render(
            <Card {...defaultProps}>
                <div>test children</div>
            </Card>,
        );
        const cardWrapper = getByTestId('card-wrapper');
        fireEvent.click(cardWrapper);
        expect(onChange).toBeCalled();
    });
    it('should be with check icon if isChecked prop is true', () => {
        const { getByTestId } = render(
            <Card {...defaultProps} isChecked={true}>
                <div>test children</div>
            </Card>,
        );
        expect(getByTestId('check-min-icon')).toBeInTheDocument();
    });
});
