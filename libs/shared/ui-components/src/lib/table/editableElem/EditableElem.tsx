import React, { FC, ReactNode } from 'react';
import { StyledEditableElem } from './EditableElem.styled';

interface EditableElem {
    onClick: () => void;
    icon: ReactNode;
    value: string;
}
export const EditableElem: FC<EditableElem> = ({ onClick, value, icon }) => {
    return (
        <StyledEditableElem onClick={onClick}>
            <span>{value}</span>
            {icon}
        </StyledEditableElem>
    );
};
