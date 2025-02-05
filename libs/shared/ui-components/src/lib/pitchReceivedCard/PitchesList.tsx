import { GlobeIcon } from '@breef/shared/assets';
import { PitchProjectStatuses, ProjectStatuses } from '@breef/shared/constants';
import { formatShortBudgetCost } from '@breef/shared/utils';
import React from 'react';
import LinkButton from '../button/linkButton/LinkButton';
import HeaderReview from '../headerReview/HeaderReview';
import PitchReceivedCard from './PitchReceivedCard';
import { StyledPitchCards } from './PitchReceivedCard.styled';
import { AppAccessType } from '@breef/shared/types';

type Props = {
    handleOpenSharedPopup?: () => void;
    emptyListToFillPitches: string[];
    pitches:
        | {
              id?: number | null;
              budget?: string;
              companyLogoUrl: string | '';
              companyName: string | '';
              companyLocations: { location: string };
              status?: string | null;
              token?: string | null;
              reviewDecision?: string | null;
              pitchTags?: string[];
          }[]
        | [];
    rowsCount: number;
    redirectToPitch?: (param?: number | string) => void;
    type?: AppAccessType;
    averageBudget?: number | null;
    isShowVerticalArrow?: boolean;
    projectStatus?: ProjectStatuses;
    isMobile?: boolean;
    pitchesUnreviewedLength?: number;
    isHideHoverCard?: boolean;
};

const PitchesList: React.FC<Props> = ({
    handleOpenSharedPopup,
    emptyListToFillPitches,
    pitches,
    rowsCount,
    redirectToPitch,
    type,
    averageBudget,
    isShowVerticalArrow = false,
    projectStatus = ProjectStatuses.draft,
    isMobile = false,
    pitchesUnreviewedLength = 0,
    isHideHoverCard = false,
}) => {
    return (
        <StyledPitchCards
            className="pitches-list"
            isPadding={type === 'public'}
        >
            <HeaderReview title="Pitches received">
                {type !== 'public' && !isMobile && (
                    <div className="share">
                        <GlobeIcon />
                        <LinkButton
                            name="Share"
                            className="button-share"
                            onClick={
                                handleOpenSharedPopup
                                    ? handleOpenSharedPopup
                                    : () => null
                            }
                        />
                    </div>
                )}
                {averageBudget && !isMobile && (
                    <div className="average-budget">
                        Average Budget:{' '}
                        {formatShortBudgetCost(averageBudget || 0)}
                    </div>
                )}
            </HeaderReview>
            <div className="pitchReceived">
                {emptyListToFillPitches.map((_, i) => {
                    const param =
                        pitches[i] && pitches[i].token
                            ? pitches[i].token
                            : null;

                    return (
                        <PitchReceivedCard
                            key={`pitchReceivedCard-${i}`}
                            companyLocation={
                                pitches[i]
                                    ? pitches[i].companyLocations?.location
                                    : ''
                            }
                            companyName={
                                pitches[i] ? pitches[i].companyName : ''
                            }
                            logo={pitches[i] ? pitches[i].companyLogoUrl : ''}
                            rowCount={rowsCount}
                            param={param}
                            handleClick={redirectToPitch}
                            isShowVerticalArrow={isShowVerticalArrow}
                            type={type}
                            pitchesCount={pitches.length}
                            status={pitches[i]?.status as PitchProjectStatuses}
                            id={pitches[i]?.id || ''}
                            projectStatus={projectStatus}
                            isMobile={isMobile}
                            reviewDesign={pitches[i]?.reviewDecision || null}
                            pitchesUnreviewedLength={pitchesUnreviewedLength}
                            isHideHoverCard={isHideHoverCard}
                        />
                    );
                })}
            </div>
            {type !== 'public' && isMobile && (
                <div className="share share-footer">
                    <GlobeIcon />
                    <LinkButton
                        name="Share"
                        className="button-share"
                        onClick={
                            handleOpenSharedPopup
                                ? handleOpenSharedPopup
                                : () => null
                        }
                    />
                </div>
            )}
        </StyledPitchCards>
    );
};
export default PitchesList;
