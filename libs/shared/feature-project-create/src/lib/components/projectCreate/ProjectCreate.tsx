import { StyledProjectCreate } from './ProjectCreate.styled';
import {
    FinishProjectPopup,
    Stepper,
    usePopup,
    Header,
    AnimationOpacity,
    CreationProgress,
    CreationNavigationSection,
    CreatePasswordPopup,
    SuccessPopup,
    StartProjectPopup,
} from '@breef/shared/ui-components';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useProjectCreateFormControl } from '../../hooks/useProjectCreateFormControl';
import useValidationSaveExit from '../../hooks/useValidationSaveExit';
import { useStepperControl } from '../../hooks/useStepperControl';
import {
    useCreateProjectMutation,
    useUpdateCompanyDetailsMutation,
    useUpdateProjectMutation,
} from '@breef/shared/data-access-project-create';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import {
    PROJECT_EDIT_ROUTE,
    PROJECT_POST_ROUTE,
    ProjectCreationStepsEnum,
    PROJECTS_ROUTE,
    ProjectStep,
} from '@breef/shared/constants';
import { getStepKeyByValue } from '../../utils/functions/getStep';
import { toast } from 'react-toastify';
import {
    useProjectCreateActions,
    useProjectCreateSelector,
} from '../../store/hooks';
import {
    CompanyInfoMergedResponseType,
    ProjectByIdType,
    ProjectCreationRequestType,
} from '@breef/shared/types';
import AgencyPreferencesStep from './agencyPreferencesStep/AgencyPreferencesStep';
import CompanyDetailsStep from './companyDetailsStep/CompanyDetailsStep';
import { ProjectScopeStep } from './projectScopeStep/ProjectScopeStep';
import StepWrapper from './stepWrapper/StepWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import {
    progressConfig,
    streamlinePopupConfig,
    streamlinePopupMobileConfig,
} from './configs';
import SideBar from './sideBar/SideBar';
import PersonalizeScopeStep from './personalizeScopeStep/PersonalizeScopeStep';
import ReviewStep from './reviewStep/ReviewStep';
import { Button } from '@breef/ui-kit';
import { useValidateSkillsQuery } from '../../hooks/useValidateSkillsQuery';
import { useAutoFillTemplate } from '../../hooks/useAutofillTempalte';
import _ from 'lodash';
import {
    SeverErrorData,
    useServerErrorHandler,
} from '../../hooks/useServerErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FormType } from '../../types/projectCreateTypes';
import { CompanyDetailsPopup } from './reviewStep/companyDetailsPopup/CompanyDetailsPopup';
import { transformCompanyDetails } from '../../utils/functions/adapters';
import { useUpdateCompanyInfoMutation } from '@breef/shared/data-access-profile';
import { STREAMLINE_POPUP_HIDE_KEY } from '../../utils/constants';

interface ProjectCreateProps {
    projectData?: ProjectByIdType;
    companyData?: CompanyInfoMergedResponseType;
    isStreamline?: boolean;
}

