import styled from '@emotion/styled';
import { colors, mediaScreen, fonts } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

export const StyledAnswersWrapper = styled.div`
    padding-right: 0 !important;
    outline: 1px solid ${colors.mainBlack};
    overflow: hidden;
    @media (${mediaScreen.tablet}) {
        padding-left: 0;
        @media (pointer: coarse) {
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .answers-block {
            flex-direction: column;
            padding-left: 0;

            .answers-list-wrapper {
                min-width: fit-content;
                width: 100%;
                flex: 1;
            }
        }
    }
`;

interface StyledAnswersProps {
    imagePosition: {
        top?: number;
        bottom?: number;
        right?: number;
    };
}

export const StyledAnswers = styled.div`
    display: flex;
    min-height: 360px;
    flex: 1;

    .answers {
        &-sidebar {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 50px 45px 50px 0;
            position: relative;
            min-width: 350px;
            max-width: 480px;
            width: 100%;
            border-right: 1px solid ${colors.mainBlack};

            h2 {
                font-weight: 400;
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                color: ${colors.mainBlack};
                margin: 0;
            }

            a {
                position: relative;
                width: fit-content;
                font-family: ${fonts.accent};
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                letter-spacing: 0.05em;
                text-decoration-line: underline;
                text-transform: uppercase;
                color: ${colors.mainOrange};
                z-index: 1;
                @media (${mediaScreen.tablet}) {
                    white-space: pre-wrap;
                    min-width: 30%;
                    text-align: right;
                }
            }

            img {
                position: absolute;
                ${({ imagePosition }: StyledAnswersProps) => css`
                    top: ${imagePosition.top}px;
                    right: ${imagePosition.right}px;
                    bottom: ${imagePosition.bottom}px;
                `};
                pointer-events: none;
            }

            @media (${mediaScreen.tablet}) {
                flex-direction: row;
                align-items: center;
                padding: 28px 15px 0;
                border-right: none;
                min-width: 100%;
                max-width: 100%;
                h2 {
                    font-weight: 400;
                    font-size: 32px;
                    line-height: 110%;
                    min-width: 218px;
                }
                img {
                    display: none;
                }
            }
        }

        &-list-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1;

            > div + div {
                border-top: 1px solid ${colors.mainBlack};
            }
        }
    }
`;
