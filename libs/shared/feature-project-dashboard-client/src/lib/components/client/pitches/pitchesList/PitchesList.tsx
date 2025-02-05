import {
    CLIENT_PITCHES_REVIEW_ROUTER,
    CLIENT_SINGLE_PITCH_ROUTER,
    ProjectStatusesWeight,
    ProjectStatuses,
    PUBLIC_CLIENT_PITCHES_LIST,
    PitchProjectStatusesWeight,
    ReviewDecisionNames,
} from '@breef/shared/constants';
import {
    useGetPitchesSharingQuery,
    useUpdatePitchesSharingMutation,
    useUpdateReviewDecisionMutation,
} from '@breef/shared/data-access-project';
import {
    SharedPopup,
    usePopup,
    PitchReviewPopupClient,
} from '@breef/shared/ui-components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
    useDashboardActions,
    useDashboardSelector,
} from '../../../../store/hooks';
import { emptyPitches } from '../../../config/emptyPitches';
import EmptyPage from '../../../EmptyPage/EmptyPage';
import { StyledPitchesCard, StyledPitchesList } from './PitchesList.styled';
import {
    getHostName,
    getPitchProjectStatusWeight,
    getProjectStatusWeight,
    setStorageData,
} from '@breef/shared/utils';
import { useRouteControl } from '@breef/shared/hooks';
import { LocationSmallIcon } from '@breef/shared/assets';
import {
    AvatarImage,
    Button,
    LinkIcon24,
    OutsideBudgetIcon,
    Pill,
    StarIcon,
    WithinBudgetIcon,
} from '@breef/ui-kit';
import { PitchesList as PitchesListType } from '@breef/shared/types';
import { getNameStatus } from '../../utils/getNameStatus';

export const PitchesList = () => {
    const { queryParams, changePage } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId ?? 0;
    const hostName = getHostName();
    const [submittedCard, setSubmittedCard] = useState<number | null>(null);

    const sharePopup = usePopup();
    const pitchesReviewPopup = usePopup();

    useGetPitchesSharingQuery(projectId);
    const [updateSharingPitches] = useUpdatePitchesSharingMutation();

    const [updateDecision, { isLoading: isSubmittedDecision }] =
        useUpdateReviewDecisionMutation();

    const { updateDecisionPitches } = useDashboardActions();

    const { pitches, projectInfo, pitchesListSharing } = useDashboardSelector(
        state => state.dashboard,
    );

    const pitchesReviewedDecision = pitches?.filter(
        pitch => pitch.reviewDecision !== ReviewDecisionNames.UNREVIEWED,
    );

    const handleRedirectToPitchReview = (pitchId?: number | string) => {
        if (pitchId) setStorageData('local', 'active', String(pitchId));
        changePage(
            CLIENT_PITCHES_REVIEW_ROUTER.reverse({
                projectId: String(projectId) || 0,
            }) || '',
        ).finally(pitchesReviewPopup.close);
    };

    const handleRedirectToPitch = (pitchId?: number | string) => {
        return changePage(
            CLIENT_SINGLE_PITCH_ROUTER.reverse({
                projectId: String(projectId) || 0,
                pitchId: String(pitchId),
            }) || '',
        );
    };

    const redirectToPitch = (pitchId?: number | string) => {
        const isOpenReviewPopup = pitchesReviewedDecision?.length === 0;

        const isRedirectToDetailPitch =
            getProjectStatusWeight(projectInfo?.status as ProjectStatuses) >=
            ProjectStatusesWeight.teamSelected;

        if (isRedirectToDetailPitch) return handleRedirectToPitch(pitchId);
        if (isOpenReviewPopup) return pitchesReviewPopup.open();
        handleRedirectToPitchReview(pitchId);
    };

    const handleSetActiveSharing = async (isPitchesSharing: boolean) => {
        try {
            await updateSharingPitches({
                idProject: Number(projectId),
                isSharing: !isPitchesSharing,
            }).unwrap();
        } catch (error) {
            toast.error('There was an error sending data to the server');
        }
    };

    const pitchesListPublicLink = `${hostName}/public${
        PUBLIC_CLIENT_PITCHES_LIST.reverse({
            token: `${pitchesListSharing?.token}` || 0,
        }) || ''
    }`;

    if (pitches === null) return null;
    if (pitches && !pitches.length) {
        return <EmptyPage {...emptyPitches} image="hourglass" />;
    }

    const handleUpdateDecision = async (isActive: boolean, id: number) => {
        const type = isActive
            ? ReviewDecisionNames.VIEWED
            : ReviewDecisionNames.ACCEPTED;
        setSubmittedCard(id);
        try {
            await updateDecision({
                id,
                reviewDecision: type,
            }).unwrap();
            updateDecisionPitches({ id, decision: type });
        } catch (error) {
            toast.error('There was an error sending data to the server');
        } finally {
            setSubmittedCard(null);
        }
    };

    const renderPitchesCards = (pitch: PitchesListType, index: number) => {
        const { id } = pitch;
        const isDisabledButton = isSubmittedDecision && id === submittedCard;

        const readOnlyBadge =
            getProjectStatusWeight(projectInfo?.status as ProjectStatuses) >=
            ProjectStatusesWeight.teamSelected;

        return (
            <PitchesCards
                isDisabledButton={isDisabledButton}
                readOnlyBadge={readOnlyBadge}
                redirectToPitch={redirectToPitch}
                handleUpdateDecision={handleUpdateDecision}
                pitch={pitch}
                key={id}
            />
        );
    };

    return (
        <StyledPitchesList>
            {sharePopup.isOpen && (
                <SharedPopup
                    title="Share pitches"
                    isActiveShare={pitchesListSharing?.pitchesSharing || false}
                    link={pitchesListPublicLink}
                    setActiveShare={() =>
                        handleSetActiveSharing(
                            pitchesListSharing?.pitchesSharing || false,
                        )
                    }
                    close={sharePopup.close}
                />
            )}
            {pitchesReviewPopup.isOpen && (
                <PitchReviewPopupClient
                    projectId={projectId}
                    close={pitchesReviewPopup.close}
                />
            )}
            <div className="pitch-shared-link">
                <LinkIcon24 />
                <Button
                    label="SHARE PITCHES"
                    size="large"
                    isUppercase
                    onClick={sharePopup.open}
                    variant="ghost"
                    isDisabled={false}
                />
            </div>
            {pitches?.map(renderPitchesCards)}
        </StyledPitchesList>
    );
};

