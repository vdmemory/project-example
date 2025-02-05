import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { useGetPitchPreviewQuery } from '@breef/shared/data-access-pitch-create';
import { useLazyGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { useGetProjectByIdQuery } from '@breef/shared/data-access-project';
import { useRouteControl } from '@breef/shared/hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

type ErrorGetProjectById = {
    status: number;
    data: {
        detail: string[];
    };
};

export const useProjectInfoControl = ({
    userType,
}: {
    userType: 'client' | 'agency' | null;
}) => {
    const { queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || -1;

    const [getCompanyInfo, companyInfoQuery] = useLazyGetCompanyInfoQuery();

    useEffect(() => {
        if (!userType) return;
        getCompanyInfo({ companyType: userType });
    }, [userType]);

    const projectInfoByAgency = useGetPitchPreviewQuery(projectId, {
        skip: userType !== 'agency',
        refetchOnMountOrArgChange: true,
    });
    const projectInfoByClient = useGetProjectByIdQuery(projectId, {
        skip: userType !== 'client',
        refetchOnMountOrArgChange: true,
    });

    return {
        project: {
            projectInfoAgency: projectInfoByAgency.data,
            projectInfoClient: projectInfoByClient.data,
            companyInfo: companyInfoQuery.data,
            isSuccessGetCompany: companyInfoQuery.isSuccess,
            isSuccessGetProject:
                projectInfoByClient.isSuccess || projectInfoByAgency.isSuccess,
            loadingProject:
                projectInfoByClient.isLoading ||
                projectInfoByAgency.isLoading ||
                companyInfoQuery.isLoading,
            errorGetProject:
                projectInfoByClient.error || projectInfoByAgency.error,
        },
    };
};
