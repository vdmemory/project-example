import { FC, LegacyRef, ReactNode } from 'react';
import {
    StyledReviewScopeCard,
    StyledReviewScopeText,
} from './ReviewScopeCard.styled';
import { EditSmall } from '@breef/shared/assets';
import { Line } from './Line';

interface ReviewScopeCardProps {
    className?: string;
    title?: string;
    children?: ReactNode;
    onEdit?: () => void;
    ref?: LegacyRef<HTMLDivElement> | undefined;
    wLine?: number;
}
export const ReviewScopeCard = ({
    className,
    title,
    children,
    onEdit,
    wLine,
    ref,
}: ReviewScopeCardProps) => {
    return (
        <StyledReviewScopeCard
            data-testid={'card-button'}
            ref={ref}
            className={className}
        >
            <div className="main-section">
                {title && (
                    <h2 className="title">
                        {title} {wLine && <Line w={wLine} />}
                    </h2>
                )}
                {children}
            </div>
            {onEdit && (
                <button className="edit-button" onClick={onEdit} type="button">
                    <EditSmall />
                </button>
            )}
        </StyledReviewScopeCard>
    );
};

export default ReviewScopeCard;
export { StyledReviewScopeCard, StyledReviewScopeText };
