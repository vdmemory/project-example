import {
    AccountsList,
    Button,
    ConfirmContent,
    RequestStatusPage,
    Section,
    usePopup,
    LipsLoader,
} from '@breef/shared/ui-components';
import { Fragment, useState } from 'react';
import { AchView } from '../../../types/paymentDataTypes';
import Preview from './preview/Preview';
import { removeMessages, useACHAsyncMethods } from './useACHAsyncMethods';
import {
    useCollectStripeFCA,
    useRouteControl,
    useShowErrorMessage,
    useToastifyRequest,
} from '@breef/shared/hooks';
import { PaymentStatusNames, PROJECTS_ROUTE } from '@breef/shared/constants';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Checkbox, TabPaymentType, WarningIcon } from '@breef/ui-kit';
import { formatBudgetCost } from '@breef/shared/utils';
import { Tabulation } from '../Tabulation';

interface AchSectionProps {
    amount: number;
    onClick: (key: string) => void;
    isHideTabs?: boolean;
    tabs: TabPaymentType[];
    paymentMethod?: string;
    setIsSuccessTag: (isSuccessTag: boolean) => void;
}

type TargetAccount = {
    id: string;
    number: string;
    type: string;
};

const confirmPopupStylesPreset = (isMobile: boolean) => {
    return {
        minWidth: isMobile ? '360px' : '400px',
        overflow: 'visible',
        maxWidth: '800px',
        width: isMobile ? '360px' : '400px',
    };
};