export const ProjectCreate: FC<ProjectCreateProps> = ({
    projectData,
    companyData,
    isStreamline,
}) => {
    const [isReady, setIsReady] = useState(!projectData);
    const startPopup = usePopup();
    const companyDetailsPopup = usePopup();
    const [isStreamlinePopupsComplete, setIsStreamlinePopupsComplete] =
        useState(!isStreamline);
    const {
        changePage,
        queryParams,
        clearHistoryQueryParams,
        router,
        changeQueryParams,
    } = useRouteControl();
    const { isMobile } = useMediaContext();
    const {
        isSubmitting,
        isSubmittingSaveExit,
        isPenMode,
        user: { needsPassword },
    } = useProjectCreateSelector(state => state).projectCreate;
    const { setIsSubmitting, resetPenMode } = useProjectCreateActions();
    const { methods, validationSteps } = useProjectCreateFormControl({
        projectData,
        companyData,
        setIsReady,
        isDisableValidation: !isStreamlinePopupsComplete,
    });
    const creatorPopup = usePopup();
    const createPassword = usePopup();
    const successSaveProjectPopup = usePopup();
    const { step, setStep, handleNext, handleBack } = useStepperControl({
        openCreatePasswordPopup: createPassword.open,
    });

    const [companyDetailsData, setCompanyDetailsData] =
        useState<FormType | null>(null);

    const handleNextStartPopup = () => {
        startPopup.close();

        const isExistsProfileData =
            !!methods.companyDetails.getValues('companyName') &&
            !!methods.companyDetails.getValues('companyWebsite') &&
            !!methods.companyDetails.getValues('companyLocation') &&
            !!methods.companyDetails.getValues('companyDescription');

        if (!isExistsProfileData) {
            companyDetailsPopup.open();
            return;
        }

        setIsStreamlinePopupsComplete(true);
    };

    const handleNextCompanyPopup = async (values: FormType) => {
        setCompanyDetailsData(values);
    };

    const handleBackCompanyPopup = () => {
        companyDetailsPopup.close();
        startPopup.open();
    };

    useEffect(() => {
        const typedQueryParams = queryParams as { popupStreamline?: string };
        const isHidePopup =
            typedQueryParams.popupStreamline === STREAMLINE_POPUP_HIDE_KEY;
        if (isStreamline && !isHidePopup) {
            startPopup.open();
        }
    }, [isStreamline]);

    const [prevSkillsIds, setPrevSkillsIds] = useState<number[]>(
        projectData?.agencySkills.map(skill => skill.id) ?? [],
    );
    const { triggerValidationSaveExit } = useValidationSaveExit(methods);
    const { setTemplateData, setTemplateOnlySkill, setTemplateMeta } =
        useAutoFillTemplate();
    const [createProject] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const [updateCompanyDetails, { isLoading: isLoadingUpdateCompanyDetails }] =
        useUpdateCompanyDetailsMutation();

    const [updateCompany, { isLoading: isLoadingUpdateCompany }] =
        useUpdateCompanyInfoMutation();

    const { handleServerErrors, handleServerErrorsCompanyDetails } =
        useServerErrorHandler({ setStep, methods });

    const {
        handleValidateSkillQuery,
        handleClearSkillError,
        getErrorSkill,
        isErrorsSkills,
    } = useValidateSkillsQuery(methods.projectScope, step);

    const getFullProjectFormData = () => ({
        ...methods.projectScope.getValues(),
        ...methods.agencyPreferences.getValues(),
        ...methods.personalizeScope.getValues(),
        ...methods.companyDetails.getValues(),
    });

    const getProjectFormData = (step: ProjectStep, isNextAction?: boolean) => {
        const fullProjectFormData = getFullProjectFormData();
        if (isPenMode && isNextAction) {
            return fullProjectFormData;
        }
        switch (step) {
            case ProjectStep.PROJECT_SCOPE:
                return {
                    ...methods.projectScope.getValues(),
                    description:
                        methods.personalizeScope.getValues('description'),
                };
            case ProjectStep.AGENCY_PREFERENCES:
                return {
                    ...methods.projectScope.getValues(),
                    ...methods.agencyPreferences.getValues(),
                };
            case ProjectStep.PERSONALIZE_SCOPE:
                return {
                    ...methods.projectScope.getValues(),
                    ...methods.personalizeScope.getValues(),
                    ...methods.agencyPreferences.getValues(),
                };
            default:
                return fullProjectFormData;
        }
    };

    const getSubmitStep = (isNextAction?: boolean, isPostAction?: boolean) => {
        if (isPostAction) {
            return ProjectCreationStepsEnum.Post;
        }
        if (isPenMode && isNextAction) {
            return ProjectCreationStepsEnum.Review;
        }
        return getStepKeyByValue(isNextAction ? step + 1 : step);
    };

    const submitCallback = async (
        redirectPath: string,
        isReplaceRoute?: boolean,
    ) => {
        if (redirectPath !== PROJECTS_ROUTE) {
            if (isReplaceRoute) {
                await router.replace(redirectPath);
                return;
            }
            await changePage(redirectPath);
            return;
        }
        if (!needsPassword) {
            successSaveProjectPopup.open();
            return;
        }
        createPassword.open();
    };

    const handleSubmit = async (
        isNextAction?: boolean,
        isPostAction?: boolean,
    ) => {
        const isNext = isPostAction || isNextAction;

        try {
            setIsSubmitting({ value: true, isNext });
            let result;
            if (step === ProjectStep.PROJECT_SCOPE) {
                const currentDescription =
                    methods.personalizeScope.getValues('description');
                const currentSkills =
                    methods.projectScope.getValues('agencySkills');
                const currentSkillsIds = currentSkills.map(item => item.id);

                if (!_.isEqual(prevSkillsIds, currentSkillsIds)) {
                    await setTemplateData(
                        methods,
                        currentSkills,
                        currentDescription,
                    );
                }
            }

            const data: ProjectCreationRequestType = {
                ...getProjectFormData(step, isNextAction),
                step: getSubmitStep(isNextAction, isPostAction),
            };

            if (!projectData) {
                result = await createProject(data).unwrap();
                const projectId = (result as { id: number }).id;
                const path = isNextAction
                    ? PROJECT_EDIT_ROUTE.reverse({ projectId }) || ''
                    : PROJECTS_ROUTE;
                await submitCallback(path, isNextAction);
            } else {
                result = await updateProject({
                    id: projectData.id,
                    data,
                }).unwrap();
                if (isNextAction) {
                    handleNext();
                } else {
                    const projectId = (result as { id: number }).id;
                    const path = isPostAction
                        ? PROJECT_POST_ROUTE.reverse({ projectId }) || ''
                        : PROJECTS_ROUTE;
                    await submitCallback(path);
                }
            }
        } catch (e) {
            handleServerErrors(
                (e as FetchBaseQueryError).data as SeverErrorData,
            );
        } finally {
            setIsSubmitting({ value: false, isNext });
        }
    };

    const onSaveExit = async () => {
        const nextNotValidStep = await triggerValidationSaveExit(step);
        if (nextNotValidStep) {
            const toastMessage = 'Please adjust all necessary steps';
            toast.error(toastMessage, { toastId: toastMessage });
            return setStep({ step: nextNotValidStep });
        }
        return handleSubmit();
    };
    const isReviewStep = step === ProjectStep.REVIEW;
    const handleNextSubmit = () => handleSubmit(!isReviewStep, isReviewStep);

    useEffect(() => {
        if ((queryParams as { popup?: string }).popup) {
            if (
                projectData?.step === ProjectCreationStepsEnum.Review ||
                projectData?.step === ProjectCreationStepsEnum.Post
            ) {
                creatorPopup.open();
            }
            clearHistoryQueryParams();
        }

        return () => {
            resetPenMode();
        };
    }, []);

    useEffect(() => {
        if (isStreamline && isStreamlinePopupsComplete) {
            changeQueryParams(
                {
                    ...queryParams,
                    popupStreamline: STREAMLINE_POPUP_HIDE_KEY,
                },
                true,
            );
        }
    }, [isStreamlinePopupsComplete]);

    const renderStep = (
        label: string,
        description: string,
        component: React.ReactNode,
        isLoading?: boolean,
    ) => {
        return (
            <StepWrapper
                label={label}
                description={description}
                isLoading={isLoading}
            >
                {component}
            </StepWrapper>
        );
    };

    const fetchCompanyDetails = async (form: FormType) => {
        if (!projectData) return;
        const currentData = methods.companyDetails.getValues();
        const updatedData = {
            companyName: form.name,
            companyWebsite: form.website,
            companyLocation: form.location,
            companyDescription: form.description,
        };
        methods.companyDetails.reset({
            ...currentData,
            ...updatedData,
        });

        try {
            await updateCompanyDetails({
                id: projectData.id,
                ...updatedData,
            }).unwrap();
            await updateCompany({
                name: form.name,
                website: form.website,
                location: form.location,
                description: form.description,
            }).unwrap();

            setIsStreamlinePopupsComplete(true);
            companyDetailsPopup.close();
        } catch (error) {
            console.log('error', error);

            handleServerErrorsCompanyDetails(
                (error as FetchBaseQueryError).data as SeverErrorData,
            );
        }
    };

    useEffect(() => {
        if (!companyDetailsData) return;
        fetchCompanyDetails(companyDetailsData);
    }, [companyDetailsData]);

    useEffect(() => {
        return () => {
            setStep({ step: 1 });
        };
    }, []);

    const renderProgress = () => (
        <AnimatePresence exitBeforeEnter>
            {step !== ProjectStep.REVIEW ? (
                <CreationProgress
                    key="progress"
                    step={step}
                    config={progressConfig}
                />
            ) : (
                renderPlug()
            )}
        </AnimatePresence>
    );

    const renderSideBar = () => (
        <AnimatePresence exitBeforeEnter>
            {step !== ProjectStep.REVIEW ? (
                <SideBar key="side-bar" step={step} />
            ) : (
                renderPlug()
            )}
        </AnimatePresence>
    );

    const renderDivider = () => (
        <AnimatePresence exitBeforeEnter>
            {!isReviewStep ? (
                <AnimationOpacity
                    key="header-divider"
                    className="header-divider"
                />
            ) : (
                renderPlug()
            )}
        </AnimatePresence>
    );

    const renderNavigationSection = () => (
        <AnimatePresence exitBeforeEnter>
            {!isReviewStep ? (
                <CreationNavigationSection
                    key="navigation-section"
                    onNext={handleNextSubmit}
                    onBack={handleBack}
                    isDisabledNext={
                        validationSteps[step - 1] ||
                        isSubmittingSaveExit ||
                        isSubmitting ||
                        isErrorsSkills
                    }
                    step={step}
                    stepsCount={validationSteps.length}
                    isSubmittingNext={isSubmitting}
                    isPenMode={isPenMode}
                >
                    {step === validationSteps.length && !isMobile && (
                        <Button
                            className="save-exit-button"
                            label="Save & exit"
                            onClick={onSaveExit}
                            variant="outlined"
                            isSubmitted={isSubmittingSaveExit}
                            isDisabled={isSubmitting}
                            isUppercase
                        />
                    )}
                </CreationNavigationSection>
            ) : (
                renderPlug()
            )}
        </AnimatePresence>
    );

    const onClickLogo = needsPassword
        ? createPassword.open
        : successSaveProjectPopup.open;

    const redirectToDashboard = () => changePage(PROJECTS_ROUTE);

    const renderPopups = () => {
        const companyDetails = transformCompanyDetails({
            project: projectData,
            profile: companyData,
        });

        return (
            <Fragment>
                {startPopup.isOpen && (
                    <StartProjectPopup
                        title={
                            !isMobile
                                ? 'Let’s find the perfect agency'
                                : 'Find the perfect agency'
                        }
                        subtitle="Your custom project scope is the key to a successful project"
                        onClick={handleNextStartPopup}
                        close={handleNextStartPopup}
                        tipsConfig={
                            !isMobile
                                ? streamlinePopupConfig
                                : streamlinePopupMobileConfig
                        }
                    />
                )}
                {companyDetailsPopup.isOpen && (
                    <CompanyDetailsPopup
                        formData={companyDetails}
                        onNext={handleNextCompanyPopup}
                        onBack={handleBackCompanyPopup}
                        isSubmitting={
                            isLoadingUpdateCompanyDetails ||
                            isLoadingUpdateCompany
                        }
                    />
                )}
            </Fragment>
        );
    };

    return (
        <StyledProjectCreate isReviewStep={isReviewStep}>
            <Header
                buttonTitle={isReviewStep ? 'Save' : 'Save & exit'}
                onClick={onSaveExit}
                isSubmitting={isSubmittingSaveExit}
                isDisabled={isSubmitting}
                hideButton={isMobile && isReviewStep}
                onCLickLogo={onClickLogo}
            />
            {creatorPopup.isOpen && (
                <FinishProjectPopup close={creatorPopup.close} />
            )}
            {createPassword.isOpen && (
                <CreatePasswordPopup
                    close={createPassword.close}
                    onBack={createPassword.close}
                    onClose={createPassword.close}
                    onSuccessCallback={() => {
                        successSaveProjectPopup.open();
                        createPassword.close();
                    }}
                />
            )}
            {successSaveProjectPopup.isOpen && (
                <SuccessPopup
                    title="Scope saved!"
                    subtitle="Look out for an email from your Strategist."
                    onClose={successSaveProjectPopup.close}
                    onClick={redirectToDashboard}
                    buttonTitle="Go to Dashboard"
                />
            )}
            {renderPopups()}
            {renderDivider()}
            <div className="project-creation-body">
                {renderProgress()}
                {isReady && (
                    <Stepper
                        step={step}
                        setStep={setStep}
                        validationSteps={validationSteps}
                        className="stepper"
                        isAnimation={false}
                    >
                        <FormProvider {...methods.projectScope}>
                            {renderStep(
                                'Project Scope',
                                'Tell us what you’re looking for and when you want to start.',
                                <ProjectScopeStep
                                    setPrevSkillsIds={setPrevSkillsIds}
                                />,
                            )}
                        </FormProvider>
                        <FormProvider {...methods.agencyPreferences}>
                            {renderStep(
                                'Agency Preferences',
                                'Tell us more about what matters to you in an agency.',
                                <AgencyPreferencesStep />,
                            )}
                        </FormProvider>
                        <FormProvider {...methods.personalizeScope}>
                            {renderStep(
                                'Personalize Your Scope',
                                'Tell us more about your project goals and deliverables.',
                                <PersonalizeScopeStep
                                    setTemplateMeta={setTemplateMeta}
                                    methodsProjectScopeForm={
                                        methods.projectScope
                                    }
                                    validateSkillQuery={
                                        handleValidateSkillQuery
                                    }
                                    clearSkillError={handleClearSkillError}
                                    getErrorSkill={getErrorSkill}
                                    setTemplate={idSkill =>
                                        setTemplateOnlySkill(
                                            methods,
                                            methods.projectScope.getValues(
                                                'agencySkills',
                                            ),
                                            idSkill,
                                        )
                                    }
                                />,
                            )}
                        </FormProvider>
                        <FormProvider {...methods.companyDetails}>
                            {renderStep(
                                'Company Details',
                                'Tell us more about your company.',
                                <CompanyDetailsStep />,
                            )}
                        </FormProvider>
                        <ReviewStep
                            onSubmit={() => handleSubmit(false, true)}
                            onSaveExit={onSaveExit}
                            projectData={{
                                ...getFullProjectFormData(),
                                agenciesAdvantages:
                                    projectData?.agenciesAdvantages,
                            }}
                            projectId={projectData?.id}
                            handleServerErrors={handleServerErrors}
                            methodsAgencyPreferences={methods.agencyPreferences}
                        />
                    </Stepper>
                )}
                {!isMobile && renderSideBar()}
            </div>
            {renderNavigationSection()}
        </StyledProjectCreate>
    );
};

export default ProjectCreate;

const renderPlug = () => (
    <AnimationOpacity key="plug">
        <motion.span />
    </AnimationOpacity>
);
