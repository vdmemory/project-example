import React, { Fragment, useEffect } from 'react';
import { StyledRequestStatusPage } from './RequestStatusPage.styled';
import { HeartBreakIcon, HiFiveIcon } from '@breef/shared/assets';
import { calculateAmountFee, replaceAmountToString } from '@breef/shared/utils';
import { PAYMENT_COMMISSION_BY_CREDIT_CARD } from '@breef/shared/constants';
import Button from '../button/Button';

export type SuccessBodyType = {
    transaction: string;
    amount: string;
    name?: string;
    last4?: string;
};

export type RequestStatusProps = {
    status: 'success' | 'failed';
    successBody?: SuccessBodyType | null;
    typeData?: 'bank' | 'card';
    handleClickButton: () => void;
    withCardFee?: boolean;
    setIsSuccessTag?: (isSuccessTag: boolean) => void;
};

export const RequestStatusPage: React.FC<RequestStatusProps> = ({
    status,
    successBody,
    typeData,
    handleClickButton,
    withCardFee = true,
    setIsSuccessTag,
}) => {
    const buttonTitle =
        status === 'success' ? 'BACK TO DASHBOARD' : 'RETRY PAYMENT';

    useEffect(() => {
        setIsSuccessTag && setIsSuccessTag(true);
    });

    const renderSuccessScreen = () => {
        return (
            <Fragment>
                <HiFiveIcon className="icon" />
                <h3>Payment successful!</h3>
                {successBody ? (
                    <SuccessBody
                        {...successBody}
                        typeData={typeData}
                        withCardFee={withCardFee}
                    />
                ) : (
                    <p className="body-text">
                        Your agency will receive funds shortly
                    </p>
                )}
            </Fragment>
        );
    };

    const renderFailedScreen = () => {
        return (
            <Fragment>
                <HeartBreakIcon className="icon" />
                <h3>Payment failed</h3>
                <p className="body-text">
                    It looks like there was an issue with the payment
                    information provided. Please double-check and try again
                </p>
            </Fragment>
        );
    };

    return (
        <StyledRequestStatusPage className="section-status-request">
            <div className="page-wrapper">
                {status === 'success'
                    ? renderSuccessScreen()
                    : renderFailedScreen()}
                <Button
                    title={buttonTitle}
                    className="button"
                    onClick={handleClickButton}
                />
            </div>
        </StyledRequestStatusPage>
    );
};

export default RequestStatusPage;

export const SuccessBody = ({
    transaction,
    amount,
    name,
    last4,
    typeData,
    withCardFee,
}: SuccessBodyType & { typeData?: string; withCardFee: boolean }) => {
    const getInfoData = (): {
        label: string;
        value: string;
    } => {
        if (typeData === 'bank')
            return {
                label: 'bank',
                value: name || '',
            };

        return {
            label: 'card',
            value: `•••• ${last4}`,
        };
    };

    const getAmount = () => {
        if (typeData === 'bank' || !withCardFee) {
            return replaceAmountToString(Number(amount));
        }

        const fee = calculateAmountFee(
            Number(amount),
            PAYMENT_COMMISSION_BY_CREDIT_CARD,
        );
        const cardAmount = Number(amount) + fee;
        return replaceAmountToString(cardAmount);
    };

    return (
        <Fragment>
            <p className="body-text">Transaction number: {transaction}</p>
            <div className="divider"></div>
            <div className="payment-info">
                <div className="payment-info-item">
                    <Info label="amount paid" value={getAmount()} />
                </div>
                {typeData && (last4 || name) ? (
                    <div className="payment-info-item">
                        <Info {...getInfoData()} />
                    </div>
                ) : null}
            </div>
        </Fragment>
    );
};

export const Info = ({ label, value }: { label: string; value: string }) => {
    return (
        <Fragment>
            <p className="payment-info-item-key">{label}:</p>
            <p className="payment-info-item-value">{value}</p>
        </Fragment>
    );
};