export const AchSection = ({
    amount,
    onClick,
    isHideTabs,
    tabs,
    paymentMethod,
    setIsSuccessTag,
}: AchSectionProps) => {
    const [screen, setScreen] = useState<AchView | null>(AchView.LIST);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedBank, setSelectedBank] = useState<{
        id: string;
        token: string;
        paymentStatus: PaymentStatusNames;
    } | null>(null);
    const [defaultBank, setDefaultBank] = useState<boolean>(false);
    const { changePage } = useRouteControl();
    const confirmDeletePopup = usePopup();
    const [targetAccount, setTargetAccount] = useState<TargetAccount | null>(
        null,
    );

    const {
        handlePay,
        handleAddBank,
        isLoadingSetBank,
        isLoadingPay,
        isLoadingGetBanks,
        isFetchingGetBanks,
        listBanks,
        successScreenData,
        removeActions,
    } = useACHAsyncMethods({
        setScreen,
        setSelectedBank,
        isSelectedBank: !!selectedBank,
    });

    const { collect, isLoadingFCSession } = useCollectStripeFCA(handleAddBank);
    const { isShowError, showError } = useShowErrorMessage(1800);

    useToastifyRequest({
        actionProps: removeActions,
        configMessages: removeMessages,
        toastId: 'toast-remove-account',
        callbackFn: confirmDeletePopup.close,
        isDelayCallback: false,
    });

    const renderConfirmDeletePopupTitle = (number: string) => (
        <Fragment>
            <WarningIcon /> Delete account {number}
        </Fragment>
    );

    const handleClickConfirmDeletePopup = async (
        event: 'confirm' | 'cancel',
    ) => {
        if (event === 'cancel' || !targetAccount)
            return confirmDeletePopup.close();
        const { id } = targetAccount;
        try {
            await removeActions.removeFCAccount(id).unwrap();
            if (selectedBank?.id === id) {
                setSelectedBank(null);
                setDefaultBank(false);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleOpenConfirmDeletePopup = (
        id: string,
        number: string,
        type: string,
    ) => {
        setTargetAccount({ id, number, type });
        confirmDeletePopup.open();
    };

    const renderList = () => {
        const handleClick = () => {
            if (!selectedBank) return showError();
            handlePay({ ...selectedBank, defaultBank });
        };
        const handleSelectBank = (
            selectedBank: {
                id: string;
                token: string;
                paymentStatus: PaymentStatusNames;
            } | null,
        ) => {
            setSelectedBank(selectedBank);
        };

        const onChangeCheckbox = () => {
            setDefaultBank(prevState => {
                return !prevState;
            });
        };

        return (
            <Fragment>
                <Tabulation
                    amount={amount}
                    onClick={onClick}
                    isHideTabs={isHideTabs}
                    tabs={tabs}
                    paymentMethod={paymentMethod}
                />
                {confirmDeletePopup.isOpen && (
                    <ConfirmContent
                        isSubmitting={removeActions.isLoading}
                        title={renderConfirmDeletePopupTitle(
                            targetAccount?.number ?? '',
                        )}
                        description="Permanently delete this account? This action can’t be undone"
                        onClick={handleClickConfirmDeletePopup}
                        newDesign
                        nameConfirmBtn="Delete account"
                        style={confirmPopupStylesPreset(isHideTabs || false)}
                    />
                )}
                {isLoadingGetBanks ? (
                    <LipsLoader />
                ) : (
                    [
                        <Section
                            key="bank-list"
                            label={`saved account${
                                listBanks.length > 1 ? 's' : ''
                            }`}
                        >
                            <AccountsList
                                list={listBanks}
                                addItem={collect}
                                removeItem={handleOpenConfirmDeletePopup}
                                onSelectItem={handleSelectBank}
                                selectedItem={selectedBank}
                                isShowError={isShowError}
                                isEdit={isEdit}
                                handleUpdateIsEdit={setIsEdit}
                                isLoadingList={isFetchingGetBanks}
                            />
                        </Section>,
                        <Section
                            key="bank-checkbox"
                            className="checkbox-section f-end"
                        >
                            <Checkbox
                                onChange={onChangeCheckbox}
                                label="Save selection as default account"
                                checked={isEdit ? false : defaultBank}
                                disabled={isEdit || !selectedBank}
                            />
                        </Section>,
                        <Button
                            key="bank-button"
                            disabled={
                                isEdit || !selectedBank || isFetchingGetBanks
                            }
                            isSubmitting={isLoadingPay}
                            className="medium"
                            withAnimate
                            onClick={handleClick}
                            title={`PAY ${formatBudgetCost(amount)}`}
                        />,
                    ]
                )}
            </Fragment>
        );
    };

    const renderPreview = () => {
        return (
            <Fragment>
                <Tabulation
                    amount={amount}
                    onClick={onClick}
                    isHideTabs={isHideTabs}
                    tabs={tabs}
                    paymentMethod={paymentMethod}
                />
                <Section label="connect an account" className="f-start">
                    <Preview
                        label={`Click below to connect your bank\n accounts for easy ACH payments`}
                    ></Preview>
                </Section>
                <Button
                    isSubmitting={isLoadingFCSession || isLoadingSetBank}
                    className="medium"
                    onClick={collect}
                    title="CONNECT BANK ACCOUNTS"
                    withAnimate
                    arrowLeft
                />
            </Fragment>
        );
    };

    const renderSuccess = () => {
        const handleRedirect = () => {
            changePage(PROJECTS_ROUTE);
        };
        return (
            <RequestStatusPage
                status="success"
                successBody={successScreenData}
                typeData="bank"
                handleClickButton={handleRedirect}
                setIsSuccessTag={setIsSuccessTag}
            />
        );
    };

    const renderFailure = () => {
        const handleUpdateScreen = () => {
            setScreen(AchView.LIST);
        };

        return (
            <RequestStatusPage
                status="failed"
                handleClickButton={handleUpdateScreen}
            />
        );
    };

    const renderContent = () => {
        switch (screen) {
            case AchView.LIST:
                return renderList();
            case AchView.PREVIEW:
                return renderPreview();
            case AchView.SUCCESS:
                return renderSuccess();
            case AchView.FAILURE:
                return renderFailure();
            default:
                return null;
        }
    };

    return <Fragment>{renderContent()}</Fragment>;
};

export default AchSection;
