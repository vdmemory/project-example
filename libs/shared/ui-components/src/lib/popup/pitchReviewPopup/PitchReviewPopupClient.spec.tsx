import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PitchReviewPopup, {
    textPitchReviewPopup,
} from './PitchReviewPopupClient';
import {
    useMediaContext,
    useRouteControl,
    useWindowSize,
} from '@breef/shared/hooks';
import { useRouter } from 'next/router';

// Mocking dependencies
jest.mock('@breef/shared/hooks');
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
});
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));
(useWindowSize as jest.Mock).mockReturnValue({
    width: 1024,
    height: 720,
});

(useRouteControl as jest.Mock).mockReturnValue({
    changePage: jest.fn().mockResolvedValue('/project/1/pitches-review'),
});

describe('PitchReviewPopup', () => {
    const mockClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with the given props', () => {
        render(<PitchReviewPopup projectId={1} close={mockClose} />);
        expect(
            screen.getByText('Drumroll... your pitches are in!'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'These pitches are an expression of interest from vetted agencies, curated for you and your goals.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('REVIEW PITCHES')).toBeInTheDocument();
        textPitchReviewPopup.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.description)).toBeInTheDocument();
        });
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();
    });

    it('calls changePage and close on next button click', () => {
        render(<PitchReviewPopup projectId={1} close={mockClose} />);
        const button = screen.getByTestId('button-container');
        fireEvent.click(button);
        expect(useRouteControl().changePage).toHaveBeenCalledWith(
            '/project/1/pitches-review',
        );
        expect(useRouteControl().changePage).toHaveBeenCalled();
    });
});
