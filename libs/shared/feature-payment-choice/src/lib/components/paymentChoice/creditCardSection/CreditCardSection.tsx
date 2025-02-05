import { PaymentStatusNames, PROJECTS_ROUTE } from '@breef/shared/constants';
import {
    useMediaContext,
    useOn3DSComplete,
    useRouteControl,
    useShowErrorMessage,
    useToastifyRequest,
} from '@breef/shared/hooks';
import {
    AccountsList,
    Button,
    ConfirmContent,
    CreditCardFormOld,
    LinkButton,
    Placeholder,
    RequestStatusPage,
    Section,
    usePopup,
    LipsLoader,
} from '@breef/shared/ui-components';
import { formatBudgetCost } from '@breef/shared/utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    BackArrowIcon,
    TabPaymentType,
    WarningIcon,
    Notification,
} from '@breef/ui-kit';
import { Fragment, useState } from 'react';
import { CreditCardView } from '../../../types/paymentDataTypes';
import { Tabulation } from '../Tabulation';
import { TotalNote } from '../TotalNote';
import {
    removeMessages,
    useCreditCardAsyncMethods,
} from './useCreditCardAsyncMethods';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';

interface CreditCardSectionProps {
    amount: number;
    fee: number;
    onClick: (key: string) => void;
    isHideTabs?: boolean;
    tabs: TabPaymentType[];
    paymentMethod?: string;
    setIsSuccessTag: (isSuccessTag: boolean) => void;
}

type TargetCardType = {
    token: string;
    number: string;
};

const confirmPopupStylesPreset = (isMobile: boolean) => {
    return {
        minWidth: isMobile ? '360px' : '400px',
        overflow: 'visible',
        maxWidth: '800px',
        width: isMobile ? '360px' : '400px',
    };
};

