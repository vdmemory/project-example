import { render, screen } from '@testing-library/react';
import { FieldError } from './FieldError';

describe('FieldError', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <FieldError error="Error message! Log in." />,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText(/^log in$/i)).toBeTruthy();
    });
});
