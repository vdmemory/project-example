import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(<Spinner />);
        expect(baseElement).toBeTruthy();
        expect(getByTestId('spinner')).toBeInTheDocument();
    });
});
