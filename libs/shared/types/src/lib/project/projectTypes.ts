import {
    BudgetType,
    Choice,
    CompanyRole,
    PitchProjectStatuses,
    ProjectClientActionStatuses,
    ProjectCreationStepsEnum,
    ProjectProgressBarStatuses,
    ProjectStatuses,
    ReviewDecisionNames,
} from '@breef/shared/constants';

import {
    BrandLinksType,
    FilesLinks,
    FileType,
    ObjectImageType,
    SocialLinks,
} from '../sharingTypes';
import { KickoffRequestType } from '../kickoff/kickoffTypes';
import {
    BrandLeadFullType,
    BrandLeadRequest,
    DocsType,
    IndustriesType,
    LinksType,
    PastWorkFormType,
    PricingFormType,
    TagsType,
} from '../profile/profileTypes';
import {
    PreviousWorkResponseType,
    PreviousWorkType,
} from '../pitchCreate/pitchCreateTypes';
import { ReactNode } from 'react';

export type TipType = {
    title: string;
    description: string | ReactNode;
};

export type Invites = {
    email: string;
    invitation_status: string;
    invitation_date: string;
    id: number;
    phone_number: string | null;
};

export type CompanyLocations = {
    location: string;
};

export type PitchesEstimations = {
    deliverable: {
        id: number;
        title: string;
        details: string;
    };
    estimation: string | number;
};

export type Identity = {
    name: string;
};

export type ProjectTemplateResponseType = {
    description: string | null;
    agency_skills: {
        capability: number;
        capability_name: string;
        note: string;
    }[];
};

export type ProjectByIdResponseType = {
    id: number;
    name: string;
    company_name: string | null;
    company_location: string | null;
    company_description: string | null;
    start_day: string | null;
    description: string | null;
    agency_skills: {
        capability: number;
        capability_name: string;
        note: string;
        is_default?: boolean;
    }[];
    open_to_remote_agencies: boolean;
    budget_range_type: BudgetType;
    budget_range: Choice | null;
    agency_location: string | null;
    tags: { id: number; name: string }[];
    agencies_advantages?: {
        id: number;
        name: string;
    }[];
    agency_description?: string | null;

    social_links: SocialLinks[];
    brand_links: BrandLinksType[];
    files: FilesLinks[];
    company_website: string | null;

    progress_bar_status: ProjectProgressBarStatuses;
    action_value: ProjectClientActionStatuses;
    current_payment_id: number | null;
    status: ProjectStatuses;
    step: ProjectCreationStepsEnum | null;
    is_rebuild_project: boolean;
    is_availability_created: boolean;
    is_scheduling_created: boolean;
    is_confidential: boolean;
    is_name_edit_locked: boolean;

    unfilled_step: ProjectCreationStepsEnum;
};

export type PitchesListRequest = {
    id: number;
    budget: string;
    company_locations: {
        location: string;
    };
    company_name: string;
    company_logo_url: string;
    is_shortlisted: boolean;
    pitch_tags: string[];
    review_decision: string;
    status: PitchProjectStatuses;
    schedule_status: string | null;
    token?: string;
};

export type PitchesList = {
    id: number;
    budget: string;
    companyLocations: {
        location: string;
    };
    companyName: string;
    companyLogoUrl: string;
    isShortlisted: boolean;
    pitchTags: string[];
    reviewDecision: string;
    status: PitchProjectStatuses;
    scheduleStatus: string | null;
    token?: string | null;
};

export type SharedProjectRequest = {
    id: number;
    name: string;
    description: string;
    submission_deadline: string;
    company_name: string;
    client_logo_url: string;
    company_description: string;
    social_links: SocialLinks[];
    company_location: string;
    agency_location: string | null;
    open_to_remote_agencies: boolean;
    tags: { id: number; name: string }[];
    agencies_advantages: {
        id: number;
        name: string;
    }[];
    files: FilesLinks[];
    brand_links: BrandLinksType[];
    company_website: string | null;
    kick_off_status: KickoffRequestType['status'];
    start_day: string;
    agency_skills: {
        capability: number;
        capability_name: string;
        note: string;
    }[];
    budget_range_type: BudgetType;
    budget_range: Choice;
    is_confidential: boolean;
    brand_lead: BrandLeadRequest;
    company_id: number;
    status: ProjectStatuses;

    unfilled_step: ProjectCreationStepsEnum;
    agency_description: string;
};

