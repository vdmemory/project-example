import { AgencySelection } from '@breef/feature-agency-selection';
import { BreefAvatar } from '@breef/shared/assets';
import {
    PROJECTS_ROUTE,
    ScheduledCallsStatusNames,
} from '@breef/shared/constants';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { useGetProjectByIdQuery } from '@breef/shared/data-access-project';
import {
    ExpandedStepperNavigation,
    PageLoader,
    ReviewProjectPopup,
    usePopup,
} from '@breef/shared/ui-components';
import { getProjectData } from '@breef/shared/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProjectByIdType } from '@breef/shared/types';
import { useGetScheduledCallsListQuery } from '@breef/shared/data-access-project-availability';
import { withDynamicPathIds } from '../../../hoc/withDynamicPathIds';
import { toast } from 'react-toastify';

type Stepper = {
    mainStep: number;
    subStep: number;
};

const NavControl = dynamic(
    () => import('@breef/shared/ui-components').then(item => item.NavControl),
    {
        ssr: false,
    },
);

const AgencySelectionPage = () => {
    const router = useRouter();
    const [stepper, setStepper] = useState<Stepper>({
        mainStep: 1,
        subStep: 1,
    });
    const projectPopup = usePopup();

    const {
        query: { projectId },
    } = router;

    const projectByIdQuery = useGetProjectByIdQuery(Number(projectId));
    const companyInfoData = useGetCompanyInfoQuery({ companyType: 'client' });

    const { data, isFetching: isLoading } = useGetScheduledCallsListQuery(
        Number(projectId),
        {
            skip: !projectId,
            refetchOnReconnect: true,
            refetchOnMountOrArgChange: true,
        },
    );

    const { data: companyInfo, isFetching: isLoadingCompanyInfo } =
        useGetCompanyInfoQuery(
            {
                companyType: 'client',
            },
            {
                refetchOnReconnect: true,
                refetchOnMountOrArgChange: true,
            },
        );

    const brandLead = {
        firstName: companyInfo?.brandLead?.firstName,
        lastName: companyInfo?.brandLead?.lastName,
        logoUrl: companyInfo?.brandLead?.brandLead.logoUrl || BreefAvatar.src,
    };

    const pitchesShortListed =
        data?.filter(
            item =>
                item.status === ScheduledCallsStatusNames.MEETING_COMPLETED &&
                !item.isArchived,
        ) ?? [];

    useEffect(() => {
        if (data && !pitchesShortListed?.length) {
            router.push(PROJECTS_ROUTE).finally(() => {
                toast.error('No agencies found to select.');
            });
        }
    }, [data, pitchesShortListed]);

    if (isLoading || isLoadingCompanyInfo) {
        return <PageLoader />;
    }

    const agenciesList = pitchesShortListed.length
        ? pitchesShortListed.map(item => ({
              id: item.pitchId,
              companyName: item.agency.name,
              companyLogo: item.agency.logoUrl,
              companyLocation: item.agency.officeLocation,
          }))
        : [];

    const handleDecrement = () => {
        if (stepper.mainStep === 1 && stepper.subStep === 1) {
            router.push(PROJECTS_ROUTE);
        }
        setStepper({
            mainStep: stepper.mainStep - 1,
            subStep: stepper.subStep - 1,
        });
    };
    const handleBackToDashboard = () => router.push(PROJECTS_ROUTE);

    return (
        <>
            <NavControl
                handleBack={handleDecrement}
                isDisabledPrev={false}
                isStatic={true}
                isSticky={true}
            >
                <ExpandedStepperNavigation
                    title={projectByIdQuery.data?.name || 'Brand refresh'}
                    readOnly
                    buttonTitle="Dashboard"
                    maxLength={60}
                    onButtonClick={handleBackToDashboard}
                    isShowIconInfo
                    displayPhone={true}
                    customPopup={
                        <ReviewProjectPopup
                            close={projectPopup.close}
                            projectData={getProjectData(
                                projectByIdQuery.data as ProjectByIdType,
                            )}
                        />
                    }
                    customPopupControl={projectPopup}
                />
            </NavControl>
            <AgencySelection
                agenciesList={agenciesList}
                setStepper={setStepper}
                stepper={stepper}
                brandLead={brandLead}
            />
        </>
    );
};
export default withDynamicPathIds(AgencySelectionPage, ['projectId']);
