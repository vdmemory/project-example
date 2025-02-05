import { simpleAnimation } from '@breef/shared/assets';
import styled from '@emotion/styled';

interface StyledBlurPageLoaderProps {
    isPageFooter: boolean;
}
export const StyledBlurPageLoader = styled.div`
    .loader-container {
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        bottom: ${({ isPageFooter }: StyledBlurPageLoaderProps) =>
            isPageFooter ? '50px' : '0'};
        right: 0;
        background: blur(31px);
        backdrop-filter: blur(10px);
        background: transparent;
        overflow: hidden;
        ${simpleAnimation}
    }
`;
