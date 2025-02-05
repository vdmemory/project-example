import {
    mediaScreenMin,
    mediaScreen,
    colors,
} from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledPreviewImage = styled.div`
    display: flex;
    flex: 1 1 auto;
    height: 240px;
    width: 410px;
    position: relative;
    background-color: ${colors.lightGrey};
    border: 1px solid ${colors.lightOrange};

    @media screen and (${mediaScreenMin.laptop}) {
        height: 300px;
        width: 100%;
    }

    @media screen and (${mediaScreen.maxMobile}) {
        width: 100%;
    }

    .stub-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.5;
        scale: 1.2;
    }

    .spinner {
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
`;
