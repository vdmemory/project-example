import { useLazyGetSharedProjectQuery } from '@breef/shared/data-access-project';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    AnimationOpacity,
    PageLoader,
    PublicStartProjectPopup,
    ReviewProjectCreation,
    TabChevron,
    usePopup,
} from '@breef/shared/ui-components';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { Button, colors } from '@breef/ui-kit';
import Link from 'next/link';
import {
    ADMIN_BACKEND_APP_URL,
    ProjectCreationStepsEnum,
    ProjectStatuses,
    ProjectStep,
    PROJECTS_ROUTE,
    PROJECT_EDIT_ROUTE,
    PROJECT_POST_ROUTE,
} from '@breef/shared/constants';
import { BreefLogo } from '@breef/shared/assets';
import {
    redirectToApp,
    redirectToAppByUserType,
    redirectToAuthApp,
} from '@breef/shared/utils';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useRouteControl } from '@breef/shared/hooks';
import { useAppSelector } from '../../hooks/store';

const PublicProject = () => {
    const publicPopup = usePopup(true);
    const {
        queryParams,
        clearHistoryQueryParamsBasePath,
        updateHistoryQueryParams,
    } = useRouteControl();
    const { token, cta, sessionid } = queryParams;

    const [fetchSharedData, { data: sharedData, isLoading, isSuccess }] =
        useLazyGetSharedProjectQuery();

    const { isAuth } = useAppSelector(state => state.auth);

    const { data: selfData, isLoading: isLoadingSelfData } = useGetSelfQuery(
        undefined,
        {
            skip: !isAuth,
        },
    );

    const [queryCta, setQueryCta] = useState<string | undefined>(undefined);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        if (cta === 'true' || cta === 'false' || cta === undefined) {
            setQueryCta(cta as string | undefined);
        }

        if (sessionid) {
            setIsAdmin(true);
        }

        if (cta && sessionid) {
            updateHistoryQueryParams({ cta });
        } else {
            clearHistoryQueryParamsBasePath();
        }
    }, []);

    const [isClosingSharing, setIsClosingSharing] = useState(false);
    const errorMessage =
        'Company has closed access to the project information.';

    useEffect(() => {
        if (!token) return;

        fetchSharedData({
            token: token as string,
        }).then(res => {
            if (res.isError) {
                !isClosingSharing && setIsClosingSharing(true);
            } else {
                isClosingSharing && setIsClosingSharing(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    if (isClosingSharing) {
        return <PageLoader errorMessage={errorMessage} />;
    }

    if (isLoading || !isSuccess || isLoadingSelfData) {
        return <PageLoader />;
    }

    const { brandLead, status, id, unfilledStep } = sharedData;
    const isAuthenticatedUser = isAuth && selfData.companyType;
    const isValidProjectData =
        unfilledStep === ProjectCreationStepsEnum.Review ||
        unfilledStep === ProjectCreationStepsEnum.Post;

    const isNotValidProjectData =
        unfilledStep !== ProjectCreationStepsEnum.Review &&
        unfilledStep !== ProjectCreationStepsEnum.Post;

    const isNotDraft = status !== ProjectStatuses.draft;

    const unfilledStepParams = `?unfilled_step=${unfilledStep}`;

    const getIsShowProjectPostButton = () => {
        if (isNotDraft) return false;
        if (queryCta === 'true' || queryCta === undefined) return true;
        if (queryCta === 'false') return false;
        return false;
    };

    const isShowProjectPostButton = getIsShowProjectPostButton();

    const subTitle =
        'We’ve put together a project scope, based on your brand, needs + goals.';

    const getCurrentStepParams = (step: ProjectStep, elementId?: string) => {
        if (!step) return '';
        if (!elementId) return `?current_step=${step}`;
        return `?current_step=${step}&element_id=${elementId}`;
    };

    const handleClickRedirectToStep = (
        step: ProjectStep,
        elementId?: string,
    ) => {
        if (isAdmin) {
            redirectToApp(ADMIN_BACKEND_APP_URL || '');
            return;
        }

        if (isAuthenticatedUser && isValidProjectData) {
            redirectToAppByUserType(
                selfData.companyType,
                PROJECT_EDIT_ROUTE.reverse({ projectId: id }) +
                    getCurrentStepParams(step, elementId),
            );
            return;
        }

        if (isAuthenticatedUser && isNotValidProjectData) {
            redirectToAppByUserType(
                selfData.companyType,
                PROJECT_EDIT_ROUTE.reverse({ projectId: id }) +
                    unfilledStepParams || '',
            );
            return;
        }

        if (isValidProjectData) {
            redirectToAuthApp(
                PROJECT_EDIT_ROUTE.reverse({ projectId: id }) +
                    getCurrentStepParams(step, elementId),
            );
            return;
        }

        if (isNotValidProjectData) {
            redirectToAuthApp(
                PROJECT_EDIT_ROUTE.reverse({ projectId: id }) +
                    unfilledStepParams || '',
            );
            return;
        }
    };

    const handleClickPostProject = () => {
        if (isAdmin) {
            redirectToApp(ADMIN_BACKEND_APP_URL || '');
            return;
        }

        if (isAuthenticatedUser && isValidProjectData) {
            redirectToAppByUserType(
                selfData.companyType,
                PROJECT_POST_ROUTE.reverse({ projectId: id }) +
                    unfilledStepParams || '',
            );
            return;
        }

        if (isAuthenticatedUser && isNotValidProjectData) {
            redirectToAppByUserType(
                selfData.companyType,
                PROJECT_EDIT_ROUTE.reverse({ projectId: id }) +
                    unfilledStepParams || '',
            );
            return;
        }

        if (isValidProjectData) {
            redirectToAuthApp(
                PROJECT_POST_ROUTE.reverse({ projectId: id }) +
                    unfilledStepParams || '',
            );
            return;
        }

        if (isNotValidProjectData) {
            redirectToAuthApp(
                PROJECT_EDIT_ROUTE.reverse({ projectId: id }) +
                    unfilledStepParams || '',
            );
            return;
        }
    };

    return (
        <StyledReviewWrapper>
            {publicPopup.isOpen && (
                <PublicStartProjectPopup
                    onClick={publicPopup.close}
                    lead={brandLead}
                />
            )}
            <div className="navigation">
                <Link
                    className="link-logo"
                    href={PROJECTS_ROUTE}
                    shallow={true}
                >
                    <BreefLogo />
                </Link>
            </div>
            <StyledReviewStep>
                <div className="header">
                    <div className="group">
                        <h1>Your Project Scope</h1>
                        <p className="project-sub-title">{subTitle}</p>
                    </div>
                    {isShowProjectPostButton && (
                        <Button
                            className="button-post top"
                            label="POST PROJECT"
                            onClick={handleClickPostProject}
                            isUppercase
                            size="small"
                        />
                    )}
                </div>
                <div className="next-steps-wrapper">
                    {configNextSteps.map((item, key) => (
                        <TabChevron key={item} title={item} isActive={!key} />
                    ))}
                </div>
                <ReviewProjectCreation
                    data={sharedData}
                    brandLead={brandLead}
                    onEdit={!isNotDraft ? handleClickRedirectToStep : undefined}
                />
            </StyledReviewStep>
            {isShowProjectPostButton && (
                <div className="button-place-down">
                    <Button
                        className="button-post down"
                        label="Post Project"
                        onClick={handleClickPostProject}
                        isUppercase
                        size="small"
                    />
                </div>
            )}
        </StyledReviewWrapper>
    );
};
export default PublicProject;

const configNextSteps = [
    'Post Project',
    'Receive Pitches',
    'Meet Agencies',
    'Start Work',
];

const StyledReviewWrapper = styled.div`
    padding: 40px 40px 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background-color: ${colors.beige};

    @media screen and (${mediaScreen.tablet}) {
        margin: 0;
        padding: 0;
        align-items: unset;
    }

    .navigation {
        height: 104px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        top: 0;
        padding-left: 28px;

        @media screen and (${mediaScreen.tablet}) {
            position: static;
            height: 74px;
        }
    }

    .button-place-down {
        height: 80px;
        display: none;
        align-items: center;
        justify-content: center;
        border-top: 1px solid ${colors.grey.grey100};
        background-color: ${colors.beige};

        @media screen and (${mediaScreen.tablet}) {
            display: flex;
            position: sticky;
            bottom: 0;
        }

        .button-post.down {
            display: flex;
            width: 100%;
            max-width: 250px;
            height: 40px;
            font-family: 'NeueHaasDisplay', sans-serif;
            font-size: 16px;
            border: unset;
            border-radius: 4px;

            .label {
                text-transform: none;
            }
        }
    }
`;

const StyledReviewStep = styled(AnimationOpacity)`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 104px 0 172px 0;
    gap: 20px;
    max-width: 900px;

    @media screen and (${mediaScreen.tablet}) {
        margin: 24px 15px 0;
        gap: 24px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        gap: 50px;
        height: fit-content;
        align-items: center;

        @media screen and (${mediaScreen.tablet}) {
            margin: 0 15px;
            padding: unset;
            border-bottom: unset;

            .button-post {
                display: none;
            }
        }

        .group {
            display: flex;
            flex-direction: column;

            @media screen and (${mediaScreen.tablet}) {
                gap: 10px;
            }

            > h1 {
                margin: 0;
                font-size: 38px;
                font-weight: 450;
                line-height: 43px;
                letter-spacing: 0;
                -webkit-text-stroke-width: 0.2px;
                -webkit-text-stroke-color: ${colors.grey.grey900};

                @media screen and (${mediaScreen.tablet}) {
                    font-size: 26px;
                    line-height: 28px;
                }
            }

            > p {
                font-size: 18px;
                line-height: 28px;
                color: ${colors.grey.grey600};
                margin: 0;

                @media screen and (${mediaScreen.tablet}) {
                    line-height: 24px;
                }
            }
        }

        .button-post {
            height: 48px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 1px;
            border-radius: 2px;
            width: 210px;
            border: none !important;
            font-family: ${fonts.accent};

            @media screen and (${mediaScreen.tablet}) {
                &.top {
                    display: none;
                }
            }
        }
    }

    .next-steps-wrapper {
        display: flex;
        gap: 20px;

        @media screen and (${mediaScreen.tablet}) {
            display: none;
        }
    }

    .review-scope {
        max-width: 900px;
        @media screen and (${mediaScreen.tablet}) {
            margin-bottom: 20px;
        }
    }
`;
