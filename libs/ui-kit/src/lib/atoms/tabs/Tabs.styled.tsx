import { colors } from '../../styles/colors';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledTabs = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${colors.grey.grey900};
    height: 48px;

    @media (${mediaScreen.minTablet}) {
        justify-content: space-between;
    }

    @media (${mediaScreen.maxMobile}) {
        flex-direction: column;
        border: none;
        height: auto;
        gap: 8px;
    }

    & > button {
        border-right: 1px solid ${colors.grey.grey900};

        :last-child {
            border-right: none;
        }

        @media (${mediaScreen.maxMobile}) {
            border-right: none;
            border: 1px solid ${colors.grey.grey900};
            height: 48px;
            width: 100%;

            :last-child {
                border-right: 1px solid ${colors.grey.grey900};
            }
        }
    }
`;
