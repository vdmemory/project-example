import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledDropzoneContainerProps {
    isDragAccept: boolean;
    isDragReject: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isUploading: boolean;
    isMobileView: boolean;
}

const dropzoneContainerMobileCss = css`
    height: unset;
    min-height: unset;
    border-style: solid;
    width: 100%;
    padding: 0 16px;

    background-color: ${colors.grey.grey50};

    .wrap-upload-info {
        flex-direction: row;

        > span {
            font-size: 18px;
            font-weight: 400;
        }
    }
`;

const dropzoneMobileCss = css`
    max-width: 277px;
    height: 56px;
`;

interface StyledDropzoneProps {
    isMobileView: boolean;
}

export const StyledDropzone = styled.div<StyledDropzoneProps>`
    display: flex;
    flex-direction: column;
    gap: 16px;

    .tip-drop {
        margin: 0;
        ${mixinTypography.text.tSmall.textSmallMedium};
        color: ${colors.grey.grey600};
    }

    .list-error-message {
        margin: 0;
        font-size: 14px;
        padding: 0;
        list-style-type: none;

        .error-message + .error-message {
            margin-top: 12px;
        }

        .error-message {
            padding: 0;
            font-size: 14px;
            list-style-type: none;
            color: ${colors.error.error500};
            display: flex;
            align-items: center;

            svg {
                width: 18px;
                margin-right: 10px;

                path,
                polygon {
                    stroke: ${colors.error.error500};
                    fill: ${colors.error.error500};
                }
            }
        }
    }

    @media screen and (${mediaScreen.maxMobile}) {
        ${({ isMobileView }) => isMobileView && dropzoneMobileCss}
    }
`;

const checkIsDisabledDropzone = (props: StyledDropzoneContainerProps) =>
    props.isDisabled &&
    css`
        border-color: ${getColor(props)}!important;
        opacity: 0.5 !important;
        pointer-events: none !important;
    `;

export const StyledDropzoneContainer = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130px;
    min-height: 130px;
    flex: 1;
    background-color: ${colors.white};
    border-width: 1px;
    border-radius: 0;
    border-color: ${(props: StyledDropzoneContainerProps) => getColor(props)};
    border-style: dashed;
    cursor: pointer;

    :hover {
        background-color: ${colors.secondary.secondary300};
    }

    .wrap-upload-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        > span {
            ${mixinTypography.text.tSmall.textSmallBold};
        }
    }
    .label-drop {
        ${mixinTypography.text.tSmall.textSmallBold};
        max-width: 200px;
        text-align: center;
    }

    ${({ isUploading }: StyledDropzoneContainerProps) =>
        isUploading &&
        css`
            border-color: ${colors.grey.grey900};
            background-color: white;
            cursor: default;
            :hover {
                background-color: white;
            }
        `}
    ${checkIsDisabledDropzone};

    @media screen and (${mediaScreen.maxMobile}) {
        ${({ isMobileView }) => isMobileView && dropzoneContainerMobileCss}
    }
`;

const getColor = (props: StyledDropzoneContainerProps) => {
    if (props.isDragAccept) {
        return colors.success.success500;
    }
    if (props.isDragReject) {
        return colors.error.error500;
    }
    if (props.isFocused) {
        return colors.orange.orange900;
    }
    return colors.grey.grey900;
};
