import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';
import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledHeaderAuth = styled.div`
    display: flex;
    padding: 28px;
    height: 104px;
    background-color: ${colors.beige};
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${colors.grey.grey100};

    @media screen and (${mediaScreen.tablet}) {
        height: 74px;
        padding: 21px 16px;

        .link-logo svg {
            width: 76px;
            height: auto;
        }
    }
`;
