import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@breef/shared/constants';

export const linksByErrorsKeyPhrases = [
    {
        keyPhrase: 'log in',
        link: SIGN_IN_ROUTE,
    },
    {
        keyPhrase: 'create an account',
        link: SIGN_UP_ROUTE,
    },
    {
        keyPhrase: 'recover your password',
        link: `${SIGN_IN_ROUTE}?view=findpassword`,
    },
];
