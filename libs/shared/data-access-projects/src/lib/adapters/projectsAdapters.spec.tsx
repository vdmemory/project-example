import {
    Choice,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    PitchProjectTags,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
    ProjectProgressBarStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import {
    agencyProjectsAdapter,
    collectionPostsAdapter,
    projectsAdapter,
    transformActionButtonCTA,
} from './projectsAdapters';
import {
    AgencyProjectRequest,
    AgencyProjectTypeRequest,
    CTAActionButtonTypeRequest,
    ProgressState,
    ProjectsTypeRequest,
} from '@breef/shared/types';

const projectSameRequest = {
    id: 123,
    name: 'project name',
    status: 'complete',
    budget: 'less_then_fifty' as Choice,
};

describe('data-access-projects adapters', () => {
    describe('agencyProjectsAdapter', () => {
        it('agencyProjectsAdapter should return the correct object', () => {
            const values: AgencyProjectTypeRequest = {
                results: [
                    {
                        project: {
                            ...projectSameRequest,
                            kickoff_id: null,
                            action_value:
                                ProjectAgencyActionStatuses.clientReview,
                            client_name: 'NB',
                            client_logo_url: 'https://www.logo.com',
                            submission_deadline: '1.01.2024',
                            project_type: 1,
                        } as AgencyProjectRequest,
                        status: PitchProjectStatuses.clientReview,
                        pitch_id: 454,
                        pitch_status: 'status',
                        progress_bar_status:
                            PitchProjectProgressBarStatuses.clientReview,
                        accepted_terms: true,
                        action_value: ProjectAgencyActionStatuses.clientReview,
                        tag: PitchProjectTags.dueToday,
                        hours_to_submission_deadline: 3,
                        payment_total_amount: {
                            one_time_payments_paid_amount: '1000',
                            one_time_payments_total_amount: '1200',
                            ongoing_payment_amount: '200',
                        },
                    },
                ],
            };

            const result = agencyProjectsAdapter(values);

            expect(result).toEqual([
                {
                    project: {
                        id: 123,
                        name: 'project name',
                        status: 'complete',
                        kickoffId: null,
                        actionValue: 'client_review',
                        projectType: 1,
                        clientName: 'NB',
                        clientLogoUrl: 'https://www.logo.com',
                        submissionDeadline: '1.01.2024',
                        budget: 'less_then_fifty',
                    },
                    acceptedTerms: true,
                    status: 'client_review',
                    progressBarStatus: 'client_review',
                    pitchId: 454,
                    pitchStatus: 'status',
                    paymentTotalAmount: {
                        oneTimePaymentsPaidAmount: '1000',
                        oneTimePaymentsTotalAmount: '1200',
                        ongoingPaymentAmount: '200',
                    },
                    tag: 'due today',
                    hoursToSubmissionDeadline: 3,
                },
            ]);
        });
    });

    describe('projectsAdapter', () => {
        it('projectsAdapter should return the correct object', () => {
            const values: ProjectsTypeRequest = {
                results: [
                    {
                        ...projectSameRequest,
                        status: 'post' as ProjectStatuses,
                        progress_bar_status:
                            'pitch_review' as ProjectProgressBarStatuses,
                        action_value:
                            'review_agency' as ProjectClientActionStatuses,
                        pitch_count: 1,
                        current_payment_id: 222,
                        created: '12.12.2022',
                        project_progress: [
                            {
                                name: 'progress',
                                status: ProgressState.inProgress,
                            },
                        ],
                        is_reviewed_pitches: true,
                    },
                ],
            };

            const result = projectsAdapter(values);

            expect(result).toEqual([
                {
                    id: 123,
                    name: 'project name',
                    pitchCount: 1,
                    status: 'post',
                    actionValue: 'review_agency',
                    progressBarStatus: 'pitch_review',
                    paymentId: 222,
                    budget: 'less_then_fifty',
                    created: '12.12.2022',
                    progress: [
                        { name: 'progress', status: ProgressState.inProgress },
                    ],
                    isReviewedPitches: true,
                },
            ]);
        });
    });

    describe('transformActionButtonCTA', () => {
        it('transformActionButtonCTA should return the correct object', () => {
            const values = {
                action_value:
                    'active_projects' as CTAActionButtonTypeRequest['action_value'],

                metadata: {
                    project_id: 111,
                    pitch_id: 212,
                    user_active_projects: 3,
                    user_new_projects: 1,
                    user_submitted_projects: 1,
                    user_in_progress_projects: 1,
                },
            };

            const result = transformActionButtonCTA(values);
            expect(result).toEqual({
                actionValue: 'active_projects',
                meta: {
                    projectId: 111,
                    pitchId: 212,
                    paymentId: undefined,
                    projectsCount: 3,
                    projectsArchivedCount: undefined,
                    inProgressProjectsCount: 1,
                    newProjectsCount: 1,
                    submittedProjectsCount: 1,
                    kickoffId: undefined,
                },
            });
        });
    });

    describe('collectionPostsAdapter', () => {
        it('collectionPostsAdapter should return the correct object', () => {
            const values = [
                {
                    'main-image': {
                        url: 'https://www.url-image.com',
                    },
                    name: 'post',
                    slug: 'post-slug',
                    _id: 'id-post',
                    _archived: false,
                    'published-by': 'published',
                },
            ];

            const result = collectionPostsAdapter(values);

            expect(result).toEqual([
                {
                    id: 'id-post',
                    title: 'post',
                    image: 'https://www.url-image.com',
                    slug: 'post-slug',
                },
            ]);
        });
    });
});
