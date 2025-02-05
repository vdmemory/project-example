import {
    Button,
    InnerDatePicker,
    withPopup,
} from '@breef/shared/ui-components';
import moment from 'moment';
import React, { useState } from 'react';
import { StyledEditInvoicePopUp } from './EditInvoicePopUp.styled';

type Props = {
    invoiceDate: string;
    currentDate: string;
    paymentId: number;
    minDate?: string;
    handleEditInvoice: ({
        paymentId,
        invoiceDate,
    }: {
        paymentId: number;
        invoiceDate: string;
    }) => void;
};

const EditInvoicePopUp: React.FC<Props> = ({
    invoiceDate,
    paymentId,
    currentDate,
    handleEditInvoice,
    minDate,
}) => {
    const [newInvoiceDate, setNewInvoiceDate] = useState('');
    const isDisabledCurrentDate =
        moment(invoiceDate).diff(currentDate, 'd') > 0;
    return (
        <StyledEditInvoicePopUp>
            <div className="modal-header">Update Invoice Date</div>
            <div
                className={
                    isDisabledCurrentDate
                        ? 'modal-body modal-body-disabled'
                        : 'modal-body'
                }
            >
                <p className="modal-body-label">New invoice date:</p>
                <InnerDatePicker
                    value={newInvoiceDate || invoiceDate}
                    onChange={setNewInvoiceDate}
                    minDate={new Date(minDate || invoiceDate)}
                    dateFormat={'MM.DD.YY'}
                    //If you want to use the date format depending on the location - add localeFormat
                />
            </div>
            <Button
                className="modal-btn"
                type="button"
                arrowRight
                disabled={!newInvoiceDate}
                withAnimate
                onClick={() =>
                    handleEditInvoice({
                        invoiceDate: newInvoiceDate,
                        paymentId: paymentId,
                    })
                }
            >
                Update
            </Button>
            <div></div>
        </StyledEditInvoicePopUp>
    );
};
export default withPopup(EditInvoicePopUp);
