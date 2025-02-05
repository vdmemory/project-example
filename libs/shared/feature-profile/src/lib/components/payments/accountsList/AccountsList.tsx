import { BasketIcon } from '@breef/shared/assets';
import { LinkButton, LipsLoader, Spinner } from '@breef/shared/ui-components';
import { getBankIcon, getCardIcon } from '@breef/shared/utils';
import { ListAccountsType } from '../../../types/profileFormTypes';
import { StyledAccount, StyledAccountsList } from './AccountsList.styled';
import { EditIcon } from '@breef/ui-kit';
import { PaymentStatusNames } from '@breef/shared/constants';

interface AccountsListProps {
    list: ListAccountsType[] | [];
    addCard: () => void;
    removeCard: (type: string, id: string) => void;
    editCard: (token: string) => void;
    isLoadingList?: boolean;
    isSubmittingItem?: boolean;
}

export const AccountsList = ({
    list,
    addCard,
    removeCard,
    editCard,
    isLoadingList = false,
    isSubmittingItem = false,
}: AccountsListProps) => {
    const isListEmpty = list.length === 0;

    const renderNumberText = (typeIcon: string, number: string) => {
        if (typeIcon === 'card') {
            return `Credit card ending in ${number}`;
        }
        return `Checking ending in ${number}`;
    };

    const renderIcon = (typeIcon: string, brand: string) => {
        if (typeIcon === 'card') {
            return <div className="card-brand">{getCardIcon(brand)}</div>;
        }
        return getBankIcon(brand);
    };

    const renderAccount = ({
        id,
        type,
        name,
        number,
        typeIcon,
        displayName,
        brand,
    }: ListAccountsType) => {
        const isCardItem = type === PaymentStatusNames.CARD_EXIST;
        return (
            <StyledAccount key={id} isCardItem={isCardItem}>
                <div className="item-header">{renderIcon(typeIcon, brand)}</div>
                <div className="item-body">
                    {!!name && <div className="item-name">{name}</div>}
                    {!!displayName && (
                        <div className="item-type">{displayName}</div>
                    )}
                    <div className="item-number">
                        {renderNumberText(type, number)}
                    </div>
                </div>
                <BasketIcon
                    className="item-basket"
                    onClick={() => !isSubmittingItem && removeCard(type, id)}
                />
                {isCardItem && (
                    <EditIcon
                        className="item-pen"
                        onClick={() => editCard(id)}
                    />
                )}
            </StyledAccount>
        );
    };

    if (isLoadingList) {
        return <LipsLoader />;
    }

    return (
        <StyledAccountsList>
            {!isListEmpty && (
                <div className="list-inner">{list.map(renderAccount)}</div>
            )}
            <LinkButton
                name="PAYMENT METHOD"
                className="button-add"
                onClick={addCard}
                icon="plus"
                disabled={isSubmittingItem}
            />
        </StyledAccountsList>
    );
};

export default AccountsList;
