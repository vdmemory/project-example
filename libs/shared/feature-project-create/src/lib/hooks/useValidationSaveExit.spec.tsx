import useValidationSaveExit from './useValidationSaveExit';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import {
    CompanyDetailsFormType,
    PersonalizeScopeFormType,
    PreferencesFormType,
    ProjectScopeFormType,
} from '../types/projectCreateTypes';

const setup = () => {
    const {
        result: { current: projectScope },
    } = renderHook(() => useForm<ProjectScopeFormType>());
    const {
        result: { current: agencyPreferences },
    } = renderHook(() => useForm<PreferencesFormType>());
    const {
        result: { current: personalizeScope },
    } = renderHook(() => useForm<PersonalizeScopeFormType>());
    const {
        result: { current: companyDetails },
    } = renderHook(() => useForm<CompanyDetailsFormType>());
    const methods = {
        projectScope,
        agencyPreferences,
        personalizeScope,
        companyDetails,
    };
    return renderHook(() => useValidationSaveExit(methods));
};

describe('useValidationSaveExit', () => {
    it('should call trigger for each step successfully', () => {
        const {
            result: {
                current: { triggerValidationSaveExit },
            },
        } = setup();
        triggerValidationSaveExit(1);
        triggerValidationSaveExit(3);
        triggerValidationSaveExit(4);
    });
});
