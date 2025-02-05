import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { CardView } from './CardView';

const onEdit = jest.fn();
const defaultProps = {
    label: 'Test Label',
    description: 'Test Description',
    tooltip: 'Tooltip',
    onEdit,
};
describe('CardView', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId, getByText } = render(
            <CardView {...defaultProps}>
                <div>test children</div>
            </CardView>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('tooltip-icon')).toBeInTheDocument();
        expect(getByText('Test Description')).toBeInTheDocument();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('test children')).toBeInTheDocument();
        expect(getByText('Edit')).toBeInTheDocument();
    });
    it('should call onEdit on card click successfully successfully', () => {
        const { getByTestId } = render(
            <CardView {...defaultProps}>
                <div>test children</div>
            </CardView>,
        );
        const wrapper = getByTestId('card-view-wrapper');
        fireEvent.click(wrapper);
        expect(onEdit).toBeCalled();
    });
});
