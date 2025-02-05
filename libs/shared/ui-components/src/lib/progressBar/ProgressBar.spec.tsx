import { render } from '@testing-library/react';
import ProgressBar from './ProgressBar';
import '@testing-library/jest-dom';

const defaultProps = {
    step: 1,
    numberSteps: 2,
    isCurrentProgressBar: true,
    isCompletedProgress: false,
    isHideLabel: false,
};
describe('ProgressBar', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <ProgressBar {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('progress-bar')).toBeInTheDocument();
    });
    it('should render with config successfully', () => {
        const { queryByTestId, getByTestId, getAllByText } = render(
            <ProgressBar
                {...defaultProps}
                config={{ name: 'Test Name', fillSize: '50%' }}
            />,
        );
        expect(queryByTestId('progress-bar')).toBe(null);
        expect(getByTestId('progress-bar-text')).toBeInTheDocument();
        expect(getAllByText('Test Name').length).toBe(2);
    });
});
