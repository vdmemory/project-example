import { MethodsPitchCreateType } from '../types/pitchCreateType';
import { PitchStep } from '@breef/shared/constants';

export const useValidationSaveExit = (methods: MethodsPitchCreateType) => {
    const triggerValidationSaveExit = async (step: number) => {
        switch (step) {
            case PitchStep.OUR_AGENCY:
                return await triggerOurAgency();
            case PitchStep.YOUR_PITCH:
                return await triggerYourPitch();
            default:
                return null;
        }
    };

    const triggerOurAgency = async () => {
        const { ourAgency } = methods;
        await ourAgency.trigger();
        const errors = ourAgency.formState.errors;
        ourAgency.clearErrors('logo.url');
        ourAgency.clearErrors('logo');
        if (ourAgency.formState.errors.aboutUs?.type === 'required') {
            ourAgency.clearErrors('aboutUs');
        }
        if (ourAgency.formState.errors.tagline?.type === 'required') {
            ourAgency.clearErrors('tagline');
        }
        if (ourAgency.formState.errors.website?.type === 'required') {
            ourAgency.clearErrors('website');
        }
        if (ourAgency.formState.errors.portfolio?.type === 'required') {
            ourAgency.clearErrors('portfolio');
        }
        if (ourAgency.formState.errors.instagram?.type === 'required') {
            ourAgency.clearErrors('portfolio');
        }

        return Object.values(errors).length !== 0 ? errors : null;
    };

    const triggerYourPitch = async () => {
        const { yourPitch } = methods;
        await yourPitch.trigger();
        const errors = yourPitch.formState.errors;
        if (yourPitch.formState.errors.pitchDetails?.type === 'required') {
            yourPitch.clearErrors('pitchDetails');
        }
        if (
            yourPitch.formState.errors.approach?.description?.type ===
            'required'
        ) {
            yourPitch.clearErrors('approach.description');
        }
        if (yourPitch.formState.errors.budget?.comment?.type === 'required') {
            yourPitch.clearErrors('budget.comment');
        }
        return Object.values(errors).length !== 0 ? errors : null;
    };

    return { triggerValidationSaveExit };
};
