import styled from '@emotion/styled';
import { colors } from '../../styles/colors';
import { mixinTypography } from '../../styles/mixins/typography.styled';

interface StyledRangeProps {
    isVisibleTips?: boolean;
    isShowComment?: boolean;
}

export const StyledRange = styled.div<StyledRangeProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    .label {
        ${mixinTypography.text.tMd.textMdMedium};
        color: ${colors.grey.grey900};
    }

    .group {
        display: flex;
        align-items: baseline;
        gap: 16px;
        flex-wrap: wrap;

        .range-wrapper {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: fit-content;

            .list {
                display: flex;
                gap: 20px;
                ${({ isVisibleTips }) => isVisibleTips && 'padding: 0 8.5px;'};
            }

            .tips {
                font-family: 'SuisseIntlMono';
                font-size: 10px;
                color: ${colors.grey.grey500};
                text-transform: uppercase;
                display: flex;
                justify-content: space-between;
            }
        }

        .comment-wrapper {
            display: flex;
            width: fit-content;

            min-width: 150px;
            height: 20px;

            .link {
                min-width: 150px;
                height: 20px;
                display: flex;

                .link-children {
                    min-width: 150px;
                    height: 20px;
                    display: flex;
                }
            }

            ${({ isShowComment }) =>
                isShowComment && 'width: 100%;  height: auto;'};
        }
    }
`;
