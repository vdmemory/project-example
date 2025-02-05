import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { fonts } from '@breef/shared/assets';

interface StyledSlideProps {
    isCurrentSlide?: boolean;
    placement?: 'right' | 'left';
}

const slideEnter = keyframes`
    from {
        transform: scale(1.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

const animation = ({ isCurrentSlide }: StyledSlideProps) => {
    if (isCurrentSlide)
        return css`
            animation: 0.75s cubic-bezier(0.42, 0, 0, 1) ${slideEnter};
        `;
    return css`
        opacity: 0;
    `;
};

export const StyledSlide = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    text-transform: uppercase;
    transition: all 0.75s cubic-bezier(0.42, 0, 0, 1);
    justify-content: center;
    align-items: center;
    position: ${(props: StyledSlideProps) =>
        props.isCurrentSlide ? 'relative' : 'absolute'};
    ${animation};

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .gradient {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        opacity: 0.6;
        height: 30%;
        width: inherit;
        position: absolute;
        bottom: 0;
    }

    .slide-text-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        position: absolute;
        bottom: 30px;
        left: 40px;
        right: 40px;
        color: white;

        ${({ placement }: StyledSlideProps) =>
            placement === 'right' &&
            css`
                > * {
                    text-align: right;
                }
            `};
    }

    .note {
        font-family: ${fonts.accent}, sans-serif;
        font-size: 16px;
        margin-bottom: 8px;
    }

    .label {
        font-size: 32px;
    }

    @media screen and (max-width: 1024px) {
        .slide-text-content {
            left: 15px;
            bottom: 10px;
        }

        .note {
            margin-bottom: 5px;
        }

        .label {
            font-size: 24px;
        }
    }
`;
