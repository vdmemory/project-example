import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledReviewRetainerBlock = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.mainBlack};

    > * + * {
        border-top: 1px solid ${colors.mainBlack};
    }
`;

export const StyledFlexRow = styled.div`
    display: flex;
    .card-notEdit {
        &:hover {
            background: transparent;
            cursor: auto;
        }
    }
    > * {
        display: flex;
        flex: 1;
        :hover {
            background: transparent;
            cursor: auto;
        }
    }
    > * + * {
        border-left: 1px solid ${colors.mainBlack};
    }

    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;

        > * + * {
            border-left: none !important;
            border-top: 1px solid ${colors.mainBlack};
        }
    }
`;
