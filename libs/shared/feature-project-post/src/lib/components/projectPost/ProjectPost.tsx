import {
    PaymentStatusNames,
    PRIVACY_POLICY_ROUTE,
    PROJECTS_ROUTE,
    TERMS_OF_USE_STANDARD_ROUTE,
} from '@breef/shared/constants';
import {
    useMediaContext,
    useOn3DSComplete,
    useRouteControl,
    useShowErrorMessage,
    useToastifyRequest,
} from '@breef/shared/hooks';
import {
    AccountBillingDetail,
    AccountItem,
    AccountsList,
    ConfirmContent,
    CreditCardForm,
    PageLoader,
    StatusCheckoutPage,
    Section,
    usePopup,
    LipsLoader,
    Header,
    CreatePasswordPopup,
    SuccessPopup,
} from '@breef/shared/ui-components';
import PayInformation from './payInformation/PayInformation';
import { StyledPayment, StyledProjectPost } from './ProjectPost.styled';
import {
    useCouponPostControl,
    useProjectInfoControl,
    useProjectPostControl,
} from '../../hooks';
import React, { Fragment, useState } from 'react';
import { CardScreen } from '../../types/projectInfoTypes';
import { removeMessages } from '../../hooks/useProjectPostControl';
import { Button, WarningIcon } from '@breef/ui-kit';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';
import { addressOptions, creditCardOptions } from './stylesStripe';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';

export const confirmPopupStylesPreset = (isMobile: boolean) => {
    return {
        minWidth: isMobile ? '360px' : '400px',
        overflow: 'visible',
        maxWidth: '800px',
        width: isMobile ? '360px' : '400px',
        borderRadius: '0',
        borderWidth: '0.8px',
    };
};

type TargetCardType = {
    token: string;
    number: string;
};

type CardScreenHistory = (CardScreen | null)[];

