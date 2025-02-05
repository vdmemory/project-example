import { render, screen } from '@testing-library/react';
import { AccentNumber } from './AccentNumber';

describe('AccentNumber', () => {
    it('should render successfully with 000 mask', () => {
        render(<AccentNumber number={11} isOptional />);
        const contentElem = screen.getByText(/011 \(optional\)/i);
        expect(contentElem).toBeTruthy();
    });
});
