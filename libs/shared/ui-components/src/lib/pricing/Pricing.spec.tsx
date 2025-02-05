import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Pricing } from './Pricing';

describe('Pricing', () => {
    it('should render the main heading', () => {
        render(<Pricing />);
        expect(screen.getByText('Breef’s project pricing')).toBeInTheDocument();
    });

    it('should render all subheadings', () => {
        render(<Pricing />);
        const subheadings = [
            '1. HOW DOES PRICING WORK?',
            '2. MEMBERSHIP',
            '3. PROJECT CREDITS',
            '4. AGENCY TALENT FEE (15%)',
            '5. PROJECT PAYMENTS',
        ];

        subheadings.forEach(subheading => {
            expect(screen.getByText(subheading)).toBeInTheDocument();
        });
    });

    it('should render all paragraphs with correct content', () => {
        render(<Pricing />);
        const paragraphs = [
            'Breef has built an ecosystem that simplifies outsourcing - supported by the tools, teams, and dedicated curation needed for your company’s projects. The following reflects Breef’s role in seamlessly connecting Clients and Agency Talent.',
            'Breef is free to join. To become a Breef Member, choose from various options on sign up for more premium levels of Membership.',
            'Tailored pitches are accessible by purchasing a Project Credit ($499). A credit can be purchased within your dashboard, ahead of posting your Brief. Contact your Curator for Project Credit packages.',
            'Agency Talent fee is payable by Agency Talent to Breef, and deducted from the final project price.',
            'Breef is your central point of agency spend. All project payments are made through Breef. Once your project is ready to commence, Breef will provide you with the necessary tools to process payments. Parties can nominate when to release a payment held by Breef.',
        ];

        paragraphs.forEach(paragraph => {
            expect(screen.getByText(paragraph)).toBeInTheDocument();
        });
    });

    it('should render the last updated date', () => {
        render(<Pricing />);
        expect(
            screen.getByText('Last Updated: June 3, 2020'),
        ).toBeInTheDocument();
    });
});
