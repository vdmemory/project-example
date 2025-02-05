import {
    useGetPaymentsKickoffQuery,
    useGetPaymentsRetainerQuery,
    useGetPaymentsScheduleQuery,
    useUpdatePaymentMutation,
} from '@breef/shared/data-access-payments';
import {
    Answers,
    PageLoader,
    Table,
    usePopup,
} from '@breef/shared/ui-components';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PaymentScheduleHeader from '../../paymentSchedule/paymentScheduleHeader/PaymentScheduleHeader';
import EditInvoicePopUp from './editInvoiceModal/EditInvoicePopUp';
import { StyledPaymentScheduleAgency } from './PaymentScheduleAgency.styled';
import AddPaymentsPopup from './addPaymentsPopup/AddPaymentsPopup';
import {
    ValidationErrorType,
    getHostName,
    getLinkDownloadContracts,
    validationErrorMessages,
} from '@breef/shared/utils';
import {
    paymentsMilestoneReplacement,
    paymentsOngoingReplacement,
} from '../../client/utils/replaceScheduleDataToRender';
import { KickoffRequestType } from '@breef/shared/types';
import { useGetList, useMediaContext } from '@breef/shared/hooks';
import PaymentsMilestone from './tableView/PaymentsMilestone';
import PaymentsOngoing from './tableView/PaymentsOngoing';
import PaymentScheduleInfoCard from '../../paymentSchedule/paymentScheduleInfoCard/PaymentScheduleInfoCard';
import {
    configTablePaymentsAgency,
    configTablePaymentsAgencyMobile,
} from './configTablePaymentsAgency';
import { useTableRowsAgency } from '../../../hooks/useTableRowsAgency';
import { configPaymentFaqsAgency } from './configPaymentFaqsAgency';
import { PaymentsWrapper } from '../../paymentSchedule/paymentsWrapper/PaymentsWrapper';

type ErrorUpdateInvoice = {
    data: {
        detail: string;
    };
};

type InvoicePopupData = {
    paymentId: number;
    invoiceDate: string;
};

