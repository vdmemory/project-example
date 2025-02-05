import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledInputProps {
    type: 'password' | 'text' | 'phone';
    isArrowBtn: boolean;
    isFieldArrowNextOnMobile: boolean;
}

const checkHideArrowNextOnMobile = ({
    isFieldArrowNextOnMobile,
}: StyledInputProps) =>
    !isFieldArrowNextOnMobile &&
    css`
        @media screen and (max-width: 1024px) {
            .field-arrow-next {
                display: none !important;
            }
        }
    `;

export const StyledInput = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    @media screen and (max-width: 1024px) {
        margin-top: 10px;
    }

    label {
        height: 85px;
        width: 100%;
        display: flex;
        position: relative;
        border-bottom: 1px solid #000000;
        @media screen and (max-width: 1024px) {
            height: 50px;
        }
    }

    .phone-input {
        font-size: 48px;
        margin-top: initial;

        .drop-button {
            height: 100%;
        }

        input {
            padding-left: 25px;
        }

        .dropdown-icon {
            margin-left: 20px;
        }

        @media screen and (max-width: 1024px) {
            font-size: 24px;
            input {
                padding-left: 15px;
            }

            .dropdown-icon {
                margin-left: 15px;
            }
        }
    }

    input {
        box-sizing: border-box;
        background-color: transparent;
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        box-shadow: none;
        border-bottom: none;
        color: black;
        outline: none;
        font-size: 48px;
        height: 100%;
        width: 100%;
        text-transform: ${({ type }: StyledInputProps) => {
            if (type === 'password') {
                return 'none';
            }
            return 'uppercase';
        }};
        padding-right: ${({ isArrowBtn }: StyledInputProps) =>
            isArrowBtn ? '65px' : '0'};

        ::placeholder {
            letter-spacing: 0px;
            -webkit-text-fill-color: ${colors.defaultPlaceholder};
        }

        @media screen and (max-width: 1024px) {
            font-size: 24px;
        }
    }

    .password-icon {
        display: flex;
        align-items: center;
        width: 60px;
        position: relative;

        svg {
            position: absolute;
            right: 70px;
            cursor: pointer;

            @media screen and (max-width: 1024px) {
                position: static;
            }
        }
    }

    ${checkHideArrowNextOnMobile};
`;
