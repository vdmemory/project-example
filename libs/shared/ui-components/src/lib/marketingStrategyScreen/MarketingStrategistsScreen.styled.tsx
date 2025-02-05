import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';
import { fonts } from '@breef/shared/assets';

export const StyledMarketingStrategistsScreen = styled.div`
    display: flex;
    margin-top: 42px;

    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;
        align-items: center;
    }

    & > div {
        flex: 1;
        position: relative;

        @media screen and (${mediaScreen.tablet}) {
            padding: 0 15px;
            text-align: left;
        }

        :first-of-type {
            width: 300px;

            @media screen and (${mediaScreen.tablet}) {
                flex: none;
                height: 90px;
            }
        }
    }

    img.photo-card {
        width: 120px;
        @media screen and (${mediaScreen.tablet}) {
            width: 80px;
        }
    }
    img.photo-emily {
        width: 110px;
        @media screen and (${mediaScreen.tablet}) {
            width: 74px;
        }
    }

    img.name {
        height: 15px;

        @media screen and (${mediaScreen.tablet}) {
            height: 11px;
        }
    }

    .list-label {
        text-transform: uppercase;
        font-size: 12px;
        font-family: ${fonts.accent};
        text-align: left;

        @media screen and (${mediaScreen.tablet}) {
            margin-top: 10px;
        }
    }
    .list {
        padding: 0;
        margin: 28px 0;
        gap: 26px;
        display: flex;
        flex-direction: column;

        @media screen and (${mediaScreen.tablet}) {
            margin: 18px 0 0;
            gap: 18px;
        }

        .list-item {
            display: flex;
            align-items: center;
            gap: 20px;

            @media screen and (${mediaScreen.tablet}) {
                gap: 10px;
            }

            svg {
                height: 18px;
            }

            .list-item-text {
                font-size: 24px;
                line-height: 1;

                @media screen and (${mediaScreen.tablet}) {
                    font-size: 18px;
                }
            }
        }
    }
`;
