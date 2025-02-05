import { ReactNode, useState } from 'react';
import { StyledRange } from './Range.styled';
import { LinkUi } from '../link/LinkUi.component';
import { Textarea } from '../textarea/Textarea.component';
import Pill from '../pill/Pill.component';

type ListType = {
    value: string;
    name: string;
};

interface RangeProps {
    label?: string;
    list: ListType[];
    value: string;
    onChange: (value: string) => void;
    onChangeComment?: (value: string) => void;
    startTip?: string;
    endTip?: string;
    isVisibleComment?: boolean;
    isPreOpenComment?: boolean;
    commentError?: string;
    comment?: string;
    commentPlaceholder?: string;
    className?: string;
    children?: ReactNode;
    commentMaxLength?: number;
}

export const Range = ({
    label,
    list,
    value,
    onChange,
    onChangeComment,
    startTip,
    endTip,
    isVisibleComment,
    isPreOpenComment = false,
    comment,
    commentError,
    commentPlaceholder,
    commentMaxLength = 200,
    className,
    children,
}: RangeProps) => {
    const [isShowComment, setIsShowComment] = useState<boolean>(
        !!comment || isPreOpenComment,
    );

    const renderRangeSection = (item: ListType) => {
        const checked = value === item.value;

        return (
            <Pill
                key={item.value}
                isUppercase
                label={item.name}
                checked={checked}
                onChange={() => onChange(item.value)}
                type="radio"
            />
        );
    };

    const renderCommentSection = () => {
        if (isShowComment) {
            return (
                <Textarea
                    value={comment || ''}
                    onChange={value => onChangeComment?.(value as string)}
                    maxLength={commentMaxLength}
                    error={commentError}
                    placeholder={commentPlaceholder}
                />
            );
        }

        return (
            <LinkUi
                title="+ Add Comment"
                variant="button"
                onClick={() => setIsShowComment(true)}
            />
        );
    };

    const isVisibleTips = startTip || endTip;

    return (
        <StyledRange
            isShowComment={isShowComment}
            isVisibleTips={!!isVisibleTips}
            className={className ? `range ${className}` : 'range'}
        >
            {label && <label className="label">{label}</label>}
            <div className="group">
                <div className="range-wrapper">
                    <div className="list">{list.map(renderRangeSection)}</div>
                    {isVisibleTips && (
                        <div className="tips">
                            <span className="tip-start">{startTip}</span>
                            <span className="tip-end">{endTip}</span>
                        </div>
                    )}
                </div>
                {children}
                {isVisibleComment && (
                    <div className="comment-wrapper">
                        {renderCommentSection()}
                    </div>
                )}
            </div>
        </StyledRange>
    );
};
