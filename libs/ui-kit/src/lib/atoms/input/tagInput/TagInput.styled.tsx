import styled from '@emotion/styled';
import { colors } from '../../../styles/colors';
import { mixinTypography } from '../../../styles/mixins/typography.styled';

export const StyledTagInput = styled.div`
    display: flex;
    align-items: center;
    padding: 4px;
    background-color: ${colors.secondary.secondary200};
    height: 20px;

    ${mixinTypography.label.lS.labelSMedium};

    > span {
        color: ${colors.grey.grey900};
        text-transform: uppercase;
    }

    button.remove-btn {
        display: flex;
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .warning-icon {
        width: 15px;
        height: 15px;
        margin-right: 4px;
    }
    .close-icon {
        width: 28px;
        height: 28px;
    }
`;
