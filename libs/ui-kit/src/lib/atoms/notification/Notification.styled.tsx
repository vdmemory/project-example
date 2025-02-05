import { mediaScreen } from '@breef/shared/assets/variables';
import { SentimentType } from '@breef/shared/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../../styles/colors';
import { mixinTypography } from '../../styles/mixins/typography.styled';

interface StyledNotificationProps {
    sentiment: SentimentType;
}

const neutralTag = css`
    background-color: ${colors.secondary.secondary50};
`;
const positiveTag = css`
    background-color: ${colors.success.success100};
`;
const negativeTag = css`
    background-color: ${colors.error.error50};
`;
const informativeTag = css`
    background-color: ${colors.blue.blue100};
`;
const attentiveTag = css`
    background-color: ${colors.warning.warning100};
`;

const getNotificationsSentiment = (props: StyledNotificationProps) => {
    switch (props.sentiment) {
        case 'positive':
            return positiveTag;
        case 'negative':
            return negativeTag;
        case 'attentive':
            return attentiveTag;
        case 'informative':
            return informativeTag;
        default:
            return neutralTag;
    }
};

export const StyledNotification = styled.div`
    display: flex;
    align-items: center;
    color: ${colors.grey.grey900};

    ${getNotificationsSentiment};
    padding: 8px 5px 8px 8px;

    svg {
        max-width: 24px;
        max-height: 24px;
        margin-right: 4px;
    }

    &.notification {
        &-medium {
            ${mixinTypography.text.tMd.textMdMedium};
        }

        &-small {
            ${mixinTypography.text.tXs.textXsMedium};
            line-height: 12px;
            letter-spacing: 0.001em;

            @media (${mediaScreen.maxMobile}) {
                line-height: 16px;
                width: 100%;
            }
        }
    }
`;
