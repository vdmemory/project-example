import { render, screen } from '@testing-library/react';
import { Item } from './Item.component';

const props = {
    label: 'test label',
    order: 1,
    isActive: true,
    isCompleted: false,
};
describe('Item', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Item {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test label')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });
    it('should render with completed state successfully', () => {
        render(<Item {...props} isCompleted />);
        expect(screen.queryByText('1')).toBe(null);
        expect(screen.getByTestId('selected-icon')).toBeInTheDocument();
    });
});
