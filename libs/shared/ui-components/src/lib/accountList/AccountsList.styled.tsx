import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledAccountsList = styled.div`
    margin: 0;
    flex: 1;
    position: relative;

    @media (${mediaScreen.tablet}) {
        margin: 0;
    }

    .list-inner {
        display: flex;
        flex-direction: column;
        max-height: 305px;
        overflow: auto;
        gap: 16px;
        padding-right: 5px;

        @media (${mediaScreen.maxMobile}) {
            max-height: 377px;
        }
    }

    .row {
        width: 100%;
    }

    .item-wrapper {
        display: flex;
    }

    .wrapper-error {
        position: relative;

        .error-not-selected {
            position: absolute;
            left: 0;
            top: 0;
            ${mixinTypography.text.tXs.textXsMedium};
            color: ${colors.error.error500};
            margin: 8px 0 0;
        }
    }

    .button-add {
        font-size: 24px;
        text-transform: uppercase;
        padding: 33px 0 15px;
        width: 100%;
        display: flex;
        ${mixinTypography.text.tLg.textLgMedium};

        svg {
            width: 24px;
            margin-right: 4px;
            height: 24px;
        }

        @media (${mediaScreen.maxMobile}) {
            ${mixinTypography.mobile.text.mobileTextLg};
        }
    }

    .button-delete-wrapper {
        position: relative;
        width: 45px;
        opacity: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        transition: all 200ms ease;

        &.hide {
            width: 0;
            opacity: 0;
        }
    }
`;

interface StyledAccountsItemProps {
    hasCreditCard?: boolean;
}

export const StyledAccountsItem = styled.div<StyledAccountsItemProps>`
    display: flex;
    min-height: ${({ hasCreditCard }) => (hasCreditCard ? '76px' : '64px')};
    border: 1px solid ${colors.grey.grey900};
    position: relative;
    padding: 7px 16px;
    justify-content: space-between;
    width: 100%;
    transition: width 200ms ease;
    border-radius: 4px;

    :hover {
        cursor: pointer;
    }

    .item-group {
        display: flex;
        gap: 16px;
    }

    .item-group + .item-group {
        margin-left: 10px;
    }

    .arrow-right-icon {
        margin: auto 0;
    }

    .group-text {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: initial;

        &-right {
            align-items: flex-end;
            justify-content: center;
            gap: 8px;
        }
        &-left {
            align-items: flex-start;
            justify-content: space-evenly;
        }
    }

    .item-icon {
        width: 60px;
        max-height: 40px;
        height: auto;
        display: flex;
        justify-content: center;
        overflow: hidden;
        margin: auto 0;

        .card-brand {
            border: 1px solid ${colors.grey.grey900};
        }

        img,
        svg {
            height: auto;
            margin: 0;
            width: 100%;
            object-fit: contain;
        }
    }

    .item-name {
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .item-number,
    .item-expires {
        white-space: nowrap;
    }
    .item-expires {
        color: ${colors.grey.grey600};
        ${mixinTypography.text.tXs.textXsMedium};
    }

    .item-brand {
        color: ${colors.grey.grey600};
        ${mixinTypography.label.lS.labelSMedium};
    }

    ${simpleAnimation};
`;

interface StyledShortCutProps {
    isView?: boolean;
}

const viewCss = `
   height: 24px;
   opacity: 1;

    span.short-cut {
        height: 24px;
        opacity: 1;
    }
`;

const hideCss = `
    height: 0;
    opacity: 0;

    span.short-cut {
        height: 0;
        opacity: 0;
    }
`;

export const StyledShortCut = styled.div<StyledShortCutProps>`
    display: flex;
    justify-content: flex-end;
    transition: all 200ms ease;

    span.short-cut {
        padding: 7px 7px;
        background: ${colors.blue.blue100};
        display: flex;
        align-items: center;
        gap: 6px;
        border: 1px solid ${colors.grey.grey900};
        border-bottom: none;
        transition: all 200ms ease;

        p {
            margin: 0;
            ${mixinTypography.text.tXs.textXsMedium};
            color: ${colors.grey.grey900};
        }

        .tooltip {
            display: flex;
            cursor: pointer;
        }

        svg {
            max-width: 18px;
            max-height: 18px;
        }
    }

    ${({ isView }) => (isView ? viewCss : hideCss)};
`;

export const StyledButtonEdit = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    height: 24px;
    position: absolute;
    top: -35px;
    right: 6px;

    .close {
        display: flex;
        align-items: center;
        justify-content: center;
        ${simpleAnimation};

        p {
            color: ${colors.primary.primary500};
            text-transform: uppercase;
            margin: 0;
            ${mixinTypography.text.tSmall.textSmallMedium};
        }

        > svg line {
            stroke: ${colors.primary.primary500};
        }
    }

    svg {
        width: 24px;
        height: 24px;
        ${simpleAnimation};
    }

    &.remove {
        display: flex;
        position: relative;
        top: auto;
        right: auto;

        .delete {
            height: 24px;
            svg {
                path,
                line {
                    stroke: ${colors.error.error500};
                }
            }
        }
    }
`;
