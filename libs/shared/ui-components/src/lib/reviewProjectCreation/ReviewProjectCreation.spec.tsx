import { fireEvent, render, screen } from '@testing-library/react';
import {
    BudgetType,
    Choice,
    ProjectStartDay,
    SocialNameEnum,
} from '@breef/shared/constants';
import { ReviewProjectCreation } from './ReviewProjectCreation';

const onEdit = jest.fn();
const props = {
    data: {
        name: 'Test project',
        agencySkills: [{ id: 1, name: 'skill 1', note: 'test skill note' }],
        description: 'test project description',
        agencyLocation: 'test agency location',
        companyLocation: 'test company location',
        agencyTags: [{ id: 1, name: 'test agency tag' }],
        companyWebsite: 'company-website.com',
        companyDescription: 'test company description',
        companyName: 'test company name',
        idealAgencyDescription: 'test ideal agency description',
        openToRemoteAgencies: false,
        budgetRange: Choice.less_then_fifty,
        budgetType: BudgetType.Monthly,
        socialLinks: [
            {
                title: SocialNameEnum.Instagram,
                link: '@instagram',
            },
            {
                title: SocialNameEnum.Tiktok,
                link: '@tiktok',
            },
            {
                title: SocialNameEnum.Twitter,
                link: '@twitter',
            },
        ],
        brandLinks: [{ title: 'test additional link', link: 'test.com' }],
        files: [{ id: 1, title: 'test file', link: 'test-file-link.com' }],
        startDay: ProjectStartDay.Now,
        isConfidential: false,
    },
    onEdit,
};

const renderReviewProjectCreation = () => <ReviewProjectCreation {...props} />;

describe('ReviewProjectCreation', () => {
    it('should render successfully', () => {
        render(renderReviewProjectCreation());
        expect(screen.getByText('skill 1')).toBeInTheDocument();
        expect(screen.getByText('test skill note')).toBeInTheDocument();
        expect(
            screen.getByText('test project description'),
        ).toBeInTheDocument();
        expect(screen.getByText('test agency location')).toBeInTheDocument();
        expect(screen.getByText('test agency tag')).toBeInTheDocument();
        expect(
            screen.getByText('test company description'),
        ).toBeInTheDocument();
        expect(screen.getByText('test company name')).toBeInTheDocument();
        expect(
            screen.getByText('test ideal agency description'),
        ).toBeInTheDocument();
        expect(screen.getByText('$40K - $50K, Monthly')).toBeInTheDocument();
        expect(screen.getByText('test additional link')).toBeInTheDocument();
        expect(screen.getByText('test file')).toBeInTheDocument();
        expect(screen.getByText('Now')).toBeInTheDocument();
        expect(screen.getAllByTestId('pen-button').length).toBe(5);
    });
    it('should call onEdit on pen button click successfully', () => {
        render(renderReviewProjectCreation());
        const penButton = screen.getAllByTestId('pen-button')[0];
        expect(penButton).toBeInTheDocument();
        fireEvent.click(penButton);
        expect(onEdit).toBeCalled();
    });
});
