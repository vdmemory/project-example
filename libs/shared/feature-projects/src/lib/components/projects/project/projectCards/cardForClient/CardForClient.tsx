import React, { ReactNode, SyntheticEvent, useEffect } from 'react';
import { Filters, ProjectStatuses } from '@breef/shared/constants';
import { StyledCardForClient } from './CardForClient.styled';
import { ArrowRightIcon, Button, colors, Progress } from '@breef/ui-kit';
import { Tag } from '../../../client/tag/Tag';
import { ProgressItem } from '@breef/shared/types';
import { AccessDeniedButton } from '@breef/shared/ui-components';

type Props = {
    handleClickCard: () => void;
    actionButtonClick: (e: SyntheticEvent) => void;
    status: ProjectStatuses;
    name: string;
    buttonTitle: ReactNode;
    isDisabledButton: boolean;
    tag?: string;
    filterProjects: Filters;
    nextStep?: string;
    progress?: ProgressItem[];
    isAccessDenied?: boolean;
};

const CardForClient: React.FC<Props> = ({
    handleClickCard,
    status,
    name,
    actionButtonClick,
    buttonTitle,
    isDisabledButton,
    tag,
    filterProjects,
    nextStep,
    progress,
    isAccessDenied,
}) => {
    const getIsHoveredCard = () => {
        switch (status) {
            case ProjectStatuses.archived:
                return false;
            default:
                return true;
        }
    };

    const renderProgress = () => {
        return (
            <Progress
                className="project-card-progress"
                items={progress ?? []}
            />
        );
    };

    const isArchivedCard = filterProjects === Filters.archived;

    return (
        <StyledCardForClient
            className="card-client"
            isHoverCard={getIsHoveredCard()}
            isArchivedCard={isArchivedCard}
        >
            <div className="project-card" onClick={handleClickCard}>
                <div className="project-card-info">
                    <div className="group-detail-name">
                        <p className="project-card-detail-name">{name}</p>
                        {tag && <Tag value={tag} />}
                    </div>
                    {!isArchivedCard && renderProgress()}
                </div>

                <div className="project-card-detail">
                    {nextStep && (
                        <div className="project-card-next-step">
                            <b>Next Step: </b>
                            <span>{nextStep.toLowerCase()}</span>
                        </div>
                    )}
                    {!isArchivedCard && !isAccessDenied && (
                        <Button
                            isDisabled={isDisabledButton}
                            icon={<ArrowRightIcon />}
                            variant="outlined"
                            label={buttonTitle}
                            onClick={actionButtonClick}
                            iconPlacement="right"
                        />
                    )}
                    {isAccessDenied && (
                        <AccessDeniedButton
                            message="
                        Payment functionality is not enabled for your type of user. Please reach out to your company owner."
                        >
                            <Button
                                isDisabled={isAccessDenied}
                                icon={<ArrowRightIcon />}
                                variant="outlined"
                                label={buttonTitle}
                                onClick={actionButtonClick}
                                iconPlacement="right"
                            />
                        </AccessDeniedButton>
                    )}
                </div>
            </div>
        </StyledCardForClient>
    );
};
export default CardForClient;
