import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

interface StyledAnswerItemProps {
    isOpen: boolean;
}

export const StyledAnswerItem = styled.div`
    display: flex;
    padding: 27px 50px;
    flex-direction: column;
    width: 100%;
    min-height: 90px;
    cursor: pointer;
    justify-content: center;
    flex-grow: 1;

    @media (${mediaScreen.tablet}) {
        padding: 27px 15px 27px 15px;
        width: 100%;
    }

    a {
        color: ${colors.mainOrange};
    }

    .answer {
        &-header {
            display: flex;
            justify-content: space-between;
            h2 {
                margin: 0;
                font-weight: 400;
                font-size: 18px;
                line-height: 160%;
                letter-spacing: 0.002em;
                @media (${mediaScreen.tablet}) {
                    font-weight: 450;
                    font-size: 22px;
                    line-height: 120%;
                    letter-spacing: 0.015em;
                }
            }
            > svg {
                min-width: 15px;
                margin-left: 20px;
                margin-top: 12px;
                transform: rotate(
                    ${({ isOpen }: StyledAnswerItemProps) =>
                        isOpen ? '180deg' : 0}
                );
            }
        }
        &-text {
            margin: 0 33px 15px 0;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0.002em;
            overflow: hidden;
            ol {
                > li {
                    margin: 10px 33px 15px 0;
                    font-size: 18px;
                    line-height: 160%;
                    letter-spacing: 0.002em;
                }
            }
        }
    }
`;
