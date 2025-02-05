import React, { useContext, useEffect, useState } from 'react';
import {
    AnimationOpacity,
    HeaderReview,
    MilestonePayments,
    RetainerPayments,
    SimpleHeaderInfo,
} from '@breef/shared/ui-components';
import {
    useController,
    useFieldArray,
    useFormContext,
    useWatch,
} from 'react-hook-form';
import { StyledPaymentScheduleStep } from './PaymentScheduleStep.styled';
import SelectPaymentType from './selectPaymentType/SelectPaymentType';
import { ProjectFormat } from '@breef/shared/constants';
import { PaymentScheduleFormType } from '../../../types/kickoffTypes';
import PaymentsSection from './paymentsSection/PaymentsSection';
import { AnimatePresence } from 'framer-motion';
import { useKickoffActions, useKickoffSelector } from '../../../store/hooks';
import _ from 'lodash';
import Summary from './paymentsSection/summary/Summary';
import { toast } from 'react-toastify';
import { ControlTypePaymentsForm } from '@breef/shared/types';
import {
    calculateSummaryMilestones,
    calculateSummaryRetainer,
    checkFirstMilestoneAmount,
    checkFirstMilestoneMonth,
} from '@breef/shared/utils';
import { card_bg_9 } from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';

export const PaymentScheduleStep: React.FC = () => {
    const { isMobile } = useMediaContext();
    const { control, setValue, getValues, setError, clearErrors, trigger } =
        useFormContext<ControlTypePaymentsForm>();
    const { savePrevPaymentsType, setPaymentScheduleFormData } =
        useKickoffActions();
    const {
        paymentsOneTime,
        paymentsStrategyExecution,
        paymentsOngoingRetainer,
    } = useKickoffSelector(state => state).kickoff;
    const [summary, setSummary] = useState(0);

    const fieldPaymentType = useController({
        control,
        name: 'paymentsType',
    });
    const fieldPaymentsMilestone = useFieldArray({
        control,
        name: 'paymentsMilestone',
    });
    const fieldPaymentTerms = useController({
        control,
        name: 'paymentTerms',
    });
    const watchMilestones = useWatch({
        control,
        name: 'paymentsMilestone',
    });
    const watchRetainer = useWatch({
        control,
        name: 'paymentsRetainer',
    });

    const checkPaymentsTypeTab = (value: string) => {
        switch (value) {
            case 'one_time':
                return (() => {
                    setValue(
                        'paymentsMilestone',
                        _.cloneDeep(paymentsOneTime.paymentsMilestone),
                    );
                    setValue(
                        'paymentsRetainer',
                        _.cloneDeep(paymentsOneTime.paymentsRetainer),
                    );
                })();
            case 'strategy_execution':
                return (() => {
                    setValue(
                        'paymentsMilestone',
                        _.cloneDeep(
                            paymentsStrategyExecution.paymentsMilestone,
                        ),
                    );
                    setValue(
                        'paymentsRetainer',
                        _.cloneDeep(paymentsStrategyExecution.paymentsRetainer),
                    );
                })();
            case 'ongoing_or_retainer':
                return (() => {
                    setValue(
                        'paymentsMilestone',
                        _.cloneDeep(paymentsOngoingRetainer.paymentsMilestone),
                    );
                    setValue(
                        'paymentsRetainer',
                        _.cloneDeep(paymentsOngoingRetainer.paymentsRetainer),
                    );
                })();
            default:
                return null;
        }
    };

    useEffect(() => {
        const summaryMilestones = calculateSummaryMilestones(watchMilestones);
        const summaryRetainer = calculateSummaryRetainer(watchRetainer);
        trigger().then(() => {
            if (!checkFirstMilestoneMonth(watchMilestones)) {
                const message =
                    'The initial milestone installments must have the earliest invoice date.';
                setError('paymentsMilestone.0.invoiceDate', {
                    type: 'important',
                    message: message,
                });
                toast.error(message, { toastId: message });
            }
            if (
                !checkFirstMilestoneAmount(watchMilestones, summaryMilestones)
            ) {
                const message =
                    'Initial milestone installments must account for at least 25% of total milestone value';
                setError('paymentsMilestone.0.amount', {
                    type: 'important',
                    message: message,
                });
                toast.error(message, { toastId: message });
            }
        });
        setSummary(summaryMilestones + summaryRetainer);
        //eslint-disable-next-line
    }, [watchMilestones, watchRetainer]);

    useEffect(() => {
        checkPaymentsTypeTab(fieldPaymentType.field.value);
        //eslint-disable-next-line
    }, [fieldPaymentType.field.value]);

    useEffect(() => {
        return () => {
            setPaymentScheduleFormData(getValues() as PaymentScheduleFormType);
            savePrevPaymentsType(getValues() as PaymentScheduleFormType);
        };
        //eslint-disable-next-line
    }, []);

    const renderPaymentsSummary = () => (
        <PaymentsSection paddingBottomSize={!isMobile ? 100 : 60}>
            <HeaderReview title="Summary" />
            <Summary
                fieldPaymentTerms={fieldPaymentTerms}
                total={summary}
                teamTake={summary * 0.85}
            />
        </PaymentsSection>
    );

    const renderPayments = () => {
        switch (fieldPaymentType.field.value) {
            case ProjectFormat.OneTime:
                return (
                    <AnimationOpacity
                        key="OneTime"
                        className="payments-sections-wrapper"
                    >
                        <PaymentsSection
                            paddingBottomSize={!isMobile ? 60 : 30}
                        >
                            <MilestonePayments
                                fieldMethods={fieldPaymentsMilestone}
                            />
                        </PaymentsSection>
                        {renderPaymentsSummary()}
                    </AnimationOpacity>
                );
            case ProjectFormat.StrategyExecution:
                return (
                    <AnimationOpacity
                        key="StrategyExecution"
                        className="payments-sections-wrapper"
                    >
                        <PaymentsSection
                            paddingBottomSize={!isMobile ? 60 : 30}
                        >
                            <MilestonePayments
                                title="Strategy"
                                fieldMethods={fieldPaymentsMilestone}
                            />
                        </PaymentsSection>
                        <PaymentsSection
                            paddingBottomSize={
                                !watchRetainer ? 0 : !isMobile ? undefined : 60
                            }
                        >
                            <RetainerPayments
                                title="Execution"
                                paymentsRetainerValue={watchRetainer}
                                isShowActionButton
                            />
                        </PaymentsSection>
                        {renderPaymentsSummary()}
                    </AnimationOpacity>
                );
            case ProjectFormat.OngoingRetainer:
                return (
                    <AnimationOpacity
                        key="OngoingRetainer"
                        className="payments-sections-wrapper"
                    >
                        <PaymentsSection
                            paddingBottomSize={!isMobile ? undefined : 60}
                        >
                            <RetainerPayments
                                title="Ongoing"
                                paymentsRetainerValue={watchRetainer}
                            />
                        </PaymentsSection>
                        {renderPaymentsSummary()}
                    </AnimationOpacity>
                );
            default:
                return null;
        }
    };

    return (
        <StyledPaymentScheduleStep>
            <SimpleHeaderInfo
                title="Payment schedule"
                backgroundImageUrl={card_bg_9.src}
            >
                <span>
                    {
                        'Set your payment schedule to easily \nstreamline payments.'
                    }
                </span>
            </SimpleHeaderInfo>
            <div className="step-main-content-wrapper">
                <SelectPaymentType
                    value={fieldPaymentType.field.value}
                    onChange={(paymentType: string) => {
                        savePrevPaymentsType(
                            getValues() as PaymentScheduleFormType,
                        );
                        clearErrors();
                        fieldPaymentType.field.onChange(paymentType);
                    }}
                />
                <AnimatePresence exitBeforeEnter>
                    {renderPayments()}
                </AnimatePresence>
            </div>
        </StyledPaymentScheduleStep>
    );
};
export default PaymentScheduleStep;
