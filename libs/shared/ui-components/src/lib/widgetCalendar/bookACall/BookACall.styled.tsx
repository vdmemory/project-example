import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

interface StyledBookACallProps {
    isBorder: boolean;
}

export const StyledBookACall = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    max-width: 649px;
    background-color: ${colors.mainWhite};
    border: ${({ isBorder }: StyledBookACallProps) =>
        isBorder ? '1px solid black' : 'none'};

    @media screen and (max-width: 1024px) {
        .preloader {
            height: 480px !important;
        }
    }
`;
