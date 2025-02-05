import { SignUpResponseType } from '@breef/shared/types';

export type AuthStateType = {
    isAuth: boolean;
    registrationData: SignUpResponseType | null;
    signInError: string | null;
    utm: { [key: string]: string };
};

type EditableStateType = {
    isEditable: boolean;
    setIsEditable: (value: boolean) => void;
};

export type FormRowsSignUpStateType = {
    name: EditableStateType;
    companyName: EditableStateType;
    email: EditableStateType;
};

export type FormRowsSignInStateType = {
    email: EditableStateType;
};
