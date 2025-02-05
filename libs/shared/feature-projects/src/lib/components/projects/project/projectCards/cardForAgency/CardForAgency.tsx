import React, { ReactNode, SyntheticEvent } from 'react';

import {
    Choice,
    Filters,
    PitchProjectStatuses,
    PitchProjectStatusesWeight,
    PitchProjectTagsValues,
} from '@breef/shared/constants';
import { Button } from '@breef/shared/ui-components';
import { StyledCard } from '../../Project.styled';
import { useRenderAgencyProjectCard } from '../../../../../hooks/useRenderAgencyProjectCard';
import { GetAgencyProjectType } from '@breef/shared/types';
import { getPitchProjectStatusWeight } from '@breef/shared/utils';

type Props = {
    actionButtonClick: (e: SyntheticEvent) => void;
    handleClickCard: () => void;
    status: PitchProjectStatuses;
    buttonTitle: ReactNode;
    filterProjects: Filters;
    name: string;
    clientName: string;
    clientLogoUrl: string;
    isDisabledButton: boolean;
    tag: PitchProjectTagsValues;
    submissionDeadline: string;
    paymentTotalAmount?: GetAgencyProjectType['paymentTotalAmount'];
    budget: Choice;
    pitchStatus?: string | null;
    hoursToSubmissionDeadline: number;
};

const CardForAgency: React.FC<Props> = ({
    actionButtonClick,
    handleClickCard,
    status,
    buttonTitle,
    filterProjects,
    name,
    clientName,
    clientLogoUrl,
    isDisabledButton,
    tag,
    submissionDeadline,
    paymentTotalAmount,
    budget,
    pitchStatus = null,
    hoursToSubmissionDeadline,
}) => {
    const { renderProjectCardInfo, renderLabel } = useRenderAgencyProjectCard({
        budget: budget,
        clientName: clientName,
        submissionDeadline: submissionDeadline,
        filterProjects: filterProjects,
        logo: clientLogoUrl,
        ongoingBudget: paymentTotalAmount?.ongoingPaymentAmount || '',
        paidBudget: paymentTotalAmount?.oneTimePaymentsPaidAmount || '',
        totalBudget: paymentTotalAmount?.oneTimePaymentsTotalAmount || '',
        tag: tag,
        hoursToSubmissionDeadline: hoursToSubmissionDeadline,
    });

    const getIsHoveredCard = () => {
        if (
            (filterProjects === Filters.archived &&
                (pitchStatus === 'drafted' || !pitchStatus)) ||
            getPitchProjectStatusWeight(status) <
                PitchProjectStatusesWeight.pitchSubmitted
        ) {
            return false;
        }
        return true;
    };

    return (
        <StyledCard isArchivedCard={false} isHoverCard={getIsHoveredCard()}>
            <div className="project-card" onClick={handleClickCard}>
                {renderProjectCardInfo()}
                <div className="project-card-detail">
                    <p className="project-card-detail-name">{name}</p>

                    {(tag !== PitchProjectTagsValues.noTag ||
                        filterProjects === Filters.archived) &&
                        renderLabel()}
                </div>
            </div>
            {filterProjects !== Filters.archived && (
                <div className="project-footer">
                    <Button
                        type="button"
                        onClick={actionButtonClick}
                        subtitle="Next step:"
                        className="normal"
                        arrowRight
                        color="primary"
                        disabled={isDisabledButton}
                        isDisabledWithActiveText
                        withAnimate
                    >
                        {buttonTitle}
                    </Button>
                </div>
            )}
        </StyledCard>
    );
};
export default CardForAgency;
