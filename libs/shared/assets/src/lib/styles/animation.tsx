import { css } from '@emotion/react';

export const simpleAnimation = css`
    animation-duration: 1s;
    animation-fill-mode: backwards;
    animation-name: fadeIn;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;
