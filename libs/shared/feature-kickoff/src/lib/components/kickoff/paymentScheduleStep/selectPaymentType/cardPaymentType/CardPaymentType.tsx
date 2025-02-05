import React, { useContext } from 'react';
import { StyledCardPaymentType } from './CardPaymentType.styled';
import { CheckIcon } from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';

interface SelectPaymentTypeProps {
    label: string;
    note: string;
    isSelected: boolean;
    onSelect: () => void;
}

export const CardPaymentType: React.FC<SelectPaymentTypeProps> = ({
    label,
    note,
    isSelected,
    onSelect,
}) => {
    const { isMobile } = useMediaContext();

    return (
        <StyledCardPaymentType
            data-testid="card-payment-type"
            isSelected={isSelected}
            onClick={onSelect}
        >
            {isMobile && <CheckIcon className="check-icon" />}
            <h2>{label}</h2>
            <span>{note}</span>
            {!isMobile && <CheckIcon className="check-icon" />}
        </StyledCardPaymentType>
    );
};
export default CardPaymentType;
