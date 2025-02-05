import React, { FC, ReactNode } from 'react';
import { StyledPaymentsWrapper } from './PaymentsWrapper.styled';
import {
    PaymentAccordion,
    PaymentButtonsType,
} from './paymentAccordion/PaymentAccordion';
import { TableColumnsConfigType } from '@breef/shared/ui-components';

interface PaymentsWrapperProps {
    columns: TableColumnsConfigType;
    rows: { id: number | string; [key: string]: ReactNode }[];
    mobileViewButtons?: ({ id: number | string } & PaymentButtonsType)[];
    isLoading: boolean;
    editableRow?: number | null;
    isAccessDenied?: boolean;
}
export const PaymentsWrapper: FC<PaymentsWrapperProps> = ({
    columns,
    rows,
    mobileViewButtons,
    isLoading,
    editableRow,
    isAccessDenied,
}) => {
    return (
        <StyledPaymentsWrapper isLoading={isLoading}>
            {isLoading && <span className="loader">Loading...</span>}
            <div className="accordions-container">
                {rows.map((payment, key) => (
                    <PaymentAccordion
                        key={key}
                        data={payment}
                        columns={columns}
                        buttons={mobileViewButtons?.find(
                            item => item.id === payment.id,
                        )}
                        editableRow={editableRow}
                        isEditable={editableRow === payment.id}
                        isAccessDenied={isAccessDenied}
                    />
                ))}
            </div>
        </StyledPaymentsWrapper>
    );
};
