import {
    PitchProjectTags,
    PitchProjectTagsValues,
} from '@breef/shared/constants';
import {
    AgencyProjectType,
    AgencyProjectTypeRequest,
    CollectionPostResponse,
    CollectionPostTransformResponse,
    CTAActionButtonType,
    CTAActionButtonTypeRequest,
    ProjectsResponseType,
    ProjectsTypeRequest,
} from '@breef/shared/types';
import { getKeyByEnumValue } from '@breef/shared/utils';

export const agencyProjectsAdapter = (
    data: AgencyProjectTypeRequest,
): AgencyProjectType => {
    return data.results.map(item => ({
        project: {
            id: item.project.id,
            name: item.project.name,
            status: item.project.status,
            kickoffId: item.project.kickoff_id,
            actionValue: item.action_value,
            projectType: item.project.project_type,
            clientName: item.project.client_name || '',
            clientLogoUrl: item.project.client_logo_url || '',
            submissionDeadline: item.project.submission_deadline || '',
            budget: item.project.budget || '',
        },
        acceptedTerms: item.accepted_terms,
        status: item.status,
        progressBarStatus: item.progress_bar_status,
        pitchId: item.pitch_id,
        pitchStatus: item.pitch_status,
        paymentTotalAmount: {
            oneTimePaymentsPaidAmount:
                item.payment_total_amount?.one_time_payments_paid_amount || '',
            oneTimePaymentsTotalAmount:
                item.payment_total_amount?.one_time_payments_total_amount || '',
            ongoingPaymentAmount:
                item.payment_total_amount?.ongoing_payment_amount || '',
        },
        tag:
            PitchProjectTagsValues[
                getKeyByEnumValue(PitchProjectTags, item.tag)
            ] || PitchProjectTagsValues.newInvitation,
        hoursToSubmissionDeadline: item.hours_to_submission_deadline || 0,
    }));
};

export const projectsAdapter = (
    data: ProjectsTypeRequest,
): ProjectsResponseType => {
    return data.results.map(item => ({
        id: item.id,
        name: item.name,
        pitchCount: item.pitch_count || 0,
        status: item.status,
        actionValue: item.action_value,
        progressBarStatus: item.progress_bar_status,
        paymentId: item.current_payment_id || undefined,
        budget: item.budget,
        created: item.created,
        progress: item.project_progress,
        isReviewedPitches: item.is_reviewed_pitches,
    }));
};

export const transformActionButtonCTA = (
    data: CTAActionButtonTypeRequest,
): CTAActionButtonType => ({
    actionValue: data.action_value,
    meta: {
        projectId: data.metadata?.project_id,
        pitchId: data.metadata?.pitch_id,
        paymentId: data.metadata?.current_payment_id,
        projectName: data.metadata?.project_name,
        projectsCount: data.metadata?.user_active_projects,
        projectsArchivedCount: data.metadata?.user_archived_projects,
        inProgressProjectsCount: data.metadata?.user_in_progress_projects || 0,
        newProjectsCount: data.metadata?.user_new_projects || 0,
        submittedProjectsCount: data.metadata?.user_submitted_projects || 0,
        kickoffId: data.metadata?.kickoff_id,
    },
});

export const collectionPostsAdapter = (
    data: CollectionPostResponse[],
): CollectionPostTransformResponse[] => {
    const filterData = data.filter(item => {
        return (
            item['published-by'] !== undefined && item['published-by'] !== null
        );
    });

    return filterData.map(item => ({
        id: item._id,
        title: item.name,
        image: item['main-image'].url,
        slug: item.slug,
    }));
};
