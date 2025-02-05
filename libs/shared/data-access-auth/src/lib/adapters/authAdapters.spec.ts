import {
    prepareChangePasswordsData,
    prepareSetPasswordData,
    prepareChangeUpdateEmailsData,
    prepareEmailData,
    prepareLoginData,
    prepareSignUpProjectData,
    prepareChangeRegistrationData,
    prepareChangeGoogleRegistrationData,
    transformGetSelf,
    prepareInvitationUserData,
    prepareCheckUserStatusData,
} from './authAdapters';
import {
    AuthValidationType,
    CheckUserStatusRequestType,
    GetSelfResponseType,
    GoogleRequestType,
    InvitationUserRequestType,
    LoginRequestType,
    ResetPassRequestType,
    SetPassRequestType,
    SignUpRequestType,
    UpdateEmailRequestType,
} from '@breef/shared/types';

describe('Adapter Functions', () => {
    it('should prepare change passwords data', () => {
        const input: ResetPassRequestType = {
            password: 'password123',
            confirmPassword: 'password123',
            token: 'token123',
        };
        const expectedOutput = {
            password: 'password123',
            confirmation_password: 'password123',
            token: 'token123',
        };
        expect(prepareChangePasswordsData(input)).toEqual(expectedOutput);
    });

    it('should prepare set password data', () => {
        const input: SetPassRequestType = {
            password: 'password123',
            token: 'token123',
        };
        const expectedOutput = {
            password: 'password123',
            token: 'token123',
        };
        expect(prepareSetPasswordData(input)).toEqual(expectedOutput);
    });

    it('should prepare change update emails data', () => {
        const input: UpdateEmailRequestType = {
            emailToConfirm: 'TEST@EMAIL.COM',
            password: 'password123',
        };
        const expectedOutput = {
            email_to_confirm: 'test@email.com',
            password: 'password123',
        };
        expect(prepareChangeUpdateEmailsData(input)).toEqual(expectedOutput);
    });

    it('should prepare email data', () => {
        const input = {
            email: 'TEST@EMAIL.COM',
        };
        const expectedOutput = {
            email: 'test@email.com',
        };
        expect(prepareEmailData(input)).toEqual(expectedOutput);
    });

    it('should prepare login data', () => {
        const input: LoginRequestType = {
            email: 'TEST@EMAIL.COM',
            password: 'password123',
        };
        const expectedOutput = {
            email: 'test@email.com',
            password: 'password123',
        };
        expect(prepareLoginData(input)).toEqual(expectedOutput);
    });

    it('should prepare sign-up project data', () => {
        const input = {
            skills: ['1', '2', '3'],
            start: '2024-01-01',
            budget: '1000',
        };
        const expectedOutput = {
            skills: [1, 2, 3],
            start: '2024-01-01',
            budget: '1000',
        };
        expect(prepareSignUpProjectData(input)).toEqual(expectedOutput);
    });

    it('should prepare change registration data', () => {
        const input: SignUpRequestType = {
            user: {
                firstName: 'First',
                lastName: 'Last',
                email: 'TEST@EMAIL.COM',
                password: 'password123',
                acceptPrivacy: true,
                role: 'company',
            },
            company: {
                name: 'Company Name',
            },
            utm: {
                source: 'google',
            },
            project: {
                skills: ['1', '2', '3'],
                start: '2024-01-01',
                budget: '1000',
            },
        };
        const expectedOutput = {
            user: {
                first_name: 'First',
                last_name: 'Last',
                email: 'test@email.com',
                password: 'password123',
                accept_privacy: true,
            },
            company: {
                name: 'Company Name',
            },
            project: {
                skills: [1, 2, 3],
                start: '2024-01-01',
                budget: '1000',
            },
            utm: {
                source: 'google',
            },
        };
        expect(prepareChangeRegistrationData(input)).toEqual(expectedOutput);
    });

    it('should prepare change Google registration data', () => {
        const input: GoogleRequestType = {
            accessToken: 'accessToken123',
            user: {
                acceptPrivacy: true,
                role: 'company',
            },
            utm: {
                source: 'google',
            },
            project: {
                skills: ['1', '2', '3'],
                start: '2024-01-01',
                budget: '1000',
            },
        };
        const expectedOutput = {
            access_token: 'accessToken123',
            accept_privacy: true,
            project: {
                skills: [1, 2, 3],
                start: '2024-01-01',
                budget: '1000',
            },
            utm: {
                source: 'google',
            },
        };
        expect(prepareChangeGoogleRegistrationData(input)).toEqual(
            expectedOutput,
        );
    });

    it('should transform GetSelf response', () => {
        const input: GetSelfResponseType = {
            id: 1,
            email: 'test@email.com',
            first_name: 'First',
            last_name: 'Last',
            company_type: 'Tech',
            phone_number: '123456789',
            is_onboarding_complete: true,
            company_position: 'CEO',
            time_zone: 'GMT',
            has_social_account: true,
            date_joined: '2023-01-01',
            company_name: 'Company Name',
            company_id: 123,
        };
        const expectedOutput = {
            id: 1,
            email: 'test@email.com',
            firstName: 'First',
            lastName: 'Last',
            companyType: 'Tech',
            phoneNumber: '123456789',
            isOnboardingComplete: true,
            companyPosition: 'CEO',
            timeZone: 'GMT',
            hasSocialAccount: true,
            dateJoined: '2023-01-01',
            companyName: 'Company Name',
            companyId: 123,
        };
        expect(transformGetSelf(input)).toEqual(expectedOutput);
    });

    it('should prepare invitation user data', () => {
        const input: InvitationUserRequestType = {
            token: 'token123',
            userData: {
                firstName: 'First',
                lastName: 'Last',
                phoneNumber: '123456789',
                acceptPrivacy: true,
                password: 'password123',
            },
        };
        const expectedOutput = {
            token: 'token123',
            user_data: {
                first_name: 'First',
                last_name: 'Last',
                phone_number: '123456789',
                accept_privacy: true,
                password: 'password123',
            },
        };
        expect(prepareInvitationUserData(input)).toEqual(expectedOutput);
    });

    it('should prepare check user status data for ACCEPT_INVITE', () => {
        const input: CheckUserStatusRequestType = {
            token: 'token123',
            validationType: AuthValidationType.ACCEPT_INVITE,
        };
        const expectedOutput = {
            token: 'token123',
            validation_type: AuthValidationType.ACCEPT_INVITE,
        };
        expect(prepareCheckUserStatusData(input)).toEqual(expectedOutput);
    });

    it('should prepare check user status data for SIGN_UP', () => {
        const input: CheckUserStatusRequestType = {
            email: 'TEST@EMAIL.COM',
            validationType: AuthValidationType.SIGN_UP,
        };
        const expectedOutput = {
            email: 'test@email.com',
            validation_type: AuthValidationType.SIGN_UP,
        };
        expect(prepareCheckUserStatusData(input)).toEqual(expectedOutput);
    });

    it('should prepare check user status data for email only', () => {
        const input: CheckUserStatusRequestType = {
            email: 'TEST@EMAIL.COM',
        };
        const expectedOutput = {
            email: 'test@email.com',
        };
        expect(prepareCheckUserStatusData(input)).toEqual(expectedOutput);
    });
});
