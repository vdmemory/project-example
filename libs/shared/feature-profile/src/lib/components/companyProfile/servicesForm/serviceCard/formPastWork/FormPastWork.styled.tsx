import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledFormPastWork = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: calc(100vh - 80px);

    @media screen and (${mediaScreen.tablet}) {
        max-height: calc(100vh - 50px);
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        > div {
            display: flex;
            flex-direction: column;
            flex: 1;
            max-width: 350px;
            justify-content: flex-end;

            @media screen and (${mediaScreen.tablet}) {
                max-width: 650px;
            }
        }

        & > .group {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            width: 100%;
            border: none;
            padding: 0;

            > div {
                display: flex;
                flex-direction: column;
                flex: 1;
                max-width: 350px;
                justify-content: flex-end;

                @media screen and (${mediaScreen.tablet}) {
                    gap: 25px;

                    &:first-of-type .error {
                        margin-top: 8px;
                    }
                }

                @media screen and (max-width: 768px) {
                    max-width: 650px;
                }
            }

            @media screen and (${mediaScreen.tablet}) {
                flex-direction: column;
            }
        }

        @media screen and (${mediaScreen.tablet}) {
            justify-content: flex-start;
            flex-direction: column;

            & > div:first-of-type {
                margin-bottom: 40px;
            }
        }
    }

    .padding-right {
        padding-right: 44px;

        @media screen and (${mediaScreen.tablet}) {
            padding-right: 20px;
        }
    }

    .textarea-wrapper {
        max-width: 650px;
    }

    .project-name-input {
        max-width: 100%;

        @media screen and (${mediaScreen.tablet}) {
            max-width: 650px;
        }
    }

    .files-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

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

    @media screen and (max-width: 512px) {
        .dropzone-wrapper {
            max-width: 100%;
            height: auto;

            .dropzone {
                height: 56px;
                min-height: 56px;
            }
        }
    }
`;
