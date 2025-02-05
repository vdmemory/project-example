import React from 'react';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section Component', () => {
    it('renders children', () => {
        render(
            <Section>
                <div>Child Component</div>
            </Section>,
        );

        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });

    it('renders label if provided', () => {
        render(
            <Section label="Section Label">
                <div>Child Component</div>
            </Section>,
        );

        expect(screen.getByText('Section Label')).toBeInTheDocument();
    });

    it('applies custom className if provided', () => {
        render(
            <Section className="custom-section">
                <div>Child Component</div>
            </Section>,
        );

        const section = screen.getByTestId('section');
        expect(section).toHaveClass('custom-section');
    });

    it('applies default margin bottom if mb prop is not provided', () => {
        render(
            <Section>
                <div>Child Component</div>
            </Section>,
        );

        const section = screen.getByTestId('section');
        expect(section).toHaveStyle('margin-bottom: 24px');
    });

    it('applies custom margin bottom if mb prop is provided', () => {
        render(
            <Section mb="16">
                <div>Child Component</div>
            </Section>,
        );

        const section = screen.getByTestId('section');
        expect(section).toHaveStyle('margin-bottom: 16px');
    });
});
