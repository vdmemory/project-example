import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledIndustriesTagsForm = styled.form`
    position: static;

    .form-container {
        display: flex;
    }

    .fields-wrapper .label-wrapper {
        .drop-list {
            width: calc(100% + 40px);
            margin-left: -20px;
            margin-right: -20px;

            @media (${mediaScreen.tablet}) {
                width: calc(100% + 35px);
                margin-left: -15px;
                margin-right: -15px;
            }
        }

        input {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .chip-group {
        display: flex;
        flex-wrap: wrap;
        width: auto;
        gap: 10px;
    }

    .search-wrapper {
        display: flex;
        flex-wrap: wrap;

        > div {
            display: flex;
            width: 100%;
            position: static;

            input.search {
                height: 24px;
                font-size: 18px;
                border: none;
                width: 100%;
                padding-left: 0;

                :hover {
                    background-color: transparent;
                }

                ::placeholder {
                    opacity: 0.2;
                }
            }
        }

        .dropdown-list-wrapper {
            top: 90px;
            left: 0;
            width: 100%;

            ul.search-list {
                border-radius: 0;
                max-height: 220px;
                width: calc(100% + 2px);
                margin-left: -1px;
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
`;
