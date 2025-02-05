import { useEffect } from 'react';
import {
    IsInterestedProject,
    ProjectAgencyActionStatuses,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { Mode } from '../components/pitchCreate/PitchCreate';
import { useRouteControl } from '@breef/shared/hooks';
import { usePitchPreviewSelector } from '../store/hooks';

interface useCheckIsAvailableFlowProps {
    mode: Mode;
}
export const useCheckIsAvailableFlow = ({
    mode,
}: useCheckIsAvailableFlowProps) => {
    const { changePage } = useRouteControl();
    const { pitchPreview } = usePitchPreviewSelector(
        state => state,
    ).pitchPreview;

    useEffect(() => {
        const isRedirectFromCreateFlow =
            mode === 'create' && pitchPreview.isPitchSubmitted;
        const isRedirectFromEditFlow =
            mode === 'edit' &&
            pitchPreview.actionValue !==
                ProjectAgencyActionStatuses.finalizeAndSubmit;
        const isInterestedProject =
            pitchPreview.isInterested !== IsInterestedProject.NotInterested;
        if (
            isRedirectFromCreateFlow ||
            isRedirectFromEditFlow ||
            !isInterestedProject
        ) {
            changePage(PROJECTS_ROUTE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
