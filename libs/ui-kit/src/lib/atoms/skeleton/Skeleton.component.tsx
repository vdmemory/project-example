import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface SkeletonProps {
    type: 'title' | 'text' | 'avatar' | 'thumbnail' | 'half-text';
    h?: string;
    w?: string;
}

const variables = {
    titleHeight: '20px',
    titleWidth: '60%',
    textHeight: '14px',
    textWidth: '90%',
    textHalfWidth: '100%',
    textHalfHeight: '12px',
    avatarHeight: '70px',
    avatarWidth: '70px',
    thumbnailHeight: '100px',
    thumbnailWidth: '100%',
};

const TitleTypeCss = css`
    height: ${variables.titleHeight};
    width: ${variables.titleWidth};
    margin-bottom: 0.5rem;
`;

const TextTypeCss = css`
    height: ${variables.textHeight};
    width: ${variables.textWidth};
    margin-bottom: 0.2rem;
`;

const AvatarTypeCss = css`
    height: ${variables.avatarHeight};
    width: ${variables.avatarWidth};
    border-radius: 50%;
`;

const ThumbnailTypeCss = css`
    height: ${variables.thumbnailHeight};
    width: ${variables.thumbnailWidth};
`;

const HalfTextTypeCss = css`
    height: ${variables.textHalfHeight};
    width: ${variables.textHalfWidth};
`;

const StyledSkeleton = styled.div<SkeletonProps>`
    background: #ddd;
    overflow: hidden;
    border-radius: 4px;

    ${({ type }) => type === 'title' && TitleTypeCss};
    ${({ type }) => type === 'text' && TextTypeCss};
    ${({ type }) => type === 'avatar' && AvatarTypeCss};
    ${({ type }) => type === 'thumbnail' && ThumbnailTypeCss};
    ${({ type }) => type === 'half-text' && HalfTextTypeCss};

    ${({ h }) => h && `height: ${h};`}
    ${({ w }) =>
        w &&
        css`
            width: ${w};
            min-width: ${w};
        `}
`;

const Skeleton = ({ type, w, h }: SkeletonProps) => {
    return (
        <StyledSkeleton
            w={w}
            h={h}
            type={type}
            className="skeleton"
            data-testid={`skeleton-${type}`}
        />
    );
};

const StyledSkeletonWrapper = styled(motion.div)`
    position: relative;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: fit-content;
    gap: 1rem;
`;

const SkeletonWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledSkeletonWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="skeleton-wrapper"
        >
            {children}
        </StyledSkeletonWrapper>
    );
};

interface RowProps {
    h?: string;
}

const SkeletonRow = styled.div<RowProps>`
    display: flex;
    align-items: center;
    gap: 1rem;

    ${({ h }) => h && `height: ${h};`}
`;

interface BoxProps {
    f?: number;
    w?: string;
    h?: string;
    p?: string;
    transparent?: boolean;
}

const SkeletonBox = styled.div<BoxProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #ddd;
    background: white;
    padding: 1rem;
    gap: 0.5rem;

    ${({ f }) => f && `flex: ${f};`}
    ${({ w }) => w && `width: ${w};`}
    ${({ h }) => h && `height: ${h};`}
    ${({ p }) => p && `padding: ${p};`}

    ${({ transparent }) =>
        transparent &&
        css`
            background: transparent;
            border: none;
        `}
`;

interface LineProps {
    h?: string;
    w?: string;
    m?: string;
}

const SkeletonLine = styled.div<LineProps>`
    background: transparent;
    height: 0;
    width: 100%;

    ${({ h }) => h && `height: ${h};`}
    ${({ w }) => w && `width: ${w};`}
    ${({ m }) => m && `margin: ${m};`}
`;

interface GroupProps {
    horizontally?: boolean;
    vertically?: boolean;
}

const SkeletonGroup = styled.div<GroupProps>`
    display: flex;
    ${({ horizontally }) => horizontally && 'flex-direction: row'};
    ${({ vertically }) => vertically && 'flex-direction: column'};
`;

export {
    SkeletonWrapper,
    Skeleton,
    SkeletonRow,
    SkeletonBox,
    SkeletonLine,
    SkeletonGroup,
};
