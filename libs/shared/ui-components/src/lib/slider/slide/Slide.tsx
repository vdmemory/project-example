/* eslint-disable-next-line */
import { StyledSlide } from './Slide.styled';
import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import { ReactNode } from 'react';
import { useMediaContext } from '@breef/shared/hooks';

export type SlideConfigType = {
    component?: ReactNode;
    placement?: 'left' | 'right';
    imageUrl: string;
    imageUrlMin?: string;
    note?: string;
    label?: string;
};

export interface SlideProps {
    slide: SlideConfigType;
    isCurrentSlide?: boolean;
}

export default function Slide({ slide, isCurrentSlide }: SlideProps) {
    const { isMobile } = useMediaContext();

    return (
        <StyledSlide
            isCurrentSlide={isCurrentSlide}
            placement={slide.placement}
        >
            {IS_CLIENT_PLATFORM && (
                <img
                    src={
                        isMobile && slide.imageUrlMin
                            ? slide.imageUrlMin
                            : slide.imageUrl
                    }
                    alt=""
                />
            )}
            <div className="gradient"></div>

            <div className="slide-text-content">
                {slide.component}
                <div className="note">{slide.note}</div>
                <div className="label">{slide.label}</div>
            </div>
        </StyledSlide>
    );
}
