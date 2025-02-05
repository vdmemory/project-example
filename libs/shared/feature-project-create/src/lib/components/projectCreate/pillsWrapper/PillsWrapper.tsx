import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { colors } from '@breef/ui-kit';
import { css } from '@emotion/react';

interface PillsWrapperProps {
    className?: string;
    title: string;
    children?: ReactNode;
    isSelectedWrapper?: boolean;
}
export const PillsWrapper: FC<PillsWrapperProps> = ({
    className,
    children,
    title,
    isSelectedWrapper,
}) => {
    return (
        <StyledPillsWrapper
            className={className}
            isSelectedWrapper={isSelectedWrapper}
        >
            <span className="title">{title}</span>
            <div className="pills-container">{children}</div>
        </StyledPillsWrapper>
    );
};

interface StyledPillsWrapperProps {
    isSelectedWrapper?: boolean;
}

const StyledPillsWrapper = styled.div<StyledPillsWrapperProps>`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 28px 0 0;

    .title {
        font-size: 14px;
        font-weight: 450;
        line-height: 16px;
        letter-spacing: 0;
        color: ${colors.grey.grey600};
    }
    .pills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    ${({ isSelectedWrapper }) =>
        isSelectedWrapper &&
        css`
            margin: 20px 0 0;
        `};
`;
