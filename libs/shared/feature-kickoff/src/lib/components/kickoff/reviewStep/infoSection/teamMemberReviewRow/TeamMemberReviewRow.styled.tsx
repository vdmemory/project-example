import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledTeamMemberReviewRow = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;

    .member-description {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 450;
        font-size: 1.5rem;
        line-height: 160%;
        letter-spacing: 0.015em;
        display: initial;
    }

    .member-info-icons-wrapper {
        display: flex;
        margin-left: 40px;

        > div {
            display: flex;
            padding: 0;
            margin: 0;
            outline: none;
            background-color: transparent;
            border: none;
            align-items: center;
            flex: 1;

            :hover {
                cursor: pointer;

                svg {
                    rect,
                    path {
                        stroke: ${colors.mainOrange};
                    }
                }
            }

            .icon-wrapper {
                display: flex;
                width: 30px;
                height: 30px;
                align-items: center;
                justify-content: center;
                .icon-phone {
                    padding: 3px;
                }

                svg {
                    width: 100%;
                    height: 100%;
                    rect,
                    path {
                        transition: all ease 150ms;
                    }
                }
            }

            + div {
                margin-left: 15px;
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .member-info-icons-wrapper {
            margin-left: 15px;
        }
    }
`;
