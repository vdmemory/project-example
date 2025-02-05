import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPortfolioStep = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    .label-subtext {
        letter-spacing: 0;
    }

    .additional-links-wrapper,
    .files-wrapper {
        display: flex;
        flex-direction: column;
    }

    .additional-links-wrapper {
        gap: 24px;
    }

    .files-wrapper {
        margin-top: 16px;
        gap: 16px;

        @media screen and (${mediaScreen.mobile}) {
            img {
                width: 30px;
            }

            & span {
                font-size: 16px;
            }
        }
    }
`;
