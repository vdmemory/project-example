import styled from '@emotion/styled';
import GlobalStyles from './GlobalStyles';

export const StyledStubComponent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background: white;
    min-height: 100vh;
    overflow: hidden;
`;

export const StubComponent = () => {
    return (
        <StyledStubComponent>
            <GlobalStyles />
        </StyledStubComponent>
    );
};

export default StubComponent;
