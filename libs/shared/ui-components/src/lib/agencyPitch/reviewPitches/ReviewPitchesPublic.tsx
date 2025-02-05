import { useLazyGetPublicSinglePitchQuery } from '@breef/shared/data-access-project';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { AppRoleType, PitchData, SharedProjectType } from '@breef/shared/types';
import { BoxInfoSkeleton, Button, ReviewPitchSkeleton } from '@breef/ui-kit';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BoxInfo } from './boxInfo/BoxInfo';
import { SwipeWrapper } from '../../swipeWrapper/SwipeWrapper';
import ReviewPitch from '../reviewPitch/ReviewPitch';
import { StyledReviewPitchesPublic } from './ReviewPitchesPublic.styled';
import { SideBar } from '../../sideBar/SideBar';
import { NavigationListPublic } from './navigation/NavigationList';
import { NavigationFooter } from './navigation/NavigationFooter';
import { usePopup } from '../../popup/usePopup';
import { PublicPopup } from './publicPopup/PublicPopup';
import { HeaderInfo } from './headerInfo/HeaderInfo';
import { ReviewProjectPopup } from '../../reviewProjectCreation/ReviewProjectPopup';
import { HeaderNav } from './headerNav/HeaderNav';
import {
    getStorageData,
    redirectToApp,
    redirectToAuthApp,
} from '@breef/shared/utils';
import {
    ADMIN_BACKEND_APP_URL,
    AGENCY_FRONT_APP_URL,
    AUTH_FRONT_APP_URL,
    CLIENT_FRONT_APP_URL,
    CLIENT_PITCHES_MAKE_INTRO_ROUTER,
    CompanyRole,
    ProjectStatuses,
} from '@breef/shared/constants';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';

type ReviewPitchesPublicProps = {
    projectData: SharedProjectType;
    agenciesList: {
        token: string;
        name: string;
        logo: string;
    }[];
    companyType?: 'client' | 'agency';
    companyId?: number;
};

