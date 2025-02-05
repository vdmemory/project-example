import {
    Choice,
    DashboardAgencyActionStatuses,
    DashboardClientActionStatuses,
    Filters,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    PitchProjectTagsValues,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
    ProjectProgressBarStatuses,
    ProjectStatuses,
    PitchProjectTags,
    ProjectCreationStepsEnum,
} from '@breef/shared/constants';

export type CTAActionButtonTypeRequest = {
    action_value:
        | DashboardClientActionStatuses
        | ProjectClientActionStatuses
        | ProjectAgencyActionStatuses
        | DashboardAgencyActionStatuses;
    metadata: {
        project_id: number;
        pitch_id?: number;
        current_payment_id?: number;
        project_name?: string;
        user_active_projects?: number;
        user_archived_projects?: number;
        kickoff_id?: number;
        user_new_projects?: number;
        user_submitted_projects?: number;
        user_in_progress_projects?: number;
    };
};

export type CTAActionButtonType = {
    actionValue:
        | DashboardAgencyActionStatuses
        | ProjectAgencyActionStatuses
        | DashboardClientActionStatuses
        | ProjectClientActionStatuses;
    meta?: {
        projectId: number;
        pitchId?: number;
        paymentId?: number;
        projectName?: string;
        projectsCount?: number;
        projectsArchivedCount?: number;
        newProjectsCount?: number;
        submittedProjectsCount?: number;
        inProgressProjectsCount?: number;
        kickoffId?: number;
    };
};

export enum ProgressState {
    done = 'done',
    inProgress = 'in_progress',
    disabled = 'disabled',
}

export type ProgressItem = {
    name: string;
    status: ProgressState;
};

export type ProjectTypeRequest = {
    id: number;
    name: string;
    status: ProjectStatuses;
    progress_bar_status: ProjectProgressBarStatuses;
    action_value: ProjectClientActionStatuses;
    pitch_count: number;
    current_payment_id: number | null;
    budget: Choice;
    created: string;
    project_progress: ProgressItem[];
    is_reviewed_pitches: boolean;
};

export type ProjectsTypeRequest = {
    results: ProjectTypeRequest[];
};
export type ProjectsType = {
    id: number;
    name: string;
    status: ProjectStatuses;
    progressBarStatus: ProjectProgressBarStatuses;
    actionValue: ProjectClientActionStatuses;
    pitchCount: number;
    paymentId?: number;
    budget: Choice;
    created: string;
    progress: ProgressItem[];
    isReviewedPitches: boolean;
};

export type AgencyProjectRequest = {
    id: number;
    name: string;
    status: ProjectStatuses;
    project_type: number;
    kickoff_id: number | null;
    action_value: ProjectAgencyActionStatuses;
    client_name: string;
    client_logo_url: string;
    submission_deadline: string;
    budget: Choice;
};
export type AgencyProject = {
    id: number;
    name: string;
    status: ProjectStatuses;
    projectType: number;
    kickoffId: number | null;
    actionValue: ProjectAgencyActionStatuses;
    clientName: string;
    clientLogoUrl: string;
    submissionDeadline: string;
    budget: Choice | string;
};

export type GetAgencyProjectTypeRequest = {
    results: {
        project: AgencyProjectRequest;
        status: PitchProjectStatuses;
        pitch_id: number | null;
        pitch_status: string | null;
        progress_bar_status: PitchProjectProgressBarStatuses;
        accepted_terms: boolean;
        action_value: ProjectAgencyActionStatuses;
        tag: PitchProjectTags;
        hours_to_submission_deadline: number;
        payment_total_amount: {
            one_time_payments_paid_amount: string | null;
            one_time_payments_total_amount: string | null;
            ongoing_payment_amount: string | null;
        };
    }[];
};
export type GetAgencyProjectType = {
    project: AgencyProject;
    status: PitchProjectStatuses;
    pitchId: number | null;
    pitchStatus: string | null;
    progressBarStatus: PitchProjectProgressBarStatuses;
    acceptedTerms: boolean;
    tag: PitchProjectTagsValues;
    hoursToSubmissionDeadline: number;
    paymentTotalAmount: {
        oneTimePaymentsPaidAmount: string | null;
        oneTimePaymentsTotalAmount: string | null;
        ongoingPaymentAmount: string | null;
    };
};

export type ProjectsResponseType = ProjectsType[];

export type AgencyProjectTypeRequest = GetAgencyProjectTypeRequest;

export type AgencyProjectType = GetAgencyProjectType[];

export type FilterProjectsType = {
    status?: Filters;
    page?: number;
    pageSize?: number;
};

export type CollectionPostTransformResponse = {
    id: string;
    title: string;
    image: string;
    slug: string;
};

export type CollectionPostResponse = {
    'main-image': {
        url: string;
    };
    name: string;
    slug: string;
    _id: string;
    _archived: boolean;
    'published-by': string;
};

export type StreamlinedProjectResponseType = {
    id: number;
    unfilled_step: ProjectCreationStepsEnum;
};

export type StreamlinedProjectTransformResponseType = {
    projectId: number;
    unfilledStep: ProjectCreationStepsEnum;
};
