import {
    CLIENT_PITCHES_MAKE_INTRO_ROUTER,
    ReviewDecisionNames,
    DASHBOARD_PITCHES_ROUTE,
} from '@breef/shared/constants';
import {
    useLazyGetAgencyPitchQuery,
    useUpdateReviewDecisionMutation,
} from '@breef/shared/data-access-project';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { BrandLeadShort, PitchData } from '@breef/shared/types';
import {
    AgenciesItem,
    NavigationFooter,
    NavigationList,
    ReviewPitch,
    SideBar,
    SwipeWrapper,
} from '@breef/shared/ui-components';
import { BoxInfoSkeleton, Button, ReviewPitchSkeleton } from '@breef/ui-kit';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDashboardActions } from '../../../../store/hooks';
import { ActionsButtons } from './actionsButton/ActionsButtons';
import { BoxInfo } from '@breef/shared/ui-components';
import { StyledReviewPitches } from './ReviewPitches.styled';

type ReviewPitchesProps = {
    projectName: string;
    projectId: number;
    agenciesList: AgenciesItem[];
    clientBrandLead: BrandLeadShort;
    initAgencyId?: number;
};

export const ReviewPitches = ({
    projectName,
    projectId,
    agenciesList,
    initAgencyId,
    clientBrandLead,
}: ReviewPitchesProps) => {
    const { changePage } = useRouteControl();
    const { isMaxMobile } = useMediaContext();

    const isNotUnreviewedAgencies = agenciesList.every(
        agency => agency.reviewDecision !== ReviewDecisionNames.UNREVIEWED,
    );
    const lastAgencyId = agenciesList[agenciesList.length - 1].id;
    const firstAgencyId = Number(initAgencyId) || agenciesList[0].id;

    const [activeId, setActiveId] = useState<number | null>(
        Number(firstAgencyId),
    );

    const initAgencyPitch = agenciesList.find(
        agency => agency.pitch?.id === activeId,
    );
    const [agencyPitch, setAgencyPitch] = useState<PitchData | null>(
        initAgencyPitch?.pitch || null,
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const currentPosition = agenciesList.findIndex(
        agency => agency.id === activeId,
    );
    const prevAgency = agenciesList[currentPosition - 1];
    const nextAgency = agenciesList[currentPosition + 1];

    const currentTypeDecision = agenciesList.find(
        agency => agency.id === activeId,
    )?.reviewDecision;

    const [
        getAgencyPitch,
        { isSuccess: isSuccessPitch, isError: isErrorPitch },
    ] = useLazyGetAgencyPitchQuery();

    const [updateDecision, { isLoading: isSubmittedDecision }] =
        useUpdateReviewDecisionMutation();

    const { updateDecisionReviewPitches } = useDashboardActions();

    // animation
    const [[page, direction], setPage] = useState([0, 0]);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const fetchPitch = async (id: number) => {
        try {
            const result = await getAgencyPitch({ projectId, pitchId: id });
            if (result.data?.reviewDecision !== ReviewDecisionNames.UNREVIEWED)
                return;
            await handleUpdateDecision(ReviewDecisionNames.VIEWED);
        } catch (error) {
            toast.error('A data retrieval error has occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    // TODO: refactor this useEffect and the logic of displaying the block with detailed pitch information,
    // it's hard to understand and at expansion (manipulating a variable activeId) can lead to cyclic dependency
    useEffect(() => {
        if (!activeId) return;

        setIsLoading(true);
        const pitch = agenciesList.find(
            agency => agency.pitch?.id === activeId,
        );

        if (!pitch) {
            fetchPitch(activeId);
            return;
        }

        setAgencyPitch(initAgencyPitch?.pitch || null);
        setIsLoading(false);
    }, [activeId, initAgencyPitch]);

    useEffect(() => {
        if (!isErrorPitch) return;
        toast.error('A data retrieval error has occurred.');
    }, [isErrorPitch]);

    const handleUpdateDecision = async (type: ReviewDecisionNames) => {
        if (!activeId) return;
        try {
            await updateDecision({
                id: activeId,
                reviewDecision: type,
            }).unwrap();
            updateDecisionReviewPitches({ id: activeId, decision: type });
        } catch (error) {
            toast.error('There was an error sending data to the server');
        }
    };

    const redirectToPitchTab = () =>
        changePage(DASHBOARD_PITCHES_ROUTE.reverse({ projectId }) as string);

    const redirectToMakeIntro = () =>
        changePage(
            CLIENT_PITCHES_MAKE_INTRO_ROUTER.reverse({ projectId }) || '',
        );

    const handleSelectActiveId = (id: number) => {
        setActiveId(id);

        const newPosition = agenciesList.findIndex(agency => agency.id === id);
        if (newPosition > currentPosition) {
            paginate(1);
        }
        if (newPosition < currentPosition) {
            paginate(-1);
        }
    };

    const handleNext = () => {
        if (activeId === lastAgencyId) {
            redirectToMakeIntro();
        } else {
            setActiveId(nextAgency.id);
        }
        paginate(1);
    };

    const handlePrev = () => {
        if (isMaxMobile && isDisabledPrev) redirectToPitchTab();
        if (isDisabledPrev) return;
        if (!prevAgency) return;
        setActiveId(prevAgency.id);
        paginate(-1);
    };

    const isDisabledPrev = activeId === firstAgencyId;
    const isDisabledNext = false;

    const renderMobileAgencyPitch = () => {
        return (
            <SwipeWrapper
                className="content"
                id={activeId || null}
                direction={direction}
                swipeRight={handleNext}
                swipeLeft={handlePrev}
            >
                {isLoading && <div className="loader text">Loading...</div>}
                {isSuccessPitch && agencyPitch ? (
                    <ReviewPitch pitchData={agencyPitch} />
                ) : null}
            </SwipeWrapper>
        );
    };

    const renderBoxInfo = () => {
        if (isLoading && !agencyPitch) return <BoxInfoSkeleton />;
        return agenciesList.map(({ logo, name, id }) => {
            return (
                <BoxInfo
                    className={id === activeId ? 'show' : ''}
                    key={`box-info-${id}`}
                    logo={logo ?? ''}
                    name={name ?? ''}
                    adminNote={agencyPitch?.breefTake ?? ''}
                    brandLead={clientBrandLead}
                    label={"WHY THEY'RE A FIT"}
                />
            );
        });
    };

    return (
        <StyledReviewPitches
            isFetching={isLoading}
            hasIntrosBtn={isNotUnreviewedAgencies}
        >
            <div className="layout">
                <SideBar title={projectName}>
                    <div className="group-block">
                        <NavigationList
                            list={agenciesList}
                            label={!isMaxMobile ? 'Agencies to Review' : ''}
                            onSelect={handleSelectActiveId}
                            activeId={activeId || null}
                            isDisabled={isSubmittedDecision}
                        />
                        <Button
                            className="schedule-intros-btn"
                            label={'SCHEDULE INTROS'}
                            size="medium"
                            onClick={redirectToMakeIntro}
                            isDisabled={false}
                        />
                    </div>

                    {!isMaxMobile && renderBoxInfo()}
                </SideBar>

                {isMaxMobile ? (
                    renderMobileAgencyPitch()
                ) : (
                    <div className="content">
                        {isLoading && !agencyPitch ? (
                            <ReviewPitchSkeleton />
                        ) : null}

                        {isSuccessPitch && agencyPitch ? (
                            <ReviewPitch
                                key={`pitch-${activeId}`}
                                className="pitch-details"
                                pitchData={agencyPitch}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            <NavigationFooter
                onClickNext={!isDisabledNext ? handleNext : undefined}
                onClickPrev={!isDisabledPrev ? handlePrev : undefined}
                buttonTitleRight={
                    activeId === lastAgencyId ? 'Schedule intros' : 'Next'
                }
            >
                <ActionsButtons
                    onClick={handleUpdateDecision}
                    isSubmitted={isSubmittedDecision}
                    currentType={currentTypeDecision}
                />
            </NavigationFooter>
        </StyledReviewPitches>
    );
};
