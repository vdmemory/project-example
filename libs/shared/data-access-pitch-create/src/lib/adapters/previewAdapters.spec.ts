import moment from 'moment';
import {
    BudgetType,
    Choice,
    IsInterestedProject,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    ProjectAgencyActionStatuses,
    ProjectCreationStepsEnum,
    ProjectStatuses,
} from '@breef/shared/constants';

import {
    ProjectInterestedType,
    PitchAcceptTerms,
    PitchPreviewRequest,
} from '@breef/shared/types';

import { getSocialLink } from './helperFunction';

import {
    adaptedSocialLink,
    preparePassReasons,
    prepareSetTermsForPitch,
    transformPreviewPitch,
} from './previewAdapters';

jest.mock('@breef/shared/utils', () => ({
    getFiles: jest.fn(),
    getBrandLinks: jest.fn(),
    urlToDefaultFormat: jest.fn(),
}));

jest.mock('./helperFunction', () => ({
    getSocialLink: jest.fn(),
}));

describe('transformPreviewPitch', () => {
    const mockValues: PitchPreviewRequest = {
        is_rebuild_project: false,
        name: 'name',
        company_location: 'ca',
        company_description: 'company_description',
        start_day: '',
        description: 'description',
        agency_skills: [],
        open_to_remote_agencies: false,
        budget_range_type: BudgetType.Monthly,
        budget_range: Choice['100k-150k'],
        agency_location: 'us',
        tags: [],
        social_links: [],
        brand_links: [],
        files: [],
        company_website: null,
        step: ProjectCreationStepsEnum.Post,
        is_accepted_terms: false,
        kickoff_id: null,
        is_pitch_submitted: false,
        company_name: '',
        submission_deadline: null,
        kick_off_status: 'draft',
        pitch_id: null,
        action_value: ProjectAgencyActionStatuses.clientReview,
        progress_bar_status: PitchProjectProgressBarStatuses.clientReview,
        status: ProjectStatuses.draft,
        is_interested: IsInterestedProject.Interested,
        project_agency_id: 0,
        project_agency_status: PitchProjectStatuses.clientReview,
        accepted_terms: false,
        is_confidential: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should transform pitch data when terms are not accepted', () => {
        const result = transformPreviewPitch({
            ...mockValues,
            is_accepted_terms: false,
        });

        expect(result).toMatchObject({
            name: mockValues.name,
            companyLocation: '',
        });
    });
});

describe('prepareSetTermsForPitch', () => {
    it('should prepare the terms for pitch', () => {
        const mockValues: PitchAcceptTerms = {
            accepted_terms: true,
            agree_with_deadline: true,
            id: 1,
        };

        const result = prepareSetTermsForPitch(mockValues);
        expect(result).toEqual({
            accepted_terms: true,
            agree_with_deadline: true,
        });
    });
});

jest.mock('./helperFunction', () => ({
    getSocialLink: jest.fn(),
}));

describe('adaptedSocialLink', () => {
    it('should adapt social links', () => {
        const mockValues = [
            { title: 'instagram', link: 'https://instagram.com' },
            { title: 'twitter', link: 'https://twitter.com' },
        ];

        (getSocialLink as jest.Mock).mockImplementation((links, title) => {
            return (
                links.find((link: { title: any }) => link.title === title)
                    ?.link || ''
            );
        });

        const result = adaptedSocialLink(mockValues);
        expect(result).toEqual([
            { link: 'https://instagram.com', title: 'instagram' },
            { link: '', title: 'tiktok' },
            { link: 'https://twitter.com', title: 'twitter' },
        ]);
    });
});

describe('preparePassReasons', () => {
    it('should prepare pass reasons when not interested', () => {
        const mockValues: ProjectInterestedType = {
            isInterested: IsInterestedProject.NotInterested,
            passReasons: [{ id: 1, name: 'test', description: 'description' }],
            projectAgencyId: 1,
        };

        const result = preparePassReasons(mockValues);
        expect(result).toEqual({
            is_interested: IsInterestedProject.NotInterested,
            pass_reasons: [1],
        });
    });

    it('should prepare pass reasons when interested', () => {
        const mockValues: ProjectInterestedType = {
            isInterested: IsInterestedProject.Interested,
            passReasons: [],
            projectAgencyId: 1,
        };

        const result = preparePassReasons(mockValues);
        expect(result).toEqual({
            is_interested: IsInterestedProject.Interested,
        });
    });
});
