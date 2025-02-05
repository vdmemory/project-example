import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

const StyledTag = styled.div`
    display: inline-flex;
    width: max-content;
    ${mixinTypography.mobile.label.mobileLabelSm};
    line-height: 16px;
    border-radius: 4px;
    padding: 2px 6px;
    border: 1px solid ${colors.grey.grey900};
`;

export const Tag = ({ value }: { value: string }) => {
    return <StyledTag className="tag">{value}</StyledTag>;
};
