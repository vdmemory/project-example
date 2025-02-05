import styled from '@emotion/styled';
import { fonts } from '@breef/shared/assets/variables';

export const StyledLoader = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: ${fonts.accent};
    font-size: 12px;
    text-transform: uppercase;
    flex-direction: column;
    overflow: hidden;
    z-index: 101;

    .loader-image {
        width: 78px;
        height: auto;
        transition: opacity 1s ease;
        position: relative;
        img {
            width: 100%;
            transform: scale(2.5);
        }
    }
    &.loader-container-complete {
        opacity: 0;
        transition: opacity 2s ease;
        z-index: -1;
    }
`;
