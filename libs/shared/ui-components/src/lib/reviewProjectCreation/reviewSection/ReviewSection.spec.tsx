import { render, screen } from '@testing-library/react';
import ReviewSection from './ReviewSection';

const props = {
    title: 'Test title',
};
describe('ReviewSection', () => {
    it('should render successfully', () => {
        render(
            <ReviewSection {...props}>
                <div>children</div>
            </ReviewSection>,
        );
        expect(screen.getByText('children')).toBeInTheDocument();
        expect(screen.getByText('Test title')).toBeInTheDocument();
    });
});
