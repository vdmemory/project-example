import styled from '@emotion/styled';
import { colors, mediaScreen, fonts } from '@breef/shared/assets/variables';

interface styledTeamMemberProps {
    disabledEvents?: boolean;
}

export const StyledTeamMember = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 40px;
    height: 100px;
    background-color: ${colors.darkPurple};
    border-bottom: 1px solid ${colors.mainBlack};
    font-size: 18px;

    @media (${mediaScreen.tablet}) {
        padding-left: 20px;
    }

    .left-section {
        display: flex;
        flex-direction: column;
        max-width: 65%;
        @media (${mediaScreen.tablet}) {
            max-width: 55%;
        }
        .text {
            font-size: 24px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            @media (${mediaScreen.tablet}) {
                font-size: 22px;
            }
        }

        .subtext {
            margin-top: 5px;
            opacity: 0.3;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            @media (${mediaScreen.tablet}) {
                font-size: 18px;
            }
        }
    }

    .right-section {
        font-family: ${fonts.accent};
        font-size: 12px;
        text-transform: uppercase;
        position: relative;
        padding-right: 40px;
        //min-width: 280px;
        display: flex;
        justify-content: flex-end;
        @media (${mediaScreen.tablet}) {
            padding-right: 20px;
        }
        .invite-status {
            opacity: 0.2;
        }
        .drop-button {
            justify-content: flex-end;
        }
        .list-item {
            font-size: 14px;
        }
        .list-item:last-of-type {
            color: ${({ disabledEvents }: styledTeamMemberProps) =>
                disabledEvents ? `${colors.mainBlack}` : `${colors.mainRed}`};
        }
        .role-remove {
            font-style: normal;
            font-weight: 400;
            line-height: 160%;
            letter-spacing: 0.002em;
            color: ${colors.mainRed};
            &:hover {
                cursor: pointer;
            }
        }
    }
`;
