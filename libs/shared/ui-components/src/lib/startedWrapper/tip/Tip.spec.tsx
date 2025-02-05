import { render } from '@testing-library/react';
import { Tip } from './Tip';

describe('Tip', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <Tip
                label="Test Label"
                note="Test Note"
                icon={<img data-testid="empty-icon" alt="EmptyIcon" />}
            />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('Test Note')).toBeInTheDocument();
        expect(getByTestId('empty-icon')).toBeInTheDocument();
    });
});
