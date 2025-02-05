import { CheckMinIcon } from '@breef/shared/assets';
import { ChangeEvent, ReactNode } from 'react';
import { StyledCard } from './Card.styled';

interface CardProps {
    data: { id: number | string; name: string };
    type?: 'radio' | 'checkbox';
    isChecked?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode;
    preset?: 'big' | 'small';
}

export const Card = ({
    data,
    type,
    isChecked,
    onChange,
    children,
    preset,
}: CardProps) => {
    return (
        <StyledCard
            data-testid="card-wrapper"
            checked={isChecked}
            preset={preset}
        >
            <input
                data-testid="card-input"
                id={String(data.id)}
                type={type}
                name={data.name}
                checked={isChecked}
                onChange={onChange}
            />
            {children}
            {isChecked && <CheckMinIcon data-testid="check-min-icon" />}
        </StyledCard>
    );
};

export default Card;
