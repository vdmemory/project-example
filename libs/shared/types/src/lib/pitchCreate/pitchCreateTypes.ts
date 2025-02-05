import {
    IsInterestedProject,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    ProjectAgencyActionStatuses,
    ProjectStatuses,
    BudgetType,
    Choice,
    ProjectCreationStepsEnum,
    PitchCreationStepsEnum,
} from '@breef/shared/constants';
import {
    BrandLinksType,
    FilesLinks,
    FileType,
    ObjectImageType,
    SocialLinks,
} from '../sharingTypes';
import { KickoffRequestType } from '../kickoff/kickoffTypes';

export type GetPitch = {
    id: number;
};

export type PitchAcceptTerms = {
    id: number;
    accepted_terms: boolean;
    agree_with_deadline: boolean;
};

export type Estimations = {
    deliverable: number;
    estimation?: number | null;
};

export type PitchCreateRequestType = {
    project: number;
    step: PitchCreationStepsEnum;
    other_links: { title: string; link: string }[];
    social_links: { title: string; link: string }[];
    company_logo: number | null;
    tagline: string | null;
    agency_bio: string | null;
    pitch_text?: string | null;
    approach?: {
        description: string | null;
        links: { title: string; link: string }[];
    };

    agency_clients?: { name: string; link: string }[];
    additional_links?: { title: string; link: string }[];
    files?: number[];

    budget?: string | null;
    budget_note?: string | null;
    project_scope?: string | null;
    experience?: string | null;
    client_fit?: string | null;
    note_to_breef?: string | null;
    tags?: number[];
    status?: 'drafted' | 'posted';

    past_clients?: {
        name: string;
        project_name: string;
        website?: string;
        project_description?: string;
        documents?: number[];
        links?: { title: string; link: string }[];
    }[];
};

export type PitchPreviewRequest = {
    is_rebuild_project: boolean;
    name: string;
    company_location: string;
    company_description: string;
    start_day: string;
    description: string;
    agency_skills: {
        capability: number;
        capability_name: string;
        note: string;
    }[];
    open_to_remote_agencies: boolean;
    budget_range_type: BudgetType;
    budget_range: Choice;
    agency_location: string | null;
    tags: { id: number; name: string }[];
    agencies_advantages?: { id: number; name: string }[];
    social_links: SocialLinks[];
    brand_links: BrandLinksType[];
    files: FilesLinks[];
    company_website: string | null;
    step: ProjectCreationStepsEnum;
    is_accepted_terms: boolean;
    kickoff_id: number | null;
    is_pitch_submitted: boolean;
    is_archived?: boolean;
    company_name: string;
    submission_deadline: null | string;
    kick_off_status: KickoffRequestType['status'];
    pitch_id: number | null;
    action_value: ProjectAgencyActionStatuses;
    progress_bar_status: PitchProjectProgressBarStatuses;
    status: ProjectStatuses;
    is_interested: IsInterestedProject;
    project_agency_id: number;
    project_agency_status: PitchProjectStatuses;
    accepted_terms: false;
    is_confidential: boolean;
};

export type PitchPreviewResponse = {
    name: string;
    companyLocation: string;
    companyDescription: string;
    startDay: string;
    description: string;
    agencySkills: {
        id: number;
        name: string;
        note: string;
    }[];
    openToRemoteAgencies: boolean;
    budgetType: BudgetType;
    budgetRange: Choice;
    agencyLocation: string;
    agencyTags: { id: number; name: string }[];
    agenciesAdvantages?: { id: number; name: string }[];
    socialLinks: SocialLinks[];
    brandLinks: BrandLinksType[];
    files: FileType[];
    companyWebsite: string;
    step: ProjectCreationStepsEnum;
    isAcceptedTerms: boolean;
    kickoffId: number | null;
    isPitchSubmitted: boolean;
    isArchived?: boolean;
    companyName: string;
    submissionDeadline: string;
    kickOffStatus: KickoffRequestType['status'];
    pitchId: number | null;
    actionValue: ProjectAgencyActionStatuses;
    progressBarStatus: PitchProjectProgressBarStatuses;
    status: ProjectStatuses;
    isInterested: IsInterestedProject;
    projectAgencyId: number;
    projectAgencyStatus: PitchProjectStatuses;
    isConfidential: boolean;
};

export type PitchCreateType = {
    aboutUs: string;
    logo: ObjectImageType | null;
    tagline: string;
    website: string;
    portfolio: string;
    instagram: string;

    pitchDetails?: string;
    approach?: {
        description: string;
        links: { title: string; link: string }[];
    };

    additionalLinks?: { name: string; link: string }[];
    attachments?: { id: number | string; title: string; link: string }[];

    budget?: { value: string; comment: string };
    projectScope?: string;
    experience?: string;
    clientFit?: string;
    noteToBreef?: string;
    uniqueThings?: { id: number; name: string }[];

    step: PitchCreationStepsEnum;

    previousWork?: PreviousWorkType[];
};

export type PitchResponseType = {
    id: number;
    other_links: { title: string; link: string | null }[];
    social_links: { title: string; link: string | null }[];
    company_logo: number | null;
    company_logo_url: string | null;
    tagline: string | null;
    agency_bio: string | null;
    pitch_text: string | null;
    approach?: {
        description: string | null;
        links: { title: string; link: string }[];
    };

    status: string;
    step: PitchCreationStepsEnum;

    agency_clients: { name: string; link: string }[] | [];
    additional_links: { title: string; link: string }[] | [];
    files: { id: number | string; name: string; url: string }[] | [];

    budget: string | null;
    budget_note: string | null;
    project_scope: string | null;
    experience: string | null;
    client_fit: string | null;
    note_to_breef: string | null;
    tags: {
        id: number;
        name: string;
    }[];
    past_clients: PreviousWorkResponseType[];
};

export type PitchMergedResponseType = {
    id: number;
    aboutUs: string;
    logo: ObjectImageType | null;
    tagline: string;
    website: string;
    portfolio: string;
    instagram: string;
    approach: {
        description: string;
        links: { title: string; link: string }[];
    };
    pitchDetails: string;

    status: string;
    step: PitchCreationStepsEnum;
    additionalLinks: { name: string; link: string }[];
    attachments: { id: number | string; title: string; link: string }[];

    budget: { value: string; comment: string };
    experience: string;
    clientFit: string;
    projectScope: string;
    noteToBreef: string;
    uniqueThings: { id: number; name: string }[];

    previousWork: PreviousWorkType[];
};

export type PitchCreate = {
    body: PitchCreateType;
    projectId: number;
    pitchId?: number;
};

export type ProjectInterestedRequestType = {
    is_interested: IsInterestedProject;
    pass_reasons?: number[];
};

export type ProjectInterestedType = {
    isInterested: IsInterestedProject;
    passReasons?: PassReasonsListType[];
    projectAgencyId: number;
};

export type PreviousWorkType = {
    id: number;
    clientName: string;
    projectName: string;
    website?: string;
    description?: string;
    documents?: { id: number; title: string; link: string }[];
    projectLinks?: { title: string; link: string }[];
};

export type PreviousWorkResponseType = {
    id: number;
    name: string;
    project_name: string;
    website?: string;
    project_description?: string;
    documents?: { id: number; name: string; url: string }[];
    links?: { title: string; link: string }[];
};

export type AdditionalLinksType = {
    name: string;
    link: string;
};

export type AttachmentType = {
    id: number | string;
    title: string;
    link: string;
};

export type ProjectFitItemType = {
    value: string;
    comment: string;
};

export type PassReasonsListType = {
    id: number;
    name: string;
    description: string;
};
