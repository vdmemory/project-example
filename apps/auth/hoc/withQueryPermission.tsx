import { useRouter } from 'next/router';
import { SIGN_IN_ROUTE } from '@breef/shared/constants';
import { useEffect, useState } from 'react';
import { useCheckTokenExpirationMutation } from '@breef/shared/data-access-auth';
import WrapPageLoader from '../components/layout/WrapPageLoader';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PageLoader } from '@breef/shared/ui-components';

const withQueryPermission = (
    WrappedComponent: ({
        queryOption,
        isValid,
    }: {
        queryOption: string;
        isValid: boolean;
    }) => JSX.Element,
) => {
    /* eslint-disable react/display-name */
    return props => {
        const { isReady, query, push } = useRouter();
        const [queryOption, setQueryOption] = useState('');
        const [isValid, setIsValid] = useState(true);

        const [checkToken, { isSuccess, isError }] =
            useCheckTokenExpirationMutation();

        useEffect(() => {
            if (isSuccess) {
                return setIsValid(true);
            }
            if (isError) {
                return setIsValid(false);
            }
        }, [isError, isSuccess]);

        useEffect(() => {
            if (isReady) {
                if (Object.keys(query).includes('token')) {
                    const token = query['token'] as string;
                    setQueryOption(token);
                    checkToken({ token });
                } else {
                    push(SIGN_IN_ROUTE).then(() => null);
                }
            }
        }, [isReady, query, push, checkToken]);

        if (isSuccess || isError) {
            return (
                <>
                    <WrappedComponent
                        {...props}
                        queryOption={queryOption}
                        isValid={isValid}
                    />
                </>
            );
        }

        return (
            <>
                <WrapPageLoader>
                    <PageLoader />
                </WrapPageLoader>
            </>
        );
    };
};

export default withQueryPermission;
