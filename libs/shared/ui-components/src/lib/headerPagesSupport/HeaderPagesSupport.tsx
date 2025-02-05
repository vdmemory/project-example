import React from 'react';
import { StyledHeaderPagesSupport } from './HeaderPagesSupport.styled';

const HeaderPagesSupport = ({ title }: { title: string }) => {
    return (
        <StyledHeaderPagesSupport>
            <h1>{title}</h1>
        </StyledHeaderPagesSupport>
    );
};
export default HeaderPagesSupport;
