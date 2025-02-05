import { render } from '@testing-library/react';

import BlurPageLoader from './BlurPageLoader';

describe('BlurPageLoader', () => {
    it('should render successfully BlurPageLoader', () => {
        const { baseElement } = render(<BlurPageLoader />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully BlurPageLoader with error message', () => {
        const { getByText } = render(
            <BlurPageLoader errorMessage="error message" />,
        );
        expect(getByText('Error: error message')).toBeInTheDocument();
    });
});
