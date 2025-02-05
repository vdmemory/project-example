import styled from '@emotion/styled';
import { ReactNode } from 'react';

const StyledFormRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const FormRow = ({ children }: { children: ReactNode }) => {
    return <StyledFormRow className="row-form">{children}</StyledFormRow>;
};
