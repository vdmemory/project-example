import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

interface StyledProgressBarProps {
    step: number;
    numberSteps: number;
}

export const StyledProgressBar = styled.div`
    width: 10px;
    border-right: 1px solid ${colors.mainBlack};

    @media screen and (max-width: 1024px) {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid ${colors.mainBlack};
        height: 10px;
    }

    .progress {
        transition: height 0.75s cubic-bezier(0.42, 0, 0, 1);
        width: 100%;
        height: calc(
            ${(props: StyledProgressBarProps) =>
                `${(props.step / props.numberSteps) * 100}%`}
        );
        background-color: ${colors.mainOrange};

        @media screen and (max-width: 1024px) {
            transition: width 0.75s cubic-bezier(0.42, 0, 0, 1);
            height: 100%;
            width: calc(
                ${(props: StyledProgressBarProps) =>
                    `${(props.step / props.numberSteps) * 100}%`}
            );
        }
    }
`;
