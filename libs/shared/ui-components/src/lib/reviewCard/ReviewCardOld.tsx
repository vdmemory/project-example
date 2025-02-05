import { FC, LegacyRef, ReactNode } from 'react';
import { EditSmall } from '@breef/shared/assets';
import {
    StyledReviewCardOld,
    StyledReviewTextOld,
} from './ReviewCardOld.styled';

interface ReviewCardProps {
    className?: string;
    title?: string;
    children?: ReactNode;
    onEdit?: () => void;
    renderLine?: ReactNode;
    ref?: LegacyRef<HTMLDivElement> | undefined;
}
export const ReviewCardOld: FC<ReviewCardProps> = ({
    className,
    title,
    children,
    onEdit,
    renderLine,
    ref,
}) => {
    return (
        <StyledReviewCardOld ref={ref} className={className}>
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
        </StyledReviewCardOld>
    );
};

export default ReviewCardOld;
export { StyledReviewCardOld, StyledReviewTextOld };
