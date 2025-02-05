import { ChangeEvent } from 'react';
import { StyledExpandedCard } from './ExpandedCard.styled';
import { BreefMostPopular, CheckIcon } from '@breef/shared/assets';
import { AccentNumber } from '../../../../accentNumber/AccentNumber';

interface CardProps {
    data: {
        id: number | string;
        name: string;
        description?: string;
        isTagged?: boolean;
    };
    type?: 'radio' | 'checkbox';
    isChecked?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    cardNumber: number;
    cardSize?: 'normal' | 'big';
}

export const ExpandedCard = ({
    data,
    type,
    isChecked,
    onChange,
    cardNumber,
    cardSize,
}: CardProps) => {
    return (
        <StyledExpandedCard
            data-testid="card-wrapper"
            checked={isChecked}
            cardSize={cardSize}
            className="expanded-card"
        >
            <input
                data-testid="expanded-card-input"
                id={String(data.id)}
                type={type}
                name={data.name}
                checked={isChecked}
                onChange={onChange}
            />
            <div className="card-title">
                <AccentNumber number={cardNumber} />
                <p>{data.name}</p>
            </div>
            <div className="bottom-card-section">
                {isChecked && <CheckIcon data-testid="check-icon" />}
                <div className="note-section">
                    {data.description ? (
                        <span>{data.description}</span>
                    ) : (
                        data.isTagged && (
                            <BreefMostPopular
                                data-testid="tagged-icon"
                                className="breef-most-popular-icon"
                            />
                        )
                    )}
                </div>
            </div>
        </StyledExpandedCard>
    );
};

export default ExpandedCard;
