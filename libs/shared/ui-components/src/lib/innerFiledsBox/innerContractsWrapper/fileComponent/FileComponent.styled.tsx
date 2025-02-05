import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledFileComponent {
    isDisableRemove: boolean;
}

const checkIsDisableRemove = ({ isDisableRemove }: StyledFileComponent) =>
    isDisableRemove &&
    css`
        .file-info-wrapper .remove-button {
            cursor: auto;

            svg line {
                stroke: ${colors.mainGray};
            }
        }
    `;

export const StyledFileComponent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    min-height: 160px;
    max-width: 350px;
    position: relative;

    .spinner {
        left: 50%;
        top: calc(50% - 20px);
        transform: translate(-50%, -50%);
    }

    .file-image-wrapper {
        height: 120px;
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;

        > * {
            height: 100%;
            width: auto;
        }
    }

    .file-info-wrapper {
        display: flex;
        margin-top: 17px;
        font-size: 14px;
        line-height: 20px;
        width: 100%;

        > span {
            margin-right: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        > a {
            color: ${colors.mainOrange};
            text-decoration: none;
            margin-right: 10px;

            :hover {
                text-decoration: underline;
            }
        }

        .remove-button {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            outline: none;
            border: none;
            background-color: transparent;
            cursor: pointer;

            > svg {
                min-width: 25px;

                line {
                    stroke: ${colors.mainOrange};
                    stroke-width: 3px;
                }
            }
        }
    }

    ${checkIsDisableRemove};
`;
