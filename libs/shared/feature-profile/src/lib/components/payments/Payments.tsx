import {
    ConfirmContent,
    CreditCardFormOld,
    LipsLoader,
    Spinner,
    usePopup,
} from '@breef/shared/ui-components';
import { CSSObject } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useProfileSelector } from '../../store/hooks';
import { PaymentsView } from '../../types/profileFormTypes';
import AccountsList from './accountsList/AccountsList';
import BackButton from './backButton/BackButton';
import ChoiceMethod from './choiceMethod/ChoiceMethod';
import { StyledPayments } from './Payments.styled';
import { useToastifyRequest } from '@breef/shared/hooks';
import { usePaymentsMethodsControl } from './usePaymentsMethodsControl';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';

const optionsConfirmContent: {
    [key: string]: CSSObject | string;
} = {
    textInformationStyle: {
        padding: '65px 100px',
    },
    titleStyle: {
        marginTop: '0',
        whiteSpace: 'pre-line',
        textAlign: 'center',
    },
    descriptionStyle: {
        whiteSpace: 'pre-line',
        marginBottom: '0',
        textAlign: 'center',
    },
};

const removeMessages = {
    loading: 'Removing...',
    success: 'Account has been removed successfully',
    error: 'An error happened when trying to delete a payment account',
};

export const Payments = () => {
    const router = useRouter();
    const projectId = (router.query as { projectId?: number }).projectId || -1;
    const [view, setView] = useState<PaymentsView | null>(null);
    const [editCardToken, setEditCardToken] = useState<string | null>(null);
    const { listAccountsBank, listAccountsCard } = useProfileSelector(
        state => state.profile,
    );
    const listAccounts = useMemo(
        () => [...listAccountsCard, ...listAccountsBank],
        [listAccountsBank, listAccountsCard],
    );
    const isEditCreditCardToken = editCardToken !== null;
    const confirmPopupControl = usePopup();
    const [accountToRemove, setAccountToRemove] = useState({
        type: '',
        id: '',
    });

    const {
        getListAccounts,
        handleAddCard,
        handleUpdateCard,
        handleAddBank,
        handleRemoveAccount,
        isLoadingGet,
        isLoadingSet,
        isLoadingUpdate,
        removeActions,
    } = usePaymentsMethodsControl({ setView, projectId });

    const { toastLoading } = useToastifyRequest({
        actionProps: removeActions,
        configMessages: removeMessages,
        toastId: 'toast-remove-account',
        callbackFn: confirmPopupControl.close,
    });

    useEffect(() => {
        getListAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditCard = (token: string) => {
        setEditCardToken(token);
        setView(PaymentsView.ADD_CARD);
    };

    const handleSubmitCard = (token: string, options: CreateTokenCardData) => {
        if (isEditCreditCardToken) {
            handleUpdateCard(token, options);
        } else {
            handleAddCard(token, options.name ?? '');
        }
    };

    const renderConfirmPopup = () => {
        const { type, id } = accountToRemove;
        return (
            <ConfirmContent
                {...optionsConfirmContent}
                isSubmitting={removeActions.isLoading || toastLoading}
                title={'Confirm Delete?'}
                description={'Are you sure you like to delete this account?'}
                onClick={event => {
                    if (event === 'cancel') return confirmPopupControl.close();
                    return handleRemoveAccount(type, id);
                }}
            />
        );
    };

    const onRemoveCard = (type: string, id: string) => {
        setAccountToRemove({ type, id });
        confirmPopupControl.open();
    };

    const renderContent = () => {
        switch (view) {
            case PaymentsView.CHOICE:
                return (
                    <ChoiceMethod
                        title="Add a payment Method"
                        handleClickBack={() => setView(PaymentsView.LIST)}
                        handleClickNext={() => setView(PaymentsView.ADD_CARD)}
                        handleAddBank={handleAddBank}
                        hideBackButton={listAccounts.length === 0}
                        isLoading={isLoadingSet}
                    />
                );
            case PaymentsView.LIST:
                return (
                    <AccountsList
                        list={listAccounts}
                        addCard={() => {
                            setView(PaymentsView.CHOICE);
                        }}
                        removeCard={onRemoveCard}
                        editCard={handleEditCard}
                        isLoadingList={isLoadingSet}
                        isSubmittingItem={removeActions.isLoading}
                    />
                );
            case PaymentsView.ADD_CARD:
                return (
                    <>
                        <BackButton
                            onClick={() =>
                                setView(
                                    isEditCreditCardToken
                                        ? PaymentsView.LIST
                                        : PaymentsView.CHOICE,
                                )
                            }
                        />
                        <h3 className="card-form-title">
                            {isEditCreditCardToken ? 'Edit' : 'Add'} Card
                        </h3>
                        <CreditCardFormOld
                            isSubmitted={isLoadingSet || isLoadingUpdate}
                            nameSubmitBtn="Save"
                            onClick={handleSubmitCard}
                            cardToken={editCardToken}
                            setCardToken={setEditCardToken}
                        />
                    </>
                );

            default:
                return null;
        }
    };

    if (isLoadingGet) {
        return (
            <StyledPayments>
                <LipsLoader />
            </StyledPayments>
        );
    }

    return (
        <StyledPayments>
            {confirmPopupControl.isOpen && renderConfirmPopup()}
            {renderContent()}
        </StyledPayments>
    );
};

export default Payments;
