import moment from 'moment';
import {
    PitchAcceptTerms,
    PitchPreviewRequest,
    PitchPreviewResponse,
    ProjectInterestedRequestType,
    ProjectInterestedType,
} from '@breef/shared/types';

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
    getBrandLinks,
    getFiles,
    urlToDefaultFormat,
} from '@breef/shared/utils';
import { getSocialLink } from './helperFunction';

export function transformPreviewPitch(
    values: PitchPreviewRequest,
): PitchPreviewResponse {
    if (!values.is_accepted_terms) {
        return {
            name: values.name,
            companyLocation: '',
            description: '',
            submissionDeadline: '',
            companyName: '',
            companyDescription: '',
            socialLinks: [],
            agencyLocation: '',
            openToRemoteAgencies: false,
            files: [],
            pitchId: null,
            brandLinks: [],
            status: ProjectStatuses.inCuration,
            projectAgencyStatus: PitchProjectStatuses.reviewProject,
            kickoffId: null,
            progressBarStatus: PitchProjectProgressBarStatuses.reviewAndPitch,
            actionValue: ProjectAgencyActionStatuses.reviewAndPitch,
            companyWebsite: '',
            kickOffStatus: 'draft',
            isPitchSubmitted: values.is_pitch_submitted,
            isInterested: IsInterestedProject.NotSelected,
            isArchived: values.is_archived,
            startDay: '',
            agencySkills: [],
            step: ProjectCreationStepsEnum.Post,
            budgetRange: Choice.less_then_fifty,
            budgetType: BudgetType.Monthly,
            agencyTags: [],
            agenciesAdvantages: [],
            projectAgencyId: 0,
            isAcceptedTerms: values.is_accepted_terms,
            isConfidential: values.is_confidential,
        };
    }

    return {
        name: values.name,
        companyLocation: values.company_location,
        description: values.description,
        submissionDeadline: values.submission_deadline
            ? moment(values.submission_deadline).utc().format('YYYY-MM-DD')
            : '',
        companyName: values.company_name,
        companyDescription: values.company_description,
        socialLinks: adaptedSocialLink(values.social_links),
        agencyLocation: values.agency_location ?? '',
        openToRemoteAgencies: values.open_to_remote_agencies,
        files: getFiles(values.files),
        pitchId: values.pitch_id,
        brandLinks: getBrandLinks(values.brand_links),
        status: values.status,
        projectAgencyStatus: values.project_agency_status,
        kickoffId: values.kickoff_id,
        progressBarStatus: values.progress_bar_status,
        actionValue: values.action_value,
        companyWebsite: values.company_website
            ? urlToDefaultFormat(values.company_website)
            : '',
        kickOffStatus: values.kick_off_status,
        isPitchSubmitted: values.is_pitch_submitted,
        isInterested: values.is_interested,
        isArchived: values.is_archived || false,
        startDay: values.start_day,
        agencySkills: values.agency_skills.map(item => ({
            id: item.capability,
            name: item.capability_name,
            note: item.note ?? '',
        })),
        step: values.step,
        budgetRange: Choice[values.budget_range],
        budgetType: values.budget_range_type,
        agencyTags: values.tags,
        agenciesAdvantages: values.agencies_advantages,
        projectAgencyId: values.project_agency_id,
        isAcceptedTerms: values.is_accepted_terms,
        isConfidential: values.is_confidential,
    };
}

export const prepareSetTermsForPitch = (values: PitchAcceptTerms) => ({
    accepted_terms: values.accepted_terms,
    agree_with_deadline: values.agree_with_deadline,
});

export const adaptedSocialLink = (
    value: { title: string; link: string | null }[],
) => {
    return [
        {
            link: getSocialLink(value, 'instagram'),
            title: 'instagram',
        },
        {
            link: getSocialLink(value, 'tiktok'),
            title: 'tiktok',
        },
        {
            link: getSocialLink(value, 'twitter'),
            title: 'twitter',
        },
    ];
};

export const preparePassReasons = ({
    isInterested,
    passReasons,
}: ProjectInterestedType) => {
    const payload: ProjectInterestedRequestType = {
        is_interested: isInterested,
    };

    if (isInterested === IsInterestedProject.NotInterested) {
        payload.pass_reasons = passReasons?.map(item => item.id);
    }

    return payload;
};
