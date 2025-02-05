import { fireEvent, render } from '@testing-library/react';
import ExpandedCard from './ExpandedCard';

const onChange = jest.fn();
const defaultProps = {
    data: {
        id: 'id',
        name: 'Test Name',
        description: 'Test Description',
        isTagged: false,
    },
    type: 'checkbox' as 'radio' | 'checkbox',
    isChecked: false,
    onChange,
    cardNumber: 1,
};
describe('ExpandedCard', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <ExpandedCard {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Description')).toBeInTheDocument();
        expect(document.querySelector('#id')).toBeInTheDocument();
    });
    it('should render with marks successfully', () => {
        const { getByTestId } = render(
            <ExpandedCard
                {...defaultProps}
                data={{ ...defaultProps.data, description: '', isTagged: true }}
                isChecked={true}
            />,
        );
        expect(getByTestId('tagged-icon')).toBeInTheDocument();
        expect(getByTestId('check-icon')).toBeInTheDocument();
    });
    it('should call onChange on click', () => {
        const { getByTestId } = render(<ExpandedCard {...defaultProps} />);
        fireEvent.click(getByTestId('card-wrapper'));
        expect(onChange).toBeCalled();
    });
});
