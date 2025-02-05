import { StyledGoogleForm } from './GoogleAuth.styled';
import { AuthGoogleType } from '@breef/shared/types';
import CustomGoogleButton from './customGoogleButton/CustomGoogleButton';
import { useGoogleLoginMethods } from './useGoogleLoginMethods';
import { useEffect } from 'react';

export interface GoogleAuthProps {
    name?: string;
    onClick: (data: AuthGoogleType) => void;
    checkIsValid?: () => Promise<boolean>;
    isOnlyIcon?: boolean;
}

export function GoogleAuth({
    name = 'Continue with Google',
    onClick,
    checkIsValid,
}: GoogleAuthProps) {
    const { loginImplicit, userCredential } = useGoogleLoginMethods();

    useEffect(() => {
        if (userCredential) {
            onClick(userCredential);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCredential]);

    const handleClickButton = async () => {
        const isValid = !checkIsValid || (await checkIsValid());
        if (isValid) {
            loginImplicit();
        }
    };

    return (
        <StyledGoogleForm className="google-identity" data-testid="google-auth">
            <CustomGoogleButton onClick={handleClickButton} title={name} />
        </StyledGoogleForm>
    );
}

export default GoogleAuth;
