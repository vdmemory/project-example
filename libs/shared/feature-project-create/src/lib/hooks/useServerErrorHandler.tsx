import {
    CompanyDetailsFormType,
    MethodsProjectCreateType,
    PersonalizeScopeFormType,
    PreferencesFormType,
    ProjectScopeFormType,
} from '../types/projectCreateTypes';
import { ProjectStep } from '@breef/shared/constants';
import { Path } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getKeyByEnumValue } from '@breef/shared/utils';

interface UseServerErrorHandlerProps {
    setStep: ({ step }: { step: number }) => void;
    methods: MethodsProjectCreateType;
}

export enum ServerErrorKeys {
    companyLocation = 'company_location',
    startDay = 'start_day',
    description = 'description',
    idealAgencyDescription = 'agency_description',
    agencySkills = 'agency_skills',
    agencyTags = 'tags',
    agencyLocation = 'agency_location',
    openToRemoteAgencies = 'open_to_remote_agencies',
    budgetRange = 'budget_range',
    budgetType = 'budget_range_type',
    companyName = 'company_name',
    companyDescription = 'company_description',
    companyWebsite = 'company_website',
    files = 'files',
    brandLinks = 'brand_links',
    socialLinks = 'social_links',
    isConfidential = 'is_confidential',
}

enum FieldNames {
    company_location = 'Your location',
    start_day = 'Project timing',
    description = 'Project overview',
    agency_description = 'Your ideal agency',
    agency_skills = 'Agency skills',
    tags = 'Agency preferences',
    agency_location = 'Agency location',
    open_to_remote_agencies = 'Agency location',
    budget_range = 'Budget range',
    budget_range_type = 'Budget type',
    company_name = 'Company name',
    company_description = 'About my company',
    company_website = 'Website',
    files = 'Files',
    brand_links = 'Links',
    social_links = 'Social links',
    is_confidential = 'Confidential project',
}

const projectScopeKeys = [
    ServerErrorKeys.startDay,
    ServerErrorKeys.budgetRange,
    ServerErrorKeys.budgetType,
];
const agencyPreferencesKeys = [
    ServerErrorKeys.agencyLocation,
    ServerErrorKeys.openToRemoteAgencies,
    ServerErrorKeys.agencyTags,
    ServerErrorKeys.idealAgencyDescription,
];
const personalizeScopeKeys = [
    ServerErrorKeys.description,
    ServerErrorKeys.files,
    ServerErrorKeys.brandLinks,
    ServerErrorKeys.agencySkills,
];
const companyDetailsKeys = [
    ServerErrorKeys.companyName,
    ServerErrorKeys.companyWebsite,
    ServerErrorKeys.companyLocation,
    ServerErrorKeys.companyDescription,
    ServerErrorKeys.isConfidential,
    ServerErrorKeys.socialLinks,
];

const getFormatedKeyWithError = (
    keys: ServerErrorKeys[],
    errorData: SeverErrorData,
) =>
    keys
        .filter(item => !!errorData[item])
        .map(item => ({
            key: item,
            fieldName: FieldNames[item],
            error: errorData[item],
        }));

