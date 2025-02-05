import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledKickoff = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.mainPurple};

    .steps-content-wrapper {
        display: flex;
        border-bottom: 1px solid ${colors.mainBlack};
        flex: 1;

        > div {
            flex: 1;
            display: flex;
            width: 100%;
            > div {
                width: 100%;
            }
        }
    }

    .review-cards-box {
        display: flex;
        background-color: ${colors.mainBlack};
        gap: 1px;
        border: 1px solid ${colors.mainBlack};
        flex-wrap: wrap;

        .card-review-kickoff {
            display: flex;
            flex: 1;
            cursor: auto;
            background-color: ${colors.mainPurple};
            min-width: calc(50% - 1px);
        }
    }

    .documents-review-wrapper {
        display: flex;
        flex: 1;
        margin: 12px 0 30px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .success-block-wrapper {
        display: flex;
        flex: 1;
    }

    @media screen and (${mediaScreen.tablet}) {
        .step-main-content-wrapper {
            width: 100%;
        }

        .review-cards-box {
            flex-direction: column;
            overflow: hidden;

            .card-review-kickoff {
                width: 100%;
            }
        }

        .documents-review-wrapper {
            margin: 12px 0 13px;
            flex-direction: column;
        }
    }
`;
