import {
    BrandLinksType,
    FileType,
    SocialLinkCreate,
    SocialLinks,
} from '../sharingTypes';
import { Choice, ProjectCreationStepsEnum } from '@breef/shared/constants';

export type CompanyDetailsResponseType = {
    company_name: string;
    company_description: string;
    company_website: string;
    company_location: string;
};

export type CompanyDetailsRequestType = {
    id: number;
    companyName: string;
    companyDescription: string;
    companyWebsite: string;
    companyLocation: string;
};

export type ProjectCreationResponseType = {
    name: string;
    company_location?: string | null;
    start_day?: string | null;
    description?: string | null;
    agency_skills?: { capability: number; note: string | null }[];
    open_to_remote_agencies?: boolean;
    budget_range_type?: string;
    budget_range?: Choice | null;
    agency_location?: string | null;
    agencies_preferences?: number[];
    tags?: number[];
    agency_description?: string | null;
    company_name?: string | null;
    company_description?: string | null;
    company_website?: string | null;
    files?: number[];
    brand_links?: BrandLinksType[];
    social_links?: SocialLinks[];

    step: ProjectCreationStepsEnum;

    is_confidential?: boolean;
};

export type ProjectCreationRequestType = {
    projectTitle: string;
    companyLocation?: string;
    startDay?: string;
    description?: string;
    agencySkills: {
        id: number;
        name: string;
        note: string;
        isCustomerNote: boolean;
    }[];
    budgetRange?: Choice | '';
    budgetType?: string;
    agencyLocation?: string;
    agencyPreferences?: { id: number; name: string }[];
    agencyTags?: { id: number; name: string }[];
    idealAgencyDescription?: string;
    openToRemoteAgencies?: boolean;
    companyName?: string;
    companyDescription?: string;
    companyWebsite?: string;
    files?: FileType[];
    brandLinks?: BrandLinksType[];
    socialLinks?: SocialLinkCreate[];

    step: ProjectCreationStepsEnum;

    isConfidential?: boolean;
    isNameEditLocked: boolean;
};

export type ProjectUpdateRequestType = {
    id: number;
    data: ProjectCreationRequestType;
};

export type ProjectUpdateResponseType = object;

export type AgencyTimeFramesResponseType = {
    id: number;
    text: string;
    is_popular: string;
}[];
export type ProjectGoalsResponseType = { id: number; name: string }[];
export type AgencyAdvantagesResponseType = { id: number; name: string }[];
export type GetTemplateTypes = {
    id?: number;
    title: string;
    image: string;
};

export type ListIdNameType = {
    id: number;
    name: string;
};
