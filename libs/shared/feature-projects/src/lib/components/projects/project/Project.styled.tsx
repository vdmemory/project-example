import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';

type ProjectCard = {
    isHoverCard: boolean;
    isArchivedCard: boolean;
};

export const StyledCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    background: ${colors.mainPurple};
    border: 1px solid ${colors.mainBlack};
    &:hover {
        cursor: ${({ isHoverCard }: ProjectCard) =>
            isHoverCard ? 'pointer' : 'default'};
        background: ${({ isHoverCard }: ProjectCard) =>
            isHoverCard ? colors.mainWhite : colors.mainPurple};
    }

    .project-card {
        padding: 34px 58px 39px;
        @media (${mediaScreen.tablet}) {
            padding: 34px 15px 31px;
        }
        &-info,
        &-detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &-info {
            margin-bottom: 34px;
            &-created,
            &-budget,
            &-client {
                font-style: normal;
                line-height: 100%;
                margin: 0;
            }
            &-created {
                font-family: ${fonts.accent};
                font-weight: 400;
                font-size: 16px;
                letter-spacing: 0.05em;
                text-transform: uppercase;
            }
            &-budget {
                font-family: ${fonts.default};
                font-weight: 450;
                font-size: 20px;
                text-transform: capitalize;
                max-width: 50%;
                &-paid {
                    color: ${colors.mainOrange};
                }
                &-total,
                &-ongoing {
                    color: ${colors.strokeGray};
                }
            }
            &-client {
                display: flex;
                align-items: center;
                font-weight: 450;
                font-size: 24px;
                line-height: 100%;
                text-transform: capitalize;
                max-width: 50%;
                .logo {
                    border-radius: 50%;
                    margin-right: 10px;
                }

                > img {
                    width: 39px;
                    height: 39px;
                    border-radius: 50%;
                    margin-right: 17px;
                }
                > span {
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        &-detail {
            &-name,
            &-label {
                font-style: normal;
                line-height: 100%;
                margin: 0;
                white-space: pre-line;
            }
            &-label-archived {
                position: relative;
                top: -34px;
            }

            &-name {
                font-family: ${fonts.default};
                font-weight: 450;
                font-size: 36px;
                text-transform: capitalize;
                max-width: 70%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 150%;
                @media (${mediaScreen.tablet}) {
                    max-width: 45%;
                }
            }
            &-label {
                font-family: ${fonts.accent};
                font-weight: 400;
                font-size: 16px;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                max-width: 30%;
                padding: 5px 16px;

                @media (${mediaScreen.tablet}) {
                    max-width: 50%;
                }
            }
        }
    }

    .project-footer {
        display: flex;
        border-top: 1px solid ${colors.mainBlack};
        > button {
            height: 52px;
            text-transform: initial;
            font-size: 20px;
        }

        @media (${mediaScreen.tablet}) {
            > button {
                text-transform: initial;
                [class='main-content-item'] {
                    display: flex;
                    justify-content: center;
                    padding-left: 35px;
                    padding-right: 35px;
                    .main-content-text {
                        left: -10px;
                    }
                }
                [class*='subtitle'] {
                    display: none;
                }
            }
        }
    }
`;

export const StyledLabelOrange = styled.p`
    background: ${colors.transparentOrange};
    color: ${colors.mainOrange};
    border: 1px solid ${colors.mainOrange};
`;
export const StyledLabelGreen = styled.p`
    background: ${colors.transparentGreen};
    color: ${colors.green};
    border: 1px solid ${colors.green};
`;
export const StyledLabelPurple = styled.p`
    background: ${colors.darkPurple};
    color: ${colors.mainBlack};
    border: 1px solid ${colors.strokeGray};
`;
export const StyledLabelDisabled = styled.p`
    background: ${colors.transparentGrey};
    color: ${colors.mainBlack};
    border: 1px solid ${colors.strokeGray};
`;
