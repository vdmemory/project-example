import React from 'react';

import { StyledPaymentScheduleStep } from './TablePaymentSchedule.styled';
import { EditIcon } from '@breef/shared/assets';
import TableHeaderCell from '../../tableHeaderCell/TableHeaderCell';
import MobileRowItem from './mobileRowItem/MobileRowItem';
import moment from 'moment';
import { PaymentsTable } from '@breef/shared/types';
import { useMediaContext } from '@breef/shared/hooks';

interface TablePaymentScheduleProps {
    payments: PaymentsTable[];
    isHideTypeColumn?: boolean;
    isHideTeamTakeColumn?: boolean;
    isAction?: boolean;
    onEdit?: ({
        paymentId,
        invoiceDate,
    }: {
        paymentId: number;
        invoiceDate: string;
    }) => void;
}

export const TablePaymentSchedule: React.FC<TablePaymentScheduleProps> = ({
    payments,
    isHideTypeColumn = false,
    isHideTeamTakeColumn = false,
    isAction = false,
    onEdit,
}) => {
    const { isMobile } = useMediaContext();
    const appendZeros = (value: number) => {
        const stringValue = value + '';
        const countZeros = 4 - stringValue.length;
        return '0'.repeat(countZeros) + stringValue;
    };

    const countMilestones = payments.filter(item =>
        item.type?.match(/milestone/gi),
    ).length;
    const payByTooltipText = 'This is invoice date + terms';
    const teamTakeTooltipText =
        "What your team earns (amount - Breef's fee, which will vary depending on payment type)";

    return (
        <StyledPaymentScheduleStep className="table-payment">
            {!isMobile ? (
                <React.Fragment>
                    <thead>
                        <tr>
                            <TableHeaderCell label="Payment #" />
                            {!isHideTypeColumn && (
                                <TableHeaderCell label="Type" />
                            )}
                            <TableHeaderCell label="Invoice Date" />
                            <TableHeaderCell
                                label="Pay by"
                                tooltipText={payByTooltipText}
                                tooltipPosition="top"
                            />
                            <TableHeaderCell label="Deliverable" />
                            <TableHeaderCell label="Amount" />
                            {!isHideTeamTakeColumn && (
                                <TableHeaderCell
                                    label="Team Take"
                                    tooltipText={teamTakeTooltipText}
                                    tooltipPosition="top-end"
                                />
                            )}
                            {onEdit && isAction && <TableHeaderCell label="" />}
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item, key) => (
                            <tr key={key} className="main-table-row">
                                <td>{appendZeros(key + 1)}</td>
                                {!isHideTypeColumn && <td>{item.type}</td>}
                                <td>{item.invoiceDate}</td>
                                <td>{item.payBy}</td>
                                <td>{item.deliverable}</td>
                                <td>{item.amount}</td>
                                {!isHideTeamTakeColumn && (
                                    <td>{item.teamTake}</td>
                                )}
                                {onEdit && isAction && (
                                    <td
                                        data-testid="edit-cell-btn"
                                        className="main-table-row-edit"
                                        onClick={() => {
                                            onEdit({
                                                invoiceDate: moment(
                                                    item.invoiceDate,
                                                    'MMMM D, YYYY',
                                                ).format(),
                                                paymentId: item.id || 0,
                                            });
                                        }}
                                    >
                                        <EditIcon />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </React.Fragment>
            ) : (
                payments.map((item, key) => (
                    <div key={key} className="mobile-payment-block">
                        <div className="payment-header">
                            <div className="payment-header-title">
                                <span>{appendZeros(key + 1)}</span>
                                {!isHideTypeColumn && (
                                    <span>
                                        {item.type}&nbsp;
                                        {item.type?.match(/milestone/gi)
                                            ? key + 1
                                            : key + 1 - countMilestones}
                                    </span>
                                )}
                            </div>

                            {onEdit && isAction && (
                                <span
                                    className="payment-header-edit"
                                    onClick={() =>
                                        onEdit({
                                            invoiceDate: moment(
                                                item.invoiceDate,
                                                'MMMM D, YYYY',
                                            ).format(),
                                            paymentId: item.id || 0,
                                        })
                                    }
                                >
                                    <EditIcon />
                                </span>
                            )}
                        </div>
                        {!isHideTypeColumn && (
                            <MobileRowItem
                                title="Type"
                                value={item.type || ''}
                            />
                        )}
                        <MobileRowItem
                            title="Invoice Date"
                            value={item.invoiceDate}
                        />
                        <MobileRowItem
                            title="Pay by"
                            value={item.payBy}
                            tooltipText={payByTooltipText}
                            tooltipPosition="top"
                        />
                        <MobileRowItem
                            title="Deliverable"
                            value={item.deliverable}
                        />
                        <MobileRowItem title="Amount" value={item.amount} />
                        {!isHideTeamTakeColumn && (
                            <MobileRowItem
                                title="Team Take"
                                value={item.teamTake}
                                tooltipText={teamTakeTooltipText}
                                tooltipPosition="top"
                            />
                        )}
                    </div>
                ))
            )}
        </StyledPaymentScheduleStep>
    );
};
export default TablePaymentSchedule;
