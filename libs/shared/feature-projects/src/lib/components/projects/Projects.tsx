import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledProjects, StyledProjectsFooter } from './Projects.styled';
import {
    GetStarted,
    GetStartedWelcomeBack,
} from '@breef/shared/feature-onboarding';
import {
    Answers,
    AnswersClient,
    GreetingInvitationPopup,
    usePopup,
} from '@breef/shared/ui-components';
import { Project } from './project/Project';
import { TipsAndTricks } from './tipsAndTricks/TipsAndTricks';
import { ProjectsHeader } from './projectsHeader/ProjectsHeader';
import { ProjectsViewSettingsBar } from './projectsViewSettingsBar/ProjectsViewSettingsBar';
import { NoProjectsInfo } from './noProjectsInfo/NoProjectsInfo';
import { configAnswersAgency, configAnswersClient } from './configAnswers';

import { useProjectsActions, useProjectsSelector } from '../../store/hooks';
import { useRouter } from 'next/router';
import {
    AGENCY_FRONT_APP_URL,
    CLIENT_FRONT_APP_URL,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
    ProjectProgressBarStatuses,
    PROJECTS_ROUTE,
    ProjectStatuses,
    IS_CLIENT_PLATFORM,
    FAQ_ROUTE,
    TERMS_OF_USE_ROUTE,
    PRIVACY_POLICY_ROUTE,
    Choice,
    PitchProjectTagsValues,
    PROJECT_DASHBOARD_TABS_ROUTE,
    DASHBOARD_PROJECT_ROUTE,
} from '@breef/shared/constants';
import { useGetCollectionPostsQuery } from '@breef/shared/data-access-projects';
import Link from 'next/link';
import { BreefLogo, Stars_bg } from '@breef/shared/assets';
import {
    CompanyInfoMergedResponseType,
    CTAActionButtonType,
    FilterProjectsType,
    GetAgencyProjectType,
    GetSelfMergedResponseType,
    ProgressItem,
} from '@breef/shared/types';
import { getCurrentYear } from '@breef/shared/utils';
import ProjectCreator from './projectCreator/ProjectCreator';
import { TipsAndTricksClient } from './client/tipsAndTricks/TipsAndTricksClient';
import { ProjectsAgencySkeleton, ProjectsSkeleton } from '@breef/ui-kit';

export type ProjectData = {
    data: {
        id: number;
        status: ProjectStatuses | PitchProjectStatuses;
        progressBarStatus:
            | ProjectProgressBarStatuses
            | PitchProjectProgressBarStatuses;
        name: string;
        pitchCount?: number;
        actionValue: ProjectClientActionStatuses | ProjectAgencyActionStatuses;
        clientName?: string;
        clientLogoUrl?: string;
        submissionDeadline?: string;
        created?: string;
        budget?: Choice | string;
        progress?: ProgressItem[];
        isReviewedPitches?: boolean;
    };
    pitchId?: number | null;
    paymentId?: number | null;
    kickoffId?: number | null;
    acceptedTerms?: boolean;
    tag?: PitchProjectTagsValues | string;
    hoursToSubmissionDeadline?: number;
    paymentTotalAmount?: GetAgencyProjectType['paymentTotalAmount'];
    pitchStatus?: string | null;
};

export interface ProjectsProps {
    isLoadingPage?: boolean;
    role: 'client' | 'agency';
    selfData: GetSelfMergedResponseType;
    isSuccessSelf: boolean;
    projectsData: ProjectData[];
    configUser: {
        label: string;
        note: string;
    }[];
    filterProjects?: FilterProjectsType;
    changeFilterProjects?: (values: FilterProjectsType) => void;
    isFetchingProjects?: boolean;
    companyInfoData?: CompanyInfoMergedResponseType;
    ctaData?: CTAActionButtonType;
}

