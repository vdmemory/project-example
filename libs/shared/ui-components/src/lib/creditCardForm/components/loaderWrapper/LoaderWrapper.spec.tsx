import { render, screen } from '@testing-library/react';
import { LoaderWrapper } from './LoaderWrapper';

const defaultProps = {
    isLoading: false,
};

describe('LoaderWrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <LoaderWrapper {...defaultProps}>test children</LoaderWrapper>,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test children')).toBeInTheDocument();
    });
});
