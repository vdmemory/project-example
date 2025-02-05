import { FC } from 'react';
import { StyledAgencyPreferencesStep } from './AgencyPreferencesStep.styled';
import { useFormContext } from 'react-hook-form';
import { PreferencesFormType } from '../../../types/projectCreateTypes';
import { AgencyPreferencesStepFields } from './agencyPreferencesStepFields/AgencyPreferencesStepFields';

export const AgencyPreferencesStep: FC = () => {
    const { control, clearErrors } = useFormContext<PreferencesFormType>();

    return (
        <StyledAgencyPreferencesStep>
            <AgencyPreferencesStepFields
                control={control}
                clearErrors={clearErrors}
            />
        </StyledAgencyPreferencesStep>
    );
};

export default AgencyPreferencesStep;
