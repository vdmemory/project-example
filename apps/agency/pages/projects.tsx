import { Projects, sliceActions } from '@breef/shared/feature-projects';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import {
    useGetActionMainCTAQuery,
    useGetAgencyProjectsQuery,
} from '@breef/shared/data-access-projects';
import { FilterProjectsType } from '@breef/shared/types';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage, LoaderWrapper } from '@breef/shared/ui-components';
import { agencyConfigNoProjectsInfo } from '../components/configNoProjectsInfo';
import { useEffect, useState } from 'react';
import {
    useGetAccountInfoQuery,
    useGetCompanyInfoQuery,
} from '@breef/shared/data-access-profile';
import { AgencyFilters, Filters } from '@breef/shared/constants';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import moment from 'moment';

export function ProjectsPage() {
    moment.locale('en');
    const { dashboardIsLoaded } = useAppSelector(state => state.projectDetails);
    const dispatch = useAppDispatch();

    const [filterProjectsState, setFilterProjectsState] =
        useState<FilterProjectsType | null>(null);
    const [isShowLoader, setIsShowLoader] = useState(true);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

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
    });
    const requestsOptions = {
        skip: !selfData,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    };
    const {
        data: agencyProjectData,
        isLoading: isLoadingProjectAgency,
        isFetching: isFetchingProjectsAgency,
        isSuccess: isSuccessAgency,
    } = useGetAgencyProjectsQuery(filterProjectsState, {
        ...requestsOptions,
        skip: !selfData || !filterProjectsState,
    });
    const { data: companyInfoData, isFetching: isLoadingCompanyInfo } =
        useGetCompanyInfoQuery(
            { companyType: selfData?.companyType || 'agency' },
            requestsOptions,
        );
    useGetAccountInfoQuery(
        { companyType: selfData?.companyType || 'agency' },
        requestsOptions,
    );
    const {
        data: ctaData,
        isFetching: isLoadingCtaData,
        isSuccess: isSuccessCtaData,
    } = useGetActionMainCTAQuery(undefined, requestsOptions);

    const projectData = agencyProjectData?.map(item => ({
        data: {
            id: item.project.id,
            status: item.status,
            progressBarStatus: item.progressBarStatus,
            name: item.project.name,
            pitchCount: 0,
            actionValue: item.project.actionValue,
            clientName: item.project.clientName,
            clientLogoUrl: item.project.clientLogoUrl,
            submissionDeadline: item.project.submissionDeadline,
            budget: item.project.budget,
        },
        pitchId: item.pitchId,
        kickoffId: item.project.kickoffId,
        acceptedTerms: item.acceptedTerms,
        paymentTotalAmount: item.paymentTotalAmount,
        tag: item.tag,
        pitchStatus: item.pitchStatus,
        hoursToSubmissionDeadline: item.hoursToSubmissionDeadline,
    }));

    const setActiveTab = (activeTabs: number[] | []) => {
        for (let i = 0; i <= activeTabs.length; i++) {
            if (activeTabs[i] > 0) {
                return setFilterProjectsState({
                    status: AgencyFilters[i] as FilterProjectsType['status'],
                });
            }
        }
    };

    const getActiveTabs = () => {
        return !isLoadingCtaData
            ? [
                  ctaData?.meta?.newProjectsCount,
                  ctaData?.meta?.submittedProjectsCount,
                  ctaData?.meta?.inProgressProjectsCount,
              ]
            : [];
    };

    useEffect(() => {
        const activeTabs = getActiveTabs();
        activeTabs.length && setActiveTab(activeTabs || []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctaData]);

    useEffect(() => {
        const activeTabs = getActiveTabs();
        const isEmptyFilters = activeTabs.filter(item => item > 0).length;

        if (isEmptyFilters && isSuccessCtaData) {
            setIsLoadingProjects(!isSuccessAgency || isLoadingProjectAgency);
        } else if (!isEmptyFilters && isSuccessCtaData) {
            setIsLoadingProjects(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filterProjectsState,
        isLoadingProjectAgency,
        isSuccessAgency,
        isSuccessCtaData,
    ]);

    const setFilterProjects = (values: FilterProjectsType) => {
        if (values.status === Filters.new_projects) {
            setFilterProjectsState(values);
            return;
        }
        setFilterProjectsState(values);
    };

    const isLoadingPage =
        isLoadingSelf ||
        isLoadingCompanyInfo ||
        isLoadingProjects ||
        isLoadingCtaData;

    return (
        <>
            {isShowLoader || isLoadingPage ? (
                <LoaderWrapper
                    isDashboard={!dashboardIsLoaded}
                    isLoading={isLoadingPage}
                    hideLoader={hide => setIsShowLoader(!hide)}
                />
            ) : null}

            <AnimateLayoutPage headTitle="Projects">
                <Projects
                    role="agency"
                    isLoadingPage={isLoadingPage}
                    isSuccessSelf={isSuccessSelf}
                    selfData={selfData}
                    projectsData={projectData}
                    configUser={agencyConfigNoProjectsInfo}
                    filterProjects={filterProjectsState}
                    changeFilterProjects={values => setFilterProjects(values)}
                    isFetchingProjects={isFetchingProjectsAgency}
                    companyInfoData={companyInfoData}
                    ctaData={ctaData}
                />
            </AnimateLayoutPage>
        </>
    );
}

export default ProjectsPage;
