import { StyledProjectsHeader } from './ProjectsHeader.styled';
import {
    AgencySelectionPopup,
    BeforeKickoffPopup,
    BookACallPopup,
    Logo,
    PitchReviewPopupClient,
    ProjectAvailabilityPopup,
    ProjectAvailabilityPopupAgency,
    usePopup,
} from '@breef/shared/ui-components';
import { TipOfTheDay } from './TipOfTheDay/TipOfTheDay';
import { ActionTip } from './actionTip/ActionTip';
import { YourBreefRep } from './yourBreefRep/YourBreefRep';
import { motion } from 'framer-motion';
import {
    containerAnimationSettings,
    getKeyByEnumValue,
} from '@breef/shared/utils';
import { CTAActionButtonType } from '@breef/shared/types';
import { Fragment, RefObject } from 'react';
import {
    emptyImageConfig,
    useActionButtonCtaConfig,
    useActionButtonProjectConfig,
    useMediaContext,
} from '@breef/shared/hooks';
import {
    DashboardAgencyActionStatuses,
    DashboardClientActionStatuses,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
} from '@breef/shared/constants';
import { YourBreefRep as ClientYourBreefRep } from '../client/yourBreefRep/YourBreefRep';
import { ActionTip as ClientActionTip } from '../client/actionTip/ActionTip';
import { TitleSection } from '../client/titleSection/TitleSection';
import moment from 'moment';

interface ProjectsHeaderProps {
    userFirstName: string;
    logo?: string;
    helpText: string;
    logoUrl: string | null;
    leadFirstName: string;
    leadLastName: string;
    calendlyLink: string;
    ctaData: CTAActionButtonType;
    projectsViewSettingsBarRef: RefObject<HTMLDivElement>;
    role: 'client' | 'agency';
    isDisabledPayments?: boolean;
}

