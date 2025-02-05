import {
    onboarding_1,
    onboarding_1_min,
    onboarding_3,
    onboarding_3_min,
    onboarding_5,
    onboarding_5_min,
    onboarding_6,
    onboarding_6_min,
    slide1_5,
    slide1_5_min,
    slide1_6,
    slide1_6_min,
    slide1_7,
    slide1_7_min,
    onboarding_disco,
    onboarding_disco_min,
    onboarding_office,
    onboarding_office_min,
    clouds,
    clouds_min,
} from '@breef/shared/assets';
import { SliderConfigType } from '@breef/shared/ui-components';

export const sliderConfigAgency = {
    animationDelay: 5000,
    data: [
        {
            imageUrl: slide1_6.src,
            imageUrlMin: slide1_6_min.src,
        },
        {
            imageUrl: onboarding_1.src,
            imageUrlMin: onboarding_1_min.src,
        },
        {
            imageUrl: slide1_7.src,
            imageUrlMin: slide1_7_min.src,
        },
        {
            imageUrl: onboarding_disco.src,
            imageUrlMin: onboarding_disco_min.src,
        },
        {
            imageUrl: onboarding_office.src,
            imageUrlMin: onboarding_office_min.src,
        },
        {
            imageUrl: onboarding_3.src,
            imageUrlMin: onboarding_3_min.src,
        },
        {
            imageUrl: clouds.src,
            imageUrlMin: clouds_min.src,
        },
        {
            imageUrl: onboarding_5.src,
            imageUrlMin: onboarding_5_min.src,
        },
        {
            imageUrl: slide1_5.src,
            imageUrlMin: slide1_5_min.src,
        },
        {
            imageUrl: onboarding_6.src,
            imageUrlMin: onboarding_6_min.src,
        },
    ],
} as SliderConfigType;
