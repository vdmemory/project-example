import { useLazyGetUserInfoQuery } from '@breef/shared/data-access-google-event';
import { AuthGoogleType } from '@breef/shared/types';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export const useGoogleLoginMethods = () => {
    const [userCredential, setUserCredential] = useState<AuthGoogleType | null>(
        null,
    );
    const [getUserInfo] = useLazyGetUserInfoQuery();

    const loginImplicit = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const result = await getUserInfo(tokenResponse.access_token);

                if (result.data) {
                    setUserCredential({
                        accessToken: tokenResponse.access_token,
                        user: {
                            email: result.data.email,
                            firstName: result.data.givenName,
                            lastName: result.data.familyName,
                        },
                    });
                }
                return;
            } catch (error) {
                console.log('GOOGLE_AUTH_GET_INFO: ', error);
            }
        },
        onError: errorResponse =>
            console.log('GOOGLE_AUTH_GET_TOKEN: ', errorResponse),
    });

    return { loginImplicit, userCredential };
};
