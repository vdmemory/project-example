import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledDefaultInnerInput = styled.input`
    border: none;
    outline: none;

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
`;