type PitchCardType = {
    id?: number;
    token?: string | null;
    companyName: string;
    companyLogoUrl: string;
    companyLocations: {
        location: string;
    };
    budget: string;
    pitchTags: string[];
    reviewDecision: string;
    scheduleStatus: string | null;
};

interface PitchesCardsProps {
    pitch: PitchCardType;
    redirectToPitch: (param?: number | string) => void;
    isHideBadge?: boolean;
    readOnlyBadge?: boolean;
    isDisabledButton?: boolean;
    handleUpdateDecision?: (isActive: boolean, id: number) => void;
}

export const PitchesCards = ({
    pitch: {
        id,
        token,
        companyName,
        companyLogoUrl,
        companyLocations,
        budget,
        pitchTags,
        reviewDecision,
        scheduleStatus,
    },
    redirectToPitch,
    isHideBadge,
    readOnlyBadge,
    isDisabledButton,
    handleUpdateDecision,
}: PitchesCardsProps) => {
    const renderBudget = (budget: string) => {
        if (budget === 'in_range') {
            return (
                <div className="budget">
                    <WithinBudgetIcon />
                    <span className="budget-range">Within Budget Range</span>
                </div>
            );
        }
        return (
            <div className="budget">
                <OutsideBudgetIcon />
                <span className="budget-range">OUTSIDE Budget Range</span>
            </div>
        );
    };

    const renderBadgeElement = (reviewDecision: string, id: number) => {
        if (reviewDecision === ReviewDecisionNames.UNREVIEWED) {
            return (
                <div className="badge">
                    <span>NEW!</span>
                </div>
            );
        }

        const isActive = reviewDecision === ReviewDecisionNames.ACCEPTED;

        return (
            <StarIcon
                role="button"
                className={isActive ? 'star-button active' : 'star-button'}
                onClick={() =>
                    !readOnlyBadge
                        ? handleUpdateDecision?.(isActive, id)
                        : undefined
                }
            />
        );
    };

    return (
        <StyledPitchesCard
            readOnlyBadge={readOnlyBadge}
            className="pitch-card"
            key={id}
        >
            {!isHideBadge && id ? renderBadgeElement(reviewDecision, id) : null}
            <div className="company-info">
                <div className="logo-wrapper">
                    <AvatarImage
                        className="logo"
                        src={companyLogoUrl}
                        alt="Company Logo"
                        width={60}
                        height={60}
                    />
                </div>
                <div className="main-info-wrapper">
                    <h3>{companyName}</h3>
                    <span className="company-location">
                        <LocationSmallIcon />
                        {companyLocations.location}
                    </span>
                </div>
            </div>

            {scheduleStatus ? (
                <div className="status">
                    {getNameStatus(scheduleStatus, null)}
                </div>
            ) : (
                renderBudget(budget)
            )}

            <div className="pitch-tags">
                {pitchTags.map((tag, index) => (
                    <Pill key={tag + index} label={tag} isStatic />
                ))}
            </div>

            {token || id ? (
                <Button
                    className="review-pitch-btn"
                    label="Review Pitch"
                    size="medium"
                    onClick={() => redirectToPitch(token || id)}
                    isDisabled={isDisabledButton}
                />
            ) : null}
        </StyledPitchesCard>
    );
};
