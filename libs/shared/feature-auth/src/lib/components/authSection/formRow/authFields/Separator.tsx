import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledSeparator = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 450;
    line-height: 16.02px;
    letter-spacing: 0;
    text-align: center;
    text-transform: lowercase;
    margin: 0 auto;
    color: #68737d;
`;

export const Separator = ({ text = 'or continue with' }: { text?: string }) => {
    return (
        <StyledSeparator className="separator">
            –––&nbsp;&nbsp;{text}&nbsp;&nbsp;–––
        </StyledSeparator>
    );
};
