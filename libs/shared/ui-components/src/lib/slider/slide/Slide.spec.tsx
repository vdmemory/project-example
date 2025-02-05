import { render } from '@testing-library/react';
import Slide from './Slide';

const defaultProps = {
    slide: {
        imageUrl: 'imageUrl',
        note: 'Test Note',
        label: 'Test Label',
    },
    isCurrentSlide: true,
};
describe('Slide', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<Slide {...defaultProps} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('Test Note')).toBeInTheDocument();
    });
});