export const useServerErrorHandler = ({
    setStep,
    methods,
}: UseServerErrorHandlerProps) => {
    const handleServerErrorsCompanyDetails = (errorData: SeverErrorData) => {
        if (!errorData) {
            return;
        }
        const errorMessage = 'Something went wrong when saving project.';
        return toast.error(errorMessage, { toastId: errorMessage });
    };

    const handleServerErrors = (errorData: SeverErrorData) => {
        if (!errorData) {
            return;
        }

        // Separately error handling for agency skills because of nesting error data
        if (errorData[ServerErrorKeys.agencySkills]) {
            const nestingErrors = Object.values(
                errorData[ServerErrorKeys.agencySkills],
            );
            const indexError = nestingErrors.findIndex(item => item);

            const errorMessage = (
                nestingErrors[indexError] as { note?: string }
            )['note'];
            toast.error(
                `Agency skills: ${errorMessage}` ||
                    'Something is not right at all with agency skills, please check again.',
            );

            return setStep({ step: ProjectStep.PERSONALIZE_SCOPE });
        }

        //Separately error handling for social links because of nesting error data
        if (errorData[ServerErrorKeys.socialLinks]) {
            toast.error(
                'Something in not right at all at the social links fields.',
            );
            return setStep({ step: ProjectStep.COMPANY_DETAILS });
        }

        const projectScopeErrors = getFormatedKeyWithError(
            projectScopeKeys,
            errorData,
        );
        if (projectScopeErrors.length) {
            projectScopeErrors.map(item => {
                const result = getFieldWithErrorMessage(item);
                methods.projectScope.setError(
                    getKeyByEnumValue(
                        ServerErrorKeys,
                        item.key,
                    ) as Path<ProjectScopeFormType>,
                    { type: 'server', message: result.error },
                );
                toast.error(`${item.fieldName}: ${result.error}`);
            });
            return setStep({ step: ProjectStep.PROJECT_SCOPE });
        }

        const agencyPreferencesErrors = getFormatedKeyWithError(
            agencyPreferencesKeys,
            errorData,
        );
        if (agencyPreferencesErrors.length) {
            agencyPreferencesErrors.map(item => {
                const result = getFieldWithErrorMessage(item);
                methods.agencyPreferences.setError(
                    getKeyByEnumValue(
                        ServerErrorKeys,
                        item.key,
                    ) as Path<PreferencesFormType>,
                    { type: 'server', message: result.error },
                );
                toast.error(`${item.fieldName}: ${result.error}`);
            });
            return setStep({ step: ProjectStep.AGENCY_PREFERENCES });
        }

        const personalizeScopeErrors = getFormatedKeyWithError(
            personalizeScopeKeys,
            errorData,
        );
        if (personalizeScopeErrors.length) {
            personalizeScopeErrors.map(item => {
                const result = getFieldWithErrorMessage(item);
                methods.personalizeScope.setError(
                    getKeyByEnumValue(
                        ServerErrorKeys,
                        item.key,
                    ) as Path<PersonalizeScopeFormType>,
                    { type: 'server', message: result.error },
                );
                toast.error(`${item.fieldName}: ${result.error}`);
            });
            return setStep({ step: ProjectStep.PERSONALIZE_SCOPE });
        }

        const companyDetailsErrors = getFormatedKeyWithError(
            companyDetailsKeys,
            errorData,
        );
        if (companyDetailsErrors.length) {
            companyDetailsErrors.map(item => {
                const result = getFieldWithErrorMessage(item);
                methods.companyDetails.setError(
                    getKeyByEnumValue(
                        ServerErrorKeys,
                        item.key,
                    ) as Path<CompanyDetailsFormType>,
                    { type: 'server', message: result.error },
                );
                toast.error(`${item.fieldName}: ${result.error}`);
            });
        }

        const errorMessage = 'Something went wrong when saving project.';
        return toast.error(errorMessage, { toastId: errorMessage });
    };

    return {
        handleServerErrors,
        handleServerErrorsCompanyDetails,
    };
};

export type SeverErrorData = {
    [key: string]: string | string[];
};

type ErrorValueType = string | string[] | { [key: string]: ErrorValueType };
type ErrorFormattedKeyValue = {
    key: string;
    error: ErrorValueType | { [key: string]: ErrorValueType };
};

const getFirstItemIfArray = (error: ErrorValueType) =>
    Array.isArray(error) ? error[0] : error;

const getFieldWithErrorMessage = ({ key, error }: ErrorFormattedKeyValue) => {
    if (typeof error === 'string') {
        return { key, error };
    }

    if (Array.isArray(error)) {
        return { key, error: error[0] };
    }

    const nestingKeys = Object.keys(error);
    const nestingErrors = Object.values(error);
    const indexError = nestingErrors.findIndex(item => item);

    return {
        key: `${key}.${nestingKeys[indexError]}`,
        error: getFirstItemIfArray(nestingErrors[indexError]) as string,
    };
};
