import { ChangeEvent } from 'react';
import { StyledButtonSelect } from './ButtonSelect.styled';
import { Checkbox } from '../checkbox/Checkbox.component';

export interface ButtonSelectProps {
    label: string;
    name?: string;
    description?: string;
    onChange?: () => void;
    disabled?: boolean;
    checked?: boolean;
    type?: 'checkbox' | 'radio';
    isUppercase?: boolean;
}
export const ButtonSelect = ({
    label,
    name = 'button-select',
    description,
    isUppercase = true,
    type = 'checkbox',
    onChange,
    ...rest
}: ButtonSelectProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        onChange?.();
    };

    return (
        <StyledButtonSelect
            className="select-btn"
            isUppercase={isUppercase}
            type={type}
        >
            <Checkbox type={type} onChange={handleChange} {...rest} />
            <div className="group">
                <div className="label">{label}</div>
                {description && <p className="description">{description}</p>}
            </div>
        </StyledButtonSelect>
    );
};