export const CreditCardSection = ({
    amount,
    fee,
    onClick,
    isHideTabs,
    tabs,
    paymentMethod,
    setIsSuccessTag,
}: CreditCardSectionProps) => {
    const [screen, setScreen] = useState<CreditCardView | null>(
        CreditCardView.LIST,
    );
    const [selectedCard, setSelectedCard] = useState<{
        token: string;
        paymentStatus: PaymentStatusNames;
    } | null>(null);
    const { changePage, queryParams } = useRouteControl();
    const paymentIntentClientSecretParam =
        (queryParams as { payment_intent_client_secret?: string })
            .payment_intent_client_secret || null;
    const { isShowError, showError } = useShowErrorMessage(1800);
    const [isEditList, setIsEditList] = useState<boolean>(false);
    const [editCardToken, setEditCardToken] = useState<string | null>(null);
    const [isPlaceholderError, setIsPlaceholderError] =
        useState<boolean>(false);

    const { isMaxMobile } = useMediaContext();
    const confirmDeletePopup = usePopup();
    const [targetCard, setTargetCard] = useState<TargetCardType | null>(null);

    const { isLoading3DSComplete, successData } = useOn3DSComplete(
        paymentIntentClientSecretParam || '',
        () => setScreen(CreditCardView.SUCCESS),
        () => setScreen(CreditCardView.FAILURE),
    );

    const {
        handlePay,
        handleUpdateCard,
        isLoadingPay,
        isLoadingUpdateCard,
        isLoadingSetCard,
        listCards,
        isLoadingGetCards,
        isFetchingGetCards,
        successScreenData,
        removeActions,
    } = useCreditCardAsyncMethods({
        setScreen,
        setSelectedCard,
        isSelectedCard: !!selectedCard,
    });

    const cardAmount = amount + fee;

    const { toastLoading } = useToastifyRequest({
        actionProps: removeActions,
        configMessages: removeMessages,
        toastId: 'toast-remove-account',
        callbackFn: confirmDeletePopup.close,
        isDelayCallback: false,
    });

    const handleEditCard = (cardToken: string) => {
        setEditCardToken(cardToken);
        setScreen(CreditCardView.FORM);
    };

    const handleClickConfirmDeletePopup = async (
        event: 'confirm' | 'cancel',
    ) => {
        if (event === 'cancel' || !targetCard)
            return confirmDeletePopup.close();
        try {
            await removeActions.removeCard(targetCard.token).unwrap();
            if (selectedCard?.token === targetCard.token) {
                setSelectedCard(null);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const renderConfirmDeletePopupTitle = () => (
        <Fragment>
            <WarningIcon /> Delete card {targetCard?.number}
        </Fragment>
    );

    const handleOpenConfirmDeletePopUp = (token: string, number: string) => {
        setTargetCard({ token, number });
        confirmDeletePopup.open();
    };

    const renderList = () => {
        const handleClick = () => {
            if (!selectedCard) return showError();
            handlePay(selectedCard.token, PaymentStatusNames.CARD_EXIST, '');
        };
        const handleSelectCard = (
            selectedCard: {
                token: string;
                paymentStatus: PaymentStatusNames;
            } | null,
        ) => {
            setSelectedCard(selectedCard);
        };
        const handleUpdateScreen = () => {
            setScreen(CreditCardView.FORM);
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
                        isSubmitting={removeActions.isLoading || toastLoading}
                        title={renderConfirmDeletePopupTitle()}
                        description="Permanently delete this card? This action can’t be undone"
                        onClick={handleClickConfirmDeletePopup}
                        newDesign
                        nameConfirmBtn="Delete card"
                        style={confirmPopupStylesPreset(isHideTabs || false)}
                    />
                )}
                {isLoadingGetCards ? (
                    <LipsLoader />
                ) : (
                    [
                        <Section
                            key="card-list"
                            label={`saved card${
                                listCards.length > 1 ? 's' : ''
                            }`}
                            className="f-start"
                        >
                            <AccountsList
                                list={listCards}
                                addItem={handleUpdateScreen}
                                removeItem={handleOpenConfirmDeletePopUp}
                                onSelectItem={handleSelectCard}
                                selectedItem={selectedCard}
                                handleEditCard={handleEditCard}
                                isShowError={isShowError}
                                nameLinkBtn="Add new card"
                                cutValue={fee}
                                hasCreditCard
                                isEdit={isEditList}
                                handleUpdateIsEdit={setIsEditList}
                                isLoadingList={isFetchingGetCards}
                            />
                        </Section>,
                        <Button
                            key="card-button"
                            disabled={isEditList || isFetchingGetCards}
                            isSubmitting={isLoadingPay || isLoading3DSComplete}
                            className="medium"
                            onClick={handleClick}
                            title={`PAY ${formatBudgetCost(cardAmount)}`}
                            withAnimate
                        />,
                    ]
                )}
            </Fragment>
        );
    };

    const renderPlaceholder = () => {
        const handleUpdateScreen = () => {
            setScreen(CreditCardView.FORM);
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
                <Section label="select a card" className="f-start">
                    <Placeholder
                        onClick={handleUpdateScreen}
                        isError={isPlaceholderError}
                        setIsError={setIsPlaceholderError}
                    />
                </Section>
                <Button
                    key="button"
                    isSubmitting={isLoadingPay}
                    className="medium"
                    onClick={() => setIsPlaceholderError(true)}
                    title={`PAY ${formatBudgetCost(cardAmount)}`}
                    withAnimate
                />
            </Fragment>
        );
    };

    const renderForm = () => {
        const isEditCreditCardToken = editCardToken !== null;
        const handleClick = (
            token: string,
            options: CreateTokenCardData,
            saveCard?: boolean,
        ) => {
            if (isEditCreditCardToken) {
                handleUpdateCard(token, options);
            } else {
                const payStatus = saveCard
                    ? PaymentStatusNames.CARD_EXIST
                    : PaymentStatusNames.CARD_NEW;
                handlePay(token, payStatus, options.name ?? '', saveCard);
            }
        };

        const handleBackToList = () => {
            if (!listCards.length) return setScreen(CreditCardView.PLACEHOLDER);
            setScreen(CreditCardView.LIST);
        };

        const text = (
            <span>
                Note that credit card payments incur a <b>3%</b> fee
            </span>
        );

        return (
            <Fragment>
                {isMaxMobile ? (
                    <Fragment>
                        <TotalNote total={amount} />
                        <Section>
                            <Notification
                                sentiment="informative"
                                text={text}
                                size="small"
                            />
                        </Section>
                    </Fragment>
                ) : (
                    <p className="title">
                        <LinkButton
                            name={<BackArrowIcon />}
                            onClick={handleBackToList}
                        />
                        {!isEditCreditCardToken ? 'Add new card' : 'Edit card'}
                    </p>
                )}

                <CreditCardFormOld
                    isSubmitted={
                        isLoadingSetCard || isLoadingPay || isLoadingUpdateCard
                    }
                    onClick={handleClick}
                    isShowSwitcher={!isEditCreditCardToken}
                    nameSubmitBtn={
                        !isEditCreditCardToken
                            ? `PAY ${formatBudgetCost(cardAmount)}`
                            : 'Save'
                    }
                    cardToken={editCardToken}
                    setCardToken={setEditCardToken}
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
                successBody={successScreenData || successData}
                typeData="card"
                handleClickButton={handleRedirect}
                setIsSuccessTag={setIsSuccessTag}
            />
        );
    };

    const renderFailure = () => {
        const handleUpdateScreen = () => {
            setScreen(CreditCardView.LIST);
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
            case CreditCardView.LIST:
                return renderList();
            case CreditCardView.PLACEHOLDER:
                return renderPlaceholder();
            case CreditCardView.FORM:
                return renderForm();
            case CreditCardView.SUCCESS:
                return renderSuccess();
            case CreditCardView.FAILURE:
                return renderFailure();
            default:
                return null;
        }
    };

    return <Fragment>{renderContent()}</Fragment>;
};

export default CreditCardSection;
