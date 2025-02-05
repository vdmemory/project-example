/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react';
import { StyledAvatarImage } from './Avatar.styled';

export const loader =
    'data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4=';

interface AvatarProps {
    src?: string;
    alt: string;
    className: string;
    width: number;
    height: number;
}

export const ImageComponent = ({
    src,
    alt,
    className,
    width,
    height,
}: AvatarProps) => {
    if (!src) return null;

    return (
        <img
            width={width}
            height={height}
            src={src}
            alt={alt}
            className={className}
        />
    );
};

interface AvatarProps {
    src?: string;
    alt: string;
    className: string;
    width: number;
    height: number;
}

export const AvatarImage = ({
    src,
    alt,
    className,
    width,
    height,
}: AvatarProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const wrapperRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const image = imageRef.current;
        if (!image || !src) return;
        image.src = loader;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // @ts-ignore
                    entry.target.src = entry.target.dataset.src ?? '';
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(image);

        return () => {
            if (image) {
                observer.unobserve(image);
            }
            observer.disconnect();
        };
    }, [src]);

    return (
        <StyledAvatarImage
            ref={wrapperRef}
            height={height}
            width={width}
            data-testid="wrapper-avatar-image"
            className={className}
        >
            <img
                id={src}
                data-src={src}
                src={loader}
                ref={imageRef}
                alt={alt}
            />
        </StyledAvatarImage>
    );
};
