import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledSpinnerProps {
    position: 'center' | 'right';
}

const checkPosition = ({ position }: StyledSpinnerProps) => {
    switch (position) {
        case 'right':
            return css`
                right: 5px;
                top: 43%;
                transform: translate(0, -50%);
            `;
        default:
            return css`
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            `;
    }
};

export const StyledSpinner = styled.div`
    display: inline-block;
    position: absolute;
    width: 50px;
    height: 50px;
    ${checkPosition};

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 45px;
        height: 45px;
        margin: 7px;
        border: 7px solid ${colors.mainOrange};
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${colors.mainOrange} transparent transparent transparent;

        :nth-of-type(1) {
            animation-delay: -0.45s;
        }
        :nth-of-type(2) {
            animation-delay: -0.3s;
        }
        :nth-of-type(3) {
            animation-delay: -0.15s;
        }
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
