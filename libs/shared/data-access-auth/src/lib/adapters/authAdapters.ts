import {
    CheckUserStatusRequestType,
    CheckUserStatusResponseType,
    GetSelfMergedResponseType,
    GetSelfResponseType,
    GooglePreparedRequestType,
    GoogleRequestType,
    InvitationUserRequestType,
    LoginRequestType,
    ResetPassRequestType,
    SetPassRequestType,
    SignUpRequestType,
    UpdateEmailRequestType,
    SignUpProjectType,
    AuthValidationType,
} from '@breef/shared/types';

export function prepareChangePasswordsData(values: ResetPassRequestType) {
    return {
        password: values.password,
        confirmation_password: values.confirmPassword,
        token: values.token,
    };
}

export function prepareSetPasswordData(values: SetPassRequestType) {
    return {
        password: values.password,
        token: values.token,
    };
}

export function prepareChangeUpdateEmailsData(values: UpdateEmailRequestType) {
    return {
        email_to_confirm: values.emailToConfirm.toLowerCase(),
        password: values.password,
    };
}

export function prepareEmailData(values: { email: string }) {
    return {
        email: values.email.toLowerCase(),
    };
}

export function prepareLoginData(values: LoginRequestType) {
    return {
        email: values.email.toLowerCase(),
        password: values.password,
    };
}

export function prepareSignUpProjectData(values: SignUpProjectType) {
    const preparedProjectData = {} as {
        skills?: number[];
        start?: string;
        budget?: string;
    };
    const skills = Array.isArray(values.skills)
        ? values.skills.map(item => Number(item))
        : Number(values.skills);
    const isArraySkills = Array.isArray(skills);
    const isOnlyNaNSkills =
        (!isArraySkills && Number.isNaN(skills)) ||
        (isArraySkills && !skills.some(item => !Number.isNaN(item)));

    if (!isOnlyNaNSkills) {
        preparedProjectData.skills = isArraySkills
            ? skills.filter(item => item)
            : [skills];
    }

    if (values.start) {
        preparedProjectData.start = values.start;
    }

    if (values.budget) {
        preparedProjectData.budget = values.budget;
    }

    return preparedProjectData;
}

export function prepareChangeRegistrationData({
    user,
    company,
    utm,
    project,
}: SignUpRequestType) {
    const result = {
        user: {
            first_name: user.firstName.trim(),
            last_name: user.lastName.trim(),
            email: user.email.trim().toLowerCase(),
            password: user.password,
            accept_privacy: user.acceptPrivacy,
        },
        company: {
            name: company.name.trim(),
        },
    } as {
        user: object;
        company: object;
        project?: object;
    };
    if (project?.skills && user.role === 'company') {
        result.project = prepareSignUpProjectData(project);
    }

    if (utm && Object.keys(utm).length) {
        return {
            ...result,
            utm,
        };
    }
    return result;
}

export function prepareChangeGoogleRegistrationData(
    { accessToken, user, utm, project }: GoogleRequestType,
    isRegistration = true,
) {
    const preparedData = {
        access_token: accessToken,
        accept_privacy: user?.acceptPrivacy,
    } as GooglePreparedRequestType;
    if (project?.skills && user?.role === 'company' && isRegistration) {
        preparedData.project = prepareSignUpProjectData(project);
    }
    if (utm && Object.keys(utm).length) {
        return {
            ...preparedData,
            utm,
        };
    }

    return preparedData;
}

export function transformGetSelf(
    values: GetSelfResponseType,
): GetSelfMergedResponseType {
    return {
        id: values.id,
        email: values.email,
        firstName: values.first_name,
        lastName: values.last_name,
        companyType: values.company_type,
        phoneNumber: values.phone_number || '',
        isOnboardingComplete: values.is_onboarding_complete || false,
        companyPosition: values.company_position,
        timeZone: values.time_zone,
        hasSocialAccount: values.has_social_account || false,
        dateJoined: values.date_joined,
        companyName: values.company_name,
        companyId: values.company_id,
        hasPassword: values.has_password,
    };
}

export function prepareInvitationUserData(values: InvitationUserRequestType) {
    const data: {
        token: string;
        user_data: {
            first_name: string;
            last_name: string;
            phone_number?: string;
            accept_privacy: boolean;
            password: string;
        };
    } = {
        token: values.token,
        user_data: {
            first_name: values.userData.firstName,
            last_name: values.userData.lastName,
            accept_privacy: values.userData.acceptPrivacy,
            password: values.userData.password,
        },
    };

    if (values.userData.phoneNumber) {
        data.user_data.phone_number = values.userData.phoneNumber;
    }
    return data;
}

export function prepareCheckUserStatusData(
    values: CheckUserStatusRequestType,
): CheckUserStatusResponseType {
    if (
        values.token &&
        values.validationType === AuthValidationType.ACCEPT_INVITE
    ) {
        return {
            token: values.token,
            validation_type: values.validationType,
        };
    }

    if (values.email && values.validationType === AuthValidationType.SIGN_UP) {
        return {
            email: values.email.toLowerCase(),
            validation_type: values.validationType,
        };
    }

    return {
        email: values.email?.toLowerCase(),
    };
}
