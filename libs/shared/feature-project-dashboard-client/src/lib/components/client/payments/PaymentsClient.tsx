import { useGetPaymentsScheduleQuery } from '@breef/shared/data-access-payments';
import { Answers, PageLoader, Table } from '@breef/shared/ui-components';
import { getHostName, getLinkDownloadContracts } from '@breef/shared/utils';
import {
    configTablePaymentsClient,
    configTablePaymentsClientMobile,
} from './configTablePaymentsClient';
import { useTableRowsClient } from '../../../hooks/useTableRowsClient';
import { useMediaContext } from '@breef/shared/hooks';
import { useDashboardSelector } from '../../../store/hooks';
import { configPaymentFaqsClient } from './configPaymentsFaqsClient';
import PaymentScheduleHeader from './paymentSchedule/paymentScheduleHeader/PaymentScheduleHeader';
import PaymentScheduleInfoCard from './paymentSchedule/paymentScheduleInfoCard/PaymentScheduleInfoCard';
import { PaymentsWrapper } from './paymentSchedule/paymentsWrapper/PaymentsWrapper';
import { TermsAndContracts } from './paymentSchedule/termsAndContracts/TermsAndContracts';
import {
    StyledLoaderWrapper,
    StyledPaymentsClient,
} from './PaymentsClient.styled';
import { Fragment } from 'react';

interface PaymentsClientProps {
    projectId: string;
}

export const PaymentsClient = ({ projectId }: PaymentsClientProps) => {
    const { isMobile } = useMediaContext();
    const { isDisabledPayments } = useDashboardSelector(
        state => state.dashboard,
    );
    const {
        isLoading: isLoadingPayments,
        isFetching: isFetchingPayments,
        data: scheduleData,
    } = useGetPaymentsScheduleQuery(
        {
            projectId,
        },
        {
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        },
    );
    const hostName = getHostName();

    const link = getLinkDownloadContracts({
        projectId: projectId,
        hostName: hostName,
    });

    const tablePaymentsPreset = useTableRowsClient(
        projectId,
        scheduleData?.payments || [],
        isDisabledPayments,
    );

    const isEmptyPayments = !scheduleData?.payments?.length;

    const isUpdatingTablePayments =
        isFetchingPayments || tablePaymentsPreset.isLoading;

    if (isLoadingPayments) {
        return (
            <StyledLoaderWrapper>
                <PageLoader />
            </StyledLoaderWrapper>
        );
    }

    const renderTablePayments = () => {
        if (isEmptyPayments) return null;
        if (isMobile) {
            return (
                <Fragment>
                    <TermsAndContracts
                        paymentTerms={scheduleData?.paymentTerms}
                        linkDownloadContract={link}
                        className="terms-and-contracts-mobile"
                    />
                    <PaymentsWrapper
                        {...tablePaymentsPreset}
                        columns={configTablePaymentsClientMobile}
                        isLoading={isUpdatingTablePayments}
                        isAccessDenied={isDisabledPayments}
                    />
                </Fragment>
            );
        }
        return (
            <Table
                columns={configTablePaymentsClient}
                {...tablePaymentsPreset}
                isLoading={isUpdatingTablePayments}
            />
        );
    };

    return (
        <StyledPaymentsClient>
            <div className="schedule-body">
                <PaymentScheduleHeader
                    role="client"
                    title="Payment schedule"
                    linkDownloadContract={!isEmptyPayments ? link : undefined}
                    paymentTerms={scheduleData?.paymentTerms}
                />
                <PaymentScheduleInfoCard
                    linkDownloadContract={link}
                    payments={scheduleData?.payments || []}
                    userType="client"
                />
                {renderTablePayments()}
            </div>
            <Answers {...configPaymentFaqsClient} />
        </StyledPaymentsClient>
    );
};
