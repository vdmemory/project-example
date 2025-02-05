import { PaymentStatusNames } from '@breef/shared/constants';
import { ListAccountsType } from '@breef/shared/types';
import {
    formatBudgetCost,
    getBankIcon,
    getCardIcon,
} from '@breef/shared/utils';
import {
    ArrowRightIcon,
    CloseIcon,
    EditIcon,
    Radio,
    TrashIcon,
} from '@breef/ui-kit';
import { useEffect } from 'react';
import LinkButton from '../button/linkButton/LinkButton';
import {
    StyledAccountsItem,
    StyledAccountsList,
    StyledButtonEdit,
    StyledShortCut,
} from './AccountsList.styled';
import LipsLoader from '../loader/lipsLoader/LipsLoader';

export interface AccountsListProps {
    list: ListAccountsType[];
    addItem: () => void;
    onSelectItem: (
        selectedItem: {
            id: string;
            token: string;
            paymentStatus: PaymentStatusNames;
        } | null,
    ) => void;
    removeItem?: (id: string, number: string, type: string) => void;
    selectedItem: { token: string; paymentStatus: PaymentStatusNames } | null;
    isLoadingList?: boolean;
    isShowError?: boolean;
    hasCreditCard?: boolean;
    nameLinkBtn?: string;
    cutValue?: number;
    isEdit?: boolean;
    handleUpdateIsEdit?: (isEdit: boolean) => void;
    handleEditCard?: (cardToken: string) => void;
}

export const AccountsList = ({
    isEdit = false,
    handleUpdateIsEdit,
    list,
    addItem,
    onSelectItem,
    removeItem,
    selectedItem,
    isLoadingList,
    isShowError,
    hasCreditCard,
    nameLinkBtn = 'Add Account',
    cutValue,
    handleEditCard,
}: AccountsListProps) => {
    const isListEmpty = list.length === 0;

    useEffect(() => {
        return () => handleUpdateIsEdit && handleUpdateIsEdit(false);
    }, []);

    if (isLoadingList) {
        return <LipsLoader />;
    }

    if (isListEmpty) return null;

    const renderItem = (item: ListAccountsType) => {
        const note = cutValue ? `+ ${formatBudgetCost(cutValue)} fee` : null;
        const showShortCut =
            hasCreditCard &&
            !!note &&
            !!selectedItem &&
            selectedItem.token === item.token;
        const onClickItem = () => item.token && handleEditCard?.(item.token);

        return (
            <div key={item.id + item.name} className="item-wrapper">
                <div className="row">
                    <ShortCut
                        isView={showShortCut && !isEdit}
                        value={note || ''}
                    />

                    <AccountItem
                        key={item.id}
                        item={item}
                        selectedItem={selectedItem}
                        onSelectItem={onSelectItem}
                        onClickItem={isEdit ? onClickItem : undefined}
                        hasCreditCard={hasCreditCard}
                        isEdit={isEdit}
                    />
                </div>

                {removeItem && (
                    <div
                        className={`button-delete-wrapper ${
                            !isEdit ? 'hide' : undefined
                        }`}
                    >
                        <ButtonEdit
                            isDelete
                            onClick={() =>
                                removeItem(item.id, item.number, item.type)
                            }
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <StyledAccountsList className="account-list">
            {handleUpdateIsEdit && (
                <ButtonEdit
                    isEdit={isEdit}
                    onClick={() => handleUpdateIsEdit(!isEdit)}
                />
            )}
            <div className="list-inner">{list.map(renderItem)}</div>
            {isShowError && (
                <div className="wrapper-error">
                    <p className="error-not-selected">
                        Missing account selection
                    </p>
                </div>
            )}
            <LinkButton
                name={nameLinkBtn}
                className="button-add"
                onClick={addItem}
                icon="plus"
            />
        </StyledAccountsList>
    );
};

export default AccountsList;

interface AccountItemProps {
    item: ListAccountsType;
    selectedItem?: { token: string; paymentStatus: PaymentStatusNames } | null;
    onSelectItem?: (
        selectedItem: {
            id: string;
            token: string;
            paymentStatus: PaymentStatusNames;
        } | null,
    ) => void;
    onClickItem?: () => void;
    hasCreditCard?: boolean;
    isEdit?: boolean;
    isReadOnly?: boolean;
}

export const AccountItem = ({
    item,
    selectedItem,
    onSelectItem,
    onClickItem,
    hasCreditCard,
    isEdit = false,
    isReadOnly = false,
}: AccountItemProps) => {
    const { id, type, name, number, typeIcon, token, brand, expiredDate } =
        item;
    const isActive = !!selectedItem && selectedItem.token === token;

    const handleSelectItem = () => {
        if (onClickItem) {
            return onClickItem();
        }

        onSelectItem &&
            onSelectItem({
                id,
                token: token || id,
                paymentStatus: type as PaymentStatusNames,
            });
    };

    const renderIcon = () => {
        if (typeIcon === 'card') {
            return <div className="card-brand">{getCardIcon(brand)}</div>;
        }
        return getBankIcon(brand);
    };

    return (
        <StyledAccountsItem
            className="account-item"
            hasCreditCard={hasCreditCard}
            onClick={handleSelectItem}
            key={id}
        >
            <div className="item-group">
                {!isEdit && !isReadOnly && (
                    <Radio
                        small
                        onChange={handleSelectItem}
                        checked={isActive}
                    />
                )}
                <div className="item-icon">{renderIcon()}</div>
                <div className="item-group group-text group-text-left">
                    {hasCreditCard && <div className="item-brand">{brand}</div>}
                    {name && <div className="item-name">{name}</div>}
                </div>
            </div>
            <div className="item-group">
                <div className="group-text group-text-right">
                    <div className="item-number">{number}</div>
                    {hasCreditCard && (
                        <div className="item-expires">
                            Expires {expiredDate}
                        </div>
                    )}
                </div>
                {isEdit || isReadOnly ? (
                    <ArrowRightIcon className="arrow-right-icon" />
                ) : null}
            </div>
        </StyledAccountsItem>
    );
};

const ShortCut = ({ value, isView }: { value: string; isView?: boolean }) => (
    <StyledShortCut isView={isView}>
        <span className="short-cut">
            <p>{value}</p>
        </span>
    </StyledShortCut>
);

const ButtonEdit = ({
    isEdit,
    isDelete,
    onClick,
}: {
    isEdit?: boolean;
    isDelete?: boolean;
    onClick: () => void;
}) => {
    const renderContent = () => {
        if (isEdit) {
            return (
                <div className="close">
                    <p>cancel</p>
                    <CloseIcon />
                </div>
            );
        }
        if (isDelete) {
            return (
                <div className="delete">
                    <TrashIcon />
                </div>
            );
        }
        return <EditIcon />;
    };

    return (
        <StyledButtonEdit
            className={`edit-button ${isDelete ? 'remove' : 'edit'}`}
            onClick={onClick}
        >
            <div className="inner">{renderContent()}</div>
        </StyledButtonEdit>
    );
};
