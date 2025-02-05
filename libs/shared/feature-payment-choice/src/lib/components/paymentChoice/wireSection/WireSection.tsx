import {
    useGetWirePaymentQuery,
    useSetWirePaymentPayMutation,
} from '@breef/shared/data-access-payments';
import { useRouteControl, useSaveDocument } from '@breef/shared/hooks';
import {
    Button,
    ConfirmContent,
    usePopup,
    RequestStatusPage,
    Section,
    LipsLoader,
} from '@breef/shared/ui-components';
import { useRouter } from 'next/router';
import PaymentSummary from './paymentSummary/PaymentSummary';
import { Fragment, useEffect, useState } from 'react';
import { CustomStripeErrorType, stripeErrorHandler } from '@breef/shared/utils';
import { ListType } from '@breef/shared/types';
import { Notification, TabPaymentType, WarningIcon } from '@breef/ui-kit';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { toast } from 'react-toastify';
import { Tabulation } from '../Tabulation';

const confirmPopupStylesPreset = (isMobile: boolean) => {
    return {
        minWidth: isMobile ? '360px' : '400px',
        overflow: 'visible',
        maxWidth: '800px',
        width: isMobile ? '360px' : '400px',
    };
};

enum WireError {
    GET_WIRE = 'Error get wire payment data',
}

interface WireSectionProps {
    onClick: (key: string) => void;
    isHideTabs?: boolean;
    tabs: TabPaymentType[];
    paymentMethod?: string;
    amount: number;
    setIsSuccessTag: (isSuccessTag: boolean) => void;
    setDocument: (document: ListType[]) => void;
    document: ListType[];
}

export const WireSection = ({
    onClick,
    isHideTabs,
    tabs,
    paymentMethod,
    amount,
    setIsSuccessTag,
    setDocument,
    document,
}: WireSectionProps) => {
    const router = useRouter();
    const { changePage } = useRouteControl();
    const confirmPopupControl = usePopup();

    const [successRequest, setSuccessRequest] = useState<boolean>(false);
    const paymentId = (router.query as { paymentId?: number }).paymentId || -1;

    const { uploadDocument, uploading } = useSaveDocument({
        saveDocument: setDocument,
    });

    const handleUploadFile = async (files: File[], currentFileId?: number) => {
        uploadDocument(files[0], currentFileId);
    };

    const handleDeleteDocument = () => {
        setDocument([]);
    };

    const {
        data: wireData,
        isLoading: isLoadingGetWire,
        isError: isErrorGetWire,
    } = useGetWirePaymentQuery();

    useEffect(() => {
        if (isErrorGetWire) {
            toast.error(WireError.GET_WIRE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isErrorGetWire]);

    const [payWirePayment, { isLoading: isSubmitPayWire }] =
        useSetWirePaymentPayMutation();

    const handleClickPopup = (event: 'confirm' | 'cancel') => {
        if (event === 'cancel') return confirmPopupControl.close();
        return handlePayWirePayment();
    };

    const handlePayWirePayment = async () => {
        try {
            await payWirePayment({
                paymentId: paymentId,
                ...(document[0]?.id && { fileId: document[0].id }),
            }).unwrap();
            confirmPopupControl.close();
            return setSuccessRequest(true);
        } catch (error) {
            stripeErrorHandler({
                error: error as CustomStripeErrorType,
            });
            // return setFailureRequest(true);
        } finally {
            confirmPopupControl.close();
        }
    };

    const handleRedirectToDashboard = () => {
        changePage(PROJECTS_ROUTE);
    };

    if (successRequest) {
        return (
            <RequestStatusPage
                status="success"
                handleClickButton={handleRedirectToDashboard}
                setIsSuccessTag={setIsSuccessTag}
            />
        );
    }

    return (
        <Fragment>
            <Tabulation
                amount={amount}
                onClick={onClick}
                isHideTabs={isHideTabs}
                tabs={tabs}
                paymentMethod={paymentMethod}
            />
            {confirmPopupControl.isOpen && (
                <ConfirmContent
                    isSubmitting={isSubmitPayWire}
                    title={renderConfirmPopupTitle()}
                    description="Please confirm you’ve paid. Our team will check and get back to you."
                    onClick={handleClickPopup}
                    newDesign
                    nameCancelBtn="Let me review"
                    nameConfirmBtn="Yes I’ve paid"
                    style={confirmPopupStylesPreset(isHideTabs || false)}
                    colorButtonConfirm="success"
                />
            )}
            {isLoadingGetWire ? (
                <LipsLoader />
            ) : (
                [
                    <Section key="wire-summary" label="account details">
                        <Notification
                            sentiment="informative"
                            text="To make a wire payment, use the information below."
                        />
                        <PaymentSummary
                            bankAccount={wireData?.bankAccount}
                            code={wireData?.code}
                            handleUploadFile={handleUploadFile}
                            documentTitle={document[0]?.title || ''}
                            handleDeleteDocument={handleDeleteDocument}
                            uploading={uploading}
                        />
                    </Section>,
                    <Button
                        isSubmitting={uploading}
                        key="wire-button"
                        className="medium"
                        onClick={confirmPopupControl.open}
                        title={'Confirm payment'}
                        disabled={!document.length}
                        withAnimate
                    />,
                ]
            )}
        </Fragment>
    );
};

export default WireSection;

const renderConfirmPopupTitle = () => (
    <Fragment>
        <WarningIcon /> {'Let’s double check...'}
    </Fragment>
);
