import { colors } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface StyledDropzoneProps {
    isDragAccept: boolean;
    isDragReject: boolean;
    isFocused: boolean;
    isDisabled: boolean;
}

const getColor = (props: StyledDropzoneProps) => {
    if (props.isDragAccept) {
        return colors.mainSuccess;
    }
    if (props.isDragReject) {
        return colors.mainError;
    }
    if (props.isFocused) {
        return colors.mainOrange;
    }
    return '#eeeeee';
};

const checkIsDisabledDropzone = (props: StyledDropzoneProps) =>
    props.isDisabled &&
    css`
        border-color: ${getColor(props)}!important;
        background-color: ${colors.lightPurple}!important;
        opacity: 0.5 !important;
        pointer-events: none !important;
    `;

export const StyledDropzoneWrapper = styled.div`
    position: relative;

    .tip-drop {
        font-size: 14px;
        margin: 0;
        margin-top: 10px;
        text-transform: none;
        color: ${colors.mainGray};
    }
    .list-error-message {
        font-size: 14px;
        padding: 0;
        list-style-type: none;

        .error-message {
            font-size: 14px;
            padding: 0;
            list-style-type: none;
            color: ${colors.darkOrange};
            display: flex;
            align-items: center;
            background-color: ${colors.lightOrange};
            padding: 10px 17px;

            svg {
                width: 18px;
                margin-right: 10px;
                margin-bottom: 2px;

                path,
                polygon {
                    fill: ${colors.mainOrange};
                }
            }
        }
    }
`;

export const StyledDropzone = styled.label<StyledDropzoneProps>`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-width: 1px;
    border-radius: 0;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: ${colors.lightPurple};
    color: #bdbdbd;
    outline: none;
    transition: border 0.2s ease-in-out;
    cursor: pointer;

    :hover {
        border-color: ${colors.mainOrange};
        background-color: ${colors.lightGrey};
    }

    .wrap-icon-upload {
        display: flex;
        position: relative;
        width: 37px;
        height: 37px;

        .icon-upload-drop {
            position: absolute;
            top: 5px;
            transform: rotate(180deg);
            path:first-of-type {
                fill: ${colors.mainOrange};
            }
            path:last-of-type {
                stroke: ${colors.mainOrange};
            }
        }
    }

    .label-drop {
        font-size: 14px;
        margin: 0;
        color: ${colors.mainOrange};
        text-transform: none;
    }
    ${checkIsDisabledDropzone};
`;
