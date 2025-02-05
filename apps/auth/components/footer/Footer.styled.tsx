import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
    margin-top: auto;
    width: 100%;
    background: white;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid black;
    border-bottom: 1px solid black;

    @media screen and (max-width: 1024px) {
        display: none;
    }
    .left-section {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 50px;
        font-size: 14px;
        span {
            padding-left: 3px;
        }
        @media screen and (max-width: 1024px) {
            padding-right: 10px;
            padding-left: 24px;
            justify-content: flex-start;
            span {
                width: 80px;
            }
        }
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        svg {
            padding: 0;
        }
    }
`;
