import { render } from '@testing-library/react';

import { Slider } from './Slider';

const defaultProps = {
    config: {
        animationDelay: 500,
        data: [
            {
                imageUrl: 'imageUrl1',
                label: 'Test Label 1',
                note: 'Test Note 1',
            },
            {
                imageUrl: 'imageUrl2',
                label: 'Test Label 2',
                note: 'Test Note 2',
            },
        ],
    },
    activeSlide: 0,
};
describe('Slider', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<Slider {...defaultProps} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label 1')).toBeInTheDocument();
        expect(getByText('Test Note 1')).toBeInTheDocument();
        expect(getByText('Test Label 2')).toBeInTheDocument();
        expect(getByText('Test Note 2')).toBeInTheDocument();
    });
});
