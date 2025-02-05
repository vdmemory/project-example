import { ChangeEvent, ReactNode, SyntheticEvent } from 'react';
import { StyledCustomExpandedCard } from './CustomExpandedCard.styled';
import { BasketIcon, CheckIcon, EditIcon } from '@breef/shared/assets';
import { AccentNumber } from '../../../../accentNumber/AccentNumber';
import LinkButton from '../../../../button/linkButton/LinkButton';

interface CustomExpandedCardProps {
    label?: string;
    type?: 'radio' | 'checkbox';
    isChecked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    cardNumber?: number;
    children: ReactNode;
    buttonLabel?: string;
    buttonClickHandler?: (e: SyntheticEvent) => void;
    onDelete?: (e: SyntheticEvent) => void;
    onEdit?: (e: SyntheticEvent) => void;
    isDisableDelete?: boolean;
    isDisabledButton?: boolean;
    isEditable?: boolean;
    cardId: number;
    isOptional?: boolean;
    className?: string;
}

export const CustomExpandedCard = ({
    type = 'checkbox',
    isChecked,
    onChange,
    cardNumber,
    label,
    buttonLabel,
    buttonClickHandler,
    onDelete,
    onEdit,
    isDisableDelete,
    children,
    isDisabledButton = false,
    isEditable = true,
    cardId,
    isOptional = false,
    className,
}: CustomExpandedCardProps) => {
    return (
        <StyledCustomExpandedCard
            className={`${className || ''} expanded-card`}
            checked={isChecked}
            isEditable={isEditable}
        >
            <input
                data-testid="input-card"
                type={type}
                role={type || ''}
                value={isChecked + ''}
                onChange={!isEditable ? onChange : e => e.stopPropagation()}
            />
            {onDelete && isEditable && (
                <button
                    data-testid="button-delete"
                    className="card-action-button"
                    type="button"
                    onClick={onDelete}
                    disabled={isDisableDelete}
                >
                    <BasketIcon />
                </button>
            )}
            {onEdit && !isEditable && (
                <button
                    data-testid="button-edit"
                    className="card-action-button"
                    type="button"
                    onClick={onEdit}
                >
                    <EditIcon />
                </button>
            )}
            <div className="card-content">
                {!!cardNumber && (
                    <AccentNumber number={cardNumber} isOptional={isOptional} />
                )}
                {isEditable && label && <p className="card-label">{label}</p>}
                {children}
            </div>
            <div className="bottom-card-section">
                {isChecked && !isEditable && <CheckIcon />}
                {isEditable && buttonLabel && buttonClickHandler && (
                    <LinkButton
                        className="card-link-button"
                        icon="plus"
                        type="button"
                        onClick={buttonClickHandler}
                        name={buttonLabel}
                        disabled={isDisabledButton}
                        line={false}
                    />
                )}
            </div>
        </StyledCustomExpandedCard>
    );
};

export default CustomExpandedCard;
