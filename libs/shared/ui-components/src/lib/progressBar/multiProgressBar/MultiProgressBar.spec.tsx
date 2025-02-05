import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MultiProgressBar } from './MultiProgressBar';

const defaultProps = {
    step: 1,
    stepper: 1,
    numberSteppersSteps: [1, 1],
    config: [
        {
            name: 'Test 1',
            fillSize: '100%',
        },
        {
            name: 'Test 2',
            fillSize: '0%',
        },
    ],
};
describe('MultiProgressBar', () => {
    it('should render successfully', () => {
        const { baseElement, getAllByText, getByTestId } = render(
            <MultiProgressBar {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('multi-progress-bar')).toBeInTheDocument();
        expect(getAllByText('Test 1').length).toBe(2);
        expect(getAllByText('Test 2').length).toBe(2);
    });
    it('should not render progress bar if isHideProgressBar is true', () => {
        const { queryByTestId } = render(
            <MultiProgressBar {...defaultProps} isHideProgressBar={true} />,
        );
        expect(queryByTestId('multi-progress-bar')).toBe(null);
    });
});
