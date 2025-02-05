import {
    AGENCY_FRONT_APP_URL,
    AUTH_FRONT_APP_URL,
    CLIENT_FRONT_APP_URL,
    IS_CLIENT_PLATFORM,
} from '@breef/shared/constants';
import { logout } from '../services-setting/logout';

export const redirectToApp = (url: string): null => {
    if (IS_CLIENT_PLATFORM) window.location.href = url;
    return null;
};

export const redirectToAppByUserType = (
    userType: string,
    nextRoute?: string,
) => {
    return nextRoute?.length
        ? redirectToApp(
              userType === 'client'
                  ? CLIENT_FRONT_APP_URL + nextRoute
                  : AGENCY_FRONT_APP_URL + nextRoute,
          )
        : redirectToApp(
              userType === 'client'
                  ? CLIENT_FRONT_APP_URL
                  : AGENCY_FRONT_APP_URL,
          );
};

export const redirectToAuthApp = (nextPath?: string) => {
    nextPath?.length
        ? redirectToApp(`${AUTH_FRONT_APP_URL}/signin?nextPath=${nextPath}`)
        : redirectToApp(AUTH_FRONT_APP_URL);
};
