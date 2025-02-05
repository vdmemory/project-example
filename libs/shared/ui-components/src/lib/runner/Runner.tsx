import Slider, { SliderProps } from 'rc-slider';
import { StyledRunner } from './Runner.styled';

export const Runner = ({ className, ...props }: SliderProps) => {
    return (
        <StyledRunner>
            <Slider
                className={`${className ? className : 'runner'}`}
                {...props}
            />
        </StyledRunner>
    );
};

export default Runner;
