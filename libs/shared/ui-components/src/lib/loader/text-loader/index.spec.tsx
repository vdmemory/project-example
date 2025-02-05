import { render } from '@testing-library/react';

import TextLoader from './TextLoader';
jest.useFakeTimers();

describe('BlurPageLoader', () => {
    it('should render successfully TextLoader default', () => {
        const { baseElement, getByText } = render(<TextLoader />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Loading')).toBeInTheDocument();
    });
    it('should render successfully TextLoader with props', () => {
        const { getByText } = render(<TextLoader />);
        setTimeout(() => {
            expect(getByText('...')).toBeInTheDocument();
        }, 1600);
    });
});
