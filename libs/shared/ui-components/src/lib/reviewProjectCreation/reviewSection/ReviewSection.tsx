import React, { FC, ReactNode } from 'react';
import { StyledReviewSection } from './ReviewSection.styled';

interface ReviewSectionProps {
    title: string;
    children: ReactNode;
}
export const ReviewSection: FC<ReviewSectionProps> = ({ title, children }) => {
    return (
        <StyledReviewSection>
            <div className="title">{title}</div>
            <div className="content-wrapper">{children}</div>
        </StyledReviewSection>
    );
};

export default ReviewSection;
