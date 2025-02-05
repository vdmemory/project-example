import React from 'react';
import { StyledLeftSectionHeader } from './LeftSectionHeader.styled';
import { StatusTagType } from '@breef/shared/types';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StatusTag } from '@breef/ui-kit';
import { ucFirst } from '@breef/shared/utils';

interface LeftSectionHeaderProps {
    invoiceCode: string | number;
    invoiceDate: string;
    tag?: StatusTagType | null;
}

const LeftSectionHeader: React.FC<LeftSectionHeaderProps> = ({
    invoiceCode,
    invoiceDate,
    tag,
}) => {
    return (
        <StyledLeftSectionHeader>
            <h3>Invoice Due</h3>
            <div className="invoice-code">
                {invoiceCode}
                {tag && (
                    <StatusTag title={tag.title} sentiment={tag.sentiment} />
                )}
            </div>
            <p className="invoice-date">
                invoice date: <span>{invoiceDate}</span>
            </p>
        </StyledLeftSectionHeader>
    );
};
export default LeftSectionHeader;
