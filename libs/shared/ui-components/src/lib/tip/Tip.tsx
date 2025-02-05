import React, { FC } from 'react';
import { StyledTip } from './Tip.styled';

interface TipProps {
    label: string;
    text: string;
    linesCount?: number;
}
export const Tip: FC<TipProps> = ({ label, text, linesCount }) => {
    return (
        <StyledTip linesCount={linesCount}>
            <h4>{label}</h4>
            <p>{text}</p>
        </StyledTip>
    );
};

export default Tip;
