import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledInviteMemberForm = styled.form`
    display: flex;
    position: relative;
    @media (${mediaScreen.tablet}) {
        flex-direction: column;
    }

    .label {
        display: none;
        @media (${mediaScreen.tablet}) {
            position: absolute;
            top: 12px;
            left: 20px;
            display: block;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: ${colors.mainGray};
        }
    }

    button {
        text-transform: uppercase;
    }

    input {
        min-width: 550px;
        border: none;
        border-right: 1px solid ${colors.mainBlack};
        outline: none;
        padding: 0 40px;
        font-size: 18px;
        ::placeholder {
            color: ${colors.mainPlaceholder};
        }

        @media (${mediaScreen.tablet}) {
            min-width: 100%;
            border-right: unset;
            padding: 60px 20px 10px;
            border-bottom: 1px solid black;
        }
    }
`;
