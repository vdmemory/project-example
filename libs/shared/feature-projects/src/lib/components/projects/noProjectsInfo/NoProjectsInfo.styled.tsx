import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledNoProjectsInfo = styled.div`
    border: 1px solid ${colors.mainBlack};

    .projects-info-content {
        display: flex;
        min-height: 310px;
        @media (${mediaScreen.tablet}) {
            flex-direction: column;
        }
        > div + div {
            border-left: 1px solid ${colors.mainBlack};
            @media (${mediaScreen.tablet}) {
                border-left: none;
            }
        }
        @media (${mediaScreen.tablet}) {
            > div {
                border-bottom: 1px solid ${colors.mainBlack};
                &:last-of-type {
                    border-bottom: none;
                }
            }
        }
    }
    > button {
        border-top: 1px solid ${colors.mainBlack};
    }
    @media (${mediaScreen.tablet}) {
        > button {
            text-transform: initial;
            [class='main-content-item'] {
                display: flex;
                justify-content: center;
                .main-content-text {
                    left: -10px;
                }
            }
            [class*='subtitle'] {
                display: none;
            }
        }
    }
`;
