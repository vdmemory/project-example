import { MethodsProjectCreateType } from '../types/projectCreateTypes';
import { ProjectStep } from '@breef/shared/constants';

export const useValidationSaveExit = (methods: MethodsProjectCreateType) => {
    const triggerValidationSaveExit = async (step: number) => {
        switch (step) {
            case 1:
                return await triggerProjectScope();
            case 3:
                return await triggerPersonalizeScope();
            case 4:
                return await triggerCompanyDetails();
            default:
                return null;
        }
    };

    const triggerProjectScope = async () => {
        const { projectScope } = methods;
        await projectScope.trigger();
        const errors = projectScope.formState.errors;
        projectScope.clearErrors('budgetRange');
        projectScope.clearErrors('agencySkills');
        projectScope.clearErrors('startDay');

        return Object.keys(errors).length !== 0
            ? ProjectStep.PROJECT_SCOPE
            : null;
    };

    const triggerPersonalizeScope = async () => {
        const { personalizeScope } = methods;
        await personalizeScope.trigger();
        const errors = personalizeScope.formState.errors;
        personalizeScope.clearErrors('description');

        return Object.keys(errors).length !== 0
            ? ProjectStep.PERSONALIZE_SCOPE
            : null;
    };

    const triggerCompanyDetails = async () => {
        const { companyDetails } = methods;
        await companyDetails.trigger();
        const errors = companyDetails.formState.errors;
        companyDetails.clearErrors('companyDescription');
        companyDetails.clearErrors('companyName');
        companyDetails.clearErrors('companyLocation');

        if (
            errors.companyWebsite?.type === 'required' ||
            errors.companyWebsite?.type === 'min'
        ) {
            companyDetails.clearErrors('companyWebsite');
        }

        return Object.keys(errors).length !== 0
            ? ProjectStep.COMPANY_DETAILS
            : null;
    };

    return { triggerValidationSaveExit };
};

export default useValidationSaveExit;
