import {
    DropzoneOld,
    InnerFieldWrapper,
    Tooltip,
} from '@breef/shared/ui-components';
import { getBankIcon } from '@breef/shared/utils';
import { StyledPaymentSummary } from './PaymentSummary.styled';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CopyIcon, DocumentIcon, TrashIcon, UploadIcon } from '@breef/ui-kit';
import { Fragment, useState } from 'react';
import { paymentSummaryConfig } from './paymentSummaryConfig';

export interface RenderInnerFieldProps {
    labelText: string;
    content: string;
    withCopy?: boolean;
    id: string;
}
export interface PaymentSummaryProps {
    bankAccount?: {
        accountNumber: string;
        routingNumber: string;
        bankName: string;
    };
    code?: string;
    handleUploadFile: (files: File[]) => void;
    handleDeleteDocument: () => void;
    documentTitle: string;
    uploading?: boolean;
}

export const PaymentSummary = ({
    bankAccount,
    code,
    documentTitle,
    handleUploadFile,
    handleDeleteDocument,
    uploading,
}: PaymentSummaryProps) => {
    const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);
    const [copyElementId, setCopyElementId] = useState<string>('');

    const renderInnerField = ({
        labelText,
        content,
        withCopy = false,
        id,
    }: RenderInnerFieldProps) => {
        const handleCopyPaymentInfo = () => {
            navigator.clipboard.writeText(content);
            setIsOpenTooltip(true);
            setCopyElementId(id);

            setTimeout(() => {
                setIsOpenTooltip(false);
                setCopyElementId('');
            }, 1000);
        };

        return (
            <InnerFieldWrapper labelText={labelText} key={id}>
                <div className={`payment-content`}>
                    {content}
                    {withCopy && (
                        <Tooltip
                            placement="top"
                            className="tooltip"
                            label={'Copied!'}
                            isOpenTooltip={
                                isOpenTooltip && copyElementId === id
                            }
                        >
                            <CopyIcon onClick={handleCopyPaymentInfo} />
                        </Tooltip>
                    )}
                </div>
            </InnerFieldWrapper>
        );
    };

    const renderBankAccount = () => {
        const { accountNumber, routingNumber, bankName } = bankAccount || {};

        const paymentSummary = paymentSummaryConfig({
            accountNumber: accountNumber || '',
            routingNumber: routingNumber || '',
        });

        return (
            <Fragment>
                <div className="payment-bank">
                    {getBankIcon(bankName || '')}
                    <span className="payment-bank-name">{bankName}</span>
                </div>
                <div className="payment-summary-wrapper">
                    {paymentSummary.map(renderInnerField)}

                    {code &&
                        renderInnerField({
                            content: code,
                            id: 'swift-code',
                            labelText: 'SWIFT',
                            withCopy: true,
                        })}
                </div>

                <div
                    className={
                        documentTitle.length
                            ? 'payment-summary-document'
                            : 'payment-summary-dropzone'
                    }
                >
                    {documentTitle.length ? (
                        <>
                            <div className="payment-summary-document-info">
                                <DocumentIcon className="document-icon" />
                                {documentTitle}
                            </div>
                            <TrashIcon
                                className="trash-icon"
                                onClick={handleDeleteDocument}
                            />
                        </>
                    ) : (
                        <DropzoneOld
                            uploading={uploading}
                            placeholder="Upload remittance"
                            tip="Supported file types: pdf, doc, docx, png, jpg, jpeg <10MB"
                            onChange={handleUploadFile}
                            disabled={false}
                            iconImg={<UploadIcon />}
                            acceptFileTypes="all"
                        />
                    )}
                </div>
            </Fragment>
        );
    };

    return (
        <StyledPaymentSummary>
            <div className="payment-summary">
                {bankAccount ? renderBankAccount() : null}
            </div>
        </StyledPaymentSummary>
    );
};

export default PaymentSummary;
