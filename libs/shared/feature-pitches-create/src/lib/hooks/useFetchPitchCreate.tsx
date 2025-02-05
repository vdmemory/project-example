import { PROJECTS_ROUTE } from '@breef/shared/constants';
import {
    useLazyGetPitchByIdQuery,
    useLazyGetPitchPreviewQuery,
} from '@breef/shared/data-access-pitch-create';
import {
    useLazyGetAccountInfoQuery,
    useLazyGetCompanyInfoQuery,
} from '@breef/shared/data-access-profile';
import { defaultErrorHandler } from '@breef/shared/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRouteControl } from '@breef/shared/hooks';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';

interface PitchCreateProps {
    mode?: 'edit' | 'create';
}
export const useFetchPitchCreate = ({ mode }: PitchCreateProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { changePage } = useRouteControl();

    const {
        query: { projectId, pitchId },
    } = router;

    const [getPreview, { isFetching: isFetchingProject }] =
        useLazyGetPitchPreviewQuery();
    const [getPitch, { data }] = useLazyGetPitchByIdQuery();
    const [getCompanyInfo] = useLazyGetCompanyInfoQuery();
    const [getAccountInfo] = useLazyGetAccountInfoQuery();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchData() {
        try {
            setIsLoading(true);
            if (mode === 'edit') {
                const payload = await getPitch(Number(pitchId) || 0).unwrap();
                if (payload.status === 'posted') {
                    toast.error(pitchAlreadyPostedMessage);
                    await changePage(PROJECTS_ROUTE);
                }
            }
            await Promise.all([
                getPreview(Number(projectId)).unwrap(),
                getAccountInfo({ companyType: 'agency' }).unwrap(),
                getCompanyInfo({ companyType: 'agency' }).unwrap(),
            ]);
        } catch (error) {
            const typedError = error as FetchBaseQueryError;
            if (typedError.status === 400) {
                defaultErrorHandler(typedError);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading: isLoading || isFetchingProject, pitchData: data };
};

const pitchAlreadyPostedMessage = 'This pitch has already been posted!';
