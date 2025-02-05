import { colors, mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledProjectPitchSections = styled.div`
    .card {
        &-children {
            display: flex;
            flex-wrap: wrap;
        }
        &-pitch-summary,
        &-emoji,
        &-documents {
            border-bottom: 1px solid ${colors.mainBlack};
            .card-children {
                font-weight: 450;
                font-size: 1.5rem;
                line-height: 160%;
            }
        }

        &-notEdit {
            &:last-of-type {
                border-bottom: none;
            }
        }

        &-emoji {
            .card-children {
                .card-emoji--item {
                    > span {
                        font-size: 34px;
                        margin-right: 30px;
                        @media (${mediaScreen.tablet}) {
                            margin-right: 21px;
                            &:last-of-type {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
        }
        &-documents {
            .card-children {
                pointer-events: auto;
                > a {
                    margin-right: 50px;
                }
            }
        }
        &-notes {
            .card-description {
                margin-bottom: 20px;
            }
        }
        @media (${mediaScreen.tablet}) {
            &-notes {
                .card-children {
                    > img {
                        max-width: 100%;
                    }
                }
            }
        }
    }
`;
