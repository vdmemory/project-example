import { StyledSlider } from './Slider.styled';
import Slide, { SlideConfigType } from './slide/Slide';
import { useCallback, useEffect, useRef, useState } from 'react';

export type SliderConfigType = {
    animationDelay: number;
    data: SlideConfigType[];
};

interface SliderProps {
    config: SliderConfigType;
    isAutomatic?: boolean;
    activeSlide?: number;
}

export const Slider: React.FC<SliderProps> = ({
    config,
    isAutomatic = true,
    activeSlide = 0,
}) => {
    const sliderLength = config?.data.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderInterval = useRef(setTimeout(() => null, 0));

    const handleStepNext = useCallback(() => {
        const nextSlide =
            currentSlide === sliderLength - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
    }, [currentSlide, sliderLength]);

    useEffect(() => {
        if (isAutomatic) {
            sliderInterval.current = setTimeout(() => {
                handleStepNext();
            }, config?.animationDelay);
        }
        return () => clearInterval(sliderInterval.current);
    }, [handleStepNext, config?.animationDelay, isAutomatic]);

    useEffect(() => {
        setCurrentSlide(activeSlide);
    }, [activeSlide]);

    return (
        <StyledSlider>
            {config?.data.map((slide, key) => (
                <Slide
                    key={key}
                    slide={slide}
                    isCurrentSlide={currentSlide === key}
                />
            ))}
        </StyledSlider>
    );
};
