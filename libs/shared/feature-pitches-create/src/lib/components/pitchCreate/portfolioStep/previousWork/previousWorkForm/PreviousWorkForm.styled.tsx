import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPreviousWorkForm = styled.div`
    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            letter-spacing: 0em;
            margin: 0;
            text-transform: uppercase;
        }
        .close-wrapper {
            display: flex;
            width: 30px;
            height: 28px;
            border: 1px solid ${colors.grey.grey900};
            background-color: ${colors.white};
            position: relative;

            :hover {
                opacity: 0.6;
            }

            .close-button {
                cursor: pointer;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 38px;
                height: 38px;
            }
        }
    }
    .divider {
        width: 100%;
        border-bottom: 1px solid ${colors.grey.grey900};
        margin: 12px 0 40px;

        @media screen and (${mediaScreen.maxMobile}) {
            margin-bottom: 20px;
        }
    }
    .form-body {
        display: flex;
        flex-direction: column;
        gap: 26px;

        .form-label .label-text,
        .form-label .optional-text {
            ${mixinTypography.label.lMd.labelMdMedium};
            color: ${colors.grey.grey400};
        }

        .form-label {
            width: 100%;

            & > span {
                padding-bottom: 6px;
            }

            & .input-wrapper + span {
                padding-top: 5px;
            }
        }

        input,
        textarea {
            padding-left: 20px;
            padding-right: 20px;
        }

        .files-wrapper {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 16px;

            .trash-btn {
                & > img {
                    min-width: 40px;
                }

                & > span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;

                    :hover {
                        text-decoration: underline;
                    }
                }

                .trash-btn svg {
                    margin-left: -12px;
                }
            }
        }

        .project-links-wrapper {
            display: flex;
            flex-direction: column;
            gap: 12px;

            margin-top: 8px;

            .editable-link a {
                letter-spacing: 0em;
                margin: 0;
                font-family: 'Helvetica Neue', sans-serif;
                -webkit-text-decoration: none;
                text-decoration: none;
                white-space: nowrap;

                &:hover {
                    text-decoration: underline;
                }
            }

            .editable-link > .input {
                margin-bottom: 10px;

                .input-wrapper span {
                    padding-top: 5px;
                }
            }
        }
    }
    .form-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        .button-save {
            height: 31px;

            span.label {
                ${mixinTypography.text.tMd.textMdMedium};
            }
        }
    }
    .group {
        display: flex;
        justify-content: space-between;
        gap: 16px;

        @media screen and (${mediaScreen.maxMobile}) {
            flex-direction: column;
            gap: 26px;
        }
    }

    @media screen and (${mediaScreen.maxMobile}) {
        .input-wrapper .input-title {
            max-width: 140px;
        }
        .input-wrapper .input-link {
            max-width: 200px;
        }
    }

    @media screen and (max-width: 512px) {
        .input-wrapper .input-title {
            max-width: 110px;
            padding: 12px;
        }

        .input-wrapper .input-link {
            max-width: 170px;
            padding: 12px;
        }

        .dropzone-wrapper {
            max-width: 100%;

            .dropzone {
                border-radius: 4px;
            }
        }

        .form-footer .button-save {
            height: 50px;
            width: 100%;
            margin-top: 20px;
            border-radius: 4px;
        }
    }

    @media screen and (max-width: 411px) {
        .input-wrapper .input-title {
            max-width: 100px;
        }

        .input-wrapper .input-link {
            max-width: 150px;
        }
    }
`;

export const StyledAdditionalLinks = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
`;

export const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
`;

export const getPopupStylePreset = (isMobile?: boolean, height?: string) => {
    return {
        height: isMobile ? height : 'auto',
        maxHeight: isMobile ? height : '-webkit-fill-available',
        minHeight: isMobile ? height : 'unset',
        padding: isMobile ? '22px 16px 12px' : '25px 20px 12px',
        background: colors.beige,
        margin: '0',
        minWidth: isMobile ? '100vw' : '703px',
        maxWidth: '703px',
        border: isMobile ? 'none' : '1px solid black',
        borderRadius: '4px',
    };
};
