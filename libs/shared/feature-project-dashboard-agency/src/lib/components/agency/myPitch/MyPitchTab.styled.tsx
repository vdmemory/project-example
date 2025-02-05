import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledMyPitchTab = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 30px 45px 100px;

    @media screen and (${mediaScreen.maxMobile}) {
        padding: 30px 20px 100px;
    }

    .block-tabulation {
        div {
            @media screen and (${mediaScreen.maxMobile}) {
                flex-direction: column;
                width: 100%;
            }

            nav {
                border-top: none;
                top: 90px !important;
            }
        }
    }
    .button-share {
        margin-left: auto;
    }

    .review-pitch {
        margin: 20px auto 0;
    }
`;
