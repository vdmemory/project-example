import {
    BillingStructureType,
    CapabilityPricingRetainerType,
    CapabilityPricingType,
    TabsDashboardClient,
    TabsProfile,
} from '@breef/shared/constants';
import { BrandLead, ServicesAndSkillsRequest } from '../project/projectTypes';
import { FileType } from '../sharingTypes';

// account info
export type AccountInfoRequestType = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: {
        number: string;
        code: string;
        numberWithoutCountryCode: string;
    };
    companyType: 'client' | 'agency';
    role: string;
};

export type AccountInfoResponseType = {
    first_name: string;
    last_name: string;
    email: string;
    email_to_confirm?: string;
    phone_number: string;
    has_password: boolean;
    has_social_account: boolean;
    role: string;
};

export type TransformAccountInfoResponseType = {
    firstName: string;
    lastName: string;
    email: string;
    emailToConfirm?: string;
    phoneNumber: {
        number: string;
        code: string;
        numberWithoutCountryCode: string;
    };
    hasPassword: boolean;
    hasSocialAccount: boolean;
    role: string;
};

//password
export type SetPasswordRequestType = {
    newPassword: string;
    confirmNewPassword: string;
};
export type ChangePasswordRequestType = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

// company information request
// clients
export type CompanyInfoRequestType = {
    companyName: string;
    officeLocations: { id: number; name: string }[];
    companySize: string;
    website: string;
    twitter: string;
    tiktok: string;
    instagram: string;
    companyOverview: string;
    companyType: string;
    logo: number | null;
    logoUrl: string;
    industries: IndustriesType[];
};

export type CompanyInfoFormRequestType = {
    name: string;
    location: string;
    website: string;
    description: string;
};

// agencies
export type CompanyRequestType = {
    companyName: string;
    officeLocations: { id: number; name: string }[];
    website: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    companyOverview: string;
    companyType: string;
    logo: number | null;
    logoUrl: string;
    industries: IndustriesType[];

    contactEmail: string;
    contactPhoneNumber: {
        number: string;
        code: string;
        numberWithoutCountryCode: string;
    };
    teamSize: string;
    yearsInBusiness: string;
    meta: string;
    tagline: string;
};

export type CapabilitiesRequestType = {
    services: {
        serviceId: number;
        name: string;
        pricing: {
            pricingStructure: CapabilityPricingType | null;
            billingStructure: BillingStructureType | null;
            retainerType: CapabilityPricingRetainerType | null;
            projectAmount: string;
            minProjectAmount: string;
            maxProjectAmount: string;
            packageName: string;
            description: string;
        } | null;
        portfolio: {
            clientName: string;
            clientWebsite: string;
            projectName: string;
            startDateMonth: string;
            startDateYear: string;
            projectDescription: string;
            clientTestimonial: string;
            linkUrl: string;
            documents: FileType[];
        }[];
    }[];
};

export type CapabilityResponseType = {
    capability: {
        id: number;
        name: string;
    };
    name: string;
    pricing: {
        name: string | null;
        description: string | null;
        minimum: number;
        maximum: number;
        price_type: CapabilityPricingType;
        billing_structure: BillingStructureType;
        retainer_type: CapabilityPricingRetainerType;
    }[];
    clients: {
        name: string;
        website: string | null;
        project_name: string;
        project_date: string | null;
        project_description: string | null;
        testimonial: string | null;
        links: {
            link: string;
            title: string;
        }[];
        documents: {
            id: number;
            name: string;
            thumbnail_url: string;
            url: string;
        }[];
    }[];
};

export type CapabilitiesResponseType = {
    capabilities: CapabilityResponseType[];
};

export type IndustriesTagsRequestType = {
    industries: IndustriesType[];
    tags: TagsType[];
};

export type LinksDocsRequestType = {
    docs?: DocsType[];
    links?: LinksType[];
};

// company information response
export type CompanyInfoResponseType = {
    name: string;
    description: string;
    website: string;
    social_links: { link: string; title: string }[];
    office_locations: { id: number; location: string }[];
    company_size?: string;
    logo_url: string;
    logo: number;
    brand_lead: BrandLeadRequest;
    project_type?: { id: number; name: string; breef_suggestion: boolean }[];
    services_and_skills?: ServicesAndSkillsRequest;
    company_role?: string;
    number_of_employees?: string;
    business_years?: string;
    catchline?: string;
    primary_contact_email?: string;
    primary_contact_phone_number?: string;

    industries: IndustriesType[];
    tags: TagsType[];
    portfolio_links: LinksType[];
    documents: {
        id: number;
        name: string;
        thumbnail_url: string;
        url: string;
    }[];
    capabilities?: CapabilityResponseType[];
};

export type BrandLeadRequest = {
    brand_lead: {
        company_type: string;
        help_text: string;
        id: number;
        logo_url: string | null;
        calendly_link: string;
    };
    first_name: string;
    last_name: string;
    email: string;
    id: number;
};

export type CompanyInfoType = {
    companyName: string;
    officeLocations: { id: number; name: string }[];
    numberEmployees: string;
    companySize: string;
    website: string;
    twitter: string;
    tiktok: string;
    instagram: string;
    companyOverview: string;
    companyType: string;
    logo: number | null;
    logoUrl: string;
};

export type IndustriesTagsType = {
    industries: IndustriesType[];
    tags: TagsType[];
};

export type IndustriesType = { id: number; name: string };
export type TagsType = { id: number; name: string };

export type LinksDocsType = {
    links: LinksType[];
    docs: DocsType[];
};

export type LinksType = { id: number; link: string; title: string };
export type DocsType = { id: number; link: string; title: string };

export type ServicesAndSkillsResponseType = {
    id: number;
    name: string;
    services: {
        id: number;
        name: string;
        skills: {
            id: number;
            name: string;
        }[];
    }[];
}[];

export type TeamMembersProfileResponseType = {
    invites: {
        email: string;
        invitation_status: string;
        invitation_date: string;
        id: number;
        phone_number: string;
    }[];
    team_members: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        phone_number?: string;
        position: string;
    }[];
};

export type TeamMembersMergedResponseType = {
    invites: {
        email: string;
        date: string;
        id: number;
        phoneNumber: string;
        status: string;
    }[];
    teamMembers: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        position: string;
    }[];
};

export type SkillsRequestType = {
    email: string;
    resend?: boolean;
};

export type ListRolesResponse = {
    id: string;
    title: string;
}[];

export type BillingDataRequestType = {
    billing_details: {
        legal_name: string;
        billing_address: string;
        address_additional_info: string;
    } | null;
};

export type BillingDataMergedType = {
    legalName: string;
    billingAddress: string;
    billingAddressAdditional: string;
};

export type ChangeRole = {
    userId: number;
    position: number;
};

export type TabProfileType = {
    title: string;
    tab: TabsProfile;
    route: string;
};

export type TabDashboardType = {
    title: string;
    tab: TabsDashboardClient;
    route: string;
};

export type BrandLeadFullType = {
    brandLead: BrandLead;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
};

export type BrandLeadShort = {
    name: string;
    logo: string;
};

export type PricingFormType = {
    pricingStructure: CapabilityPricingType | null;
    billingStructure: BillingStructureType | null;
    retainerType: CapabilityPricingRetainerType | null;
    projectAmount: string;
    minProjectAmount: string;
    maxProjectAmount: string;
    packageName: string;
    description: string;
};

export type PastWorkFormType = {
    clientName: string;
    clientWebsite: string;
    projectName: string;
    startDateMonth: string;
    startDateYear: string;
    projectDescription: string;
    clientTestimonial: string;
    linkUrl: string;
    documents: FileType[];
};
