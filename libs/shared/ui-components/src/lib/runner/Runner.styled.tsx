import { colors } from '@breef/shared/assets';
import styled from '@emotion/styled';

export const StyledRunner = styled.div`
    position: relative;
    width: 100%;

    .rc-slider {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;

        .rc-slider-rail {
            position: absolute;
            width: 100%;

            height: 8px;
            border-radius: 0;
            background: ${colors.mainWhite};
            border: 1px solid;
        }

        .rc-slider-track {
            margin-left: 1px;
            margin-right: 1px;
            position: absolute;
            height: 8px;
            background-color: ${colors.mainOrange};
            border-radius: 0;
        }

        .rc-slider-step {
            position: absolute;
            width: 100%;
            height: 4px;
            background: transparent;
            pointer-events: none;
        }

        .rc-slider-handle {
            position: absolute;
            width: 18px;
            height: 18px;
            margin-top: -1px;
            background-color: black;
            border-radius: 50%;
            cursor: pointer;
            cursor: -webkit-grab;
            cursor: grab;
            touch-action: pan-x;
        }
    }
`;
