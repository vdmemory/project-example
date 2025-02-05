import { BrandLead, ProjectCreationRequestType } from '@breef/shared/types';
import { UseFormReturn } from 'react-hook-form';
import { BudgetType, Choice, SocialNameEnum } from '@breef/shared/constants';

export type ProjectCreateFormType = ProjectCreationRequestType;

export type ProjectScopeFormType = {
    agencySkills: {
        id: number;
        name: string;
        note: string;
        isCustomerNote: boolean;
    }[];
    budgetRange: Choice | '';
    budgetType: BudgetType;
    startDay: string;
    projectTitle: string;
    isNameEditLocked: boolean;
};

export type PreferencesFormType = {
    agencyLocation: string;
    agencyTags: { id: number; name: string }[];
    openToRemoteAgencies: boolean;
    idealAgencyDescription: string;
};

export type PersonalizeScopeFormType = {
    description: string;
    brandLinks: { link: string; title: string }[];
    files: { id: number | string; link: string; title: string }[];
};

export type CompanyDetailsFormType = {
    companyName: string;
    companyWebsite: string;
    companyLocation: string;
    companyDescription: string;
    socialLinks: { link: string | null; title: SocialNameEnum }[];
    isConfidential: boolean;
};

export type MethodsProjectCreateType = {
    projectScope: UseFormReturn<ProjectScopeFormType>;
    agencyPreferences: UseFormReturn<PreferencesFormType>;
    personalizeScope: UseFormReturn<PersonalizeScopeFormType>;
    companyDetails: UseFormReturn<CompanyDetailsFormType>;
};

export type ProjectCreationFormType = ProjectScopeFormType &
    PreferencesFormType &
    PersonalizeScopeFormType &
    CompanyDetailsFormType;

export type StateProjectCreateSliceType = {
    step: number;
    profile: {
        companyName: string | null;
        brandLead: {
            brandLead: BrandLead;
            firstName: string;
            lastName: string;
            email: string;
            id: number;
        } | null;
    };
    user: {
        needsPassword: boolean;
    };
    isSubmitting: boolean;
    isSubmittingSaveExit: boolean;
    isPenMode: boolean;
    targetElementId: string | null;
    isTooltipProjectOverview: boolean;
};

export type FormType = {
    name: string;
    website: string;
    location: string;
    description: string;
};
