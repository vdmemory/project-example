import { Projects, sliceActions } from '@breef/shared/feature-projects';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import {
    useGetActionMainCTAQuery,
    useLazyGetProjectsQuery,
} from '@breef/shared/data-access-projects';
import { FilterProjectsType } from '@breef/shared/types';
import { AnimateLayoutPage, LoaderWrapper } from '@breef/shared/ui-components';
import { clientConfigNoProjectsInfo } from '../components/configNoProjectsInfo';
import { useEffect, useState } from 'react';
import {
    useGetAccountInfoQuery,
    useGetCompanyInfoQuery,
} from '@breef/shared/data-access-profile';
import { Filters, IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import moment from 'moment';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';

export function ProjectsPage() {
    moment.locale('en');
    const { dashboardIsLoaded } = useAppSelector(state => state.projectDetails);
    const dispatch = useAppDispatch();

    const [filterProjectsState, setFilterProjectsState] =
        useState<FilterProjectsType>({ status: Filters.active });
    const [isShowLoader, setIsShowLoader] = useState(true);

    useEffect(() => {
        if (!dashboardIsLoaded && !isShowLoader) {
            dispatch(sliceActions.setDashboardIsLoaded());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dashboardIsLoaded, isShowLoader]);

    const {
        data: selfData,
        isSuccess: isSuccessSelf,
        isLoading: isLoadingSelf,
    } = useGetSelfQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    const requestsOptions = {
        skip: !selfData,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    };
    const [
        getProjects,
        { data: clientProjectsData, isFetching: isFetchingProjectsClient },
    ] = useLazyGetProjectsQuery();
    const { isLoading: isLoadingSkills } = useGetCapabilitiesQuery({});
    const { data: companyInfoData, isFetching: isLoadingCompanyInfo } =
        useGetCompanyInfoQuery(
            { companyType: selfData?.companyType || 'client' },
            requestsOptions,
        );
    useGetAccountInfoQuery(
        { companyType: selfData?.companyType || 'client' },
        requestsOptions,
    );
    const { data: ctaData, isFetching: isLoadingCtaData } =
        useGetActionMainCTAQuery(undefined, requestsOptions);

    useEffect(() => {
        if (!ctaData || isLoadingCtaData || !selfData) return;
        const isOnlyArchivedProjects =
            ctaData?.meta?.projectsArchivedCount &&
            !ctaData?.meta?.projectsCount;

        if (isOnlyArchivedProjects) {
            return setFilterProjectsState({
                status: Filters.archived,
            });
        }
    }, [ctaData, isLoadingCtaData, selfData]);

    useEffect(() => {
        getProjects(filterProjectsState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterProjectsState]);

    const projectData = clientProjectsData?.map(item => ({
        data: {
            id: item.id,
            status: item.status,
            isReviewedPitches: item.isReviewedPitches,
            progressBarStatus: item.progressBarStatus,
            actionValue: item.actionValue,
            name: item.name,
            pitchCount: item.pitchCount,
            created: item.created,
            budget: item.budget,
            progress: item.progress,
        },
        paymentId: item.paymentId,
        pitchId: null,
    }));

    const setFilterProjects = (values: FilterProjectsType) => {
        if (values.status === Filters.active) {
            return setFilterProjectsState(values);
        }
        setFilterProjectsState(values);
    };

    const isLoadingPage =
        isLoadingSelf ||
        isLoadingCompanyInfo ||
        isLoadingCtaData ||
        isLoadingSkills;

    return (
        <>
            {isShowLoader || isLoadingPage ? (
                <LoaderWrapper
                    isDashboard={!dashboardIsLoaded}
                    isLoading={isLoadingPage}
                    hideLoader={hide => setIsShowLoader(!hide)}
                />
            ) : null}
            {IS_CLIENT_PLATFORM && (
                <AnimateLayoutPage headTitle="Projects">
                    <Projects
                        isLoadingPage={isLoadingPage}
                        role="client"
                        selfData={selfData}
                        projectsData={projectData}
                        isSuccessSelf={isSuccessSelf}
                        configUser={clientConfigNoProjectsInfo}
                        isFetchingProjects={isFetchingProjectsClient}
                        filterProjects={filterProjectsState}
                        changeFilterProjects={values =>
                            setFilterProjects(values)
                        }
                        companyInfoData={companyInfoData}
                        ctaData={ctaData}
                    />
                </AnimateLayoutPage>
            )}
        </>
    );
}

export default ProjectsPage;
