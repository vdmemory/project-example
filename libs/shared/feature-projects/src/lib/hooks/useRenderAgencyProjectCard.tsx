import {
    Choice,
    Filters,
    PitchProjectTagsValues,
} from '@breef/shared/constants';
import { shotBudgetToLongBudget } from '@breef/shared/utils';
import moment from 'moment';
import React from 'react';
import { ColoredTag } from '@breef/shared/ui-components';
import { AvatarImage } from '@breef/ui-kit';

export const useRenderAgencyProjectCard = ({
    filterProjects,
    logo,
    clientName,
    budget,
    totalBudget,
    paidBudget,
    ongoingBudget,
    submissionDeadline,
    tag,
    hoursToSubmissionDeadline,
}: {
    filterProjects: Filters;
    clientName: string;
    logo: string;
    budget: Choice;
    paidBudget: string;
    totalBudget: string;
    ongoingBudget: string;
    submissionDeadline: string;
    tag: string;
    hoursToSubmissionDeadline: number;
}) => {
    const renderProjectCardInfo = () => {
        switch (filterProjects) {
            case Filters.submitted:
                return (
                    <div className="project-card-info">
                        <p className="project-card-info-client">
                            {logo && (
                                <AvatarImage
                                    className="logo"
                                    src={logo}
                                    alt="Logo"
                                    width={39}
                                    height={39}
                                />
                            )}
                            <span>{clientName}</span>
                        </p>
                    </div>
                );
            case Filters.in_progress:
                return (
                    <div className="project-card-info">
                        <p className="project-card-info-client">
                            {logo && (
                                <AvatarImage
                                    className="logo"
                                    src={logo}
                                    alt="Logo"
                                    width={39}
                                    height={39}
                                />
                            )}
                            <span>{clientName}</span>
                        </p>

                        <p className="project-card-info-budget">
                            {!!+paidBudget && (
                                <span className="project-card-info-budget-paid">
                                    {shotBudgetToLongBudget({
                                        value: paidBudget as string,
                                    })}
                                </span>
                            )}
                            {!!+totalBudget && (
                                <span className="project-card-info-budget-total">
                                    {!!+paidBudget && ' / '}
                                    {shotBudgetToLongBudget({
                                        value: totalBudget as string,
                                    })}
                                </span>
                            )}
                            {!!+ongoingBudget && (
                                <span className="project-card-info-budget-ongoing">
                                    {(!!+totalBudget || !!+paidBudget) && ' + '}
                                    {shotBudgetToLongBudget({
                                        value: ongoingBudget as string,
                                    })}
                                    &nbsp; ongoing
                                </span>
                            )}
                        </p>
                    </div>
                );
            case Filters.archived:
                return (
                    <div className="project-card-info">
                        <p className="project-card-info-client">
                            {logo && (
                                <AvatarImage
                                    className="logo"
                                    src={logo}
                                    alt="Logo"
                                    width={39}
                                    height={39}
                                />
                            )}
                            {clientName}
                        </p>
                    </div>
                );
            default:
                return (
                    <div className="project-card-info">
                        <p className="project-card-info-created">
                            Submission deadline:{' '}
                            {submissionDeadline
                                ? moment
                                      .parseZone(submissionDeadline)
                                      .format('M/DD')
                                : '-'}
                        </p>
                        {budget && (
                            <p className="project-card-info-budget">
                                {shotBudgetToLongBudget({
                                    value: Choice[budget] as string,
                                })}
                            </p>
                        )}
                    </div>
                );
        }
    };

    const getLabelForDueDate = () => {
        if (!hoursToSubmissionDeadline) {
            return 'DUE IN LESS THAN 1 HOUR';
        } else if (hoursToSubmissionDeadline < 2) {
            return `Due in ${hoursToSubmissionDeadline}  hour`;
        }
        return `Due in ${hoursToSubmissionDeadline} hours`;
    };

    const renderLabel = () => {
        switch (filterProjects) {
            case Filters.submitted:
            case Filters.in_progress:
                return (
                    <ColoredTag
                        tag={tag}
                        color="purple-black"
                        className="project-card-detail-label"
                    />
                );

            case Filters.archived:
                return (
                    <ColoredTag
                        tag="Archived"
                        className="project-card-detail-label project-card-detail-label-archived"
                    />
                );
            default:
                return tag === PitchProjectTagsValues.newInvitation ? (
                    <ColoredTag
                        tag={tag}
                        color="green"
                        className="project-card-detail-label"
                    />
                ) : (
                    <ColoredTag
                        tag={
                            tag === PitchProjectTagsValues.dueToday
                                ? getLabelForDueDate()
                                : tag
                        }
                        color="orange"
                        className="project-card-detail-label"
                    />
                );
        }
    };

    return {
        renderProjectCardInfo,
        renderLabel,
    };
};
