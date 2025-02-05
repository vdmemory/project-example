import React, { ReactNode } from 'react';
import { StyledInnerFieldsBox } from './InnerFieldsBox.styled';

interface InnerFieldsBoxProps {
    children: ReactNode;
}

export const InnerFieldsBox = ({ children }: InnerFieldsBoxProps) => {
    return (
        <StyledInnerFieldsBox className="inner-fields-box">
            {children}
        </StyledInnerFieldsBox>
    );
};

export default InnerFieldsBox;
