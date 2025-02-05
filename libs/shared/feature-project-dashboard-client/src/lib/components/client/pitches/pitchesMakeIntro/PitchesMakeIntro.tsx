import {
    AgenciesSchedulesList,
    BrandLeadShort,
    ProjectByIdType,
} from '@breef/shared/types';
import {
    ProjectAvailabilityPopup,
    usePopup,
    Checkbox,
    CompanyInfo,
    ReviewProjectCreation,
    ReviewProjectPopup,
    SideBar,
    BoxInfo,
} from '@breef/shared/ui-components';
import React from 'react';

import {
    StyledPitchesMakeIntro,
    StyledPitchesMakeIntroWrapper,
} from './PitchesMakeIntro.styled';
import { useMakeIntro } from '../../../../hooks/useMakeIntro';
import { useRouteControl } from '@breef/shared/hooks';
import {
    CLIENT_PITCHES_REVIEW_ROUTER,
    DASHBOARD_MEET_ROUTE,
} from '@breef/shared/constants';
import { ArrowRightIcon, Button } from '@breef/ui-kit';
import { getProjectData } from '@breef/shared/utils';
import { NavigationFooter } from '@breef/shared/ui-components';

type Props = {
    isUpdateAvailability?: boolean;
    agencies: AgenciesSchedulesList[];
    projectId: number | string;
    projectData: ProjectByIdType;
    companyName: string;
    clientBrandLead: BrandLeadShort;
};

export const PitchesMakeIntro: React.FC<Props> = ({
    isUpdateAvailability,
    agencies,
    projectId,
    projectData,
    companyName,
    clientBrandLead,
}) => {
    const { changePage } = useRouteControl();
    const projectAvailabilityPopup = usePopup();
    const projectPopup = usePopup();

    const availabilityPath = DASHBOARD_MEET_ROUTE.reverse({
        projectId,
    }) as string;

    const {
        selectedIds,
        isCheckedAgency,
        handleSelectAgency,
        handleNext,
        isSubmittingNext,
        isSubmittingSaveExit,
    } = useMakeIntro({
        agencies,
        projectId,
        onSuccess: !isUpdateAvailability
            ? projectAvailabilityPopup.open
            : () => changePage(availabilityPath),
    });
    const isDisabledSubmit = !selectedIds?.length;

    const handleRedirectToPitchReview = () => {
        changePage(
            CLIENT_PITCHES_REVIEW_ROUTER.reverse({
                projectId: String(projectId) || 0,
            }) || '',
        );
    };

    const renderAgencyRow = ({
        id: agencyId,
        pitchId,
        name,
        location,
        logoUrl,
    }: AgenciesSchedulesList) => {
        return (
            <tr key={`pitch-${pitchId}`}>
                <td>
                    <CompanyInfo
                        companyLogoUrl={logoUrl}
                        companyName={name}
                        officeLocation={location}
                        projectId={Number(projectId)}
                        pitchId={pitchId}
                    />
                </td>
                <td>
                    <Checkbox
                        className="pitch-checkbox"
                        checked={isCheckedAgency(agencyId)}
                        onChange={() => handleSelectAgency(agencyId)}
                    />
                </td>
            </tr>
        );
    };

    const adminNote =
        'Confirm the agencies you’d like to meet with on introductory calls. Then share your preferred meeting times. We’ll handle the rest.';

    return (
        <StyledPitchesMakeIntroWrapper>
            {projectAvailabilityPopup.isOpen && (
                <ProjectAvailabilityPopup
                    projectId={Number(projectId)}
                    close={projectAvailabilityPopup.close}
                />
            )}
            <div className="make-intro-content-wrapper">
                <SideBar
                    title={projectData.name}
                    popupControl={projectPopup}
                    popup={
                        <ReviewProjectPopup
                            projectData={getProjectData(projectData)}
                            close={projectPopup.close}
                        />
                    }
                    subtitle="Schedule Agency Intros"
                >
                    <div className="what-next-wrapper">
                        <span className="label">Here’s what’s next</span>
                        {clientBrandLead && (
                            <BoxInfo
                                hideAgency
                                className="show"
                                adminNote={adminNote}
                                brandLead={clientBrandLead}
                                label="Agency Intros"
                            />
                        )}
                    </div>
                </SideBar>
                <StyledPitchesMakeIntro>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>AGENCY</th>
                                    <th>Meet With Agency?</th>
                                </tr>
                            </thead>
                            <tbody>{agencies?.map(renderAgencyRow)}</tbody>
                        </table>
                    </div>
                </StyledPitchesMakeIntro>
            </div>
            <NavigationFooter
                onClickPrev={handleRedirectToPitchReview}
                hideNextButton
                buttonTitleLeft="pitches"
            >
                <Button
                    className="schedule-calls-btn"
                    label="Schedule Calls"
                    onClick={() => handleNext(false)}
                    isDisabled={isDisabledSubmit}
                    size="small"
                    icon={<ArrowRightIcon />}
                    iconPlacement="right"
                    isSubmitted={isSubmittingNext || isSubmittingSaveExit}
                />
            </NavigationFooter>
        </StyledPitchesMakeIntroWrapper>
    );
};
