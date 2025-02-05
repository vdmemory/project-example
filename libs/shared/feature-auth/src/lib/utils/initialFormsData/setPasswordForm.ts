import { SetPassFormValuesType } from '../../types/authFormTypes';

export const defaultSetPasswordFormValues = (token: string) => {
    return {
        token,
        password: '',
    } as SetPassFormValuesType;
};
