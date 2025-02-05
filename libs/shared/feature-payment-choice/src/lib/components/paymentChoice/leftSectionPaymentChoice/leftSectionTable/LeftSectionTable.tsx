import React, { Fragment } from 'react';
import { StyledLabel, StyledLeftSectionTable } from './LeftSectionTable.styled';
import { DownloadInvoiceIcon, LogoDesktopImage } from '@breef/shared/assets';
import { Spinner } from '@breef/shared/ui-components';
import { ucFirst } from '@breef/shared/utils';
import { useMediaContext } from '@breef/shared/hooks';
import { AvatarImage } from '@breef/ui-kit';

interface SectionTableProps {
    invoiceCode: string | number;
    agencyLogo: string;
    agencyName: string;
    dueDate: string;
    amount: string;
    deliverable: string;
    paymentType: string;
    handleDownloadInvoice: () => void;
    invoiceIsLoaded?: boolean;
}

const LeftSectionTable: React.FC<SectionTableProps> = ({
    invoiceCode,
    agencyLogo,
    agencyName,
    dueDate,
    amount,
    deliverable,
    paymentType,
    handleDownloadInvoice,
    invoiceIsLoaded,
}) => {
    const { isMaxMobile } = useMediaContext();

    const renderDownloadInvoice = () => {
        if (invoiceIsLoaded) {
            return (
                <div className="table-header-invoice-loader">
                    <Spinner />
                </div>
            );
        }

        return (
            <DownloadInvoiceIcon
                className="table-header-invoice-download"
                onClick={handleDownloadInvoice}
            />
        );
    };

    const renderDueDateLabel = () => {
        if (isMaxMobile) return renderDownloadInvoice();

        return (
            <Fragment>
                <StyledLabel>due date</StyledLabel>
                <p className="table-body-agency-due">{dueDate}</p>
            </Fragment>
        );
    };

    return (
        <StyledLeftSectionTable>
            <div className="table-header">
                <LogoDesktopImage />
                <div>
                    <StyledLabel>invoice</StyledLabel>
                    <div className="table-header-invoice">
                        {invoiceCode}
                        {renderDownloadInvoice()}
                    </div>
                </div>
            </div>
            <div className="table-body">
                <div className="table-body-agency">
                    <div>
                        <StyledLabel>pay to</StyledLabel>
                        <div className="table-body-agency-info">
                            <AvatarImage
                                className="table-body-agency-info-img"
                                src={agencyLogo}
                                alt="agency-logo"
                                width={24}
                                height={24}
                            />
                            {ucFirst(agencyName)}
                        </div>
                    </div>
                    <div>{renderDueDateLabel()}</div>
                </div>
                <div className="table-body-services">
                    <span className="table-body-services-tab">Service</span>
                    <div className="table-body-services-deliverable">
                        <div>
                            <p className="table-body-services-deliverable-description">
                                {ucFirst(deliverable)}
                            </p>
                            <p className="table-body-services-deliverable-type">
                                {paymentType}
                            </p>
                        </div>
                        <span className="table-body-services-deliverable-amount">
                            {amount}
                        </span>
                    </div>
                </div>
            </div>
            <div className="table-footer">
                <p className="table-footer-label">Payment total</p>
                <p className="table-footer-total">{amount}</p>
            </div>
        </StyledLeftSectionTable>
    );
};
export default LeftSectionTable;
