import { colors, simpleAnimation } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledChoiceMethod = styled.section`
    display: flex;
    flex-direction: column;

    ${simpleAnimation}

    .choice-title {
        font-size: 32px;
        margin: 0;
        margin-bottom: 25px;
        margin-top: 15px;
        text-transform: uppercase;
        text-align: center;
        font-weight: 500;
    }

    .group-card-buttons {
        display: flex;

        border: 1px solid ${colors.mainBlack};
        background: ${colors.mainWhite};

        height: 425px;
        width: 100%;

        position: relative;

        .card-button {
            display: flex;
            flex-direction: column;
            width: 50%;
            transition: all 300ms ease;
            position: relative;

            align-items: center;
            justify-content: center;

            padding-bottom: 30px;

            :hover {
                cursor: pointer;
                background: ${colors.darkPurple};
                color: ${colors.mainOrange};
            }

            .card-title {
                font-size: 32px;
                margin: 0;
                margin-bottom: 15px;
                margin-top: 5px;
                text-transform: uppercase;
                text-align: center;
                font-weight: 500;
                white-space: pre-line;
            }

            .card-description {
                font-size: 18px;
                margin: 0;
                text-align: center;
                white-space: pre-line;
                line-height: 1.5;
            }

            &.credit {
                border-right: 1px solid ${colors.mainBlack};
                .start-icon {
                }
            }

            &.bank {
                .phone-icon {
                }
            }

            &.active {
                background: ${colors.darkPurple};
                color: ${colors.mainOrange};
            }

            .bank-item-check {
                transition: all 200ms ease;
                height: 0;
                width: 50px;

                &.active {
                    height: 70px;
                    margin-bottom: -20px;
                }
            }

            .dollar-icon,
            .star-icon {
                height: 70px;
                /* width: fit-content; */
                margin-bottom: 10px;
                width: 70px;
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        align-items: center;
        .group-card-buttons {
            flex-direction: column;
            height: auto;
            max-width: 400px;
            .card-button {
                width: 100%;
                min-height: 320px;
                padding: 0 30px 10px;
                &.credit {
                    border-right: none;
                    border-bottom: 1px solid ${colors.mainBlack};
                }
            }
        }
    }
`;
