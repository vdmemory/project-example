import { StatusTagType } from '@breef/shared/types';
import React from 'react';
import { StyledStatusTag } from './StatusTag.styled';

export const StatusTag: React.FC<StatusTagType> = ({
    sentiment = 'neutral',
    title,
}) => {
    return (
        <StyledStatusTag className="tag-status" sentiment={sentiment}>
            {title}
        </StyledStatusTag>
    );
};
