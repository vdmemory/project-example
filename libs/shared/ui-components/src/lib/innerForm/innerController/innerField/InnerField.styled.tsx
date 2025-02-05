import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledInnerFieldProps {
    isClickable: boolean;
    type:
        | 'text'
        | 'password'
        | 'phoneNumber'
        | 'checkbox'
        | 'dropdown'
        | 'textarea'
        | 'chipAutocomplete'
        | 'chipDropdown'
        | 'phone'
        | 'socialLink';
    isDisabled?: boolean;
    isError: boolean;
    isDisplayUppercaseValue?: boolean;
    isDisplayCapitalizeValue?: boolean;
}

export const StyledInnerField = styled.label`
    display: flex;
    min-height: 90px;
    width: 100%;
    background-color: ${colors.mainWhite};
    flex-direction: column;
    cursor: ${({ isClickable, isDisabled, type }: StyledInnerFieldProps) =>
        isClickable
            ? 'pointer'
            : isDisabled ||
              type === 'chipAutocomplete' ||
              type === 'chipDropdown'
            ? 'auto'
            : 'text'};
    padding: 20px 20px 16px;
    position: relative;
    font-size: 24px;

    @media (${mediaScreen.tablet}) {
        font-size: 22px;
        padding: 13px 20px 18px;
    }

    ${({ isError }: StyledInnerFieldProps) =>
        isError &&
        css`
            outline: 1px solid ${colors.mainRed}!important;
        `};

    .tooltip {
        display: flex;
    }

    .label-name {
        font-family: ${fonts.accent};
        font-size: 12px !important;
        text-transform: uppercase;
        color: #8d8d8d;

        letter-spacing: 0.05em;
        margin-bottom: auto;
        line-height: 16px;
    }

    .custom-dropdown {
        margin-top: auto;
    }
    .inner-field-textarea textarea {
        padding-bottom: 0 !important;
    }
    .inner-field-textarea .count {
        padding-bottom: 0;
        align-items: flex-end;
        height: auto;
        padding-top: 26px;
    }

    input {
        width: 100%;
        outline: none;
        border: none;
        font-size: 24px;
        display: flex;
        margin-top: auto;
        text-transform: ${({
            isDisplayUppercaseValue,
            isDisplayCapitalizeValue,
        }: StyledInnerFieldProps) =>
            isDisplayUppercaseValue
                ? 'uppercase'
                : isDisplayCapitalizeValue
                ? 'capitalize'
                : 'none'};

        ::placeholder {
            color: ${colors.mainPlaceholder};
            font-size: 15px;
        }

        :disabled {
            background-color: transparent;
        }

        @media (${mediaScreen.tablet}) {
            font-size: 22px;
            ::placeholder {
                font-size: 22px;
            }
        }
    }

    #field-phone-number {
        ::placeholder {
            font-size: 24px;
            @media (${mediaScreen.tablet}) {
                font-size: 22px;
            }
        }
    }

    textarea::placeholder {
        font-size: 15px;
        @media (${mediaScreen.tablet}) {
            font-size: 22px;
        }
    }
`;
