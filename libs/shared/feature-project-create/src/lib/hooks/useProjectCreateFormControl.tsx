import { useForm } from 'react-hook-form';
import {
    CompanyDetailsFormType,
    MethodsProjectCreateType,
    PersonalizeScopeFormType,
    PreferencesFormType,
    ProjectScopeFormType,
} from '../types/projectCreateTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    companyDetailsSchema,
    personalizeScopeSchema,
    agencyPreferencesSchema,
    projectScopeSchema,
} from '../utils/validation/projectCreateSchema';
import {
    CompanyInfoMergedResponseType,
    ProjectByIdType,
} from '@breef/shared/types';
import { BudgetType, ProjectStartDay } from '@breef/shared/constants';
import { replaceSocialLinks } from '../utils/functions/replaceSocialLinks';
import { useEffect } from 'react';

interface UseProjectCreateFormControlProps {
    projectData?: ProjectByIdType;
    companyData?: CompanyInfoMergedResponseType;
    setIsReady: (isReady: boolean) => void;
    isDisableValidation?: boolean;
}
export const useProjectCreateFormControl = ({
    projectData,
    companyData,
    setIsReady,
    isDisableValidation,
}: UseProjectCreateFormControlProps) => {
    const defaultValuesProjectScope: ProjectScopeFormType = {
        agencySkills: projectData?.agencySkills ?? [],
        budgetRange: projectData?.budgetRange ?? '',
        budgetType: projectData?.budgetType || BudgetType.Monthly,
        startDay: projectData?.startDay || ProjectStartDay.Now,
        projectTitle: projectData?.name || '',
        isNameEditLocked: projectData?.isNameEditLocked || false,
    };

    const defaultValuesAgencyPreferences: PreferencesFormType = {
        agencyLocation: projectData?.agencyLocation ?? '',
        agencyTags: projectData?.agencyTags ?? [],
        openToRemoteAgencies: projectData?.openToRemoteAgencies ?? false,
        idealAgencyDescription: projectData?.idealAgencyDescription ?? '',
    };

    const defaultValuesPersonalizeScope: PersonalizeScopeFormType = {
        description: projectData?.description ?? '',
        brandLinks:
            (projectData?.brandLinks?.length !== 0 &&
                projectData?.brandLinks) ||
            [],
        files: (projectData?.files.length !== 0 && projectData?.files) || [],
    };

    const defaultValuesCompanyDetails: CompanyDetailsFormType = {
        companyDescription:
            projectData?.companyDescription ||
            companyData?.companyOverview ||
            '',
        socialLinks: replaceSocialLinks(projectData, companyData),
        companyWebsite:
            projectData?.companyWebsite || companyData?.website || '',
        companyLocation:
            projectData?.companyLocation ||
            companyData?.officeLocations[0]?.name ||
            '',
        companyName: projectData?.companyName || companyData?.companyName || '',
        isConfidential:
            projectData?.isConfidential !== undefined
                ? projectData?.isConfidential
                : false,
    };

    const methodsProjectScope = useForm<ProjectScopeFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesProjectScope,
        resolver: yupResolver(projectScopeSchema),
    });
    const methodsAgencyPreferences = useForm<PreferencesFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesAgencyPreferences,
        resolver: yupResolver(agencyPreferencesSchema),
    });
    const methodsPersonalizeScope = useForm<PersonalizeScopeFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesPersonalizeScope,
        resolver: yupResolver(personalizeScopeSchema),
    });
    const methodsCompanyDetails = useForm<CompanyDetailsFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesCompanyDetails,
        resolver: yupResolver(companyDetailsSchema),
    });

    const agencyLocationValidation =
        !!methodsAgencyPreferences.formState.errors.agencyLocation &&
        !methodsAgencyPreferences.getValues('openToRemoteAgencies');

    const validationSteps = [
        !methodsProjectScope.formState.isValid,
        agencyLocationValidation || !methodsAgencyPreferences.formState.isValid,
        !methodsPersonalizeScope.formState.isValid,
        !methodsCompanyDetails.formState.isValid,
        false,
    ];

    const methods: MethodsProjectCreateType = {
        projectScope: methodsProjectScope,
        personalizeScope: methodsPersonalizeScope,
        agencyPreferences: methodsAgencyPreferences,
        companyDetails: methodsCompanyDetails,
    };

    const initFormValidation = async () => {
        await Promise.all([
            methods.projectScope.trigger(),
            methods.agencyPreferences.trigger(),
            methods.personalizeScope.trigger(),
            methods.companyDetails.trigger(),
        ]);
        Object.values(methods).forEach(form => form.clearErrors());
        setIsReady(true);
    };

    useEffect(() => {
        if (projectData) {
            initFormValidation();
        }
    }, []);

    return {
        methods,
        validationSteps: isDisableValidation ? [] : validationSteps,
    };
};
