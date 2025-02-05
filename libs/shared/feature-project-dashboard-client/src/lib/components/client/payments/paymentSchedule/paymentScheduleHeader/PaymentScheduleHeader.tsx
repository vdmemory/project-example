import { Button, LinkButton } from '@breef/shared/ui-components';
import React, { useContext } from 'react';
import { StyledPaymentScheduleHeader } from './PaymentScheduleHeader.styled';
import { PaymentActionType } from '@breef/shared/types';
import { TermsAndContracts } from '../termsAndContracts/TermsAndContracts';
import { useMediaContext } from '@breef/shared/hooks';
type Props = {
    title: string;
    role: 'client' | 'agency';
    linkDownloadContract?: string;
    paymentTerms?: number;
    handleAddOrEditPayments?: (isOpenDefault: boolean) => void;
    isKickoffView?: boolean;
    isAction?: boolean;
    actionType?: PaymentActionType;
};

const PaymentScheduleHeader: React.FC<Props> = ({
    title,
    role,
    linkDownloadContract,
    paymentTerms,
    handleAddOrEditPayments,
    isKickoffView = false,
    isAction = true,
    actionType,
}) => {
    const { isMobile } = useMediaContext();
    const handleAddPayment = () => {
        handleAddOrEditPayments && handleAddOrEditPayments(false);
    };
    const handleEditPayment = () => {
        handleAddOrEditPayments && handleAddOrEditPayments(true);
    };

    const onlyAddAction = (
        <div className="header-btn header-btn-edit">
            <LinkButton
                name={'+ ADD Payment'}
                className="download-link"
                onClick={
                    handleAddOrEditPayments ? handleAddPayment : () => undefined
                }
            />
        </div>
    );

    const addOrEditAction = (
        <>
            <div className="header-btn header-btn-edit">
                <LinkButton
                    name={'Edit retainer'}
                    className="download-link"
                    onClick={
                        handleAddOrEditPayments
                            ? handleEditPayment
                            : () => undefined
                    }
                />
            </div>
            {onlyAddAction}
        </>
    );

    const addWithOngoingAction = (
        <div className="header-btn header-btn-edit">
            <LinkButton
                name={'+ ADD Payment'}
                className="download-link"
                onClick={
                    handleAddOrEditPayments
                        ? handleEditPayment
                        : () => undefined
                }
            />
        </div>
    );

    const editOngoingSection = (
        <div className="header-btn header-btn-edit">
            <LinkButton
                name={'Edit retainer'}
                className="download-link"
                onClick={
                    handleAddOrEditPayments
                        ? handleEditPayment
                        : () => undefined
                }
            />
        </div>
    );

    const renderAgencyView = () => {
        if (!isAction) return null;
        if (!isKickoffView)
            return (
                <Button
                    border="all"
                    className="small"
                    title={!isMobile ? '+ Add New Payments' : '+ Add'}
                    color="secondary"
                    onClick={
                        handleAddOrEditPayments
                            ? () => handleAddOrEditPayments(false)
                            : () => undefined
                    }
                />
            );
        switch (actionType) {
            case 'add':
                return onlyAddAction;
            case 'addOrEdit':
                return addOrEditAction;
            case 'addWithOngoing':
                return onlyAddAction;
            case 'addWithOngoingEndRetainers':
                return addWithOngoingAction;
            case 'onlyEditOngoing':
                return editOngoingSection;
            default:
                return onlyAddAction;
        }
    };
    return (
        <StyledPaymentScheduleHeader isKickoffView={isKickoffView}>
            <h1 className="header-title">{title}</h1>
            <div className="header-buttons">
                {role === 'agency'
                    ? renderAgencyView()
                    : !isMobile && (
                          <TermsAndContracts
                              paymentTerms={paymentTerms}
                              linkDownloadContract={linkDownloadContract}
                          />
                      )}
            </div>
        </StyledPaymentScheduleHeader>
    );
};
export default PaymentScheduleHeader;
