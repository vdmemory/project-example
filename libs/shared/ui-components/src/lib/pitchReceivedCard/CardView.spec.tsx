import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardView from './CardView';
import { PitchProjectStatuses, ProjectStatuses } from '@breef/shared/constants';

describe('CardView', () => {
    it('displays correct label based on provided props', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="public"
                pitchesCount={1}
                projectStatus={ProjectStatuses.inProgress}
                status={PitchProjectStatuses.agencySelected}
                reviewDesign="none"
                pitchesUnreviewedLength={0}
            />,
        );
        expect(getByText('View pitch')).toBeInTheDocument();
    });

    it('displays correct label based on provided props 2', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="private"
                pitchesCount={1}
                projectStatus={ProjectStatuses.draft}
                status={PitchProjectStatuses.reviewProject}
                reviewDesign="none"
                pitchesUnreviewedLength={1}
            />,
        );
        expect(getByText('Review pitch')).toBeInTheDocument();
    });

    it('displays correct label based on provided props 3', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="private"
                pitchesCount={1}
                projectStatus={ProjectStatuses.draft}
                status={PitchProjectStatuses.reviewProject}
                reviewDesign="unreviewed"
                pitchesUnreviewedLength={1}
            />,
        );
        expect(getByText('Review pitch')).toBeInTheDocument();
    });

    it('displays correct label based on provided props 3', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="private"
                pitchesCount={2}
                projectStatus={ProjectStatuses.draft}
                status={PitchProjectStatuses.reviewProject}
                reviewDesign="unreviewed"
                pitchesUnreviewedLength={2}
            />,
        );
        expect(getByText('Review pitches')).toBeInTheDocument();
    });

    it('displays correct label based on provided props 4', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="private"
                pitchesCount={1}
                projectStatus={ProjectStatuses.teamSelected}
                status={PitchProjectStatuses.shortlisted}
                reviewDesign="Good"
                pitchesUnreviewedLength={0}
            />,
        );
        expect(getByText('View pitch')).toBeInTheDocument();
    });

    it('displays correct label based on provided props 5', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="public"
                pitchesCount={1}
                projectStatus={ProjectStatuses.complete}
                status={PitchProjectStatuses.agencySelected}
                reviewDesign="Excellent"
                pitchesUnreviewedLength={0}
            />,
        );

        expect(getByText('View pitch')).toBeInTheDocument();
    });

    it('displays correct label based on provided props 6', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="public"
                pitchesCount={2}
                projectStatus={ProjectStatuses.complete}
                status={PitchProjectStatuses.agencySelected}
                reviewDesign="Excellent"
                pitchesUnreviewedLength={0}
            />,
        );

        expect(getByText('View pitches')).toBeInTheDocument();
    });

    it('calls handleClick when card is clicked', () => {
        const handleClickMock = jest.fn();
        const { getByText } = render(
            <CardView
                handleClick={handleClickMock}
                type="public"
                pitchesCount={1}
                projectStatus={ProjectStatuses.complete}
                status={PitchProjectStatuses.agencySelected}
                reviewDesign="Excellent"
                pitchesUnreviewedLength={0}
            />,
        );

        const cardViewTitle = getByText('View pitch');
        fireEvent.click(cardViewTitle);

        expect(handleClickMock).toHaveBeenCalled();
    });
});
