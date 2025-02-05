import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledImpersonateTip = styled.div`
    position: fixed;
    top: 0;
    left: 50px;
    min-height: 20px;
    display: flex;
    ${mixinTypography.text.tXs.textXsRegular}
    z-index: 9999;
    border: 1px solid ${colors.black};

    span {
        padding: 0 10px;
        border-right: 1px solid ${colors.black};
        background-color: ${colors.secondary.secondary500};
    }
    button {
        color: ${colors.white};
        background-color: ${colors.primary.primary600};
        outline: none;
        border: none;
        cursor: pointer;
    }
`;
