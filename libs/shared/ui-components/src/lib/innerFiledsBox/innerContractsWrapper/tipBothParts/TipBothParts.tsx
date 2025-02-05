import React from 'react';
import { StyledTipBothParts } from './TipBothParts.styled';
import { BothPartsTipIcon, DrawnArrowLeftIcon } from '@breef/shared/assets';

export const TipBothParts = () => {
    return (
        <StyledTipBothParts>
            <BothPartsTipIcon className="tip" />
            <DrawnArrowLeftIcon className="drawn-arrow" />
        </StyledTipBothParts>
    );
};

export default TipBothParts;
