import React, { FC } from 'react';
import { CheckMinIcon } from '@breef/shared/assets';
import { StyledTeammate } from './Teammate.styled';
import { TeammateType } from '@breef/shared/types';

interface TeammateProps {
    teammate: TeammateType;
    onChange: (value: TeammateType) => void;
    isSelected: boolean;
}

export const Teammate: FC<TeammateProps> = ({
    teammate,
    onChange,
    isSelected,
}) => {
    return (
        <StyledTeammate
            disabled={teammate.isDisabled}
            className="row-item"
            onClick={() => onChange(teammate)}
            isSelected={isSelected}
        >
            {isSelected && <CheckMinIcon className="check-icon" />}
            <span className="teammate-name">{getTeammateName(teammate)}</span>
        </StyledTeammate>
    );
};

const getTeammateName = (teammate: TeammateType) => {
    if (teammate.firstName && teammate.lastName) {
        return `${teammate.firstName} ${teammate.lastName}`;
    }
    return teammate.email;
};
