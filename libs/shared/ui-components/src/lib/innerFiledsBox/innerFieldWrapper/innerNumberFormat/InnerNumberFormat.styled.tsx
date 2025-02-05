import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledInnerNumberFormat = styled.div`
    > input {
        border: none;
        outline: none;
        width: 100%;
        ::placeholder {
            color: ${colors.mainPlaceholder};
            font-size: 15px;
        }

        @media screen and (${mediaScreen.tablet}) {
            ::placeholder {
                color: ${colors.mainPlaceholder};
                font-size: 22px;
            }
        }
    }
`;
