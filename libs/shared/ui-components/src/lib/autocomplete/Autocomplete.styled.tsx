import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import { RefObject } from 'react';

interface StyledAutocompleteProps {
    parentInnerFieldRef?: RefObject<HTMLElement>;
    isShowList?: boolean;
}

const checkIsParentInnerFieldRef = ({
    parentInnerFieldRef,
}: StyledAutocompleteProps) =>
    parentInnerFieldRef?.current &&
    css`
        position: absolute;
        top: calc(100% + 1px);
        left: -1px;
        width: calc(100% + 2px);
    `;

export const StyledAutocomplete = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px 0 17px;
    font-family: 'NeueHaasDisplay', sans-serif;
    font-size: 12px;
    position: ${({ parentInnerFieldRef }: StyledAutocompleteProps) =>
        parentInnerFieldRef ? 'static' : 'relative'};

    label {
        text-transform: uppercase;
        color: ${colors.mainPlaceholder};
        margin-bottom: 10px;
        font-family: 'SuisseIntlMono', serif;
    }

    .wrap-input {
        position: relative;
        display: flex;

        input {
            padding: 0 55px 0 0;
            width: 100%;
            height: 85px;
            border: none;
            border-bottom: 1px solid black;
            border-radius: 0;
            font-size: 48px;
            text-transform: uppercase;
            transition: all 300ms ease;
            background-color: transparent;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: pre;
            -webkit-appearance: none;
            :focus-visible {
                outline: none;
            }

            ::placeholder {
                color: ${colors.mainPlaceholder};
            }

            :disabled {
                opacity: 0.3;
                background-color: transparent;
            }
            @media (${mediaScreen.tablet}) {
                height: 60px;
                font-size: 22px;
                line-height: 120%;
                letter-spacing: 0.015em;
            }
        }

        button.only-icon {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            margin-top: 3px;
            height: auto;
            width: auto;

            svg {
                transform: none;
            }
        }
    }

    ul {
        ${({ isShowList }: StyledAutocompleteProps) =>
            !isShowList && 'display: none;'}

        margin: 0;
        padding: 0;
        border: 1px solid black;
        border-top: none;
        position: absolute;
        left: 0;
        top: 97px;
        background: white;
        z-index: 99;
        width: 93%;
        line-height: initial;

        li:first-of-type {
            border-top: none;
        }

        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 14px;
            min-height: 45px;
            cursor: pointer;
            padding: 5px 10px;
            border-top: 1px dotted grey;
            white-space: nowrap;

            > small {
                margin-top: 3px;
                white-space: break-spaces;
            }

            :hover {
                background: #f1eafb;
            }

            small,
            strong {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 10px;
            }
        }

        ${checkIsParentInnerFieldRef}
    }

    .by-google {
        padding: 5px 10px;
        border-top: 1px solid black;
        display: flex;
        justify-content: flex-end;

        img {
            height: 15px;
        }
    }
`;
