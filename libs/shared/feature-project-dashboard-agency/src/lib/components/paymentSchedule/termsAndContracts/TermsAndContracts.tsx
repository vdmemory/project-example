import React, { FC } from 'react';
import { StyledTermsAndContracts } from './TermsAndContracts.styled';
import { DownloadInvoiceIconMin } from '@breef/shared/assets';

interface TermsAndContractsProps {
    linkDownloadContract: string;
    paymentTerms?: number;
    downloadText?: string;
    className?: string;
}

export const TermsAndContracts: FC<TermsAndContractsProps> = ({
    paymentTerms,
    linkDownloadContract,
    downloadText = 'Download Contracts',
    className,
}) => {
    return (
        <StyledTermsAndContracts className={className}>
            {paymentTerms !== undefined && (
                <span className="header-terms" data-testid="payment-terms">
                    Payment Terms: NET {paymentTerms}
                </span>
            )}
            <div className="header-btn">
                <a
                    className="download-link"
                    href={linkDownloadContract}
                    target="_blank"
                    rel="noreferrer"
                >
                    <DownloadInvoiceIconMin />
                    {downloadText}
                </a>
            </div>
        </StyledTermsAndContracts>
    );
};
