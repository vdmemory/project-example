import { fireEvent, render } from '@testing-library/react';
import ChipSelect from './ChipSelect';

const handleSelect = jest.fn();
const defaultProps = {
    initialOptions: [
        {
            id: 1,
            name: 'Test chip 1',
        },
        {
            id: 2,
            name: 'Test chip 2',
        },
    ],
    handleSelect,
};
describe('ChipSelect', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <ChipSelect {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test chip 1')).toBeInTheDocument();
        expect(getByText('Test chip 2')).toBeInTheDocument();
    });
    it('should call handleSelect on chip click successfully', () => {
        const { getByText } = render(<ChipSelect {...defaultProps} />);
        const firstChip = getByText('Test chip 1');
        fireEvent.click(firstChip);
        expect(handleSelect).toBeCalled();
    });
});
