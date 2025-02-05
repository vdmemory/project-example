import { colors, fonts } from '@breef/shared/assets';
import { css } from '@emotion/react';

export const toastifyCustomStyles = css`
    .Toastify__toast {
        &.Toastify__toast--error {
            background-color: ${colors.mainOrange};
            color: ${colors.mainWhite};

            .Toastify__toast-icon > svg {
                fill: ${colors.mainWhite};
            }

            .Toastify__close-button > svg {
                fill: ${colors.mainWhite} !important;
            }
        }

        &.Toastify__toast--success {
            background-color: ${colors.darkPurple};
            color: ${colors.mainOrange};

            .Toastify__toast-icon > svg {
                fill: ${colors.mainOrange};
            }

            .Toastify__close-button > svg {
                fill: ${colors.mainOrange} !important;
            }
        }

        font-family: ${fonts.default};
        border: 1px solid ${colors.mainBlack};
        border-radius: 0;

        .Toastify__close-button--light {
            opacity: 1;
        }
    }
`;