export const ReviewPitchesPublic: FC<ReviewPitchesPublicProps> = ({
    projectData,
    agenciesList,
    companyType,
    companyId,
}) => {
    const popupPublic = usePopup();
    const popupReviewScope = usePopup();
    const { isMobile } = useMediaContext();
    const firstAgencyToken = agenciesList[0]?.token;
    const lastAgencyToken = agenciesList[agenciesList.length - 1]?.token;
    const [activeToken, setActiveToken] = useState<string | null>(
        firstAgencyToken,
    );
    const currentPosition = agenciesList.findIndex(
        agency => agency.token === activeToken,
    );
    const [fetchedPitches, setFetchedPitches] = useState<PitchData[]>([]);
    const [activeAgencyPitch, setActiveAgencyPitch] =
        useState<PitchData | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isDisablePrev =
        firstAgencyToken === agenciesList[currentPosition].token;
    const isDisableNext =
        lastAgencyToken === agenciesList[currentPosition].token;

    const brandLeadShortData = {
        name: `${
            projectData.brandLead.firstName
        } ${projectData.brandLead.lastName.charAt(0)}.`,
        logo: projectData.brandLead.brandLead.logoUrl || '',
    };

    const [fetchSinglePitch, { isSuccess: isSuccessPitch }] =
        useLazyGetPublicSinglePitchQuery();

    // animation
    const [[page, direction], setPage] = useState([0, 0]);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const fetchPitch = async (token: string) => {
        setIsLoading(true);
        try {
            const result = await fetchSinglePitch({ token }).unwrap();
            const pitch = { ...result, token };
            setFetchedPitches([...fetchedPitches, pitch]);
            setActiveAgencyPitch(pitch);
        } catch (error) {
            toast.error('A data retrieval error has occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeToken) {
            const cachedPitch = fetchedPitches.find(
                item => item.token === activeToken,
            );
            if (cachedPitch) {
                setActiveAgencyPitch(cachedPitch);
            } else {
                fetchPitch(activeToken);
            }
        }
    }, [activeToken]);

    useEffect(() => {
        popupPublic.open();
    }, []);
    useEffect(() => {
        if (popupReviewScope.isOpen) {
            popupPublic.close();
        }
    }, [popupReviewScope.isOpen]);

    const handleSelectActive = (token: string) => {
        setActiveToken(token);
        const newPosition = agenciesList.findIndex(
            agency => agency.token === token,
        );
        if (newPosition > currentPosition) {
            paginate(1);
        }
        if (newPosition < currentPosition) {
            paginate(-1);
        }
    };

    const handleNext = () => {
        setActiveToken(agenciesList[currentPosition + 1].token);
        paginate(1);
    };

    const handlePrev = () => {
        setActiveToken(agenciesList[currentPosition - 1].token);
        paginate(-1);
    };

    const handleClickCTA = () => {
        const makeIntroPath =
            CLIENT_PITCHES_MAKE_INTRO_ROUTER.reverse({
                projectId: projectData.id,
            }) || '';
        if (companyType === 'client') {
            const isRelatedToProject = companyId === projectData.companyId;
            const redirectPath = isRelatedToProject ? makeIntroPath : '';
            redirectToApp(`${CLIENT_FRONT_APP_URL}${redirectPath}`);
            return;
        }
        if (companyType === 'agency') {
            redirectToApp(AGENCY_FRONT_APP_URL);
            return;
        }
        redirectToAuthApp(makeIntroPath);
    };

    const renderMobileAgencyPitch = () => {
        return (
            <SwipeWrapper
                className="content"
                id={activeToken}
                direction={direction}
                swipeRight={handleNext}
                swipeLeft={handlePrev}
            >
                {isLoading && <div className="loader text">Loading...</div>}
                {isSuccessPitch && activeAgencyPitch ? (
                    <ReviewPitch pitchData={activeAgencyPitch} />
                ) : null}
            </SwipeWrapper>
        );
    };

    const renderBoxInfo = () => {
        if (isLoading && !activeAgencyPitch) return <BoxInfoSkeleton />;
        return agenciesList.map(({ logo, name, token }) => {
            return (
                <BoxInfo
                    className={token === activeToken ? 'show' : ''}
                    key={`box-info-${token}`}
                    logo={logo ?? ''}
                    name={name ?? ''}
                    adminNote={activeAgencyPitch?.breefTake ?? ''}
                    brandLead={brandLeadShortData}
                    label="Your Brand Lead"
                />
            );
        });
    };

    const isDisplayCta =
        projectData.status === ProjectStatuses.pitchesShared ||
        projectData.status === ProjectStatuses.shortlisted ||
        projectData.status === ProjectStatuses.teamIntroductions;

    const renderCTA = () =>
        isDisplayCta && (
            <Button
                className="schedule-intros-btn"
                label="Shortlist Agencies"
                size="medium"
                onClick={handleClickCTA}
                isDisabled={false}
            />
        );

    const renderProject = () => (
        <ReviewProjectPopup
            projectData={projectData}
            close={popupReviewScope.close}
        />
    );

    return (
        <StyledReviewPitchesPublic isFetching={isLoading} hasIntrosBtn>
            {!isMobile ? (
                <HeaderInfo
                    title="Agency Pitch Review"
                    popup={renderProject()}
                    popupControl={popupReviewScope}
                />
            ) : (
                <HeaderNav />
            )}
            {popupPublic.isOpen && (
                <PublicPopup
                    lead={projectData.brandLead}
                    onClick={popupPublic.close}
                />
            )}
            <div className="layout">
                <SideBar title={projectData.name}>
                    <div className="group-block">
                        <NavigationListPublic
                            list={agenciesList}
                            label="Agencies to Review"
                            onSelect={handleSelectActive}
                            activeToken={activeToken}
                            isScalingOnMobile={false}
                        />
                        {!isMobile && renderCTA()}
                    </div>

                    {!isMobile && renderBoxInfo()}
                </SideBar>

                {isMobile ? (
                    renderMobileAgencyPitch()
                ) : (
                    <div className="content">
                        {isLoading && !activeAgencyPitch ? (
                            <ReviewPitchSkeleton />
                        ) : null}

                        {isSuccessPitch && activeAgencyPitch ? (
                            <ReviewPitch
                                key={`pitch-${activeToken}`}
                                className="pitch-details"
                                pitchData={activeAgencyPitch}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            <NavigationFooter
                onClickNext={!isDisableNext ? handleNext : undefined}
                onClickPrev={!isDisablePrev ? handlePrev : undefined}
            >
                {isMobile ? renderCTA() : <span />}
            </NavigationFooter>
        </StyledReviewPitchesPublic>
    );
};
