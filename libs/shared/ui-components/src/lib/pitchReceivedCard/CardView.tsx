import { ArrowRightIcon } from '@breef/shared/assets';
import {
    PitchProjectStatuses,
    PitchProjectStatusesWeight,
    ProjectStatuses,
    ProjectStatusesWeight,
    ReviewDecisionNames,
} from '@breef/shared/constants';
import React from 'react';
import { StyledCardView } from './PitchReceivedCard.styled';
import {
    getPitchProjectStatusWeight,
    getProjectStatusWeight,
} from '@breef/shared/utils';
import { AppAccessType } from '@breef/shared/types';

type Props = {
    handleClick: (param?: number) => void;
    type?: AppAccessType;
    pitchesCount: number;
    status: PitchProjectStatuses;
    pitchesReviewProjectCount?: number;
    projectStatus: ProjectStatuses;
    reviewDesign: string | null;
    pitchesUnreviewedLength: number;
};

const CardView: React.FC<Props> = ({
    handleClick,
    type,
    pitchesCount,
    projectStatus,
    status,
    reviewDesign,
    pitchesUnreviewedLength,
}) => {
    const getLabelForCard = () => {
        if (type === 'public') {
            return pitchesCount > 1 ? 'View pitches' : 'View pitch';
        } else if (
            (type === 'private' &&
                getPitchProjectStatusWeight(status) >=
                    PitchProjectStatusesWeight.shortlisted) ||
            getProjectStatusWeight(projectStatus) >=
                ProjectStatusesWeight.teamSelected
        ) {
            return 'View pitch';
        } else if (reviewDesign !== ReviewDecisionNames.UNREVIEWED) {
            return 'Review pitch';
        } else if (reviewDesign === ReviewDecisionNames.UNREVIEWED) {
            return pitchesUnreviewedLength > 1
                ? 'Review pitches'
                : 'Review pitch';
        } else {
            return 'View pitch';
        }
    };

    return (
        <StyledCardView
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleClick()}
        >
            <div className="card-view-title">{getLabelForCard()}</div>
            <ArrowRightIcon />
        </StyledCardView>
    );
};
export default CardView;
