import React, { ReactNode } from 'react';
import { StyledHeader } from './HeaderReview.styled';

type HeaderReviewType = {
    title: string;
    children?: ReactNode;
};

const HeaderReview: React.FC<HeaderReviewType> = ({ title, children }) => {
    return (
        <StyledHeader className="header-review">
            <h2 className="title">{title}</h2>
            {children}
        </StyledHeader>
    );
};
export default HeaderReview;
