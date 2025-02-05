import styled from '@emotion/styled';

interface LayoutStyledProps {
    viewHeight?: number;
}

export const LayoutStyled = styled.main`
    position: relative;
    display: flex;
    flex-direction: column;
    background: white;
    min-height: ${({ viewHeight }: LayoutStyledProps) =>
        viewHeight ? `${viewHeight}px` : '100vh'};

    &.open-modal {
        overflow: hidden;
    }
`;
