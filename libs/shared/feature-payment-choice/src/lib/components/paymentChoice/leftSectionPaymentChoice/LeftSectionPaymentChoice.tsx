import React from 'react';
import { StyledLeftSectionPaymentChoice } from './LeftSectionPaymentChoice.styled';
import { StatusTagType } from '@breef/shared/types';
import LeftSectionHeader from './leftSectionHeader/LeftSectionHeader';
import LeftSectionTable from './leftSectionTable/LeftSectionTable';
import { replaceAmountToString } from '@breef/shared/utils';

export interface LeftSectionPaymentPropsChoice {
    invoiceCode: string | number;
    invoiceDate: string;
    tag: StatusTagType | null;
    agencyName: string;
    agencyLogo: string;
    dueDate: string;
    deliverable: string;
    amount: number;
    total: number;
    paymentType: string;
    handleDownloadInvoice: () => void;
    invoiceIsLoaded?: boolean;
}

const LeftSectionPaymentChoice: React.FC<LeftSectionPaymentPropsChoice> = ({
    invoiceCode,
    invoiceDate,
    tag,
    agencyLogo,
    agencyName,
    dueDate,
    amount,
    deliverable,
    paymentType,
    handleDownloadInvoice,
    invoiceIsLoaded,
}) => {
    const replaceDate = (date: string): string => {
        return date.replace(/-/g, '/');
    };

    return (
        <StyledLeftSectionPaymentChoice className="left-section">
            <div className="section-wrapper">
                <LeftSectionHeader
                    invoiceCode={invoiceCode}
                    invoiceDate={replaceDate(invoiceDate)}
                    tag={tag}
                />

                <LeftSectionTable
                    invoiceCode={invoiceCode}
                    agencyLogo={agencyLogo}
                    handleDownloadInvoice={handleDownloadInvoice}
                    invoiceIsLoaded={invoiceIsLoaded}
                    agencyName={agencyName}
                    deliverable={deliverable}
                    paymentType={paymentType}
                    amount={replaceAmountToString(amount)}
                    dueDate={replaceDate(dueDate)}
                />
            </div>
        </StyledLeftSectionPaymentChoice>
    );
};

export default LeftSectionPaymentChoice;
