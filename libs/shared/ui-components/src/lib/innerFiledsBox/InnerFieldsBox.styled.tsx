import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledInnerFieldsBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.mainBlack};
    border: 1px solid ${colors.mainBlack};
    width: 850px;
    gap: 1px;

    @media screen and (${mediaScreen.tablet}) {
        width: auto;

        .inner-fields-row {
            flex-direction: column;
        }
    }
`;
