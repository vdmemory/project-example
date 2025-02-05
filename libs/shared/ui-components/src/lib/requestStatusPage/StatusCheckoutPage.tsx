import React, { Fragment, useEffect } from 'react';
import {
    globalStyles,
    StyledStatusCheckoutPage,
} from './StatusCheckoutPage.styled';
import { calculateAmountFee, replaceAmountToString } from '@breef/shared/utils';
import { PAYMENT_COMMISSION_BY_CREDIT_CARD } from '@breef/shared/constants';
import Button from '../button/Button';
import { CheckLgIcon, FailedIcon } from '@breef/ui-kit';
import { Global } from '@emotion/react';

type SuccessBodyCheckoutType = {
    transaction: string;
    amount: string;
    name?: string;
    last4?: string;
};

export type StatusCheckoutPageProps = {
    status: 'success' | 'failed';
    successBody?: SuccessBodyCheckoutType | null;
    failedBody?: string | null;
    handleClickButton: () => void;
    withCardFee?: boolean;
    setIsSuccessTag?: (isSuccessTag: boolean) => void;
};

export const StatusCheckoutPage: React.FC<StatusCheckoutPageProps> = ({
    status,
    successBody,
    failedBody,
    handleClickButton,
    withCardFee = true,
    setIsSuccessTag,
}) => {
    const buttonTitle =
        status === 'success' ? 'RETURN TO DASHBOARD' : 'RETRY PAYMENT';

    useEffect(() => {
        setIsSuccessTag && setIsSuccessTag(true);
    });

    const renderSuccessScreen = () => {
        return (
            <Fragment>
                <Global styles={globalStyles} />
                <CheckLgIcon className="icon" />
                <h3>Project Posted</h3>
                <p className="body-text">
                    {`Your Strategist will be in touch with information about your agency pitches + next steps.`}
                </p>
                {successBody && (
                    <SuccessBody {...successBody} withCardFee={withCardFee} />
                )}
            </Fragment>
        );
    };

    const renderFailedScreen = () => {
        return (
            <Fragment>
                <Global styles={globalStyles} />
                <FailedIcon className="icon" />
                <h3>Payment failed</h3>
                {failedBody && <p className="body-text">{failedBody}</p>}
            </Fragment>
        );
    };

    return (
        <StyledStatusCheckoutPage className="section-status-request">
            <div
                className={`page-wrapper ${
                    status === 'success' ? 'success' : 'failed'
                }`}
            >
                {status === 'success'
                    ? renderSuccessScreen()
                    : renderFailedScreen()}
                <Button
                    title={buttonTitle}
                    className="button"
                    onClick={handleClickButton}
                />
            </div>
        </StyledStatusCheckoutPage>
    );
};

export default StatusCheckoutPage;

const SuccessBody = ({
    transaction,
    amount,
    name,
    last4,
    withCardFee,
}: SuccessBodyCheckoutType & { withCardFee: boolean }) => {
    const getInfoData = (): {
        label: string;
        value: string;
    } => {
        return {
            label: 'card',
            value: `**** ${last4}`,
        };
    };

    const getAmount = () => {
        if (!withCardFee) {
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
            <div className="divider"></div>
            <div className="payment-info">
                <div className="payment-info-item">
                    <InfoBlock label="amount paid" value={getAmount()} />
                </div>
                {last4 || name ? (
                    <div className="payment-info-item">
                        <InfoBlock {...getInfoData()} />
                    </div>
                ) : null}
            </div>
            <p className="foot-text">
                {`Transaction number: \n`}
                <strong>{transaction}</strong>
            </p>
        </Fragment>
    );
};

export const InfoBlock = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => {
    return (
        <Fragment>
            <p className="payment-info-item-key">{label}:</p>
            <p className="payment-info-item-value">
                <strong>{value}</strong>
            </p>
        </Fragment>
    );
};
