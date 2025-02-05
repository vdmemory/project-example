import styled from '@emotion/styled';
import { mixinTypography, colors } from '@breef/ui-kit';

interface StyledTagProps {
    isChildren?: boolean;
}
export const StyledTag = styled.div<StyledTagProps>`
    padding: 4px 8px;
    height: 32px;
    ${mixinTypography.label.lS.labelSMedium};
    display: flex;
    align-items: center;
    border: 1px solid ${colors.grey.grey100};
    background-color: ${colors.grey.grey50};
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 2px;

    span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