export type SharedProjectType = {
    id: number;
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
    budgetRange: string;
    agencyLocation: string;
    agencyTags: { id: number; name: string }[];
    agenciesAdvantages?: { id: number; name: string }[];
    socialLinks: SocialLinks[];
    brandLinks: BrandLinksType[];
    files: FileType[];
    companyWebsite: string;
    companyName: string;
    submissionDeadline: string;
    kickOffStatus: KickoffRequestType['status'];
    isConfidential: boolean;
    brandLead: BrandLeadFullType;
    companyId: number;
    status: ProjectStatuses;
    unfilledStep: ProjectCreationStepsEnum;
    idealAgencyDescription: string;
};

export type PitchListByClientRequest = {
    pitches: PitchesListRequest[];
};

export type PitchesListResponse = {
    pitches: {
        id: number | null;
        company_name: string;
        company_logo_url: string;
        budget: number;
        status: PitchProjectStatuses;
        schedule_status: string | null;

        token?: string | null;
        review_decision: ReviewDecisionNames;
        is_shortlisted: boolean;
    }[];
};

export type TransformPitchesListResponse = {
    id: number;
    name: string;
    logo: string;
    reviewDecision: ReviewDecisionNames;
    status: PitchProjectStatuses;
    pitch: TransformAgencyPitchResponse | null;
};

export type PitchListByClient = {
    pitches: PitchesList[];
};

export type GetPitchesListSharingRequest = {
    id: number;
    pitches_sharing: boolean;
    token: string;
};

export type GetPitchesListSharing = {
    id: number;
    pitchesSharing: boolean;
    token: string;
};

export type UpdatePitchesListSharingRequest = {
    idProject: number;
    isSharing: boolean;
};

export type PublicPitchesListRequest = {
    token: string;
    company_name: string;
    company_logo_url: string;
};

export type PublicPitchesList = {
    token: string;
    companyName: string;
    companyLogoUrl: string;
};

export type AgencyPitchResponse = {
    id: number;
    agency_bio: string;
    pitch_text: string;
    other_links: SocialLinks[];
    social_links: SocialLinks[];
    project: number;
    files: FilesLinks[];
    additional_links: BrandLinksType[];
    project_capabilities: { id: number; name: string }[];
    tagline: string;
    budget: string;
    budget_note: string | null;
    experience: number;
    client_fit: number;
    project_scope: string;
    agency_clients: {
        id: number;
        name: string;
        link: string;
    }[];
    approach: {
        description: string | null;
        links: { title: string; link: string }[];
    };
    review_decision: string;
    company_logo: number;
    company_logo_url: string;
    breef_take?: string;
    company_locations: {
        location: string;
    };
    company_name: string;
    tags: {
        id: number;
        name: string;
    }[];
    past_clients: PreviousWorkResponseType[];
};

export type TransformAgencyPitchResponse = {
    id: number;
    aboutUs: string;
    companyLogo: ObjectImageType | null;
    tagline: string;
    website: string;
    portfolio: string;
    instagram: string;
    pitchDetails: string;
    skills: {
        id: number;
        name: string;
    }[];
    additionalLinks: { name: string; link: string }[] | null;
    attachments: { id: number | string; title: string; link: string }[] | null;
    budget: { value: string; comment: string };
    experience: string;
    clientFit: string;
    projectScope: string;
    uniqueThings: { id: number; name: string }[];
    reviewDecision: string;
    companyLocation: string;
    companyName: string;
    approach: {
        description: string;
        links: { title: string; link: string }[];
    };
    previousWork: PreviousWorkType[];
    breefTake?: string;
};

export type UpdateReviewDesignBody = {
    reviewDecision: string;
    id: string | number;
};

export type UpdateReviewDesign = {
    review_decision: string;
};

export type TransformUpdateReviewDesign = {
    reviewDecision: string;
};

export type AgenciesSchedulesListRequest = {
    id: number;
    name: string;
    logo_url: string;
    location: string;
    schedule: boolean;
    is_shortlisted: boolean;
    pitch: {
        id: number;
    };
};

