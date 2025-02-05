import { linksByErrorsKeyPhrases } from './linksByErrorsKeyPhrases';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@breef/shared/constants';

describe('linksByErrorsKeyPhrases', () => {
    it('should contain an object with keyPhrase "log in" and link to SIGN_IN_ROUTE', () => {
        const logInObj = linksByErrorsKeyPhrases.find(
            obj => obj.keyPhrase === 'log in',
        );
        expect(logInObj).toBeDefined();
        logInObj && expect(logInObj.link).toBe(SIGN_IN_ROUTE);
    });

    it('should contain an object with keyPhrase "create an account" and link to SIGN_UP_ROUTE', () => {
        const createAccountObj = linksByErrorsKeyPhrases.find(
            obj => obj.keyPhrase === 'create an account',
        );
        expect(createAccountObj).toBeDefined();
        createAccountObj && expect(createAccountObj.link).toBe(SIGN_UP_ROUTE);
    });

    it('should contain an object with keyPhrase "recover your password" and link to a specific SIGN_IN_ROUTE with view query parameter', () => {
        const recoverPasswordObj = linksByErrorsKeyPhrases.find(
            obj => obj.keyPhrase === 'recover your password',
        );
        expect(recoverPasswordObj).toBeDefined();
        recoverPasswordObj &&
            expect(recoverPasswordObj.link).toBe(
                `${SIGN_IN_ROUTE}?view=findpassword`,
            );
    });
});
