import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledCouponApplication } from './CouponApplication.styled';
import { Button, CloseMediumIcon } from '@breef/ui-kit';

interface CouponApplicationProps {
    isSubmitted?: boolean;
    couponName: string | null;
    discount: number | null;
    onClick: (value: string | null) => void;
    onRemove: () => void;
    error?: string;
}

export const CouponApplication = ({
    isSubmitted,
    couponName,
    discount,
    onClick,
    onRemove,
    error: errorProp,
}: CouponApplicationProps) => {
    const errorMessage = 'Please enter a discount code';

    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    const [error, setError] = useState<string>(errorProp || '');

    useEffect(() => {
        setError(errorProp || '');
        if (errorProp) {
            inputRef.current?.focus();
        }
    }, [errorProp]);

    const handleClickApply = () => {
        if (value) {
            onClick(value);
        } else {
            setError(errorMessage);
            inputRef.current?.focus();
        }
    };

    useEffect(() => {
        if (isSubmitted) return;
        setValue('');
    }, [isSubmitted]);

    const handleClickRemove = () => {
        onClick(null);
        onRemove();
    };

    const handleChangeCoupon = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        error && setError('');
    };

    const renderAppliedCoupon = () => (
        <div className="applied-coupon">
            <div className="applied-coupon-row">
                <button data-testid="btn-remove" onClick={handleClickRemove}>
                    <span className="coupon-name">{couponName}</span>
                    <CloseMediumIcon />
                </button>
            </div>
            <div className="applied-coupon-row">
                <span>-${discount}</span>
            </div>
        </div>
    );

    const renderInputCoupon = () => (
        <Fragment>
            <div className="discount-field">
                <input
                    ref={inputRef}
                    readOnly={!!couponName}
                    className="coupon-field"
                    placeholder="Enter a discount code"
                    type="text"
                    value={value}
                    onChange={handleChangeCoupon}
                    maxLength={100}
                    onBlur={() => setError('')}
                />
                <Button
                    className={`btn-apply ${isSubmitted ? 'submitted' : ''}`}
                    isSubmitted={isSubmitted}
                    onClick={handleClickApply}
                    label="Apply"
                    variant="outlined"
                    size="small"
                />
            </div>
            {error ? <p className="coupon-field-error">{error}</p> : null}
        </Fragment>
    );

    return (
        <StyledCouponApplication>
            <div className="coupon-view">
                {couponName ? renderAppliedCoupon() : renderInputCoupon()}
            </div>
        </StyledCouponApplication>
    );
};

export default CouponApplication;
