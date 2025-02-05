import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledBookACallPopup = styled.div`
    display: flex;
    flex-direction: column;

    @media (${mediaScreen.tablet}) {
        overflow-y: hidden;
    }

    .modal-main-content-wrapper {
        display: flex;
        justify-content: center;

        .wrapper-calendly-widget {
            outline: none;
        }
        * {
            min-height: 100%;
            display: flex;
            flex: 1;
        }
    }

    .header-bar {
        padding: 40px 200px 30px 60px;
        background-color: ${colors.mainPurple};
        position: relative;
        border-bottom: 1px solid ${colors.mainBlack};

        .image-support-wrapper {
            position: absolute;
            right: 66px;
            top: -56px;
            width: 125px;
            overflow: hidden;
            height: fit-content;
            transform: rotate(17deg);
            > img {
                width: inherit;
            }
        }

        > h1 {
            margin: 0;
            font-size: 48px;
            line-height: 53px;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            font-weight: normal;
            padding-right: 150px;
        }

        .note {
            display: block;
            margin-top: 10px;
            font-size: 18px;
            line-height: 29px;
            letter-spacing: 0.002em;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .header-bar {
            padding: 40px 20px 20px;
            > h1 {
                padding-right: 0;
            }

            .image-support-wrapper {
                display: none;
            }
        }
    }
`;
