import { useCallback, useState } from 'react';
import { IsInterestedProject, PROJECTS_ROUTE } from '@breef/shared/constants';
import { toast } from 'react-toastify';
import { useRouteControl } from '@breef/shared/hooks';
import { useUpdateIsInterestedProjectMutation } from '@breef/shared/data-access-pitch-create';
import { usePitchPreviewSelector } from '../store/hooks';
import { PassReasonsListType } from '@breef/shared/types';

export const usePreviewControl = () => {
    const { changePage } = useRouteControl();
    const [changeIsInterested, { isLoading: isSubmitted }] =
        useUpdateIsInterestedProjectMutation();
    const { pitchPreview } = usePitchPreviewSelector(
        state => state,
    ).pitchPreview;
    const [isFinishedPreview, setIsFinishedPreview] = useState(
        pitchPreview.isInterested === IsInterestedProject.Interested,
    );

    const handleChoiceOfInterest = useCallback(
        (
            isInterested: IsInterestedProject,
            passReasons?: PassReasonsListType[],
        ) => {
            changeIsInterested({
                projectAgencyId: pitchPreview.projectAgencyId,
                isInterested: isInterested,
                passReasons: passReasons,
            })
                .unwrap()
                .then(() => {
                    if (isInterested === IsInterestedProject.NotInterested) {
                        changePage(PROJECTS_ROUTE);
                    } else {
                        setIsFinishedPreview(true);
                    }
                })
                .catch(() => {
                    const message = 'Something went wrong. Please try again!';
                    toast(message, { toastId: message });
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pitchPreview.projectAgencyId],
    );

    return {
        handleChoiceOfInterest,
        isFinishedPreview,
        isSubmittedInterest: isSubmitted,
    };
};
