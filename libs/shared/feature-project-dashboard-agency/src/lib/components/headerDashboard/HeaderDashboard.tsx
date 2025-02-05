import {
    AccessDeniedButton,
    AgencySelectionPopup,
    BeforeKickoffPopup,
    Button,
    ProjectAvailabilityPopupAgency,
    TabsNavigation,
    usePopup,
} from '@breef/shared/ui-components';
import React, { ReactNode } from 'react';
import { StyledHeaderDashboard } from './HeaderDashboard.styled';
import {
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
} from '@breef/shared/constants';
import {
    useActionButtonProjectConfig,
    useMediaContext,
} from '@breef/shared/hooks';
import { getKeyByEnumValue } from '@breef/shared/utils';
import { AppRoleType } from '@breef/shared/types';
import { usePitchListSelector } from '../../store/hooks';

type HeaderDashboardProps = {
    type?: AppRoleType;
    projectId?: string;
    title?: string;
    isPitchId?: boolean;
    tipConfig?: {
        text: ReactNode;
        descriptionMore?: string;
        onClick?: () => void;
    };
    paymentId?: number | null;
    pitchId?: number;
    kickoffId?: number | null;
    actionValue?: ProjectClientActionStatuses | ProjectAgencyActionStatuses;
    config?: { title: string; tab: string; disabled?: boolean }[];
    calendlyLink?: string;
};

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
    type,
    projectId,
    title,
    pitchId,
    paymentId,
    kickoffId,
    actionValue,
    config,
    calendlyLink,
}) => {
    const { isMobile, isTablet } = useMediaContext();
    const agencySelectionPopupControl = usePopup();
    const beforeKickoffPopupControl = usePopup();
    const projectAvailabilityPopup = usePopup();
    const { isDisabledPayments } = usePitchListSelector(
        state => state.pitchListByClient,
    );

    const {
        clientProjectActionButtonStatuses,
        agencyProjectActionButtonStatuses,
    } = useActionButtonProjectConfig({
        isProjectTabs: true,
        toggleAgencySelectionPopup: agencySelectionPopupControl.open,
        toggleBeforeKickoffPopup: beforeKickoffPopupControl.open,
        toggleProjectAvailabilityPopup: projectAvailabilityPopup.open,
        togglePitchesReviewPopup: () => undefined,
        calendlyLink,
        isTablet,
        isDisabledPayments,
    });

    const actionTipConfig =
        type === 'client'
            ? clientProjectActionButtonStatuses[
                  getKeyByEnumValue(
                      ProjectClientActionStatuses,
                      actionValue as ProjectClientActionStatuses,
                  ) ??
                      getKeyByEnumValue(
                          ProjectClientActionStatuses,
                          ProjectClientActionStatuses.other,
                      )
              ]
            : agencyProjectActionButtonStatuses[
                  getKeyByEnumValue(
                      ProjectAgencyActionStatuses,
                      actionValue as ProjectAgencyActionStatuses,
                  )
              ];

    const onClickActionButton = () => {
        if (actionTipConfig?.onClick)
            return actionTipConfig.onClick({
                projectId: Number(projectId),
                pitchId: pitchId,
                paymentId: paymentId,
                kickoffId: kickoffId,
            });
    };
    const renderCtaDescription = () => {
        if (!actionTipConfig) {
            return null;
        }

        if (actionTipConfig.nextStep) {
            return (
                <p>
                    <b>Next Step: </b>
                    <span className="next-step-content">
                        {actionTipConfig.nextStep}
                    </span>
                </p>
            );
        }
        return <p>{actionTipConfig.descriptionMore}</p>;
    };

    const renderButton = () => {
        if (actionTipConfig?.isAccessDenied) {
            return (
                <AccessDeniedButton
                    message="
            Payment functionality is not enabled for your type of user. Please reach out to your company owner."
                >
                    <Button
                        type="button"
                        onClick={onClickActionButton}
                        disabled={actionTipConfig?.isAccessDenied}
                        withAnimate
                        isDisabledWithActiveText
                    >
                        {actionTipConfig?.text}
                    </Button>
                </AccessDeniedButton>
            );
        }

        return (
            <Button
                type="button"
                onClick={onClickActionButton}
                disabled={!actionTipConfig?.onClick}
                withAnimate
                isDisabledWithActiveText
            >
                {actionTipConfig?.text}
            </Button>
        );
    };

    return (
        <StyledHeaderDashboard isPublicPage={type === 'public'}>
            {projectAvailabilityPopup.isOpen && (
                <ProjectAvailabilityPopupAgency
                    projectId={Number(projectId)}
                    close={projectAvailabilityPopup.close}
                />
            )}
            {agencySelectionPopupControl.isOpen && (
                <AgencySelectionPopup
                    projectId={Number(projectId) || 0}
                    close={agencySelectionPopupControl.close}
                />
            )}
            {beforeKickoffPopupControl.isOpen && (
                <BeforeKickoffPopup
                    projectId={Number(projectId) || 0}
                    userType={type as 'client'}
                    close={beforeKickoffPopupControl.close}
                />
            )}
            <div className="dashboard-left_block">
                <h1>{title ? title : 'Brand refresh project'}</h1>
                {type !== 'public' && !isMobile && actionTipConfig && (
                    <div className="dashboard-right_block">
                        {renderCtaDescription()}
                        {renderButton()}
                    </div>
                )}
            </div>
            {type !== 'public' && config && <TabsNavigation config={config} />}
        </StyledHeaderDashboard>
    );
};

export default HeaderDashboard;
