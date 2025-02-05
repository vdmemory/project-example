import { PlusIcon, DrawCircle, checkoutPhones } from '@breef/shared/assets';
import CouponApplication from './couponApplication/CouponApplication';
import {
    StyledNextStepSection,
    StyledPayInformation,
} from './PayInformation.styled';
import { useState } from 'react';
import { Button, Check16x16Thing, ScreensImage } from '@breef/ui-kit';
import { useMediaContext } from '@breef/shared/hooks';
import { LinkButton } from '@breef/shared/ui-components';
interface PayInformationProps {
    price: number;
    discountPrice: number | null;
    couponName: string | null;
    onClick: (value: string | null) => void;
    isSubmitted?: boolean;
    error?: string;
}

export const PayInformation = ({
    price,
    discountPrice,
    couponName,
    onClick,
    isSubmitted,
    error,
}: PayInformationProps) => {
    const [isOpenCouponField, setIsOpenCouponField] = useState<boolean>(false);
    const handleOpenCouponField = () => {
        setIsOpenCouponField(!isOpenCouponField);
    };

    const renderCouponBlock = () => {
        const discount = price - (discountPrice ?? 0);

        if (!isOpenCouponField && !couponName) {
            return (
                <LinkButton
                    name="Discount Code"
                    className="button-add"
                    onClick={handleOpenCouponField}
                    icon="plus"
                />
            );
        }
        return (
            <CouponApplication
                error={error}
                isSubmitted={isSubmitted}
                couponName={couponName}
                discount={discount}
                onClick={onClick}
                onRemove={() => setIsOpenCouponField(false)}
            />
        );
    };

    const renderPaymentInfoRow = (
        title: string,
        value: number,
        isTotal?: boolean,
    ) => (
        <div
            className={
                isTotal ? 'payment-info-row total-value' : 'payment-info-row'
            }
        >
            <span>{title}</span>
            <span>${value}</span>
        </div>
    );

    const title = 'Post your project';
    const description =
        'We charge a one-time project posting fee so that you can receive agency pitches on Breef. We guarantee you’ll find the right team.';

    return (
        <StyledPayInformation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <NextStepSection />
            <div className="coupon-section">
                <h3 className="title">{title}</h3>
                <p className="description">{description}</p>
                <div className="divider"></div>
                <div className="payment-info-wrapper">
                    {renderPaymentInfoRow('Subtotal', price)}
                    <div className="coupon-block">{renderCouponBlock()}</div>
                    <div className="divider"></div>
                    {renderPaymentInfoRow(
                        'Total',
                        discountPrice ?? price,
                        true,
                    )}
                </div>
            </div>
        </StyledPayInformation>
    );
};

export default PayInformation;

const NextStepSection = () => {
    const renderBenefit = (title: string) => (
        <div className="benefit-row">
            <Check16x16Thing />
            <span>{title}</span>
        </div>
    );

    return (
        <StyledNextStepSection>
            <h1 className="title">Let’s get you agency pitches!</h1>
            <div className="benefits">
                {renderBenefit('Vetted agencies')}
                {renderBenefit('Pitches in 5 days')}
                {renderBenefit('Expert project support')}
            </div>
            <ScreensImage className="screen" />
        </StyledNextStepSection>
    );
};
