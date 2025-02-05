import { render, screen } from '@testing-library/react';
import ReviewRetainerBlock from './ReviewRetainerBlock';

const props = {
    payBy: 'payBy',
    deliverable: 'deliverable',
    amount: 'amount',
    teamTake: 'teamTake',
    paymentFrequency: 'paymentFrequency',
    paymentTerms: 'paymentTerms',
};

describe('ReviewRetainerBlock', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ReviewRetainerBlock {...props} userType="agency" />,
        );
        expect(baseElement).toBeTruthy();
        const teamTakeCell = screen.getByText(/Team take/gi);
        expect(teamTakeCell).toBeTruthy();
    });
});
