import React from 'react';
import { StyledSelectPaymentType } from './SelectPaymentType.styled';
import { configPaymentTypes } from './configPaymentTypes';
import CardPaymentType from './cardPaymentType/CardPaymentType';

interface SelectPaymentTypeProps {
    value: string;
    onChange: (paymentType: string) => void;
}

export const SelectPaymentType: React.FC<SelectPaymentTypeProps> = ({
    value,
    onChange,
}) => {
    return (
        <StyledSelectPaymentType>
            <h2>What type of project is this?</h2>
            <div className="card-select-container">
                {configPaymentTypes.map((item, key) => (
                    <CardPaymentType
                        key={key}
                        label={item.label}
                        note={item.note}
                        isSelected={value === item.paymentType}
                        onSelect={() => onChange(item.paymentType)}
                    />
                ))}
            </div>
        </StyledSelectPaymentType>
    );
};
export default SelectPaymentType;
