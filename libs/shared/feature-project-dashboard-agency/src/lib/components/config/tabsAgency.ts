import {
    PitchProjectStatuses,
    PitchProjectStatusesWeight,
} from '@breef/shared/constants';
import { getPitchProjectStatusWeight } from '@breef/shared/utils';

export const tabsAgency = ({
    isAcceptedTerms,
    inboxCount = 0,
    pitchProjectStatus = PitchProjectStatuses.reviewProject,
    isArchived,
}: {
    isAcceptedTerms?: boolean;
    inboxCount?: number;
    pitchProjectStatus?: PitchProjectStatuses;
    isArchived?: boolean;
}) => {
    const pitchProjectStatusWeight =
        getPitchProjectStatusWeight(pitchProjectStatus);
    const isExistPitchProjectStatus = pitchProjectStatusWeight !== undefined;

    return [
        {
            title: 'Project Scope',
            tab: 'project-scope',
            disabled:
                !isExistPitchProjectStatus ||
                pitchProjectStatusWeight <
                    PitchProjectStatusesWeight.pitchSubmitted ||
                !isAcceptedTerms,
        },
        {
            title: 'My Pitch',
            tab: 'my-pitch',
            disabled:
                !isExistPitchProjectStatus ||
                pitchProjectStatusWeight <
                    PitchProjectStatusesWeight.pitchSubmitted ||
                !isAcceptedTerms,
        },
        {
            title: 'Payments',
            tab: 'payments',
            disabled:
                !isExistPitchProjectStatus ||
                pitchProjectStatusWeight < PitchProjectStatusesWeight.kickoff ||
                isArchived ||
                !isAcceptedTerms,
        },
    ];
};
