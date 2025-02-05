import { FC, LegacyRef, ReactNode } from 'react';
import { StyledReviewCard, StyledReviewText } from './ReviewCard.styled';
import { EditSmall } from '@breef/shared/assets';

interface ReviewCardProps {
    className?: string;
    title?: string;
    children?: ReactNode;
    onEdit?: () => void;
    renderLine?: ReactNode;
    ref?: LegacyRef<HTMLDivElement> | undefined;
}
export const ReviewCard: FC<ReviewCardProps> = ({
    className,
    title,
    children,
    onEdit,
    renderLine,
    ref,
}) => {
    return (
        <StyledReviewCard ref={ref} className={className}>
            <div className="main-section">
                {title && <h2 className="title">{title}</h2>}
                {Boolean(renderLine) && renderLine}
                {children}
            </div>
            {onEdit && (
                <button className="edit-button" onClick={onEdit} type="button">
                    <EditSmall />
                </button>
            )}
        </StyledReviewCard>
    );
};

export default ReviewCard;
export { StyledReviewCard, StyledReviewText };
