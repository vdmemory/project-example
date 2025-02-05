import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledSocialLinks = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 5px 15px 74px;
    margin: 0 -48px 0 -75px;
    height: 60px;
    overflow-y: auto;
    border-top: 1px solid ${colors.mainBlack};
    border-right: 1px solid ${colors.mainBlack};
    &:last-of-type {
        border-bottom: 1px solid ${colors.mainBlack};
        height: 61px;
    }
    &:hover {
        cursor: pointer;
        background: ${colors.lightGrey};
    }

    &:hover .social-delete {
        > svg {
            opacity: 1;
            transition: opacity 0.3s;
        }
    }

    .social,
    .other {
        &-header {
            display: flex;
            align-items: center;
        }
        &-title,
        &-link {
            font-weight: 450;
            font-size: 1.125rem;
            line-height: 1;
            letter-spacing: 0.002em;
        }
        &-title {
            margin: 0 5px 0 0;
            color: ${colors.mainBlack};
            text-transform: uppercase;
        }
        &-link {
            text-decoration: unset;
            line-height: 1;
            padding-bottom: 0;
            border-bottom: 1px solid ${colors.mainOrange};
            color: ${colors.mainOrange};
            &:hover {
                border-bottom: 1px solid ${colors.mainBlack};
                color: ${colors.mainBlack};
                transition: color 0.3s;
            }
        }
        &-delete {
            position: absolute;
            top: 5px;
            right: 0;
            &:hover {
                cursor: pointer;
            }
            > svg {
                opacity: 0;
                height: 48px;
                width: 50px;
                transition: all 0.3s ease;
                > line {
                    stroke: ${colors.mainOrange};
                }
            }
        }
    }

    .title-placeholder {
        position: absolute;
        pointer-events: none;
        font-weight: normal;
        color: ${colors.mainPlaceholder};
    }
    @media (${mediaScreen.tablet}) {
        border-right: none;
        margin: 0 -15px;
        padding-left: 15px;

        &:last-of-type {
            border-bottom: none;
            height: 64px;
        }

        .social,
        .other {
            &-delete {
                > svg {
                    opacity: 1 !important;
                }
            }
        }
    }
`;