export function Projects({
    isLoadingPage,
    role = 'client',
    selfData,
    isSuccessSelf,
    projectsData,
    configUser,
    filterProjects,
    changeFilterProjects,
    isFetchingProjects = false,
    companyInfoData,
    ctaData,
}: ProjectsProps) {
    const {
        projectDetails: {
            onboardingCompleted,
            isOldUser,
            emailUser,
            isDisabledPayments,
        },
    } = useProjectsSelector(state => state);
    const { resetFieldOldUser } = useProjectsActions();
    const [
        isDisplayedGreetingInvitationPopup,
        setIsDisplayedGreetingInvitationPopup,
    ] = useState(false);
    const [isDisplayedOnboardingPopup, setIsDisplayedOnboardingPopup] =
        useState(false);
    const greetingInvitationPopupControl = usePopup();
    const getStartedPopupControl = usePopup();
    const projectsViewSettingsBarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const query: { pop_up?: string } = router.query;
    const isOpenPopup =
        greetingInvitationPopupControl.isOpen || getStartedPopupControl.isOpen;
    const collectionPostsQuery = useGetCollectionPostsQuery();

    const handleRedirectToProjectListening = (id: number) => {
        if (role === 'client') {
            router.push(
                DASHBOARD_PROJECT_ROUTE.reverse({ projectId: id }) as string,
            );
            return;
        }
        router.push(
            `${
                PROJECT_DASHBOARD_TABS_ROUTE.reverse({
                    projectId: String(id),
                    tab: 'project-scope',
                }) || ''
            }`,
        );
    };

    const isClient = role === 'client';
    const isOnlyArchivedProjects =
        ctaData?.meta?.projectsArchivedCount && !ctaData?.meta?.projectsCount;

    const isDisplayGreetingInvitation =
        query.pop_up === 'invite' && !selfData.companyPosition.match(/owner/i);
    const isDisplayGetStarted = !onboardingCompleted;

    const redirectToClientProject = () => {
        window.history.replaceState(
            null,
            '',
            `${CLIENT_FRONT_APP_URL}${PROJECTS_ROUTE}`,
        );
    };

    const redirectToAgencyProject = () => {
        window.history.replaceState(
            null,
            '',
            `${AGENCY_FRONT_APP_URL}${PROJECTS_ROUTE}`,
        );
    };

    useEffect(() => {
        if (onboardingCompleted) {
            greetingInvitationPopupControl.close();
            getStartedPopupControl.close();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onboardingCompleted]);
    useEffect(() => {
        if (isSuccessSelf && IS_CLIENT_PLATFORM && !isOpenPopup) {
            if (
                isDisplayGreetingInvitation &&
                !isDisplayedGreetingInvitationPopup
            ) {
                setIsDisplayedGreetingInvitationPopup(true);
                greetingInvitationPopupControl.open();
            } else if (
                (isDisplayGetStarted && !isDisplayedOnboardingPopup) ||
                (isOldUser && !isDisplayedOnboardingPopup)
            ) {
                setIsDisplayedOnboardingPopup(true);
                getStartedPopupControl.open();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDisplayGetStarted, isDisplayGreetingInvitation, isOpenPopup]);

    const renderGetStartedPopup = () => {
        if (isOldUser) {
            return (
                <GetStartedWelcomeBack
                    email={emailUser}
                    isProgressDisplayed
                    resetIsOldUser={resetFieldOldUser}
                    isRedirectToOnboarding={isDisplayGetStarted}
                    userType={selfData.companyType}
                    close={getStartedPopupControl.close}
                />
            );
        }
        return (
            <GetStarted
                userType={selfData.companyType}
                close={getStartedPopupControl.close}
            />
        );
    };

    const renderProjectsList = () => {
        if (isFetchingProjects && role === 'client') {
            return <ProjectsSkeleton />;
        }
        if (isFetchingProjects && role === 'agency') {
            return <ProjectsAgencySkeleton />;
        }
        if (projectsData && projectsData?.length && !isFetchingProjects) {
            return projectsData.map((project, key) => (
                <Project
                    key={project.data.id}
                    data={project.data}
                    role={role}
                    pitchId={project.pitchId}
                    paymentId={project.paymentId}
                    kickoffId={project.kickoffId}
                    idx={key + 1}
                    clientName={project.data.clientName || ''}
                    calendlyLink={
                        companyInfoData?.brandLead.brandLead.calendlyLink
                    }
                    filterProjects={filterProjects as FilterProjectsType}
                    handleRedirectToProjectListening={
                        handleRedirectToProjectListening
                    }
                    tag={project.tag}
                    hoursToSubmissionDeadline={
                        project.hoursToSubmissionDeadline || 0
                    }
                    clientLogoUrl={project.data.clientLogoUrl || ''}
                    submissionDeadline={project.data.submissionDeadline || ''}
                    paymentTotalAmount={project.paymentTotalAmount}
                    pitchStatus={project.pitchStatus || null}
                    isDisabledPayments={isDisabledPayments}
                    isReviewedPitches={project.data.isReviewedPitches}
                />
            ));
        }
        if (isOnlyArchivedProjects) {
            return null;
        }

        return <NoProjectsInfo config={configUser} role={role} />;
    };

    return (
        <StyledProjects
            isClient={isClient}
            isProjects={projectsData?.length !== 0}
        >
            {greetingInvitationPopupControl.isOpen && (
                <GreetingInvitationPopup
                    role={role}
                    onClick={() => {
                        greetingInvitationPopupControl.close();
                        if (role === 'client') redirectToClientProject();
                        if (role === 'agency') redirectToAgencyProject();
                    }}
                    close={greetingInvitationPopupControl.close}
                />
            )}
            {getStartedPopupControl.isOpen && renderGetStartedPopup()}
            {!isLoadingPage && selfData && companyInfoData && ctaData && (
                <>
                    <ProjectsHeader
                        userFirstName={selfData.firstName}
                        logo={companyInfoData.logoUrl}
                        helpText={companyInfoData.brandLead.brandLead.helpText}
                        logoUrl={companyInfoData.brandLead.brandLead.logoUrl}
                        leadFirstName={companyInfoData.brandLead.firstName}
                        leadLastName={companyInfoData.brandLead.lastName}
                        calendlyLink={
                            companyInfoData.brandLead.brandLead.calendlyLink
                        }
                        projectsViewSettingsBarRef={projectsViewSettingsBarRef}
                        ctaData={ctaData}
                        role={role}
                        isDisabledPayments={isDisabledPayments}
                    />
                    <div className="main-content-wrapper-block">
                        <ProjectsViewSettingsBar
                            activeProjectsCount={
                                ctaData.meta?.projectsCount || 0
                            }
                            archivedProjectsCount={
                                ctaData.meta?.projectsArchivedCount || 0
                            }
                            inProgressProjectsCount={
                                ctaData.meta?.inProgressProjectsCount || 0
                            }
                            newProjectsCount={
                                ctaData.meta?.newProjectsCount || 0
                            }
                            submittedProjectsCount={
                                ctaData.meta?.submittedProjectsCount || 0
                            }
                            setRef={projectsViewSettingsBarRef}
                            filterProjects={filterProjects}
                            changeFilterProjects={changeFilterProjects}
                            isFetchingProjects={isFetchingProjects}
                            role={role}
                        />
                        <div className="projects-list-wrapper">
                            {renderProjectsList()}
                        </div>
                    </div>
                    {isClient && <ProjectCreator />}
                    {!collectionPostsQuery.isLoading &&
                    collectionPostsQuery.data ? (
                        <Fragment>
                            <TipsAndTricksClient
                                tipsData={collectionPostsQuery.data}
                            />
                            <TipsAndTricks
                                tipsData={collectionPostsQuery.data}
                                role={role}
                            />
                        </Fragment>
                    ) : (
                        <div className="border-box"></div>
                    )}
                    <AnswersClient
                        answersData={configAnswersClient}
                        title="WE’VE GOT ANSWERS"
                    />
                    <Answers
                        title="We've got answers."
                        titleMobile={isClient ? "We've got answers." : 'Faq'}
                        image={{
                            src: Stars_bg.src,
                            position: {
                                bottom: 0,
                                right: 0,
                            },
                        }}
                        answersData={configAnswersAgency}
                    />
                    <StyledProjectsFooter className="footer-project">
                        <div className="footer-brand">
                            <BreefLogo />
                            <span>© {getCurrentYear()} Breef Inc.</span>
                        </div>
                        <Link href={FAQ_ROUTE}>FAQ</Link>
                        <Link href={TERMS_OF_USE_ROUTE}>Terms of Use</Link>
                        <Link href={PRIVACY_POLICY_ROUTE}>Privacy Policy</Link>
                    </StyledProjectsFooter>
                </>
            )}
        </StyledProjects>
    );
}
