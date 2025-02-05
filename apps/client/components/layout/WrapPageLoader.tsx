import styled from '@emotion/styled';
import { ReactNode } from 'react';
import GlobalStyles from './GlobalStyles';

export const StyledWrapPageLoader = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background: white;
    min-height: 100vh;
    flex: 1;
    overflow: hidden;
`;

interface WrapPageLoaderProps {
    children: ReactNode;
}

export const WrapPageLoader = ({ children }: WrapPageLoaderProps) => {
    return (
        <StyledWrapPageLoader>
            <GlobalStyles />
            {children}
        </StyledWrapPageLoader>
    );
};

export default WrapPageLoader;
