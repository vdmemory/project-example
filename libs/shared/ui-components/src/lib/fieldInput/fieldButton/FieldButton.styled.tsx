import styled from '@emotion/styled';

export const StyledFieldButton = styled.button`
    border: none;
    padding: 0;
    background: none;
    height: 85px;
    width: 56px;
    top: 0;
    position: absolute;
    right: 0;
    cursor: pointer;
    transition: all 0.5s;
    :disabled {
        cursor: auto;
        opacity: 0.2;
    }

    .icon.arrow {
        width: inherit;
        height: auto;
        path {
            fill: #d96e34;
        }
    }
    .icon.close {
    }

    @media screen and (max-width: 1024px) {
        height: 50px;
        .icon.close {
            height: 100%;
        }
    }
`;
