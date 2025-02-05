import { ScrollNavIcon } from '@breef/shared/assets';
import {
    MutableRefObject,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import { StyledScrollBar, StyledNavElement } from './Scrollbar.styled';
import Spinner from '../spinner/Spinner';
import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import { install } from 'resize-observer';
import LipsLoader from '../loader/lipsLoader/LipsLoader';
import { ScrollBarSkeleton } from '@breef/ui-kit';

interface ScrollBarProps {
    children: ReactNode;
    scroll?: 'horizontal' | 'vertical';
    prev?: string;
    next?: string;
    alwaysShowNext?: boolean;
    alwaysShowPrev?: boolean;
    visibleNextBtn?: boolean;
    visiblePrevBtn?: boolean;
    hideNavButtons?: boolean;
    overflow?: 'hidden' | 'scroll';
    getScrollElementRef?: (ref: RefObject<HTMLInputElement | null>) => void;
    isLoading?: boolean;
    elementWidth?: number | null;
}

type Element = MutableRefObject<HTMLInputElement>;

export const ScrollBar = ({
    children,
    scroll = 'horizontal',
    prev = '',
    next = '',
    alwaysShowNext = false,
    alwaysShowPrev = false,
    visibleNextBtn = true,
    visiblePrevBtn = true,
    hideNavButtons = false,
    overflow = 'scroll',
    getScrollElementRef,
    isLoading = false,
    elementWidth = null,
}: ScrollBarProps) => {
    const refPrevElement = useRef<HTMLInputElement | null>(null);
    const refNextElement = useRef<HTMLInputElement | null>(null);
    const refScrollElement = useRef<HTMLInputElement | null>(null);
    const refContentWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (getScrollElementRef) getScrollElementRef(refScrollElement);
    }, [getScrollElementRef]);

    const scrollingValidateHorizontal = (
        element: Element,
        prev: Element,
        next: Element,
    ) => {
        const scrollingLeft = Math.ceil(element.current.scrollLeft);
        const elementWidth = element.current.offsetWidth;
        const scrollingWidth = element.current.scrollWidth;

        if (next.current && scrollingLeft >= scrollingWidth - elementWidth) {
            next.current.style.opacity = '0';
            next.current.style.pointerEvents = 'none';
        }
        if (prev.current && scrollingLeft === 0) {
            prev.current.style.opacity = '0';
            prev.current.style.pointerEvents = 'none';
        }
        if (next.current && scrollingLeft < scrollingWidth - elementWidth) {
            next.current.style.opacity = '1';
            next.current.style.pointerEvents = 'inherit';
        }
        if (prev.current && scrollingLeft !== 0) {
            prev.current.style.opacity = '1';
            prev.current.style.pointerEvents = 'inherit';
        }
    };

    const scrollingValidateVertical = (
        element: Element,
        prev: Element,
        next: Element,
        alwaysShowNext: boolean,
        alwaysShowPrev: boolean,
    ) => {
        const scrollingTop = Math.ceil(element.current.scrollTop);
        const elementHeight = element.current.offsetHeight;
        const scrollingHeight = element.current.scrollHeight;

        if (!alwaysShowNext && IS_CLIENT_PLATFORM) {
            if (scrollingTop >= scrollingHeight - elementHeight) {
                if (next.current.title && window.innerWidth > 768) {
                    next.current.style.opacity = '0.3';
                } else {
                    next.current.style.opacity = '0';
                }
            }
            if (scrollingTop < scrollingHeight - elementHeight) {
                next.current.style.opacity = '1';
            }
        }

        if (!alwaysShowPrev) {
            if (scrollingTop === 0) {
                prev.current.style.opacity = '0';
            }
            if (scrollingTop !== 0) {
                prev.current.style.opacity = '1';
            }
        }
    };

    const handleScroll = useCallback(() => {
        if (!hideNavButtons) {
            if (scroll === 'horizontal') {
                scrollingValidateHorizontal(
                    refScrollElement as Element,
                    refPrevElement as Element,
                    refNextElement as Element,
                );
            }
            if (scroll === 'vertical') {
                scrollingValidateVertical(
                    refScrollElement as Element,
                    refPrevElement as Element,
                    refNextElement as Element,
                    alwaysShowNext,
                    alwaysShowPrev,
                );
            }
        }
    }, [alwaysShowNext, alwaysShowPrev, hideNavButtons, scroll]);

    useEffect(() => {
        const element = refScrollElement.current;
        if (element) element.addEventListener('scroll', handleScroll);
        return () => {
            if (element) element.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleClick = (direction: string) => {
        switch (direction) {
            case 'left':
                return refScrollElement.current?.scrollTo({
                    left:
                        refScrollElement.current?.scrollLeft -
                        (elementWidth !== null ? elementWidth : 400),
                    behavior: 'smooth',
                });
            case 'right':
                return refScrollElement.current?.scrollTo({
                    left:
                        refScrollElement.current?.scrollLeft +
                        (elementWidth !== null ? elementWidth : 400),
                    behavior: 'smooth',
                });
            case 'up':
                return refScrollElement.current?.scrollTo({
                    top:
                        refScrollElement.current?.scrollTop -
                        (elementWidth !== null ? elementWidth : 402),
                    behavior: 'smooth',
                });
            case 'down':
                return refScrollElement.current?.scrollTo({
                    top:
                        refScrollElement.current?.scrollTop +
                        (elementWidth !== null ? elementWidth : 402),
                    behavior: 'smooth',
                });
        }
    };

    useEffect(() => {
        if (!window.ResizeObserver) install();

        const ro = new ResizeObserver(entries => {
            // We wrap it in requestAnimationFrame to avoid this error - ResizeObserver loop limit exceeded
            window.requestAnimationFrame(() => {
                if (!Array.isArray(entries) || !entries.length) {
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const entry of entries) {
                    if (!hideNavButtons && refScrollElement.current) {
                        if (scroll === 'horizontal') {
                            scrollingValidateHorizontal(
                                refScrollElement as Element,
                                refPrevElement as Element,
                                refNextElement as Element,
                            );
                        }
                        if (scroll === 'vertical') {
                            scrollingValidateVertical(
                                refScrollElement as Element,
                                refPrevElement as Element,
                                refNextElement as Element,
                                alwaysShowNext,
                                alwaysShowPrev,
                            );
                        }
                    }
                }
            });
        });
        if (refContentWrapper.current) ro.observe(refContentWrapper.current);
        return () => ro.disconnect();
    }, [alwaysShowNext, alwaysShowPrev, hideNavButtons, scroll]);

    const getLoader = () => {
        if (scroll === 'horizontal') return <ScrollBarSkeleton />;
        return <Spinner />;
    };

    return (
        <StyledScrollBar
            scroll={scroll}
            overflow={overflow}
            className="scroll-bar"
        >
            {!hideNavButtons && (
                <NavElement
                    onClick={handleClick}
                    refElement={refPrevElement}
                    direction={scroll === 'vertical' ? 'up' : 'left'}
                    title={prev}
                    visible={visiblePrevBtn}
                />
            )}
            <div ref={refScrollElement} className="scrollbar">
                <div ref={refContentWrapper} className="content-wrapper">
                    {isLoading ? getLoader() : children}
                </div>
            </div>
            {!hideNavButtons && (
                <NavElement
                    onClick={handleClick}
                    refElement={refNextElement}
                    direction={scroll === 'vertical' ? 'down' : 'right'}
                    title={next}
                    visible={visibleNextBtn}
                />
            )}
        </StyledScrollBar>
    );
};

export default ScrollBar;

interface NavElementProps {
    onClick: (direction: string) => void;
    refElement: MutableRefObject<HTMLInputElement | null>;
    direction?: 'left' | 'right' | 'up' | 'down';
    title?: string;
    visible?: boolean;
}

const NavElement = ({
    onClick,
    refElement,
    direction = 'left',
    title = '',
    visible = true,
}: NavElementProps) => {
    if (!visible) return null;

    return (
        <StyledNavElement
            direction={direction}
            title={title}
            ref={refElement}
            onClick={() => onClick(direction)}
        >
            <span>{title && title}</span>
            <ScrollNavIcon />
        </StyledNavElement>
    );
};
