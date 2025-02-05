import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Project, ProjectProps } from './Project';
import {
    ProjectStatuses,
    Filters,
    ProjectClientActionStatuses,
    ProjectProgressBarStatuses,
} from '@breef/shared/constants';
import {
    useRouteControl,
    useMediaContext,
    useActionButtonProjectConfig,
} from '@breef/shared/hooks';
import { useProjectsSelector } from '../../../store/hooks';
import { usePopup } from '@breef/shared/ui-components';
import { ProgressState } from '@breef/shared/types';

// Mock hooks
jest.mock('@breef/shared/hooks');
jest.mock('@breef/shared/ui-components');

jest.mock('../../../store/hooks', () => ({
    useProjectsSelector: jest.fn(),
}));

const mockChangePage = jest.fn();
const mockHandleRedirectToProjectListening = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();

    (useRouteControl as jest.Mock).mockReturnValue({
        changePage: mockChangePage,
    });
    (useMediaContext as jest.Mock).mockReturnValue({ isTablet: false });
    (usePopup as jest.Mock).mockReturnValue({
        isOpen: false,
        open: jest.fn(),
        close: jest.fn(),
    });
    (useActionButtonProjectConfig as jest.Mock).mockReturnValue({
        clientProjectActionButtonStatuses: {},
        agencyProjectActionButtonStatuses: {},
    });
    (useProjectsSelector as jest.Mock).mockReturnValue({ brandLead: null });
});

const defaultProps: ProjectProps = {
    idx: 1,
    data: {
        id: 1,
        status: ProjectStatuses.draft,
        name: 'Test Project',
        actionValue: ProjectClientActionStatuses.postProject,
        created: '',
        budget: '',
        progress: [
            {
                name: 'Project Planning',
                status: ProgressState.inProgress,
            },
        ],
        progressBarStatus: ProjectProgressBarStatuses.pitchReview,
    },
    pitchId: null,
    paymentId: null,
    kickoffId: null,
    role: 'client',
    clientName: '',
    clientLogoUrl: '',
    calendlyLink: '',
    submissionDeadline: '',
    filterProjects: { status: Filters.active },
    tag: '',
    pitchStatus: null,
    handleRedirectToProjectListening: mockHandleRedirectToProjectListening,
    isDisabledPayments: false,
    isReviewedPitches: false,
};

describe('Project Component', () => {
    it('should redirect to project edit page if the role is client and status is draft', () => {
        render(<Project {...defaultProps} />);
        const card = screen.getByRole('button');
        fireEvent.click(card);
        expect(mockChangePage).toHaveBeenCalledWith('/project/1/edit');
    });

    it('should do nothing if the role is client and status is archived', () => {
        render(
            <Project
                {...defaultProps}
                data={{
                    ...defaultProps.data,
                    status: ProjectStatuses.archived,
                }}
            />,
        );
        const card = screen.getByRole('button');
        fireEvent.click(card);
        expect(mockChangePage).not.toHaveBeenCalled();
        expect(mockHandleRedirectToProjectListening).not.toHaveBeenCalled();
    });

    it('should do nothing if the role is agency and the project is archived and pitch is not submitted', () => {
        render(
            <Project
                {...defaultProps}
                role="agency"
                filterProjects={{ status: Filters.archived }}
            />,
        );
        const card = screen.queryByRole('button');
        expect(card).not.toBeInTheDocument();
    });
});
