import React, { Fragment } from 'react';

export const useConcatPaymentCodes = () => {
    const renderPaymentCode = (code: string) => (
        <span className="accent-color">{code}</span>
    );

    return (codes: string[]) =>
        codes.map((codeItem, idx) => {
            const paymentCodeElem = renderPaymentCode(codeItem);
            if (idx === codes.length - 1)
                return <Fragment key={idx}>{paymentCodeElem}</Fragment>;
            if (idx === codes.length - 2)
                return (
                    <Fragment key={idx}>
                        {paymentCodeElem}&nbsp;and&nbsp;
                    </Fragment>
                );
            return <Fragment key={idx}>{paymentCodeElem},&nbsp;</Fragment>;
        });
};
