import styled from '@emotion/styled';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

interface StyledActionTipProps {
    isMoreOneLine?: boolean;
}

export const StyledActionTip = styled(motion.div)`
    border: 1px solid ${colors.black};
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.white};
    border-radius: 4px;
    min-height: 258px;

    @media (${mediaScreen.laptop}) {
        flex: unset;
        min-height: 238px;
    }

    .action-tip {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        min-height: 152px;
        height: fit-content;

        @media (${mediaScreen.laptop}) {
            max-width: 100%;
        }
        @media (${mediaScreen.tablet}) {
            min-height: auto;
            height: auto;
        }

        .title {
            padding-top: 10px;
            margin: 0;
            ${mixinTypography.display.dSm.displaySmMedium};
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            text-transform: uppercase;
            line-height: 34px;

            @media (${mediaScreen.tablet}) {
                line-height: 28px;
                font-size: 24px;
            }
        }

        .description {
            padding-top: 10px;
            ${mixinTypography.text.tXl.textXlMedium}
            color: ${colors.grey.grey600};

            ${({ isMoreOneLine }: StyledActionTipProps) => {
                if (isMoreOneLine) {
                    return css`
                        line-height: 20px;
                    `;
                }
                return css`
                    line-height: 28px;
                `;
            }};

            @media (${mediaScreen.laptop}) {
                font-size: 18px;
            }
        }

        .tag {
            color: ${colors.grey.grey600};
        }

        @media (${mediaScreen.tablet}) {
            .tag {
                font-size: 12px;
            }
        }
    }

    button.action-button span {
        ${mixinTypography.text.tLg.textLgMedium};
    }
`;
