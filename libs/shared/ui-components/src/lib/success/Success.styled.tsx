import styled from '@emotion/styled';
import { AnimationOpacity } from '../animation/AnimationOpacity';

export const StyledSuccess = styled(AnimationOpacity)`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 15px 200px;

    .success-image-wrapper {
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .main-text {
        font-size: 48px;
        text-transform: uppercase;
        margin: 10px 20px 20px;
        width: 651px;
    }

    .note {
        font-size: 18px;
    }

    @media screen and (max-width: 1178px) {
        .main-text {
            font-size: 40px;
        }
    }
    @media screen and (max-width: 1024px) {
        margin-bottom: 0;
        padding-bottom: 140px;
        .main-text {
            max-width: 480px;
            font-size: 32px;
            margin-top: 0;
            margin-bottom: 16px;
            width: auto;
        }
    }

    @media screen and (max-width: 1024px) {
        padding-bottom: 140px;

        .success-image-wrapper {
            width: 155px;
            height: 155px;
            > * {
                height: inherit;
            }
        }

        .main-text {
            margin: 10px 10px 20px;
        }
    }
`;
