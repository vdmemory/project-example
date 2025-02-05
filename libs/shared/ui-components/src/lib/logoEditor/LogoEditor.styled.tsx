import { cropperBackgroundPreviewImage, fonts } from '@breef/shared/assets';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

import styled from '@emotion/styled';

interface StyledLogoEditorProps {
    isDisabled: boolean;
}
export const StyledLogoEditor = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    button.button-upload {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid ${colors.mainOrange};
        margin-top: 50px;
        background-color: ${colors.darkPurple};
        background-image: url(${cropperBackgroundPreviewImage.src});
        cursor: ${({ isDisabled }: StyledLogoEditorProps) =>
            !isDisabled && 'pointer'};
        background-repeat: no-repeat;
        background-size: contain;

        @media (${mediaScreen.tablet}) {
            margin-top: 18px;
        }

        :hover {
            .plus-wrapper {
                transform: scale(1.2) rotate(180deg);
            }
        }

        .plus-wrapper {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: ${colors.mainOrange};
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4px 7px 5px 7px;
            transition: transform 200ms ease;

            svg.plus-icon line {
                stroke: ${colors.mainWhite};
                stroke-width: 2.4px;
            }
        }

        .empty-upload {
            display: none;
        }
    }

    input.input-file-upload {
        display: none;
        opacity: 0;
    }

    button.button-image {
        padding: 0;
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid ${colors.mainOrange};
        margin-top: 50px;
        background-color: ${colors.darkPurple};
        background-image: url(${cropperBackgroundPreviewImage.src});
        cursor: ${({ isDisabled }: StyledLogoEditorProps) =>
            !isDisabled && 'pointer'};
        background-repeat: no-repeat;
        background-size: contain;

        @media (${mediaScreen.tablet}) {
            margin-top: 18px;
        }

        :hover .plus-wrapper {
            transform: scale(1.2) rotate(180deg);
        }

        .plus-wrapper {
            position: absolute;
            top: -6px;
            right: 1px;
            background: ${colors.mainOrange};
            border-radius: 50%;
            display: flex;
            border: 1px solid ${colors.darkPurple};
            transition: transform 200ms ease;

            svg.plus-icon {
                padding: 5px;
                width: 28px;
                height: 28px;
                line {
                    stroke: ${colors.mainWhite};
                    stroke-width: 2.4px;
                }
            }
        }

        .empty-upload {
            display: none;
        }

        .image-cropped {
            height: 96px;
            border-radius: 50%;
            box-shadow: 0 0 6px ${colors.mainOrange};
        }
    }

    .tip-upload {
        color: ${colors.secondaryGray};
        font-family: ${fonts.accent};
        font-size: 14px;
        line-height: 140%;
        text-align: center;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin: 12px 0 20px;

        @media (${mediaScreen.tablet}) {
            margin: 12px 0;
        }
    }

    .error-upload {
        font-size: 13px;
        list-style-type: none;
        color: ${colors.darkOrange};
        display: flex;
        align-items: center;
        background-color: ${colors.lightOrange};
        padding: 5px 17px;

        svg {
            width: 18px;
            margin-right: 5px;
            margin-bottom: 2px;

            path,
            polygon {
                fill: ${colors.mainOrange};
            }
        }
    }
`;
