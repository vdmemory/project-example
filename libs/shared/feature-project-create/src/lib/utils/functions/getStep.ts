import { ProjectCreationStepsEnum, ProjectStep } from '@breef/shared/constants';

const steps = [
    {
        key: ProjectCreationStepsEnum.ProjectScope,
        value: ProjectStep.PROJECT_SCOPE,
    },
    {
        key: ProjectCreationStepsEnum.AgencyPreferences,
        value: ProjectStep.AGENCY_PREFERENCES,
    },
    {
        key: ProjectCreationStepsEnum.ProjectDetails,
        value: ProjectStep.PERSONALIZE_SCOPE,
    },
    {
        key: ProjectCreationStepsEnum.CompanyDetails,
        value: ProjectStep.COMPANY_DETAILS,
    },
    {
        key: ProjectCreationStepsEnum.Review,
        value: ProjectStep.REVIEW,
    },
    {
        key: ProjectCreationStepsEnum.Post,
        value: ProjectStep.REVIEW,
    },
];

export const getStepKeyByValue = (step: number): ProjectCreationStepsEnum => {
    return (
        steps.find(item => item.value === step)?.key ??
        ProjectCreationStepsEnum.Post
    );
};

export const getStepValueByKey = (
    step?: ProjectCreationStepsEnum,
): number | null => {
    if (!step) return null;
    return steps.find(item => item.key === step)?.value ?? ProjectStep.REVIEW;
};
