import {
    useGetSharingPitchQuery,
    useLazyGetPitchByIdQuery,
    useUpdateIsSharingPitchMutation,
} from '@breef/shared/data-access-pitch-create';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { getHostName } from '@breef/shared/utils';
import { useEffect } from 'react';
import { useMediaContext } from '@breef/shared/hooks';

export const useMyPitchTab = ({
    userType,
    pitchId,
    activeShare,
}: {
    userType: 'client' | 'agency';
    pitchId?: number | null;
    activeShare: boolean;
}) => {
    const [getPitchById, { data, isLoading }] = useLazyGetPitchByIdQuery();

    const { data: companyInfoData, isLoading: isLoadingCompanyInfo } =
        useGetCompanyInfoQuery({ companyType: userType });

    const [updateIsSharingPitch] = useUpdateIsSharingPitchMutation();

    const getSharingPitchQuery = useGetSharingPitchQuery(
        { pitchId: Number(pitchId), userType: 'agency' },
        { skip: !pitchId },
    );

    const { isMobile } = useMediaContext();
    const hostName = getHostName();
    const link = `${hostName}/public/${getSharingPitchQuery.data?.token}/pitch`;

    const brandLid = {
        firstName: companyInfoData?.brandLead.firstName as string,
        lastName: companyInfoData?.brandLead.lastName as string,
        logoUrl: companyInfoData?.brandLead.brandLead.logoUrl as string,
    };

    const handleSetActiveSharing = () => {
        updateIsSharingPitch({
            id: Number(pitchId),
            isSharing: !activeShare,
            userType,
        });
    };

    useEffect(() => {
        if (pitchId) {
            getPitchById(pitchId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pitchId]);

    return {
        isMobile,
        getSharingPitchQuery,
        data,
        companyInfoData,
        isLoading,
        isLoadingCompanyInfo,
        link,
        brandLid,
        handleSetActiveSharing,
    };
};
