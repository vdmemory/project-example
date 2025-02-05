import { CompanyTypeFormNames } from '@breef/shared/constants';
import {
    useLazyGetPitchesListByClientQuery,
    useLazyGetProjectByIdQuery,
} from '@breef/shared/data-access-project';
import {
    BookACallModifiedPopup,
    BookACallPopup,
    Button as ButtonComponent,
    LoaderWrapper,
    ReviewProjectPopup,
    usePopup,
} from '@breef/shared/ui-components';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouteControl } from '@breef/shared/hooks';
import { useLazyGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { getTabsConfig } from './tabsConfig';
import { StyledDashboard } from './Dashboard.styled';
import { useDashboardActions, useDashboardSelector } from '../..';
import {
    AvatarImage,
    Button as ButtonUiKit,
    DashboardSkeleton,
    ListIcon24,
} from '@breef/ui-kit';
import { BreadcrumbsTabs } from './breadcrumbTabs/BreadcrumbsTabs';
import { ProjectByIdType } from '@breef/shared/types';
import { ChatIcon, PhoneIcon } from '@breef/shared/assets';
import { useIntercom } from 'react-use-intercom';

interface DashboardProps {
    children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
    const { queryParams } = useRouteControl();
    const tooltipPopupControl = usePopup();
    const bookACallPopupControl = usePopup();
    const intercom = useIntercom();
    const [isLoading, setIsLoading] = useState(true);

    const projectId = (queryParams as { projectId?: number }).projectId || 0;

    const [getProject] = useLazyGetProjectByIdQuery();
    const [getCompanyInfo] = useLazyGetCompanyInfoQuery();
    const [getPitchesList] = useLazyGetPitchesListByClientQuery();

    const { resetHeaderInfo } = useDashboardActions();

    useEffect(() => {
        return () => {
            resetHeaderInfo();
        };
    }, []);

    const fetchData = async (projectId: number) => {
        try {
            await getProject(projectId).unwrap();
            await getCompanyInfo({
                companyType: CompanyTypeFormNames.CLIENT,
            }).unwrap();
            await getPitchesList(String(projectId)).unwrap();
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while loading project data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!projectId) return;
        fetchData(projectId);
    }, [projectId]);

    const handleShowTooltipPopup = () => {
        tooltipPopupControl.open();
    };

    const { headerInfo, projectInfo, selfInfo, pitches } = useDashboardSelector(
        state => state.dashboard,
    );

    const { company, brandLead, name, budget, budgetType } = headerInfo;
    const companyName = company?.name || '';
    const normalizedBudget = budget.replace(/(\d+(.\d)?)k/g, '$$$1K');
    const budgetLabel = budgetType === 'monthly' ? 'Monthly Budget' : 'Budget';
    const pitchesLength = pitches?.length || 0;

    const tabs = getTabsConfig({
        projectId,
        pitchesLength,
        projectStatus: projectInfo?.status,
        isSchedulingCreated: projectInfo?.isSchedulingCreated,
    });

    if (isLoading) return <LoaderWrapper />;

    const handleShowIntercom = () => {
        if (!intercom || !selfInfo) return;

        const {
            id,
            email,
            dateJoined,
            firstName,
            lastName,
            companyName,
            companyType,
        } = selfInfo;

        intercom.boot({
            userId: String(id),
            email: email,
            createdAt: dateJoined,
            name: `${firstName} ${lastName}`,
            company: {
                companyId: String(id),
                name: companyName,
                createdAt: dateJoined,
            },
            customAttributes: {
                type: companyType,
            },
        });
        intercom.show();
    };

    const renderHeader = () => {
        if (!company || !brandLead) return <DashboardSkeleton />;
        return (
            <div className="header">
                {company && (
                    <div className="project-info">
                        <div className="group">
                            {!!company?.logo && (
                                <AvatarImage
                                    src={company.logo}
                                    width={32}
                                    height={32}
                                    alt="Company Logo"
                                    className="company-logo"
                                />
                            )}
                            <div className="company-name">{company?.name}</div>
                        </div>
                        <div className="group">
                            <div className="project-name">{name}</div>
                            <div className="project-details-link">
                                <ListIcon24 />
                                <ButtonUiKit
                                    label="View Scope"
                                    size="large"
                                    isUppercase
                                    onClick={handleShowTooltipPopup}
                                    variant="ghost"
                                    isDisabled={false}
                                />
                            </div>
                        </div>
                        <div className="project-budget">
                            {budget && `${budgetLabel}: ${normalizedBudget}`}
                        </div>
                    </div>
                )}
                {brandLead && (
                    <div className="brand-lead-info">
                        <label>Your Strategist</label>
                        <div className="info">
                            <AvatarImage
                                className="brand-lead-logo"
                                src={brandLead?.logo}
                                alt="Brand Lead Photo"
                                width={40}
                                height={40}
                            />
                            <div className="brand-lead-name">
                                {brandLead?.firstName}{' '}
                                {brandLead?.lastName?.charAt(0)}.
                            </div>
                        </div>
                        <div className="group-buttons">
                            <ButtonComponent
                                type="button"
                                className="only-icon"
                                onClick={handleShowIntercom}
                            >
                                <ChatIcon />
                            </ButtonComponent>
                            <ButtonComponent
                                type="button"
                                className="only-icon"
                                onClick={bookACallPopupControl.open}
                            >
                                <PhoneIcon />
                            </ButtonComponent>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <StyledDashboard>
            {tooltipPopupControl.isOpen && (
                <ReviewProjectPopup
                    close={tooltipPopupControl.close}
                    projectData={projectInfo}
                />
            )}
            {bookACallPopupControl.isOpen && (
                <BookACallPopup close={bookACallPopupControl.close} />
            )}
            {renderHeader()}
            <BreadcrumbsTabs tabs={tabs} />
            <div className="content">{children}</div>
        </StyledDashboard>
    );
};
export default Dashboard;
