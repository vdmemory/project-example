import { fireEvent, render, screen } from '@testing-library/react';
import { TabChevron } from './TabChevron';

const onCLick = jest.fn();
describe('TabChevron', () => {
    it('should render successfully', () => {
        render(<TabChevron title="Test title" />);
        expect(screen.getByText('Test title')).toBeInTheDocument();
    });
    it('should call onClick on click successfully successfully', () => {
        render(<TabChevron title="Test title" onClick={onCLick} />);
        const container = screen.getByTestId('tab-chevron-wrapper');
        fireEvent.click(container);
        expect(onCLick).toBeCalled();
    });
});
