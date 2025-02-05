import styled from '@emotion/styled';

interface StyledAvatarImageProps {
    height: number;
    width: number;
}

export const StyledAvatarImage = styled.div<StyledAvatarImageProps>`
    display: inline-flex;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    overflow: hidden;

    img {
        width: inherit;
        height: inherit;
        object-fit: cover;
    }
`;
