import styled from '@emotion/styled';
import { simpleAnimation } from '@breef/shared/assets';
import { css, keyframes } from '@emotion/react';

interface StyledLoaderWrapperProps {
    isLoading?: boolean;
}

const skeletonStripes = keyframes`
    from {
        background-position: 0 0;
    }
    to {
        background-position: 480px 0;
    }
`;

const viewLoader = css`
    opacity: 1;
    height: 18px;
`;

const viewPreview = css`
    opacity: 1;
    height: auto;
`;

const hide = css`
    opacity: 0;
    height: 0;
`;

export const StyledLoaderWrapper = styled.div<StyledLoaderWrapperProps>`
    display: block;
    ${simpleAnimation}

    .loader {
        background: linear-gradient(90deg, #fff, #edeff1, #fff);
        background-size: 500px 500px;
        animation: ${skeletonStripes} 0.6s linear infinite;
        width: 16%;
        height: 14px;
        ${({ isLoading }) => (isLoading ? viewLoader : hide)};
    }

    .preview {
        display: block;
        ${({ isLoading }) => (isLoading ? hide : viewPreview)}
    }
`;
