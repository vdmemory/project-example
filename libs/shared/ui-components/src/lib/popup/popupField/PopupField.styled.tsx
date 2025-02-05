import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';

export const StyledPopupField = styled.label`
    padding: 20px 70px 15px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${colors.mainBlack};
    max-width: 100%;

    @media (${mediaScreen.tablet}) {
        padding: 15px 15px 0;
        border-bottom: none;

        &:last-of-type {
            input {
                border-bottom: none;
            }
        }
    }

    &:last-of-type {
        border-bottom: none;
    }

    > * {
        font-size: 32px;
        position: relative;
        @media (${mediaScreen.tablet}) {
            font-size: 22px;
            line-height: 26px;
        }
    }

    .label-name {
        font-size: 18px;
        line-height: 32px;
        letter-spacing: 0.002em;
        font-family: ${fonts.accent};
        color: ${colors.strokeGray};

        &.label-uppercase {
            text-transform: uppercase;
            color: ${colors.mainBlack};
        }
    }

    input {
        font-size: 32px;
        line-height: 35px;
        text-transform: uppercase;
        height: 80px;
        outline: none;
        border: none;
        ::placeholder {
            color: ${colors.mainPlaceholder};
        }
        :disabled {
            color: ${colors.mainBlack};
            background-color: ${colors.mainWhite};
        }

        @media (${mediaScreen.tablet}) {
            height: 50px;
            font-size: 22px;
            line-height: 26px;
            overflow: hidden;
            border-bottom: 1px solid ${colors.mainBlack};
            border-radius: 0;
        }
    }
`;
