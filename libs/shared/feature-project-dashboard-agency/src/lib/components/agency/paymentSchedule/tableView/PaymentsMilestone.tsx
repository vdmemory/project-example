import React from 'react';
import PaymentScheduleHeader from '../../../paymentSchedule/paymentScheduleHeader/PaymentScheduleHeader';
import { TablePaymentSchedule } from '@breef/shared/ui-components';
import {
    KickoffRequestType,
    PaymentActionType,
    PaymentsTable,
} from '@breef/shared/types';

type Props = {
    handleAddOrEditPayments: (isDefaultOpenOngoingBlock?: boolean) => void;
    link: string;
    kickoffStatus: KickoffRequestType['status'];
    paymentsMilestone: PaymentsTable[];
    handleEditInvoice?: ({
        paymentId,
        invoiceDate,
    }: {
        paymentId: number;
        invoiceDate: string;
    }) => void;
    isAction: boolean;
    actionType?: PaymentActionType;
};

const PaymentsMilestone: React.FC<Props> = ({
    handleAddOrEditPayments,
    handleEditInvoice,
    link,
    kickoffStatus,
    paymentsMilestone,
    actionType,
    isAction,
}) => {
    return (
        <>
            <div className="schedule-header">
                <PaymentScheduleHeader
                    role="agency"
                    title="Payment schedule"
                    handleAddOrEditPayments={handleAddOrEditPayments}
                    linkDownloadContract={link}
                    isKickoffView
                    isAction={isAction}
                    actionType={actionType}
                />
            </div>
            <TablePaymentSchedule
                payments={paymentsMilestone}
                isHideTypeColumn={false}
                isHideTeamTakeColumn={false}
                onEdit={handleEditInvoice}
                isAction={kickoffStatus !== 'approved_by_breef'}
            />{' '}
        </>
    );
};
export default PaymentsMilestone;
