import { useEffect, useRef, useState } from 'react';

export function useSwiper({
    onLeftSwipe,
    onRightSwipe,
    onUpSwipe,
    onDownSwipe,
    verticalSwipeThreshold = 50,
    horizontalSwipeThreshold = 30,
}: {
    onLeftSwipe?: () => void;
    onRightSwipe?: () => void;
    onUpSwipe?: () => void;
    onDownSwipe?: () => void;
    verticalSwipeThreshold?: number;
    horizontalSwipeThreshold?: number;
} = {}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [domRef, setDomRef] = useState<any>(null);
    const xDown = useRef<number | null>(null);
    const yDown = useRef<number | null>(null);

    const [xDiffState, setXDiffState] = useState<number>(0);
    const [yDiffState, setYDiffState] = useState<number>(0);

    useEffect(() => {
        if (!domRef) return;

        const handleTouchStart = (e: TouchEvent) => {
            const firstTouch = e.touches[0];
            xDown.current = firstTouch.clientX;
            yDown.current = firstTouch.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!xDown.current || !yDown.current) return;

            const firstTouch = e.touches[0];
            const xUp = firstTouch.clientX;
            const yUp = firstTouch.clientY;
            const xDiff = xDown.current - xUp;
            const yDiff = yDown.current - yUp;

            setXDiffState(xDiff);
            setYDiffState(yDiff);
        };

        const horFunc = () => {
            if (xDiffState > horizontalSwipeThreshold) onLeftSwipe?.();
            if (xDiffState < -horizontalSwipeThreshold) onRightSwipe?.();
            return;
        };
        const verFunc = () => {
            if (yDiffState > verticalSwipeThreshold) onUpSwipe?.();
            if (yDiffState < -verticalSwipeThreshold) onDownSwipe?.();
            return;
        };

        const handleTouchEnd = () => {
            if (!xDown.current || !yDown.current) return;

            if (Math.abs(xDiffState) > Math.abs(yDiffState)) horFunc();
            if (Math.abs(xDiffState) < Math.abs(yDiffState)) verFunc();

            xDown.current = null;
            yDown.current = null;
        };

        domRef.addEventListener('touchstart', handleTouchStart, false);
        domRef.addEventListener('touchmove', handleTouchMove, false);
        domRef.addEventListener('touchend', handleTouchEnd, false);

        return () => {
            domRef.removeEventListener('touchstart', handleTouchStart);
            domRef.removeEventListener('touchmove', handleTouchMove);
            domRef.removeEventListener('touchend', handleTouchEnd);
        };
    }, [
        domRef,
        onLeftSwipe,
        onRightSwipe,
        onUpSwipe,
        onDownSwipe,
        verticalSwipeThreshold,
        horizontalSwipeThreshold,
        xDiffState,
        yDiffState,
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (ref: any) => setDomRef(ref);
}
