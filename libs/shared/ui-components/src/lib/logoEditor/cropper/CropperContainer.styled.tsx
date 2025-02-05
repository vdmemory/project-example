import styled from '@emotion/styled';

export const StyledCropperContainer = styled.div`
    height: 520px;
    display: flex;
    flex-direction: column;

    .reactEasyCrop_Container {
        top: 0;
        left: 0;
        right: 0;
        bottom: 72px;
    }

    .controls {
        height: 72px;
        display: flex;
        align-items: center;
        margin: auto 0 0;
        background: white;
        z-index: 9;

        > button {
            text-transform: uppercase;
        }

        span {
            padding: 0px 16px;
            font-size: 28px;
            margin-top: -2px;
        }

        .normal {
            height: 50px;
            width: 122px;
            z-index: 9;
            font-size: 18px;
            border: 1px solid black;
            padding: 0px 38px;
            margin: 0 10px 0 30px;
        }
    }
`;
