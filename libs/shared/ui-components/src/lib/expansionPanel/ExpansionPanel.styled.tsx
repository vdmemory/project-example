import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledExpansionPanelProps {
    isOpen: boolean;
}

export const StyledExpansionPanel = styled.div`
    display: flex;
    padding: 27px 50px;
    flex-direction: column;
    width: 100%;
    min-height: 90px;
    cursor: pointer;
    justify-content: center;
    flex-grow: 1;

    .answer {
        &-header {
            display: flex;
            justify-content: space-between;
            h2 {
                margin: 0;
                font-size: 32px;
                line-height: 35px;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                font-weight: 450;
            }
            > svg {
                min-width: 15px;
                margin-left: 20px;
                margin-top: 12px;
                transform: rotate(
                    ${({ isOpen }: StyledExpansionPanelProps) =>
                        isOpen ? '180deg' : 0}
                );
            }
        }
        &-text-wrapper {
            opacity: ${({ isOpen }: StyledExpansionPanelProps) =>
                isOpen ? '1' : 0};
            height: ${({ isOpen }: StyledExpansionPanelProps) =>
                isOpen ? 'fit-content' : 0};
            margin-top: ${({ isOpen }: StyledExpansionPanelProps) =>
                isOpen ? '10px' : 0};
            margin-bottom: ${({ isOpen }: StyledExpansionPanelProps) =>
                isOpen ? '15px' : 0};
            transition: all 0.3s;
            > p {
                opacity: ${({ isOpen }: StyledExpansionPanelProps) =>
                    isOpen ? '1' : 0};
                height: ${({ isOpen }: StyledExpansionPanelProps) =>
                    isOpen ? 'fit-content' : 0};
                margin-top: ${({ isOpen }: StyledExpansionPanelProps) =>
                    isOpen ? `10px` : 0};
                margin-bottom: ${({ isOpen }: StyledExpansionPanelProps) =>
                    isOpen ? `15px` : 0};
                display: ${({ isOpen }: StyledExpansionPanelProps) =>
                    isOpen ? `block` : 'none'};
            }
            > ol {
                font-weight: 450;
                font-size: 18px;
                line-height: 160%;
                letter-spacing: 0.002em;
                display: ${({ isOpen }: StyledExpansionPanelProps) =>
                    isOpen ? `block` : 'none'};
                > li {
                    > p {
                        margin: 0 0 15px;
                        line-height: 160%;
                    }
                }
            }
            > ul {
                font-weight: 450;
                font-size: 18px;
                line-height: 160%;
                letter-spacing: 0.002em;
                display: ${({ isOpen }: StyledExpansionPanelProps) =>
                    isOpen ? `block` : 'none'};
                > li {
                    > p {
                        margin: 0 0 15px;
                        line-height: 160%;
                    }
                }
            }
        }
        &-text {
            margin: 10px 33px 15px 0;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0.002em;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .answer {
            &-header {
                h2 {
                    font-size: 24px;
                    line-height: 29px;
                }
            }
        }
    }
`;
