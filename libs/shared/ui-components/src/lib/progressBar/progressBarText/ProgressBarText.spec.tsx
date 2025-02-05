import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBarText } from './ProgressBarText';

const defaultProps = {
    config: {
        name: 'Test Name',
        fillSize: '50%',
    },
    progressClipPath: 'inset(0% 0% 0% 0%)',
    isHideLabel: false,
};
describe('ProgressBarText', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId, getAllByText } = render(
            <ProgressBarText {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('progress-bar-text')).toBeInTheDocument();
        expect(getAllByText('Test Name').length).toBe(2);
    });

    it('should render successfully', () => {
        const { baseElement, getByTestId, getAllByText } = render(
            <ProgressBarText {...defaultProps} isHideLabel={true} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('progress-bar-text')).toBeInTheDocument();
        expect(getAllByText('Test Name').length).toBe(2);
    });
});
