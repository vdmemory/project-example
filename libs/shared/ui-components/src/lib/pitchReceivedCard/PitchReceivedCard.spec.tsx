/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PitchReceivedCard from './PitchReceivedCard';
import { PitchProjectStatuses, ProjectStatuses } from '@breef/shared/constants';

jest.mock('@breef/shared/assets', () => ({
    handPointerImage: { src: 'hand-pointer.png' },
}));

const defaultProps = {
    companyLocation: 'New York',
    companyName: 'Tech Corp',
    logo: 'logo.png',
    rowCount: 3,
    handleClick: jest.fn(),
    param: '123',
    isShowVerticalArrow: false,
    type: 'private',
    pitchesCount: 5,
    status: PitchProjectStatuses.reviewProject,
    id: '1',
    projectStatus: ProjectStatuses.draft,
    isMobile: false,
    reviewDesign: 'pending',
    pitchesUnreviewedLength: 2,
    isHideHoverCard: false,
};

describe('PitchReceivedCard Component', () => {
    it('renders correctly with given props', () => {
        // @ts-ignore
        render(<PitchReceivedCard {...defaultProps} />);

        expect(screen.getByAltText('logo pitch')).toHaveAttribute(
            'src',
            'logo.png',
        );
        expect(screen.getByText('Tech Corp')).toBeInTheDocument();
        expect(screen.getByText('New York')).toBeInTheDocument();
    });

    // it('handles click correctly when handleClick is provided', () => {
    //     // @ts-ignore
    //     render(<PitchReceivedCard {...defaultProps} />);

    //     const card = screen.getByText('Tech Corp');
    //     fireEvent.click(card);

    //     expect(defaultProps.handleClick).toHaveBeenCalledWith('123');
    // });

    // it('shows hover card on mouse enter and hides on mouse leave when not on mobile', () => {
    //     // @ts-ignore
    //     render(<PitchReceivedCard {...defaultProps} />);

    //     fireEvent.mouseEnter(screen.getByText('Tech Corp'));
    //     expect(screen.getByText('pending')).toBeInTheDocument();

    //     fireEvent.mouseLeave(screen.getByText('Tech Corp'));
    //     expect(screen.queryByText('pending')).not.toBeInTheDocument();
    // });

    it('does not show hover card on mouse events when on mobile', () => {
        // @ts-ignore
        render(<PitchReceivedCard {...defaultProps} isMobile={true} />);

        fireEvent.mouseEnter(screen.getByText('Tech Corp'));
        expect(screen.queryByText('pending')).not.toBeInTheDocument();

        fireEvent.mouseLeave(screen.getByText('Tech Corp'));
        expect(screen.queryByText('pending')).not.toBeInTheDocument();
    });

    it('shows hand pointer image when isShowVerticalArrow is true and companyName is not provided', () => {
        render(
            // @ts-ignore
            <PitchReceivedCard
                {...defaultProps}
                companyName=""
                isShowVerticalArrow={true}
            />,
        );

        expect(screen.getByAltText('Pointer')).toHaveAttribute(
            'src',
            'hand-pointer.png',
        );
    });

    it('does not show hover card when isHideHoverCard is true', () => {
        // @ts-ignore
        render(<PitchReceivedCard {...defaultProps} isHideHoverCard={true} />);

        fireEvent.mouseEnter(screen.getByText('Tech Corp'));
        expect(screen.queryByText('pending')).not.toBeInTheDocument();
    });

    // it('calls handleClick with id if param is not provided', () => {
    //     // @ts-ignore
    //     render(<PitchReceivedCard {...defaultProps} param={null} />);

    //     const card = screen.getByText('Tech Corp');
    //     fireEvent.click(card);

    //     expect(defaultProps.handleClick).toHaveBeenCalledWith('1');
    // });
});
