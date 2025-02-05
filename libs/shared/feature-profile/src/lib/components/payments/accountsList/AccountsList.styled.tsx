import { simpleAnimation } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';

export const StyledAccountsList = styled.div`
    border: 1px solid ${colors.grey.grey900};
    background: ${colors.white};
    margin: 0;
    flex: 1;

    .list-inner {
        display: flex;
        flex-direction: column;
    }

    .button-add {
        font-size: 24px;
        text-transform: uppercase;

        width: 100%;
        display: flex;
        margin: 0;
        line-height: 90px;
        justify-content: center;

        svg {
            width: 36px;
            margin-right: 10px;
            height: 36px;
        }
    }

    ${simpleAnimation}
`;

interface StyledAccountProps {
    isCardItem: boolean;
}

export const StyledAccount = styled.div`
    display: flex;
    height: 125px;
    border-bottom: 1px solid ${colors.grey.grey900};
    transition: all 300ms ease;
    background: ${colors.white};
    position: relative;
    padding: 20px 145px 20px 40px;
    align-items: center;

    :hover {
        background: ${colors.secondary.secondary500};

        .item-body {
            color: ${colors.primary.primary500};
        }

        .item-basket,
        .item-pen {
            height: 30px;
            cursor: pointer;
        }
    }

    .item-header {
        display: flex;
        justify-content: center;
        margin-right: 10px;
        width: 75px;
        height: 45px;

        .card-brand {
            border: 1px solid ${colors.grey.grey900};
        }

        svg,
        img {
            width: 75px;
            height: 45px;
            object-fit: contain;
        }
    }

    .item-body {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 12px;
        transition: all 300ms ease;
        margin-left: 10px;

        color: ${colors.grey.grey900};

        .item-number,
        .item-type {
            font-size: 16px;
        }

        .item-number {
            color: ${colors.primary.primary500};
        }

        .item-name {
            text-transform: uppercase;
            font-size: 28px;
            margin-bottom: 6px;
        }
    }

    .item-basket,
    .item-pen {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        transition: all 200ms ease;
        height: 0;
        path,
        line {
            stroke: ${colors.grey.grey900};
        }
    }

    .item-basket {
        right: 40px;
    }

    .item-pen {
        right: 85px;
    }

    ${simpleAnimation}

    @media screen and (${mediaScreen.tablet}) {
        padding: 20px 65px 20px 15px;
        height: auto;
        min-height: 115px;

        .item-header {
            display: flex;
            justify-content: center;
            margin-right: 0;

            svg,
            img {
                width: 60px;
                object-fit: contain;
            }
        }

        .item-pen,
        .item-basket {
            right: 20px;
        }

        .item-basket {
            top: calc(
                50% +
                    ${({ isCardItem }: StyledAccountProps) =>
                        isCardItem ? 20 : 0}px
            );
        }

        .item-pen {
            top: calc(50% - 20px);
        }
    }
`;
