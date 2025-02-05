import { useEffect } from 'react';

interface UseTargetElementProps {
    targetElementId?: string | null;
    scrollOffset?: number;
}
export const useTargetElement = ({
    targetElementId,
    scrollOffset = 0,
}: UseTargetElementProps) => {
    useEffect(() => {
        if (targetElementId) {
            const targetElement = document.getElementById(targetElementId);
            const targetElementTop =
                targetElement?.getBoundingClientRect().y ?? 0;
            window.scrollTo(
                0,
                targetElementTop + window.scrollY - scrollOffset,
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
