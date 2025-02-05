import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledAccordionProps {
    isOpen: boolean;
    isAccent?: boolean;
    hideBorder?: boolean;
}

export const StyledAccordion = styled.div`
    display: flex;
    flex-direction: column;
    width: 850px;
    position: relative;

    ${({ hideBorder }: StyledAccordionProps) =>
        !hideBorder
            ? css`
                  border-left: 1px solid ${colors.mainBlack};
                  border-right: 1px solid ${colors.mainBlack};
                  border-bottom: 1px solid ${colors.mainBlack};
              `
            : css`
                  .accordion-header {
                      border-left: 1px solid ${colors.mainBlack};
                      border-right: 1px solid ${colors.mainBlack};
                      border-bottom: 1px solid ${colors.mainBlack};
                  }
              `};

    @media (${mediaScreen.tablet}) {
        width: calc(100% - 30px);
        margin: auto;
    }

    .rocket-image {
        pointer-events: none;
        position: absolute;
        left: -40px;
        width: 250px;
        height: auto;
        @media (${mediaScreen.tablet}) {
            display: none;
        }
    }

    .accordion-header {
        display: flex;

        border-top: 1px solid ${colors.mainBlack};
        background-color: ${({ isAccent, isOpen }: StyledAccordionProps) =>
            isOpen
                ? colors.mainPurple
                : isAccent
                ? colors.mainOrange
                : colors.mainPurple};
        color: ${({ isAccent, isOpen }: StyledAccordionProps) =>
            isOpen
                ? colors.mainBlack
                : isAccent
                ? colors.mainWhite
                : colors.mainBlack};
        height: 80px;
        min-height: 80px;
        cursor: pointer;
        align-items: center;
        padding: 0 30px;
        font-size: 32px;
        text-transform: uppercase;
        justify-content: space-between;
        position: relative;

        @media (${mediaScreen.tablet}) {
            font-weight: 400;
            font-size: 24px;
            line-height: 22px;
            height: 60px;
            min-height: 60px;
            padding: 0 20px;
        }

        @media screen and (max-width: 512px) {
            font-size: 22px;
        }

        &-triangle {
            &-hide {
                opacity: 0;
            }
            display: inline-block;
            border-top: 36px solid #000000;
            border-right: 36px solid transparent;
            position: absolute;
            bottom: -1px;
            right: -1px;
            opacity: 1;
            &::after {
                content: '';
                display: inline-block;
                position: absolute;
                top: -35px;
                left: 1px;
                border-top: 33px solid #fff;
                border-right: 33px solid transparent;
            }
            &::before {
                content: '';
                display: inline-block;
                position: absolute;
                bottom: 0;
                right: -37px;
                border-bottom: 37px solid #f9f7f3;
                border-left: 37px solid transparent;
            }
        }

        .collapse-image-wrapper {
            width: 26px;
            height: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .chevron-icon:first-of-type {
                margin-bottom: 6px;
                transform: rotateX(
                    ${({ isOpen }: StyledAccordionProps) =>
                        isOpen ? 180 : 0}deg
                );
            }

            .chevron-icon:last-of-type {
                transform: rotateX(
                    ${({ isOpen }: StyledAccordionProps) =>
                        isOpen ? 0 : 180}deg
                );
            }

            .chevron-icon {
                transition: 500ms ease;
                transform-origin: center;

                path {
                    stroke: ${({ isAccent, isOpen }: StyledAccordionProps) =>
                        isOpen
                            ? colors.mainOrange
                            : isAccent
                            ? colors.mainWhite
                            : colors.mainOrange};
                    stroke-width: 2px;
                }
            }
        }
    }

    .accordion-inner-section {
        .top-white-space {
            height: 1px;
            background-color: ${colors.mainBlack};
        }
    }
`;
