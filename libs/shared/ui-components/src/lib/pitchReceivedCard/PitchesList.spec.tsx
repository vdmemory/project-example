/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PitchesList from './PitchesList';
import { ProjectStatuses } from '@breef/shared/constants';

const mockPitches = [
    {
        id: 1,
        budget: '1000',
        companyLogoUrl: 'logo1.png',
        companyName: 'Company One',
        companyLocations: { location: 'Location One' },
        status: 'draft',
        token: 'token1',
        reviewDecision: 'approved',
        pitchTags: ['tag1', 'tag2'],
    },
    {
        id: 2,
        budget: '2000',
        companyLogoUrl: 'logo2.png',
        companyName: 'Company Two',
        companyLocations: { location: 'Location Two' },
        status: 'submitted',
        token: 'token2',
        reviewDecision: 'pending',
        pitchTags: ['tag3', 'tag4'],
    },
];

describe('PitchesList Component', () => {
    const defaultProps = {
        handleOpenSharedPopup: jest.fn(),
        emptyListToFillPitches: ['a', 'b', 'c'],
        pitches: mockPitches,
        rowsCount: 2,
        redirectToPitch: jest.fn(),
        type: 'private',
        averageBudget: 1000,
        isShowVerticalArrow: false,
        projectStatus: ProjectStatuses.draft,
        isMobile: false,
        pitchesUnreviewedLength: 1,
        isHideHoverCard: false,
    };

    it('renders correctly with given props', () => {
        // @ts-ignore
        render(<PitchesList {...defaultProps} />);

        expect(screen.getByText('Pitches received')).toBeInTheDocument();
        expect(screen.getByText('Average Budget: $1,000')).toBeInTheDocument();
        expect(screen.getAllByText('Share')).toHaveLength(1);
        expect(screen.getByText('Company One')).toBeInTheDocument();
        expect(screen.getByText('Company Two')).toBeInTheDocument();
    });

    it('calls handleOpenSharedPopup when Share button is clicked', () => {
        // @ts-ignore
        render(<PitchesList {...defaultProps} />);

        const shareButton = screen.getByText('Share');
        fireEvent.click(shareButton);

        expect(defaultProps.handleOpenSharedPopup).toHaveBeenCalled();
    });

    it('does not show share button if type is public', () => {
        render(<PitchesList {...defaultProps} type="public" />);

        expect(screen.queryByText('Share')).not.toBeInTheDocument();
    });

    it('renders correctly on mobile', () => {
        // @ts-ignore
        render(<PitchesList {...defaultProps} isMobile={true} />);

        expect(screen.getAllByText('Share')).toHaveLength(1);
        expect(screen.getByText('Company One')).toBeInTheDocument();
        expect(screen.getByText('Company Two')).toBeInTheDocument();
    });

    // it('redirects to pitch when a pitch card is clicked', () => {
    //     // @ts-ignore
    //     render(<PitchesList {...defaultProps} />);

    //     const pitchCard = screen.getByText('Company One');
    //     fireEvent.click(pitchCard);

    //     expect(defaultProps.redirectToPitch).toHaveBeenCalledWith('token1');
    // });
});
