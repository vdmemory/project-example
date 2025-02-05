import styled from '@emotion/styled';

export const StyledGetStartedWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1px;

    > * {
        outline: 1px solid black;
        width: calc(50% - 0.5px);
    }

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        flex: 1;
        > * {
            width: 100%;
        }
    }
`;