export const ProjectPost = ({
    initScreen = CardScreen.LIST,
}: {
    initScreen?: CardScreen;
}) => {
    const { changePage, queryParams } = useRouteControl();
    const paymentIntentClientSecretParam =
        (queryParams as { payment_intent_client_secret?: string })
            .payment_intent_client_secret || null;
    const [terms] = useState(true);

    const { isMaxMobile } = useMediaContext();
    const [editCardToken, setEditCardToken] = useState<string | null>(null);
    const [screenHistory, setScreenHistory] = useState<CardScreenHistory>([
        !isMaxMobile ? initScreen : null,
    ]);
    const screen = screenHistory[screenHistory.length - 1];
    const [selectedCard, setSelectedCard] = useState<{
        token: string;
        paymentStatus: PaymentStatusNames;
    } | null>(null);

    const { isShowError, showError } = useShowErrorMessage(1800);
    const [isEditList, setIsEditList] = useState<boolean>(false);
    const [isNextScopeSavedPopup, setIsNextScopeSavedPopup] =
        useState<boolean>(false);
    const confirmDeletePopup = usePopup();
    const savedScopePopup = usePopup();
    const [targetCard, setTargetCard] = useState<TargetCardType | null>(null);
    const createPasswordPopupControl = usePopup();
    const donePopupControl = usePopup();

    const {
        loadingProject,
        projectPost: {
            projectInfo,
            couponInfo: { price, discount, name },
        },
    } = useProjectInfoControl();
    const { data: selfData } = useGetSelfQuery();

    const {
        handleClickCoupon,
        isSuccessCoupons,
        isLoaderCoupons,
        isSubmittedCoupon,
        error,
    } = useCouponPostControl();

    const updateScreen = (newScreen: CardScreen | null) => {
        setScreenHistory([...screenHistory, newScreen]);
    };

    const handleBack = () => {
        const newScreenHistory = [...screenHistory];
        newScreenHistory.pop();
        setScreenHistory(newScreenHistory);
    };

    const { isLoading3DSComplete, successData } = useOn3DSComplete(
        paymentIntentClientSecretParam || '',
        () => updateScreen(CardScreen.SUCCESS),
        () => updateScreen(CardScreen.FAILURE),
    );

    const {
        handlePostProject,
        handleUpdateCard,
        isLoadingUpdateCard,
        isLoadingPost,
        isLoadingSetCard,
        listCards,
        isLoadingGetCards,
        isFetchingGetCards,
        successScreenData,
        errorScreenData,
        removeActions,
    } = useProjectPostControl({
        setScreen: updateScreen,
        handleBack,
        setSelectedCard,
        isSelectedCard: !!selectedCard,
        terms,
    });

    const { toastLoading } = useToastifyRequest({
        actionProps: removeActions,
        configMessages: removeMessages,
        toastId: 'toast-remove-account',
        callbackFn: confirmDeletePopup.close,
        isDelayCallback: false,
    });

    const handleEditCard = (cardToken: string) => {
        setEditCardToken(cardToken);
        updateScreen(CardScreen.FORM);
    };

    const stripeStyles = {
        creditCardOptions,
        addressOptions,
    };

    const renderConfirmDeletePopupTitle = () => (
        <Fragment>
            <WarningIcon /> Delete card {targetCard?.number || ''}
        </Fragment>
    );

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

    const handleOpenConfirmDeletePopup = (token: string, number: string) => {
        setTargetCard({ token, number });
        confirmDeletePopup.open();
    };

    const renderTerms = () => {
        return (
            <div className="terms-conditions">
                <span>
                    By continuing you agree to Breef’s&nbsp;
                    <a
                        href={`/client${TERMS_OF_USE_STANDARD_ROUTE}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Terms of Use
                    </a>
                    &nbsp; and &nbsp;
                    <a
                        href={`/client${PRIVACY_POLICY_ROUTE}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Privacy Policy
                    </a>
                </span>
            </div>
        );
    };

    if (loadingProject || !projectInfo || !selfData) {
        return <PageLoader />;
    }
    const { hasPassword, hasSocialAccount } = selfData;
    const card =
        listCards?.find(item => item.token === selectedCard?.token) ||
        listCards?.[0];

    const hideRightSection = !screen && !card;

    const renderList = () => {
        const handleClick = () => {
            if (!selectedCard) return showError();
            handlePostProject(
                selectedCard.token,
                PaymentStatusNames.CARD_EXIST,
                '',
            );
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
            updateScreen(CardScreen.FORM);
        };

        if (isLoadingGetCards) return <LipsLoader />;
        if (!listCards?.length) updateScreen(null);

        return [
            confirmDeletePopup.isOpen && (
                <ConfirmContent
                    key="confirm-popup"
                    isSubmitting={removeActions.isLoading || toastLoading}
                    title={renderConfirmDeletePopupTitle()}
                    description="Permanently delete this card? This action can’t be undone"
                    onClick={handleClickConfirmDeletePopup}
                    newDesign
                    nameConfirmBtn="Delete card"
                    style={confirmPopupStylesPreset(isMaxMobile)}
                />
            ),
            <div key="list-container" className="list-container">
                <h3 className="title">Make Payment</h3>
                <div className="divider"></div>
                <Section
                    label={`saved card${listCards.length > 1 ? 's' : ''}`}
                    className="f-start accounts-list"
                >
                    <AccountsList
                        list={listCards}
                        addItem={handleUpdateScreen}
                        removeItem={handleOpenConfirmDeletePopup}
                        onSelectItem={handleSelectCard}
                        handleEditCard={handleEditCard}
                        selectedItem={selectedCard}
                        isShowError={isShowError}
                        nameLinkBtn="Add new card"
                        hasCreditCard
                        isEdit={isEditList}
                        handleUpdateIsEdit={setIsEditList}
                        isLoadingList={isFetchingGetCards}
                    />
                    <Button
                        key="button-post"
                        isDisabled={isEditList || isFetchingGetCards || !terms}
                        isSubmitted={isLoadingPost || isLoading3DSComplete}
                        className="medium"
                        onClick={handleClick}
                        label="POST PROJECT"
                        isUppercase
                        size="medium"
                    />
                    <div className={`text-block`}>{renderTerms()}</div>
                </Section>
            </div>,
        ];
    };

    const renderForm = () => {
        const isEditCreditCardToken = editCardToken !== null;
        const handleClick = (
            token: string,
            options: CreateTokenCardData,
            saveCard: boolean | undefined,
        ) => {
            if (isEditCreditCardToken) {
                handleUpdateCard(token, options);
            } else {
                const payStatus = saveCard
                    ? PaymentStatusNames.CARD_EXIST
                    : PaymentStatusNames.CARD_NEW;
                handlePostProject(
                    token,
                    payStatus,
                    options.name ?? '',
                    saveCard,
                );
            }
        };

        const renderNavigation = () => (
            <div className="form-add-header">
                <div className="group">
                    <h3 className="title">
                        {!isEditCreditCardToken
                            ? 'Payment Details'
                            : 'Edit Card'}
                    </h3>
                </div>
                <div className="divider"></div>
            </div>
        );

        return (
            <div className="form-wrapper">
                {renderNavigation()}
                <CreditCardForm
                    stylesStripe={stripeStyles}
                    isOnSaveCard
                    isShowSwitcher={!isEditCreditCardToken}
                    isSubmitted={
                        isLoadingSetCard || isLoadingPost || isLoadingUpdateCard
                    }
                    isDisabledBtn={!terms}
                    onClick={handleClick}
                    nameSubmitBtn={
                        !isEditCreditCardToken ? 'POST PROJECT' : 'Save'
                    }
                    cardToken={editCardToken}
                    setCardToken={setEditCardToken}
                    textBlock={renderTerms()}
                />
            </div>
        );
    };

    const hideLeftSection =
        (screen === CardScreen.SUCCESS || screen === CardScreen.FAILURE) &&
        isMaxMobile;

    const redirectToDashboard = () => changePage(PROJECTS_ROUTE);

    const onExitToDashboard = (isScopeSavedPopup: boolean) => {
        if (hasPassword || hasSocialAccount) {
            (isScopeSavedPopup ? savedScopePopup : donePopupControl).open();
            return;
        }
        setIsNextScopeSavedPopup(isScopeSavedPopup);
        createPasswordPopupControl.open();
    };

    const handleGoToDashboard = () => onExitToDashboard(false);
    const handleClickLogo = () => onExitToDashboard(true);

    const callbackCreatePasswordFn = () => {
        if (isNextScopeSavedPopup) {
            savedScopePopup.open();
        } else {
            donePopupControl.open();
        }
        createPasswordPopupControl.close();
    };

    const renderSuccess = () => {
        return (
            <StatusCheckoutPage
                status="success"
                successBody={successScreenData || successData}
                handleClickButton={handleGoToDashboard}
                withCardFee={false}
            />
        );
    };

    const renderFailure = () => {
        const handleUpdateScreen = () => {
            updateScreen(CardScreen.LIST);
        };

        return (
            <StatusCheckoutPage
                status="failed"
                handleClickButton={handleUpdateScreen}
                failedBody={errorScreenData}
            />
        );
    };

    const renderDefault = () => {
        const handleClick = () => {
            if (selectedCard) {
                handlePostProject(
                    selectedCard.token,
                    PaymentStatusNames.CARD_EXIST,
                    '',
                );
            }
        };

        if (isLoadingGetCards) return <LipsLoader />;
        if (!card) {
            updateScreen(CardScreen.FORM);
            return;
        }

        return (
            <div className="default-group">
                <Section className="default-card" label="default card">
                    <div className="default-card-wrapper">
                        <AccountItem
                            onClickItem={() => updateScreen(CardScreen.LIST)}
                            item={card}
                            hasCreditCard
                            isReadOnly
                        />
                        <AccountBillingDetail
                            onClick={() => handleEditCard(card.token ?? '')}
                            billingDetail={card.address}
                        />
                    </div>
                    <Button
                        key="button-post"
                        isDisabled={!card || !terms}
                        isSubmitted={isLoadingPost || isLoading3DSComplete}
                        className="medium"
                        onClick={handleClick}
                        label="POST PROJECT"
                        isUppercase
                        size="medium"
                    />
                    <div className={`text-block`}>{renderTerms()}</div>
                </Section>
            </div>
        );
    };

    const renderRightSectionContent = () => {
        if (isLoadingGetCards) return <LipsLoader />;
        switch (screen) {
            case CardScreen.LIST:
                return renderList();
            case CardScreen.FORM:
                return renderForm();
            case CardScreen.SUCCESS:
                return renderSuccess();
            case CardScreen.FAILURE:
                return renderFailure();
            default:
                return renderDefault();
        }
    };

    const renderLeftSectionContent = () => {
        if (!isSuccessCoupons && isLoaderCoupons) {
            return <LipsLoader />;
        }

        return (
            <PayInformation
                error={error}
                price={price}
                discountPrice={discount}
                couponName={name}
                onClick={handleClickCoupon}
                isSubmitted={isSubmittedCoupon}
            />
        );
    };

    const successPopupSharedProps = {
        subtitle: 'Look out for an email from your Strategist.',
        buttonTitle: 'Go to Dashboard',
        onClick: redirectToDashboard,
    };

    const createPasswordSubtitle = !isNextScopeSavedPopup
        ? 'Set a password to access your Breef dashboard.'
        : 'Set a password to save your scope to Breef.';

    return (
        <StyledProjectPost hideRightSection={hideRightSection}>
            {createPasswordPopupControl.isOpen && (
                <CreatePasswordPopup
                    subtitle={createPasswordSubtitle}
                    close={createPasswordPopupControl.close}
                    onBack={createPasswordPopupControl.close}
                    onClose={createPasswordPopupControl.close}
                    onSuccessCallback={callbackCreatePasswordFn}
                />
            )}
            {savedScopePopup.isOpen && (
                <SuccessPopup
                    {...successPopupSharedProps}
                    title="Scope saved!"
                    onClose={savedScopePopup.close}
                />
            )}
            {donePopupControl.isOpen && (
                <SuccessPopup
                    {...successPopupSharedProps}
                    title="Done!"
                    onClose={donePopupControl.close}
                />
            )}
            <Header
                buttonTitle="exit"
                onCLickLogo={handleClickLogo}
                hideButton
            />
            <div className="content-wrapper">
                {!hideLeftSection && (
                    <div className="left-section">
                        {renderLeftSectionContent()}
                    </div>
                )}
                <div className="right-section">
                    <StyledPayment data-testid="selection-wrapper">
                        {renderRightSectionContent()}
                    </StyledPayment>
                </div>
            </div>
        </StyledProjectPost>
    );
};

export default ProjectPost;
