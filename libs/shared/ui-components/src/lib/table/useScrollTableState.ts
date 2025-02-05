import { RefObject, useEffect, useState } from 'react';

export const useScrollTableState = (ref: RefObject<null | HTMLDivElement>) => {
    const [isScrollbar, setIsScrollbar] = useState(false);
    const [isLeftGradient, setIsLeftGradient] = useState(false);
    const [isRightGradient, setIsRightGradient] = useState(false);

    const checkIsScrollBar = (elem: HTMLDivElement) => {
        setIsScrollbar(!!elem && elem.scrollWidth > elem.clientWidth);
    };
    const checkScrollPosition = (elem: HTMLDivElement) => {
        const scrollLeft = elem.scrollLeft || 0;
        const clientWidth = elem.clientWidth || 0;
        const scrollWidth = elem.scrollWidth || 0;
        setIsLeftGradient(scrollLeft !== 0);
        setIsRightGradient(scrollLeft + clientWidth !== scrollWidth);
    };

    useEffect(() => {
        const resizeCallback = () =>
            ref.current && checkIsScrollBar(ref.current);
        const scrollCallback = () =>
            ref.current && checkScrollPosition(ref.current);
        const ro = new ResizeObserver(entries => {
            window.requestAnimationFrame(() => {
                if (!Array.isArray(entries) || !entries.length) {
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const entry of entries) {
                    resizeCallback();
                    scrollCallback();
                }
            });
        });
        if (ref.current) {
            checkIsScrollBar(ref.current);
            checkScrollPosition(ref.current);
            ro.observe(ref.current);
            ref.current?.addEventListener('scroll', scrollCallback);
        }
        return () => ro.disconnect();
        //eslint-disable-next-line
    }, []);

    return {
        isScrollbar,
        isLeftGradient,
        isRightGradient,
    };
};
