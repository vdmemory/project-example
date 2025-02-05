import { ChangeEvent } from 'react';
import CardTemplate from './cardTemplate/CardTemplate';
import Card from './card/Card';
import ExpandedCard from './expandedCard/ExpandedCard';

interface CardControllerProps {
    data: {
        id: number | string;
        name: string;
        description?: string;
        isTagged?: boolean;
        image?: string;
    };
    type: 'radio' | 'checkbox';
    isChecked?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    cardType?: string;
    cardNumber: number;
    preset?: 'big' | 'small';
}

export const CardController = (props: CardControllerProps) => {
    switch (props.cardType) {
        case cardTypes.cardTemplate:
            return <CardTemplate {...props} />;
        case cardTypes.expandedCard:
            return <ExpandedCard {...props} />;
        case cardTypes.expandedBigCard:
            return <ExpandedCard {...props} cardSize="big" />;
        default:
            return (
                <Card {...props}>
                    <p>{props.data.name}</p>
                </Card>
            );
    }
};

export default CardController;

export const cardTypes = {
    cardTemplate: 'cardTemplate',
    expandedCard: 'expandedCard',
    expandedBigCard: 'expandedBigCard',
};
