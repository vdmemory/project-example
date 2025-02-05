import { Control, useController, UseFormClearErrors } from 'react-hook-form';
import { useFieldAgencyTagsControl } from '../useFieldAgencyTagsControl';
import { ListIdNameType } from '@breef/shared/types';
import { PreferencesFormType } from '../../../../types/projectCreateTypes';

interface UseAgencyPreferencesStepControl {
    control: Control<PreferencesFormType>;
    clearErrors: UseFormClearErrors<PreferencesFormType>;
}
export const useAgencyPreferencesStepControl = ({
    control,
    clearErrors,
}: UseAgencyPreferencesStepControl) => {
    const { field: fieldOpenToRemoteAgencies } = useController({
        control,
        name: 'openToRemoteAgencies',
    });

    const { field: fieldIdealAgency, fieldState: fieldIdealAgencyState } =
        useController({ control, name: 'idealAgencyDescription' });

    const { field: fieldAgencyLocation, fieldState: fieldAgencyLocationState } =
        useController({
            control,
            name: 'agencyLocation',
        });

    const onClickLocation = (id: number, name: string) => {
        fieldAgencyLocation.onChange(name);
    };

    const handleChangeAnywhere = (value: string | boolean) => {
        fieldAgencyLocation.onChange('');
        clearErrors('agencyLocation');
        fieldOpenToRemoteAgencies.onChange(value);
    };

    const {
        searchTagsResult,
        handleSelectUniqueThing,
        fieldAgencyTags,
        isDisabledTags,
        setSearchTagName,
        isLoadingSearchTags,
        removeTag,
        addTag,
        suggestedTags,
    } = useFieldAgencyTagsControl(control);

    const filterCriteriaSuggestedTags = (tag: ListIdNameType) =>
        !fieldAgencyTags.value?.some(item => item.id === tag.id);

    return {
        fields: {
            fieldOpenToRemoteAgencies,
            fieldIdealAgency,
            fieldAgencyLocation,
        },
        fieldStates: {
            fieldIdealAgencyState,
            fieldAgencyLocationState,
        },
        agencyTagsControl: {
            searchTagsResult,
            handleSelectUniqueThing,
            fieldAgencyTags,
            isDisabledTags,
            setSearchTagName,
            isLoadingSearchTags,
            removeTag,
            addTag,
            suggestedTags,
        },
        filterCriteriaSuggestedTags,
        onClickLocation,
        handleChangeAnywhere,
    };
};
