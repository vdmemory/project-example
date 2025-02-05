import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledLinksDocsForm = styled.form`
    position: static;
    background-color: ${colors.white};

    .form-container {
        display: flex;
    }

    .label-container + input::placeholder {
        font-size: 18px;
    }

    .links-section {
        flex: 1;

        .group-section {
            display: flex;
            width: 100%;
            position: relative;

            @media screen and (max-width: 768px) {
                flex-direction: column;
            }

            .title {
                border-right: 1px solid ${colors.black};

                @media screen and (max-width: 768px) {
                    border-right: none;
                }
            }

            .link input {
                padding-right: 42px;
            }

            .fields-wrapper .label-wrapper input {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .icon-delete {
                opacity: 0;
                transition: opacity 0.3s;
                position: absolute;
                right: 10px;
                bottom: 10px;

                @media (${mediaScreen.tablet}) {
                    opacity: 1;
                }

                > svg {
                    height: 38px;
                    width: 40px;

                    > line {
                        stroke: ${colors.primary.primary500};
                    }
                }

                :hover {
                    cursor: pointer;
                }
            }

            &:hover {
                background-color: rbg(250, 250, 249);

                .icon-delete {
                    opacity: 1;
                    transition: opacity 0.3s;
                }
            }
        }
    }

    .add-link-button {
        margin: 30px 0 12px 16px;
        font-size: 16px;
    }

    .documents-section {
        display: flex;
        border-top: 1px solid ${colors.black};
        border-bottom: 1px solid ${colors.black};

        .dropzone-wrapper {
            .tip-drop {
                font-size: 10px;
            }

            @media (${mediaScreen.tablet}) {
                max-width: 400px;
                height: unset;

                .dropzone {
                    min-height: 56px;
                }
            }
        }

        .label-container {
            padding-bottom: 14px;
        }

        .files-wrapper {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;

            span {
                font-size: 16px;
            }

            img {
                width: 22px;
            }

            button.trash-btn {
                width: 20px;

                & > svg {
                    margin-left: -10px;
                }
            }
        }
    }
`;

export const StyledFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    background-color: ${colors.black};
    border-bottom: 1px solid ${colors.black};

    flex: 1;
`;
