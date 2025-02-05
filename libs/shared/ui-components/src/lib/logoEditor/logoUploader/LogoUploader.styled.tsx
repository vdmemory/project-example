import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors as colorsUiKit } from '@breef/ui-kit';

export const StyledLogoUploader = styled.div`
    position: relative;

    .logo-editor {
        button.button-image,
        button.button-upload {
            position: relative;
            width: 125px;
            height: 125px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid ${colorsUiKit.grey.grey100};
            margin-top: 0;

            background-color: ${colorsUiKit.white};
            background-image: unset;
            background-repeat: no-repeat;
            background-size: contain;

            :hover {
                background-color: ${colorsUiKit.secondary.secondary300};
            }

            .plus-wrapper {
                display: none;
            }
        }

        button.button-upload {
            .empty-upload {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;

                svg {
                    width: 26px;
                    height: 26px;
                }
            }
        }

        button.button-image {
            .image-cropped {
                height: 96px;
                border-radius: 50%;
                box-shadow: 0px 0px 0px 1px lightgrey;
            }
        }

        .tip-upload {
            display: none;
        }
    }

    .loader {
        position: absolute;
        width: 12px;
        z-index: 1;
        top: 2px;
        right: 5px;
        animation: spin 0.75s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .logo-editor {
            button.button-upload {
                .empty-upload {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2px;
                    font-size: 10px;
                    font-weight: 450;
                    line-height: 16px;
                    letter-spacing: 0.01em;
                    color: ${colorsUiKit.grey.grey400};

                    svg {
                        width: 16px;
                        height: 16px;
                        path,
                        rect {
                            stroke: ${colorsUiKit.grey.grey400};
                            stroke-width: 1.5px;
                        }
                    }
                }
            }
        }
    }
`;