const PaymentScheduleAgency = ({
    projectId,
    kickoffStatus,
}: {
    projectId: string | number;
    kickoffStatus: KickoffRequestType['status'];
}) => {
    const { isMobile } = useMediaContext();
    const {
        isLoading,
        isFetching,
        data: scheduleData,
    } = useGetPaymentsScheduleQuery(
        {
            projectId,
        },
        {
            skip: kickoffStatus !== 'approved_by_client',
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        },
    );
    const { isLoading: existRetainerLoading, data: existRetainerData } =
        useGetPaymentsRetainerQuery({
            projectId,
        });
    const { isLoading: paymentsKickoffLoading, data: paymentKickoff } =
        useGetPaymentsKickoffQuery(
            {
                projectId,
            },
            {
                skip: kickoffStatus === 'approved_by_client',
            },
        );

    const currentDate = moment().format('YYYY-MM-DD');
    const hostName = getHostName();

    const link = getLinkDownloadContracts({
        projectId: `${projectId}`,
        hostName: hostName,
    });

    const [fetchUpdateInvoiceDueMutation] = useUpdatePaymentMutation();
    const addPaymentsPopup = usePopup();
    const editInvoicePopup = usePopup();
    const [isDefaultOpenOngoingBlock, setIsDefaultOpenOngoingBlock] =
        useState(false);
    const [editInvoicePopupData, setEditInvoicePopupData] =
        useState<InvoicePopupData>({
            paymentId: 0,
            invoiceDate: '',
        });

    const handleAddOrEditPayments = (isOpenOngoingBlock?: boolean) => {
        setIsDefaultOpenOngoingBlock(!!isOpenOngoingBlock);
        addPaymentsPopup.open();
    };

    const handleUpdateInvoiceDate = ({
        paymentId,
        invoiceDate,
    }: InvoicePopupData) => {
        fetchUpdateInvoiceDueMutation({
            invoiceDate: moment(invoiceDate).format('YYYY-MM-DD'),
            paymentId: paymentId,
        }).then(res => {
            if (!(res as { error?: ErrorUpdateInvoice }).error) {
                editInvoicePopup.close();
            } else {
                toast.error(
                    (res as { error?: ErrorUpdateInvoice }).error?.data
                        .detail ??
                        validationErrorMessages[ValidationErrorType.default],
                );
            }
        });
    };

    const handleEditInvoice = ({
        paymentId,
        invoiceDate,
    }: InvoicePopupData) => {
        setEditInvoicePopupData({ paymentId, invoiceDate });
        editInvoicePopup.open();
    };

    const paymentTermsList = useGetList('paymentTerms') as {
        value: string;
        label: string;
    }[];
    const tablePaymentsPreset = useTableRowsAgency(
        scheduleData?.payments || [],
        isFetching,
    );

    if (isLoading || existRetainerLoading || paymentsKickoffLoading) {
        return <PageLoader />;
    }

    const paymentsMilestone = paymentsMilestoneReplacement(
        paymentKickoff ? paymentKickoff.oneTimePayments : [],
    );

    const paymentOngoing = paymentsOngoingReplacement(
        paymentKickoff ? paymentKickoff.ongoingPayment : null,
    );

    const normalizedPaymentTerms =
        (paymentKickoff &&
            paymentTermsList.find(
                item =>
                    item.value === paymentKickoff.ongoingPayment?.paymentTerms,
            )?.label) ||
        '';
    const isRetainerPaymentsKickoff = paymentsMilestone.some(
        item => item.type === 'retainer',
    );

    const getActionTypeForMilestoneAction = () => {
        if (!paymentOngoing && !isRetainerPaymentsKickoff) {
            return 'add';
        } else if (!paymentOngoing && isRetainerPaymentsKickoff) {
            return 'addOrEdit';
        } else if (paymentOngoing !== null && !isRetainerPaymentsKickoff) {
            return 'addWithOngoing';
        } else if (paymentOngoing !== null && isRetainerPaymentsKickoff) {
            return 'addWithOngoingEndRetainers';
        } else {
            return 'add';
        }
    };
    const getActionTypeForOngoingAction = () => {
        if (!paymentsMilestone.length) {
            return 'addOrEdit';
        } else {
            return 'onlyEditOngoing';
        }
    };

    const isUpdatingTablePayments = tablePaymentsPreset.isLoading || isFetching;

    return (
        <StyledPaymentScheduleAgency id="tab-payments-content">
            {addPaymentsPopup.isOpen && (
                <AddPaymentsPopup
                    projectId={projectId}
                    existRetainerPayment={existRetainerData}
                    isOngoingRetainerExist={
                        existRetainerData?.scheduleType === 'ongoing'
                    }
                    isDefaultOpenOngoingBlock={isDefaultOpenOngoingBlock}
                    close={addPaymentsPopup.close}
                />
            )}

            <div className="schedule-body">
                {kickoffStatus !== 'approved_by_client' ? (
                    <>
                        {editInvoicePopup.isOpen && (
                            <EditInvoicePopUp
                                {...editInvoicePopupData}
                                currentDate={currentDate}
                                handleEditInvoice={handleUpdateInvoiceDate}
                                close={editInvoicePopup.close}
                                style={{
                                    overflow: 'unset',
                                    margin: '40px auto auto',
                                }}
                            />
                        )}
                        {!!paymentsMilestone.length && (
                            <PaymentsMilestone
                                kickoffStatus={kickoffStatus}
                                link={link}
                                handleAddOrEditPayments={
                                    handleAddOrEditPayments
                                }
                                paymentsMilestone={paymentsMilestone}
                                isAction={kickoffStatus !== 'approved_by_breef'}
                                handleEditInvoice={handleEditInvoice}
                                actionType={getActionTypeForMilestoneAction()}
                            />
                        )}

                        {paymentKickoff && paymentOngoing && (
                            <PaymentsOngoing
                                handleAddOrEditPayments={
                                    handleAddOrEditPayments
                                }
                                kickoffStatus={kickoffStatus}
                                link={link}
                                normalizedPaymentTerms={normalizedPaymentTerms}
                                isAction={kickoffStatus !== 'approved_by_breef'}
                                paymentFrequency={
                                    paymentKickoff.ongoingPayment
                                        ? paymentKickoff.ongoingPayment
                                              .paymentFrequency
                                        : ''
                                }
                                paymentOngoing={paymentOngoing}
                                actionType={getActionTypeForOngoingAction()}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <div className="schedule-header">
                            <PaymentScheduleHeader
                                role="agency"
                                title="Payment Schedule"
                                handleAddOrEditPayments={
                                    handleAddOrEditPayments
                                }
                                linkDownloadContract={link}
                            />
                        </div>
                        <PaymentScheduleInfoCard
                            linkDownloadContract={link}
                            payments={scheduleData?.payments || []}
                            userType="agency"
                        />
                        {isMobile ? (
                            <PaymentsWrapper
                                {...tablePaymentsPreset}
                                columns={configTablePaymentsAgencyMobile}
                                isLoading={isUpdatingTablePayments}
                            />
                        ) : (
                            <Table
                                {...tablePaymentsPreset}
                                columns={configTablePaymentsAgency}
                                isLoading={isUpdatingTablePayments}
                            />
                        )}
                    </>
                )}
            </div>
            <Answers {...configPaymentFaqsAgency} />
        </StyledPaymentScheduleAgency>
    );
};
export default PaymentScheduleAgency;
