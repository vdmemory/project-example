import { useController, useFormContext } from 'react-hook-form';
import { PitchCreateProjectFitFormType } from '../../../types/pitchCreateType';

export const useGetProjectFitFields = () => {
    const { control } = useFormContext<PitchCreateProjectFitFormType>();

    return {
        fieldProjectScopeValue: useController({
            control,
            name: 'projectScope',
        }).field,

        fieldExperienceValue: useController({
            control,
            name: 'experience',
        }).field,

        fieldClientFitValue: useController({
            control,
            name: 'clientFit',
        }).field,

        noteToBreef: useController({
            control,
            name: 'noteToBreef',
        }),
    };
};
