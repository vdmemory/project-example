import React from 'react';
import {
    HeaderReview,
    ReviewRetainerBlock,
    TablePaymentSchedule,
} from '@breef/shared/ui-components';
import { useKickoffSelector } from '../../../../store/hooks';
import moment from 'moment';
import { PaymentTermsId } from '@breef/shared/constants';
import numeral from 'numeral';
import { useGetList } from '@breef/shared/hooks';

interface PaymentsSectionProps {
    userType: 'client' | 'agency';
}

export const PaymentsSection: React.FC<PaymentsSectionProps> = ({
    userType,
}) => {
    const { paymentsMilestone, paymentsRetainer, paymentTerms } =
        useKickoffSelector(state => state.kickoff).kickoff;
    const totalMilestone =
        paymentsMilestone
            .map(item => item.amount)
            .reduce((acc, curr) => Number(acc) + Number(curr), 0) || 0;
    const systemFee = 0.15;
    const paymentTermsList = useGetList('paymentTerms') as {
        value: string;
        label: string;
    }[];
    const paymentFrequencyList = useGetList('paymentFrequency') as {
        value: string;
        label: string;
    }[];
    const normalizedPaymentTerms =
        paymentTermsList.find(item => item.value === paymentTerms)?.label || '';
    const normalizedPaymentFrequency =
        paymentFrequencyList.find(
            item => item.value === paymentsRetainer?.paymentFrequency,
        )?.label || '';
    const retainerPaymentsPeriod =
        paymentsRetainer?.paymentFrequency === 'monthly'
            ? 'months'
            : 'quarters';
    const preparedPaymentsMilestone = paymentsMilestone.map((item, key) => ({
        type: item.scheduleType || 'Milestone',
        invoiceDate: moment(item.invoiceDate).format('MMMM D, YYYY'),
        payBy: item.paymentDue
            ? moment(item.paymentDue).format('MMMM D, YYYY')
            : moment(item.invoiceDate)
                  .add(PaymentTermsId[paymentTerms as '7_days'] || 0, 'days')
                  .format('MMMM D, YYYY'),
        deliverable: item.deliverable,
        amount: numeral(item.amount).format('$0,0.00'),
        teamTake: numeral(
            !key
                ? Number(item.amount) - totalMilestone * systemFee
                : Number(item.amount),
        ).format('$0,0.00'),
    }));
    const preparedPaymentRetainer = paymentsRetainer
        ? {
              type: 'Retainer',
              invoiceDate: moment(paymentsRetainer.invoiceDate).format(
                  'MMMM D, YYYY',
              ),
              payBy: paymentsRetainer.paymentDue
                  ? moment(paymentsRetainer.paymentDue).format('MMMM D, YYYY')
                  : moment(paymentsRetainer.invoiceDate)
                        .add(
                            PaymentTermsId[paymentTerms as '7_days'] || 0,
                            'days',
                        )
                        .format('MMMM D, YYYY'),
              deliverable: paymentsRetainer.deliverable,
              amount: numeral(paymentsRetainer.amount).format('$0,0.00'),
              teamTake: numeral(
                  Number(paymentsRetainer.amount) * (1 - systemFee),
              ).format('$0,0.00'),
          }
        : null;
    const retainerPaymentsArray =
        userType === 'agency'
            ? [
                  ...Array(Number(paymentsRetainer?.numberOfPayments || 0))
                      .fill(preparedPaymentRetainer)
                      .map((item, key) => ({
                          ...item,
                          invoiceDate: moment(item.invoiceDate, 'MMMM D, YYYY')
                              .add(key, retainerPaymentsPeriod)
                              .format('MMMM D, YYYY'),
                          payBy: moment(item.payBy, 'MMMM D, YYYY')
                              .add(key, retainerPaymentsPeriod)
                              .format('MMMM D, YYYY'),
                      })),
              ]
            : [];

    const tablePaymentsScheduleData = [
        ...preparedPaymentsMilestone,
        ...retainerPaymentsArray,
    ];
    const isTwoTablesOfPayments =
        tablePaymentsScheduleData.length &&
        preparedPaymentRetainer &&
        (paymentsRetainer?.numberOfPayments === '0' ||
            paymentsRetainer?.scheduleType === 'ongoing');

    const defaultLabelSection = 'Payment Schedule';

    return (
        <React.Fragment>
            {tablePaymentsScheduleData.length !== 0 && (
                <React.Fragment>
                    <HeaderReview
                        title={
                            (isTwoTablesOfPayments ? 'Milestone ' : '') +
                            defaultLabelSection
                        }
                    />
                    <TablePaymentSchedule
                        payments={tablePaymentsScheduleData}
                        isHideTypeColumn={
                            !(
                                preparedPaymentRetainer &&
                                paymentsRetainer?.numberOfPayments === '0'
                            ) && !preparedPaymentsMilestone.length
                        }
                        isHideTeamTakeColumn={userType === 'client'}
                    />
                </React.Fragment>
            )}
            {preparedPaymentRetainer &&
                (paymentsRetainer?.numberOfPayments === '0' ||
                    paymentsRetainer?.scheduleType === 'ongoing') && (
                    <React.Fragment>
                        <HeaderReview
                            title={
                                (isTwoTablesOfPayments ? 'Retainer ' : '') +
                                defaultLabelSection
                            }
                        />
                        <ReviewRetainerBlock
                            {...preparedPaymentRetainer}
                            paymentTerms={normalizedPaymentTerms}
                            paymentFrequency={normalizedPaymentFrequency}
                            userType={userType}
                        />
                    </React.Fragment>
                )}
        </React.Fragment>
    );
};
export default PaymentsSection;
