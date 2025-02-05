import {
    FullPaymentScheduleAgency,
    PaymentStatusType,
} from '@breef/shared/types';
import { usePaymentTag } from './usePaymentTag';
import {
    capitalizeFirstLetter,
    formatBudgetCost,
    limitSymbols,
} from '@breef/shared/utils';
import {
    Button,
    CustomDropdown,
    EditableElem,
    EditPaymentDeliverablePopup,
    usePopup,
} from '@breef/shared/ui-components';
import moment from 'moment';
import React, {
    use,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { ChevronSmallStraightThing, EditIconSmall } from '@breef/shared/assets';
import EditInvoicePopUp from '../components/agency/paymentSchedule/editInvoiceModal/EditInvoicePopUp';
import {
    useLazyDownloadInvoiceDocumentQuery,
    useLazyDownloadReceiptDocumentQuery,
    useUpdatePaymentMutation,
} from '@breef/shared/data-access-payments';
import { toast } from 'react-toastify';
import {
    PaymentSchedule,
    PaymentScheduleRequest,
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
} from '@breef/shared/constants';
import { useMediaContext } from '@breef/shared/hooks';

enum PaymentActionsNames {
    EDIT = 'edit',
    DOWNLOAD_INVOICE = 'downloadInvoice',
    DOWNLOAD_RECEIPT = 'downloadReceipt',
    CANCEL = 'cancel',
    SAVE = 'save',
}

const dataItems = {
    editPaymentItem: {
        value: PaymentActionsNames.EDIT,
        label: 'Edit Payment',
    },
    downloadInvoiceItem: {
        value: PaymentActionsNames.DOWNLOAD_INVOICE,
        label: 'Download Invoice',
    },
    downloadReceiptItem: {
        value: PaymentActionsNames.DOWNLOAD_RECEIPT,
        label: 'Download Receipt',
    },
    cancelPaymentItem: {
        value: PaymentActionsNames.CANCEL,
        label: 'Cancel Payment',
        component: <span className="accent-red">Cancel Payment</span>,
    },
};

const getPaymentDropdownActions = (status: PaymentStatusType) => {
    const dropdownActionList = [];

    if (status === PaymentScheduleRequest.paid) {
        dropdownActionList.push(dataItems.downloadReceiptItem);
    }

    if (status === PaymentScheduleRequest.awaiting) {
        dropdownActionList.push(dataItems.editPaymentItem);
    }

    if (
        status === PaymentScheduleRequest.awaiting ||
        status === PaymentScheduleRequest.approval
    ) {
        dropdownActionList.push(dataItems.cancelPaymentItem);
    }

    if (
        status !== PaymentScheduleRequest.awaiting &&
        status !== PaymentScheduleRequest.approval &&
        status !== PaymentScheduleRequest.cancelled &&
        status !== PaymentScheduleRequest.paid
    ) {
        dropdownActionList.push(dataItems.downloadInvoiceItem);
    }

    return dropdownActionList;
};

export const useTableRowsAgency = (
    payments: FullPaymentScheduleAgency[],
    isLoadingPayments: boolean,
) => {
    const { isMobile } = useMediaContext();
    const { getPaymentTagComponent } = usePaymentTag();
    const [
        updatePayment,
        {
            isLoading: isLoadingUpdatePayment,
            isSuccess: isSuccessUpdatePayment,
        },
    ] = useUpdatePaymentMutation();

    const [
        downloadInvoice,
        { isFetching: isLoadingInvoice, isError: isErrorInvoice },
    ] = useLazyDownloadInvoiceDocumentQuery();
    const [
        downloadReceipt,
        { isFetching: isLoadingReceipt, isError: isErrorReceipt },
    ] = useLazyDownloadReceiptDocumentQuery();

    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [deliverable, setDeliverable] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const editInvoicePopup = usePopup();
    const editDeliverablePopup = usePopup();

    const editablePayment = payments.find(item => item.id === editableRow);

    useEffect(() => {
        setDeliverable(editablePayment?.deliverable || '');
        setInvoiceDate(editablePayment?.invoiceDate || '');
        //eslint-disable-next-line
    }, [editableRow, payments]);

    useEffect(() => {
        if (!isLoadingPayments && isSuccessUpdatePayment) {
            setEditableRow(null);
        }
    }, [isLoadingPayments, isSuccessUpdatePayment]);

    // error handling
    useEffect(() => {
        if (!isLoadingInvoice && !isLoadingReceipt) return;
        toast.error('Failed to download document');
    }, [isErrorInvoice, isErrorReceipt]);

    const savePaymentData = useCallback(
        async (paymentId: number) => {
            await updatePayment({
                paymentId,
                invoiceDate,
                deliverable,
            }).unwrap();
            const message = `Payment ${
                payments.find(item => item.id === paymentId)?.invoiceCode
            } updated successfully!`;
            toast.success(message);
        },
        [deliverable, invoiceDate, payments, updatePayment],
    );

    const cancelPayment = (paymentId: number) => {
        window.location.href = 'mailto:payments@breef.com';
    };

    const onClickAction = useCallback(
        (paymentId: number, action: string) => {
            switch (action) {
                case PaymentActionsNames.EDIT:
                    return setEditableRow(paymentId);
                case PaymentActionsNames.SAVE:
                    return savePaymentData(paymentId);
                case PaymentActionsNames.DOWNLOAD_INVOICE:
                    return downloadInvoice({ paymentId });
                case PaymentActionsNames.DOWNLOAD_RECEIPT:
                    return downloadReceipt({ paymentId });
                case PaymentActionsNames.CANCEL:
                    return cancelPayment(paymentId);
            }
        },
        [downloadInvoice, savePaymentData],
    );

    const getWarningTip = (tag: PaymentScheduleTag, paymentDue: string) => {
        switch (tag) {
            case PaymentScheduleTag[PaymentScheduleTagRequest.paymentDue]:
                return 'Breef is in contact with the client regarding this payment';
            default:
                return undefined;
        }
    };

    const handleEditInvoiceDate = useCallback(
        ({ invoiceDate }: { invoiceDate: string }) => {
            setInvoiceDate(invoiceDate);
            editInvoicePopup.close();
        },
        [editInvoicePopup],
    );

    const renderEditInvoicePopup = useCallback(
        (payment: FullPaymentScheduleAgency) => (
            <EditInvoicePopUp
                invoiceDate={invoiceDate}
                minDate={payment.invoiceDate}
                handleEditInvoice={handleEditInvoiceDate}
                currentDate={moment().format()}
                paymentId={Number(payment.id)}
                close={editInvoicePopup.close}
                style={{
                    overflow: 'visible',
                    marginTop: '50px',
                    height: 'fit-content',
                }}
            />
        ),
        [editInvoicePopup.close, handleEditInvoiceDate, invoiceDate],
    );

    const renderEditDeliverablePopup = useCallback(
        (payment: FullPaymentScheduleAgency) => (
            <EditPaymentDeliverablePopup
                initialValue={deliverable}
                onChange={setDeliverable}
                invoiceCode={payment.invoiceCode}
                close={editDeliverablePopup.close}
                style={{ height: 'fit-content' }}
            />
        ),
        [deliverable, editDeliverablePopup.close],
    );

    const rows = React.useMemo(
        () =>
            payments.map(payment => {
                const dropdownActionsList = getPaymentDropdownActions(
                    payment.status,
                );
                return {
                    id: payment.id,
                    invoiceCode: payment.invoiceCode,
                    status: getPaymentTagComponent(
                        payment.tag,
                        getWarningTip(payment.tag, payment.paymentDue),
                    ),
                    description:
                        editableRow === payment.id ? (
                            <>
                                {editDeliverablePopup.isOpen &&
                                    !!editablePayment &&
                                    renderEditDeliverablePopup(editablePayment)}
                                <EditableElem
                                    onClick={editDeliverablePopup.open}
                                    value={limitSymbols(25, deliverable, true)}
                                    icon={<EditIconSmall />}
                                />
                            </>
                        ) : (
                            limitSymbols(25, payment.deliverable, true)
                        ),
                    type: capitalizeFirstLetter(payment.scheduleType),
                    invoiceDate:
                        editableRow === payment.id ? (
                            <>
                                {editInvoicePopup.isOpen &&
                                    !!editablePayment &&
                                    renderEditInvoicePopup(editablePayment)}
                                <EditableElem
                                    onClick={editInvoicePopup.open}
                                    value={moment(invoiceDate).format(
                                        'MMM D, YYYY',
                                    )}
                                    icon={<ChevronSmallStraightThing />}
                                />
                            </>
                        ) : (
                            moment(payment.invoiceDate).format('MMM D, YYYY')
                        ),
                    payBy: moment(payment.paymentDue).format('MMM D, YYYY'),
                    amount: formatBudgetCost(Number(payment.amount)),
                    teamTake: formatBudgetCost(Number(payment.teamTake)),
                    actionMenu:
                        editableRow === payment.id ? (
                            <Button
                                className="small"
                                type="button"
                                title="Save"
                                onClick={() =>
                                    onClickAction(
                                        Number(payment.id),
                                        PaymentActionsNames.SAVE,
                                    )
                                }
                                disabled={isLoadingUpdatePayment}
                            />
                        ) : dropdownActionsList.length ? (
                            <CustomDropdown
                                type="dropdown"
                                dropdownButtonView="dots"
                                itemsListViewType="small"
                                value=""
                                customChange={value =>
                                    onClickAction(Number(payment.id), value)
                                }
                                dropdownList={dropdownActionsList}
                            />
                        ) : null,
                };
            }),
        [
            payments,
            getPaymentTagComponent,
            editableRow,
            editDeliverablePopup.isOpen,
            editDeliverablePopup.open,
            editablePayment,
            renderEditDeliverablePopup,
            deliverable,
            editInvoicePopup.isOpen,
            editInvoicePopup.open,
            renderEditInvoicePopup,
            invoiceDate,
            isLoadingUpdatePayment,
            onClickAction,
        ],
    );

    const mobileViewButtons = isMobile
        ? payments.map(payment => ({
              id: payment.id,
              actionsList: {
                  onClick: (value: string) =>
                      onClickAction(Number(payment.id), value),
                  list:
                      editableRow !== payment.id
                          ? getPaymentDropdownActions(payment.status)
                          : [],
              },
              button:
                  editableRow === payment.id
                      ? {
                            title: 'Save',
                            onClick: () =>
                                onClickAction(Number(payment.id), 'save'),
                            disabled: isLoadingUpdatePayment,
                        }
                      : undefined,
          }))
        : undefined;

    const notCancelledPayments = payments.filter(
        item => item.status !== PaymentSchedule.cancelled,
    );
    const footerRow = {
        payBy: 'Totals:',
        amount: formatBudgetCost(
            notCancelledPayments.reduce(
                (acc, curr) => (acc += Number(curr.amount)),
                0,
            ),
        ),
        teamTake: formatBudgetCost(
            notCancelledPayments.reduce(
                (acc, curr) => (acc += Number(curr.teamTake)),
                0,
            ),
        ),
    };

    return {
        rows,
        footerRow,
        editableRow,
        isLoading:
            isLoadingUpdatePayment || isLoadingInvoice || isLoadingReceipt,
        mobileViewButtons,
    };
};
