import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledTeammatesScreen = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    .screen-content {
        display: flex;
        flex: 1;

        @media (${mediaScreen.laptop}) {
            flex-direction: column-reverse;
        }

        @media (${mediaScreen.maxMobile}) {
            flex: unset;
        }
    }
`;

export const StyledLeftSection = styled.div`
    display: flex;
    width: 30%;
    min-width: 400px;
    max-width: 450px;
    border-right: 1px solid ${colors.mainBlack};

    @media (${mediaScreen.laptop}) {
        width: 100%;
        max-width: unset;
        border-right: none;
        border-bottom: 1px solid ${colors.mainBlack};
        min-width: unset;
    }

    .teammates-screen-tip {
        max-width: 100%;
        padding: 50px 132px 40px 85px;
    }

    @media (${mediaScreen.maxMobile}) {
        border-bottom: none;

        .teammates-screen-tip {
            padding: 25px 16px;

            .description {
                margin-bottom: 16px;
            }
        }
    }
`;
export const StyledRightSection = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
    background-color: ${colors.mainWhite};
    min-height: 100px;

    @media (${mediaScreen.maxMobile}) {
        button.row-item,
        div.row-item {
            height: 100px;
            flex: unset;
            padding: 35px 16px;

            .teammate-name,
            .add-teammate-btn {
                font-size: 22px;
                line-height: 26px;
            }
            &:last-child {
                border-bottom: 1px solid ${colors.mainBlack};
            }
        }
    }
`;
