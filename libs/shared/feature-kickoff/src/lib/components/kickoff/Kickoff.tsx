import { StyledKickoff } from './Kickoff.styled';
import {
    AnimationOpacity,
    Button,
    ExpandedStepperNavigation,
    NavControl,
    ReviewProjectPopup,
    Stepper,
    SuccessInfo,
    usePopup,
} from '@breef/shared/ui-components';
import React, { useEffect } from 'react';
import { useRouteControl } from '@breef/shared/hooks';
import {
    PROJECTS_ROUTE,
    IS_CLIENT_PLATFORM,
    DASHBOARD_PAYMENTS_ROUTE,
} from '@breef/shared/constants';
import { useGetPitchPreviewQuery } from '@breef/shared/data-access-pitch-create';
import { useRouter } from 'next/router';
import AgencyBillingDataStep from './billingDataStep/BillingDataStep';
import {
    buttonAgencyKickoffTitles,
    buttonClientKickoffTitles,
} from './buttonTitles';
import { FormProvider } from 'react-hook-form';
import { useFormBillingData } from './billingDataStep/useFormBillingData';
import { useKickoffActions, useKickoffSelector } from '../../store/hooks';
import { useFormPaymentSchedule } from './paymentScheduleStep/useFormPaymentSchedule';
import PaymentScheduleStep from './paymentScheduleStep/PaymentScheduleStep';
import ReviewStep from './reviewStep/ReviewStep';
import {
    useGetKickoffAgencyBillingInfoQuery,
    useLazyGetKickoffQuery,
    useSendKickoffMutation,
} from '@breef/shared/data-access-kickoff';
import { AnimatePresence } from 'framer-motion';
import {
    successKickoffConfigAgency,
    successKickoffConfigClient,
} from './successKickoffConfig';
import { toast } from 'react-toastify';
import {
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import { useGetProjectByIdQuery } from '@breef/shared/data-access-project';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { PitchPreviewResponse, ProjectByIdType } from '@breef/shared/types';

interface KickoffProps {
    mode: 'create' | 'edit';
    userType: 'client' | 'agency';
}

export const Kickoff: React.FC<KickoffProps> = ({ mode, userType }) => {
    const { changePage } = useRouteControl();
    const router = useRouter();
    const projectPopup = usePopup();
    const projectId = (router.query as { projectId?: number }).projectId || -1;
    const projectInfoByAgencyRequest = useGetPitchPreviewQuery(projectId, {
        skip: userType !== 'agency',
    });
    const projectInfoByClientRequest = useGetProjectByIdQuery(projectId, {
        skip: userType !== 'client',
    });
    const clientProfileRequest = useGetCompanyInfoQuery(
        { companyType: userType },
        { skip: userType !== 'client' },
    );
    const agencyKickoffBillingDataRequest = useGetKickoffAgencyBillingInfoQuery(
        projectId,
        { skip: userType !== 'client' },
    );
    const numberSteps = userType === 'agency' ? 3 : 2;
    const {
        setStep,
        resetStore,
        setPaymentScheduleFormData,
        savePrevPaymentsType,
        setIsAcceptedTerms,
    } = useKickoffActions();
    const [sendKickoff, sendKickoffStateQuery] = useSendKickoffMutation();
    const {
        step,
        kickoff: { isAcceptedTerms },
        kickoff,
    } = useKickoffSelector(state => state).kickoff;
    const [getKickoff] = useLazyGetKickoffQuery();
    const { methodsFormBillingData } = useFormBillingData();
    const { methodsFormPaymentSchedule } = useFormPaymentSchedule();
    const validationSteps =
        userType === 'agency'
            ? [
                  !methodsFormBillingData.formState.isValid,
                  Object.values(methodsFormPaymentSchedule.formState.errors)
                      .length !== 0,
                  !isAcceptedTerms,
              ]
            : [!methodsFormBillingData.formState.isValid, !isAcceptedTerms];
    const setErrorAndRedirect = () => {
        const message = validationErrorMessages[
            ValidationErrorType.default
        ] as string;
        toast.error(message, { toastId: message });
        changePage(PROJECTS_ROUTE);
    };

    const handleDecrementStep = () => {
        if (step === 1) {
            changePage(PROJECTS_ROUTE);
        } else {
            setStep(step - 1);
        }
    };
    const handleIncrementStep = () => {
        if (step === numberSteps) {
            sendKickoff({
                ...kickoff,
                status:
                    userType === 'agency'
                        ? 'awaiting_approval'
                        : 'approved_by_client',
                userType,
                mode,
                projectId,
            }).then(res => {
                if ((res as { error?: object }).error) {
                    setErrorAndRedirect();
                }
            });
        } else {
            setStep(step + 1);
        }
    };
    const onExit = () => {
        if (step === numberSteps && userType !== 'client') {
            sendKickoff({
                ...kickoff,
                status: 'draft',
                userType,
                mode,
                projectId,
            }).then(res => {
                if ((res as { error?: object }).error) {
                    setErrorAndRedirect();
                } else {
                    changePage(PROJECTS_ROUTE);
                }
            });
        } else {
            changePage(PROJECTS_ROUTE);
        }
    };

    useEffect(() => {
        IS_CLIENT_PLATFORM && window.scrollTo(0, 0);
    }, [step]);

    useEffect(() => {
        methodsFormBillingData.trigger();
        methodsFormPaymentSchedule.trigger();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        return () => {
            resetStore();
        };
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if ((mode === 'edit' || userType === 'client') && projectId !== -1) {
            getKickoff(projectId).then(res => {
                if (res.error) {
                    setErrorAndRedirect();
                }
                if (res.data) {
                    if (
                        (userType === 'agency' &&
                            res.data.status !== 'draft') ||
                        (userType === 'client' &&
                            res.data.status !== 'approved_by_breef')
                    ) {
                        setErrorAndRedirect();
                    } else {
                        methodsFormBillingData.setValue(
                            'files',
                            res.data.files,
                        );
                        if (userType === 'agency') {
                            methodsFormBillingData.setValue(
                                'teamMembers',
                                res.data.teamMembers,
                            );
                            methodsFormBillingData.setValue(
                                'teamInvites',
                                res.data.teamInvites,
                            );
                        }
                        const preparedPaymentScheduleFormData = {
                            paymentTerms: res.data.paymentTerms,
                            paymentsType: res.data.paymentsType,
                            paymentsMilestone: res.data.paymentsMilestone,
                            paymentsRetainer: res.data.paymentsRetainer,
                        };
                        methodsFormPaymentSchedule.reset(
                            preparedPaymentScheduleFormData,
                        );
                        setPaymentScheduleFormData(
                            preparedPaymentScheduleFormData,
                        );
                        savePrevPaymentsType(preparedPaymentScheduleFormData);
                        setIsAcceptedTerms(res.data.isAcceptedTerms);
                        methodsFormBillingData.trigger();
                        methodsFormPaymentSchedule.trigger();
                    }
                }
            });
        }
        //eslint-disable-next-line
    }, [projectId]);
    const projectTitle =
        projectInfoByAgencyRequest.data?.name ||
        projectInfoByClientRequest.data?.name ||
        '';

    const renderSteps = () => {
        if (userType === 'agency') {
            return [
                <FormProvider key="step-1" {...methodsFormBillingData}>
                    <AgencyBillingDataStep userType={userType} />
                </FormProvider>,
                <FormProvider key="step-2" {...methodsFormPaymentSchedule}>
                    <PaymentScheduleStep />
                </FormProvider>,
                <ReviewStep key="step-3" userType="agency" />,
            ];
        }
        return [
            <FormProvider key="step-1" {...methodsFormBillingData}>
                <AgencyBillingDataStep userType={userType} />
            </FormProvider>,
            <ReviewStep
                key="step-2"
                userType="client"
                agencyKickoffBillingData={agencyKickoffBillingDataRequest.data}
            />,
        ];
    };

    const renderPopupProject = () => {
        const data =
            (projectInfoByClientRequest.data as ProjectByIdType) ??
            (projectInfoByAgencyRequest.data as PitchPreviewResponse);

        return (
            <ReviewProjectPopup projectData={data} close={projectPopup.close} />
        );
    };

    return (
        <StyledKickoff>
            <AnimatePresence exitBeforeEnter>
                {!sendKickoffStateQuery.isSuccess ? (
                    <AnimationOpacity key="kickoff-flow">
                        <NavControl
                            handleBack={handleDecrementStep}
                            isStatic
                            isSticky
                        >
                            <ExpandedStepperNavigation
                                title={projectTitle}
                                placeholder=""
                                readOnly
                                onButtonClick={onExit}
                                isDisabledButton={
                                    ((step === numberSteps &&
                                        !isAcceptedTerms) ||
                                        sendKickoffStateQuery.isLoading) &&
                                    userType !== 'client'
                                }
                                isShowIconInfo
                                buttonTitle={
                                    step === numberSteps &&
                                    userType !== 'client'
                                        ? 'Save & Exit'
                                        : undefined
                                }
                                customPopup={renderPopupProject()}
                                customPopupControl={projectPopup}
                            />
                        </NavControl>
                        <div className="steps-content-wrapper">
                            <Stepper
                                step={step}
                                setStep={({ step }) => setStep(step)}
                                validationSteps={validationSteps}
                            >
                                {renderSteps()}
                            </Stepper>
                        </div>
                        <Button
                            type="button"
                            className="normal"
                            onClick={handleIncrementStep}
                            withAnimate
                            disabled={
                                validationSteps[step - 1] ||
                                sendKickoffStateQuery.isLoading
                            }
                            title={
                                userType === 'agency'
                                    ? buttonAgencyKickoffTitles[step - 1]
                                    : buttonClientKickoffTitles[step - 1]
                            }
                            arrowRight
                        />
                    </AnimationOpacity>
                ) : (
                    <AnimationOpacity
                        key="kickoff-success"
                        className="success-block-wrapper"
                        onAnimationStart={resetStore}
                    >
                        <SuccessInfo
                            buttonTitle={
                                userType === 'agency'
                                    ? 'Dashboard'
                                    : 'Make Payment'
                            }
                            onButtonClick={() =>
                                changePage(
                                    userType === 'agency'
                                        ? PROJECTS_ROUTE
                                        : (DASHBOARD_PAYMENTS_ROUTE.reverse({
                                              projectId,
                                          }) as string),
                                )
                            }
                            config={
                                userType === 'agency'
                                    ? successKickoffConfigAgency
                                    : successKickoffConfigClient
                            }
                            linkButton={
                                userType === 'client'
                                    ? {
                                          link: PROJECTS_ROUTE,
                                          title: 'Return to Dashboard',
                                      }
                                    : undefined
                            }
                        />
                    </AnimationOpacity>
                )}
            </AnimatePresence>
        </StyledKickoff>
    );
};
export default Kickoff;