export type AgenciesSchedulesList = {
    id: number;
    logoUrl: string;
    name: string;
    location: string;
    schedule: boolean;
    isShortlisted: boolean;
    pitchId: number;
};

export type UpdateAgenciesSchedulesList = {
    id: number | string;
    agencies: number[];
};
export type UpdateAgenciesSchedulesListResponse = {
    id: number | string;
    agencies: number[];
    status: string;
};

export type TeamMembersTransformResponseType = {
    teamMembers: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        position: string;
    }[];
    invites: {
        email: string;
        date: string;
        id: number;
        phoneNumber: string;
        status: string;
    }[];
};

export type RemoveTemMembersPayload = {
    projectId: number | string;
    teamId: number;
};

export type ProjectTemplateType = {
    description: string;
    agencySkills: {
        id: number;
        name: string;
        note: string;
        isCustomerNote: boolean;
    }[];
};

export type ProjectByIdType = {
    id: number;
    name: string;
    companyName: string;
    companyLocation: string;
    startDay: string;
    description: string;
    agencySkills: {
        id: number;
        name: string;
        note: string;
        isCustomerNote: boolean;
    }[];
    budgetRange: Choice | '';
    budgetType: BudgetType;
    agencyLocation: string;
    agencyTags: { id: number; name: string }[];
    agenciesAdvantages?: { id: number; name: string }[];
    openToRemoteAgencies: boolean;

    companyDescription: string;
    companyWebsite: string;
    files: FileType[];
    brandLinks: BrandLinksType[];
    socialLinks: SocialLinks[];
    idealAgencyDescription: string;

    progressBarStatus: ProjectProgressBarStatuses;
    actionValue: ProjectClientActionStatuses;
    currentPaymentId: number | null;
    status: ProjectStatuses;
    step: ProjectCreationStepsEnum;
    isAvailabilityCreated: boolean;
    isSchedulingCreated: boolean;
    isConfidential: boolean;
    isNameEditLocked: boolean;

    unfilledStep: ProjectCreationStepsEnum;
};

export type BrandLead = {
    companyType: string;
    helpText: string;
    id: number;
    logoUrl: string | null;
    calendlyLink: string;
};

export type ServicesAndSkillsRequest = {
    id: number;
    name: string;
}[];

export type CompanyInfoMergedResponseType = {
    companyName: string;
    officeLocations: { id: number; name: string }[];
    website: string;
    twitter: string;
    tiktok: string;
    linkedin?: string;
    instagram?: string;
    companyOverview: string;
    companySize?: string;
    logoUrl: string;
    logo: number;
    brandLead: {
        brandLead: BrandLead;
        firstName: string;
        lastName: string;
        email: string;
        id: number;
    };
    servicesAndSkills?: ServicesAndSkillsRequest;
    companyRole?: CompanyRole;

    teamSize?: string;
    yearsInBusiness?: string;
    tagline?: string;
    contactEmail?: string;
    contactPhoneNumber?: {
        code: string;
        number: string;
        numberWithoutCountryCode: string;
    };
    meta?: string;

    industries: IndustriesType[];
    tags: TagsType[];
    docs: DocsType[];
    links: LinksType[];
    services: ServiceType[];
};

export type ServiceType = {
    serviceId: number;
    name: string;
    pricing: PricingFormType | null;
    portfolio: PastWorkFormType[];
};

export type PitchData = {
    companyName: string;
    companyLocation: string;

    id?: number;
    token?: string;
    aboutUs: string;
    approach: {
        description: string;
        links: { link: string; title: string }[];
    };
    skills: {
        id: number;
        name: string;
    }[];
    companyLogo: ObjectImageType | null;
    tagline: string;
    website: string;
    portfolio: string;
    instagram: string;
    pitchDetails: string;
    previousWork: PreviousWorkType[];
    additionalLinks: { name: string; link: string }[] | null;
    attachments: { id: number | string; title: string; link: string }[] | null;
    budget: { value: string; comment: string };
    experience: string;
    clientFit: string;
    projectScope: string;
    noteToBreef?: string;
    uniqueThings: { id: number; name: string }[] | null;
    reviewDecision?: string;
    breefTake?: string;
};
