import React, { FC, useState } from 'react';
import { DefaultPopup } from '../DefaultPopup';
import PopupField from '../../popupField/PopupField';
import { withPopup } from '../../Popup';

interface EditPaymentDeliverablePopupStyled {
    onChange: (value: string) => void;
    initialValue: string;
    invoiceCode: string;
    close: () => void;
}

const EditPaymentDeliverablePopup: FC<EditPaymentDeliverablePopupStyled> = ({
    onChange,
    initialValue,
    invoiceCode,
    close,
}) => {
    const [value, setValue] = useState(initialValue);

    return (
        <DefaultPopup
            label={
                <>
                    Edit Payment&nbsp;
                    <span className="accent-color">{invoiceCode}</span>
                </>
            }
            isDisabledBtn={!value}
            buttonTitle="Save"
            buttonView="uppercase"
            onClick={() => {
                onChange(value);
                close();
            }}
        >
            <PopupField
                label="Description"
                labelView="uppercase"
                placeholder="Description"
                onChange={e => setValue(e.target.value)}
                value={value}
                maxLength={500}
            />
        </DefaultPopup>
    );
};

export default withPopup(EditPaymentDeliverablePopup);
