import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPhoneNumberInput = styled.div`
    display: flex;
    margin-top: auto;
    align-items: center;

    input {
        padding-left: 15px;
        ::placeholder {
            color: ${colors.mainPlaceholder};
        }
    }

    @media screen and (${mediaScreen.mobile}) {
        .custom-dropdown {
            .drop-list {
                .list-item {
                    padding: 0 15px;
                }
            }
        }
    }
`;
