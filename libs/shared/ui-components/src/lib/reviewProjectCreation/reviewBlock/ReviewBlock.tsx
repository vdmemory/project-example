import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import {
    Pencil13x13Icon,
    Pencil13x13MobileIcon,
    PencilIcon,
} from '@breef/shared/assets';
import { colors } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { useMediaContext } from '@breef/shared/hooks';

interface ReviewBlockProps {
    children: ReactNode;
    onEdit?: () => void;
}

export const ReviewBlock: FC<ReviewBlockProps> = ({ children, onEdit }) => {
    return (
        <StyledReviewBlock>
            <StyledDivider />
            <div className="review-block">
                <div className="review-block-content">{children}</div>
                {onEdit && (
                    <PenButton onClick={onEdit} className="absolute-button" />
                )}
            </div>
        </StyledReviewBlock>
    );
};

export const StyledDivider = styled.div`
    margin-top: 20px;
    margin-bottom: 32px;
    width: 100%;
    height: 0;
    border-bottom: 1px solid #e9ebed;

    @media (${mediaScreen.tablet}) {
        margin-top: 32px;
    }
`;

const StyledReviewBlock = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    .review-block-content {
        display: flex;
        flex-direction: column;
        gap: 32px;
        flex: 1;
        max-width: 100%;
    }

    .absolute-button {
        position: absolute;
        top: 0;
    }

    @media screen and (${mediaScreen.tablet}) {
        .absolute-button {
            top: 3px;
        }
    }
`;

interface PenButtonProps {
    onClick: () => void;
    className?: string;
}

export const PenButton: FC<PenButtonProps> = ({ onClick, className }) => {
    const { isMobile } = useMediaContext();
    return (
        <StyledPenButton
            onClick={onClick}
            className={className}
            data-testid="pen-button"
        >
            {isMobile ? <Pencil13x13MobileIcon /> : <Pencil13x13Icon />}
        </StyledPenButton>
    );
};

const StyledPenButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    height: 13px;
    width: fit-content;
    padding: 0;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: auto;
    @media screen and (${mediaScreen.tablet}) {
        height: fit-content;
        svg {
            height: 13.33px;
            width: 13.33px;
        }
    }
`;
