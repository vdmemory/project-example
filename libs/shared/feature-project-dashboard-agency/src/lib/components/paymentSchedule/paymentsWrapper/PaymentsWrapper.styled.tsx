import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledPaymentsWrapperProps {
    isLoading: boolean;
}
export const StyledPaymentsWrapper = styled.div`
    position: relative;
    margin-bottom: 45px;

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
    }

    .accordions-container {
        display: flex;
        flex-direction: column;
        border: 1px solid ${colors.mainBlack};
        gap: 1px;
    }

    ${({ isLoading }: StyledPaymentsWrapperProps) =>
        isLoading &&
        css`
            .accordions-container {
                opacity: 0.2;
                * {
                    pointer-events: none;
                }
            }
        `}
`;