export function ProjectsHeader({
    userFirstName,
    logo,
    helpText,
    logoUrl,
    leadFirstName,
    leadLastName,
    calendlyLink,
    ctaData,
    projectsViewSettingsBarRef,
    role,
    isDisabledPayments,
}: ProjectsHeaderProps) {
    const { isTablet } = useMediaContext();
    const bookACallPopupControl = usePopup();
    const agencySelectionPopupControl = usePopup();
    const beforeKickoffPopupControl = usePopup();
    const projectAvailabilityPopup = usePopup();
    const pitchesReviewPopup = usePopup();
    const { clientActionButtonCtaStatuses, agencyActionButtonCtaStatuses } =
        useActionButtonCtaConfig({
            brandLead: {
                firstName: leadFirstName,
                lastName: leadLastName,
            },
            projectsViewSettingsBarRef: projectsViewSettingsBarRef,
            projectsCount: ctaData.meta?.projectsCount,
            toggleBookACallPopup: bookACallPopupControl.open,
        });
    const {
        clientProjectActionButtonStatuses,
        agencyProjectActionButtonStatuses,
    } = useActionButtonProjectConfig({
        toggleAgencySelectionPopup: agencySelectionPopupControl.open,
        toggleBeforeKickoffPopup: beforeKickoffPopupControl.open,
        toggleProjectAvailabilityPopup: projectAvailabilityPopup.open,
        togglePitchesReviewPopup: pitchesReviewPopup.open,
        firstName: userFirstName,
        projectName: ctaData.meta?.projectName,
        calendlyLink,
        isTablet,
        isDisabledPayments,
    });

    const isClient = role === 'client';

    const actionTipConfig = isClient
        ? clientActionButtonCtaStatuses[
              getKeyByEnumValue(
                  DashboardClientActionStatuses,
                  ctaData.actionValue as DashboardClientActionStatuses,
              )
          ] ||
          clientProjectActionButtonStatuses[
              getKeyByEnumValue(
                  ProjectClientActionStatuses,
                  ctaData.actionValue as ProjectClientActionStatuses,
              ) ??
                  getKeyByEnumValue(
                      ProjectClientActionStatuses,
                      ProjectClientActionStatuses.other,
                  )
          ]
        : agencyActionButtonCtaStatuses[
              getKeyByEnumValue(
                  DashboardAgencyActionStatuses,
                  ctaData.actionValue as DashboardAgencyActionStatuses,
              )
          ] ||
          agencyProjectActionButtonStatuses[
              getKeyByEnumValue(
                  ProjectAgencyActionStatuses,
                  ctaData.actionValue as ProjectAgencyActionStatuses,
              )
          ];

    const renderClientComponents = () => {
        const currentDate = moment().format('dddd, MMMM D');
        const handleClick = () => {
            if (actionTipConfig?.onClick) {
                actionTipConfig.onClick(ctaData.meta || {});
            }
            return null;
        };

        return (
            <Fragment>
                <TitleSection name={userFirstName} date={currentDate} />
                <motion.div
                    className="action-bar-section"
                    {...containerAnimationSettings}
                >
                    <ClientActionTip
                        title={actionTipConfig?.description ?? ''}
                        description={actionTipConfig?.descriptionSubtext ?? ''}
                        tag={actionTipConfig?.tag ?? ''}
                        btnTitle={actionTipConfig?.text || ''}
                        onClick={handleClick}
                        isAccessDenied={actionTipConfig?.isAccessDenied}
                    />
                    <ClientYourBreefRep
                        userFirstName={userFirstName}
                        helpText={actionTipConfig?.brandLeadText ?? ''}
                        logoUrl={logoUrl}
                        leadFirstName={leadFirstName}
                        leadLastName={leadLastName}
                        calendlyLink={calendlyLink}
                        role={role}
                    />
                </motion.div>
            </Fragment>
        );
    };

    return (
        <StyledProjectsHeader isClient={isClient}>
            {pitchesReviewPopup.isOpen && (
                <PitchReviewPopupClient
                    projectId={ctaData.meta?.projectId ?? 0}
                    close={pitchesReviewPopup.close}
                />
            )}
            {projectAvailabilityPopup.isOpen && role === 'client' ? (
                <ProjectAvailabilityPopup
                    close={projectAvailabilityPopup.close}
                    projectId={ctaData.meta?.projectId ?? 0}
                />
            ) : null}
            {projectAvailabilityPopup.isOpen && role === 'agency' ? (
                <ProjectAvailabilityPopupAgency
                    close={projectAvailabilityPopup.close}
                    projectId={ctaData.meta?.projectId ?? 0}
                />
            ) : null}
            {bookACallPopupControl.isOpen && (
                <BookACallPopup close={bookACallPopupControl.close} />
            )}
            {agencySelectionPopupControl.isOpen && (
                <AgencySelectionPopup
                    projectId={ctaData.meta?.projectId || 0}
                    close={agencySelectionPopupControl.close}
                />
            )}
            {beforeKickoffPopupControl.isOpen && (
                <BeforeKickoffPopup
                    projectId={ctaData.meta?.projectId || 0}
                    userType={role}
                    close={beforeKickoffPopupControl.close}
                />
            )}
            {isClient ? (
                renderClientComponents()
            ) : (
                <Fragment>
                    <div className="title-section">
                        <h1>{`HEY ${userFirstName}, \nWELCOME!`}</h1>
                        {logo && <Logo logo={logo} />}
                    </div>
                    <motion.div
                        className="action-bar-section"
                        {...containerAnimationSettings}
                    >
                        <ActionTip
                            title={actionTipConfig?.description || ''}
                            imageConfig={
                                actionTipConfig?.imageConfig || emptyImageConfig
                            }
                            btnTitle={actionTipConfig?.text || ''}
                            onClick={
                                actionTipConfig?.onClick
                                    ? () =>
                                          actionTipConfig.onClick &&
                                          actionTipConfig.onClick(
                                              ctaData.meta || {},
                                          )
                                    : undefined
                            }
                        />
                        <YourBreefRep
                            userFirstName={userFirstName}
                            helpText={helpText}
                            logoUrl={logoUrl}
                            leadFirstName={leadFirstName}
                            leadLastName={leadLastName}
                            calendlyLink={calendlyLink}
                            role={role}
                        />
                        <TipOfTheDay userType={role} />
                    </motion.div>
                </Fragment>
            )}
        </StyledProjectsHeader>
    );
}
