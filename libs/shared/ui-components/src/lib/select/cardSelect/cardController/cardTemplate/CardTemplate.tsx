import { ChangeEvent } from 'react';
import { StyledCardTemplate } from './CardTemplate.styled';
import {
    BreefSuggestion,
    CheckMinIcon,
    SmallRocket,
} from '@breef/shared/assets';

interface CardTemplateProps {
    data: {
        id: number | string;
        name: string;
        isTagged?: boolean;
        image?: string;
    };
    type?: 'radio' | 'checkbox';
    isChecked?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CardTemplate = ({
    data,
    type,
    isChecked,
    onChange,
}: CardTemplateProps) => {
    return (
        <StyledCardTemplate data-testid="card-wrapper" checked={isChecked}>
            <input
                data-testid="card-template-input"
                id={String(data.id)}
                type={type}
                name={data.name}
                checked={isChecked}
                onChange={onChange}
            />
            {data.isTagged && (
                <BreefSuggestion
                    data-testid="tagged-icon"
                    className="breef-suggestion"
                />
            )}
            <div className="image-wrapper">
                <img src={data.image || SmallRocket.src} alt="" />
            </div>
            <p>{data.name}</p>
            {isChecked && <CheckMinIcon data-testid="check-min-icon" />}
        </StyledCardTemplate>
    );
};

export default CardTemplate;
