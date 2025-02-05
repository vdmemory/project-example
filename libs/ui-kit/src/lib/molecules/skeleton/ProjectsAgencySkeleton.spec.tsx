import { render, screen } from '@testing-library/react';
import {
    ProjectsAgencySkeletonComponent,
    ProjectsAgencySkeleton,
} from './ProjectsAgencySkeleton.component';

describe('ProjectsAgencySkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProjectsAgencySkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

describe('ProjectsAgencySkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProjectsAgencySkeletonComponent />);
        expect(baseElement).toBeTruthy();
    });

    it('should render the correct number of skeleton cards and buttons', () => {
        render(<ProjectsAgencySkeletonComponent />);

        const cards = screen.getAllByText('', { selector: '.card' });
        expect(cards.length).toBe(3);

        const buttons = screen.getAllByText('', { selector: '.button' });
        expect(buttons.length).toBe(3);
    });

    it('should have the correct structure inside each card and button', () => {
        render(<ProjectsAgencySkeletonComponent />);

        const textElementsInCards = screen.getAllByText('', {
            selector: '.card .text',
        });
        expect(textElementsInCards.length).toBe(6);

        const titleElementsInCards = screen.getAllByText('', {
            selector: '.card .title',
        });
        expect(titleElementsInCards.length).toBe(3);

        //Verify button texts and titles
        const btnTexts = screen.getAllByText('', {
            selector: '.button .btn-text',
        });
        expect(btnTexts.length).toBe(3);
        const btnTitles = screen.getAllByText('', {
            selector: '.button .btn-title',
        });
        expect(btnTitles.length).toBe(3);
    });

    it('should include shimmer effect', () => {
        render(<ProjectsAgencySkeletonComponent />);

        const shimmer = screen.getByTestId('shimmer');
        expect(shimmer).toBeInTheDocument();
    });
});
