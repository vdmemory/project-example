import styled from '@emotion/styled';
import { colors } from '../../styles';
import { css } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledAutocompleteProps {
    isOverflowsPage?: boolean;
}

export const StyledAutocomplete = styled.div<StyledAutocompleteProps>`
    display: flex;
    flex-direction: column;
    position: relative;

    .autocomplete-list-wrapper {
        top: 52px;
        left: 0;
        right: 0;
        position: absolute;
        z-index: 1;

        @media (${mediaScreen.tablet}) {
            top: 56px;
        }

        ${({ isOverflowsPage }: StyledAutocompleteProps) =>
            isOverflowsPage &&
            css`
                bottom: calc(100% + 4px);
                top: auto;
            `}
    }

    .autocomplete-items-list {
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
            white-space: nowrap;

            > small {
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
            }
        }
    }

    .by-google {
        padding: 5px 10px;
        border-top: 1px solid ${colors.grey.grey900};
        display: flex;
        justify-content: flex-end;

        img {
            height: 15px;
        }
    }
`;
