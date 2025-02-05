import styled from '@emotion/styled';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { colors as colorsAssets } from '@breef/shared/assets';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

export const StyledNavigationSection = styled.div`
    display: flex;
    flex-direction: column;

    .progress-wrapper {
        display: flex;
        flex: 1;
        gap: 4px;
    }

    .nav-buttons-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 27px 28px 33px;
    }

    .children {
        width: 50%;

        @media screen and (max-width: 768px) {
            width: 80%;
            display: contents;
        }
    }

    .button-back {
        border: none;
        outline: none;
        background-color: transparent;
        padding: 15px 16px;
        min-width: fit-content;
        height: 48px;
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        :hover {
            opacity: 0.5;
        }
        :active {
            opacity: 1;
        }
        :disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .button-next {
        min-width: 156px;
        height: 48px;
        font-family: ${fonts.accent};
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 1px;
    }

    .book-call {
        padding-right: 20px;
    }

    @media screen and (${mediaScreen.tablet}) {
        padding-top: 70px;
        margin-top: auto;

        .nav-buttons-wrapper {
            padding: 13px 16px 19px;
        }

        .button-next {
            min-width: 133px;
        }

        .progress-wrapper {
            gap: 0;
        }
    }
`;

interface ProgressItemProps {
    isActive: boolean;
}
export const StyledProgressItem = styled(motion.div)<ProgressItemProps>`
    display: flex;
    position: relative;
    height: 6px;
    flex: 1;
    background-color: #e9ebed;
    :after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 0;
        height: 100%;
        background-color: ${colorsAssets.mainOrange};
        transition: 0.3s ease-in-out;

        ${({ isActive }) =>
            isActive &&
            css`
                width: 100%;
            `};
    }
`;
