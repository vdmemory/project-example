import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReviewProjectPopup } from './ReviewProjectPopup';
import { Popup } from '../popup/Popup';
import { ProjectReviewType } from './ReviewProjectCreation';
import { useMediaContext } from '@breef/shared/hooks';
import { BudgetType } from '@breef/shared/constants';

// Mocking dependencies
jest.mock('../popup/Popup', () => ({
    Popup: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}));
jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: jest.fn(),
}));
jest.mock('@breef/shared/assets/variables', () => ({
    mediaScreen: jest.fn(),
}));

const mockUseMediaContext = useMediaContext as jest.MockedFunction<
    typeof useMediaContext
>;

describe('ReviewProjectPopup', () => {
    const mockClose = jest.fn();
    const mockProjectData: ProjectReviewType = {
        name: '',
        agencyLocation: '',
        openToRemoteAgencies: false,
        startDay: null,
        companyName: '',
        companyWebsite: '',
        companyLocation: '',
        companyDescription: '',
        budgetRange: '',
        budgetType: BudgetType.Monthly,
        socialLinks: [],
        brandLinks: [],
        agencyTags: [],
        description: '',
        agencySkills: [],
        files: [],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useMediaContext as jest.Mock).mockReturnValue({ isMobile: false });
    });

    it('should render loading state if no projectData is provided', () => {
        render(<ReviewProjectPopup close={mockClose} projectData={null} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
