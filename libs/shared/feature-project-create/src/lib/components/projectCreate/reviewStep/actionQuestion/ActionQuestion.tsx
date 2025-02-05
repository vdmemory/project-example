import { StyledActionQuestion } from './ActionQuestion.styled';
import { FC } from 'react';

interface ActionTipProps {
    className?: string;
    question: string;
    linkTitle: string;
    onClick: () => void;
}

export const ActionQuestion: FC<ActionTipProps> = ({
    className,
    question,
    linkTitle,
    onClick,
}) => (
    <StyledActionQuestion className={className}>
        <span>{question}</span>
        <a onClick={onClick}>{linkTitle}</a>
    </StyledActionQuestion>
);
