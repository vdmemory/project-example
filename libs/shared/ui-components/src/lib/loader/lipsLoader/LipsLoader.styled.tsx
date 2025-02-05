import styled from '@emotion/styled';

export const StyledLipsLoader = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    transition: opacity 1s ease;
    position: relative;

    img {
        width: 78px;
        height: auto;
        transform: scale(2.5);
    }
`;
