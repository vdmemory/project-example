import { render } from '@testing-library/react';
import { CreationProgress } from './CreationProgress';

describe('CreationProgress', () => {
    it('renders CreationProgress component with the correct number of steps', () => {
        const config = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
        const { getByTestId, getAllByTestId } = render(
            <CreationProgress config={config} step={2} />,
        );

        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toBeInTheDocument();

        const stepItems = getAllByTestId('step-item');
        expect(stepItems.length).toBe(config.length);
    });
});
