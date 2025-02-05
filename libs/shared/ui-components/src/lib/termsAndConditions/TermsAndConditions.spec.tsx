import { TERMS_OF_USE_STANDARD_ROUTE } from '@breef/shared/constants';
import { render, screen, fireEvent } from '@testing-library/react';
import { TermsAndConditions } from './TermsAndConditions';

describe('TermsAndConditions', () => {
    const mockClassName = 'test-class';
    const mockValue = true;
    const mockOnChange = jest.fn();

    it('renders TermsAndConditions component correctly', () => {
        render(
            <TermsAndConditions
                className={mockClassName}
                value={mockValue}
                onChange={mockOnChange}
            />,
        );

        const checkbox = screen.getByTestId('checkbox-input');
        const termsLink = screen.getByRole('link', {
            name: /terms and conditions/i,
        });

        expect(checkbox).toBeInTheDocument();
        expect(termsLink).toBeInTheDocument();
        expect(termsLink).toHaveAttribute(
            'href',
            `/client${TERMS_OF_USE_STANDARD_ROUTE}`,
        );
        expect(termsLink).toHaveAttribute('target', '_blank');
        expect(termsLink).toHaveAttribute('rel', 'noreferrer');
    });

    it('calls onChange function when checkbox is clicked', () => {
        render(
            <TermsAndConditions
                className={mockClassName}
                value={mockValue}
                onChange={mockOnChange}
            />,
        );

        const checkbox = screen.getByTestId('checkbox-input');
        fireEvent.click(checkbox);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(!mockValue);
    });
});
