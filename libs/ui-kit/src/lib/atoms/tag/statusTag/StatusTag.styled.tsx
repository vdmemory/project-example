import { StatusTagType } from '@breef/shared/types';
import styled from '@emotion/styled';
import { colors } from '../../../styles/colors';
import { css } from '@emotion/react';
import { mixinTypography } from '../../../styles/mixins/typography.styled';

interface StyledStatusTagProps {
    sentiment: StatusTagType['sentiment'];
}

const primaryTag = css`
    background-color: ${colors.primary.primary500};
`;
const neutralTag = css`
    background-color: ${colors.secondary.secondary500};
`;
const positiveTag = css`
    background-color: ${colors.success.success500};
`;
const negativeTag = css`
    background-color: ${colors.error.error500};
`;
const attentiveTag = css`
    background-color: ${colors.warning.warning500};
`;
const informativeTag = css`
    background-color: ${colors.blue.blue500};
`;

const getStatusTagSentiment = (props: StyledStatusTagProps) => {
    switch (props.sentiment) {
        case 'primary':
            return primaryTag;
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

export const StyledStatusTag = styled.div`
    position: relative;
    display: inline-block;
    border: 1px solid ${colors.grey.grey900};
    ${mixinTypography.label.lS.labelSMedium};
    color: ${colors.grey.grey900};
    background: ${colors.white};
    padding: 3.5px 11px 3.5px 19px;
    &::before {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        border: 1px solid ${colors.grey.grey900};
        border-radius: 50%;
        top: calc(50% - 4px);
        left: 7px;
        box-sizing: border-box;
        ${getStatusTagSentiment}
    }
`;
