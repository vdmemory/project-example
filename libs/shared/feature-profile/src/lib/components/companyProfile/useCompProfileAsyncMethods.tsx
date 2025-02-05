import {
    useLazyGetCompanyInfoQuery,
    useLazyGetBillingDataQuery,
} from '@breef/shared/data-access-profile';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useCompProfileAsyncMethods = ({
    companyType,
}: {
    companyType: 'client' | 'agency';
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [getCompanyInfo, { data: companyInfo }] =
        useLazyGetCompanyInfoQuery();
    const [getBillingData, { data: billingData }] =
        useLazyGetBillingDataQuery();

    const getFetchData = async () => {
        setIsLoading(true);

        try {
            await getCompanyInfo({ companyType }).unwrap();
            await getBillingData().unwrap();
        } catch (error) {
            console.log(error);
            toast.error(
                'An error occurred while loading data: Services And Skills, Company Info, Billing Data',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getFetchData,
        isLoading,
        companyInfo,
        billingData,
    };
};
