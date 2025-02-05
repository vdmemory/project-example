import { useEffect, useState } from 'react';
import {
    useProjectCreateActions,
    useProjectCreateSelector,
} from '../../../../store/hooks';

export const useIsDisplayTooltip = (deps: unknown[]) => {
    const { isTooltipProjectOverview } = useProjectCreateSelector(
        state => state,
    ).projectCreate;
    const { setIsTooltipProjectOverview } = useProjectCreateActions();

    useEffect(() => {
        const fields = document.querySelectorAll('input, textarea');
        const hideTooltip = () => {
            setIsTooltipProjectOverview(false);
            clearListeners();
        };
        const clearListeners = () =>
            fields.forEach(node =>
                node.removeEventListener('focus', hideTooltip),
            );

        if (isTooltipProjectOverview) {
            fields.forEach(node => node.addEventListener('focus', hideTooltip));
        }

        return clearListeners;
    }, deps);

    return {
        isTooltipProjectOverview,
    };
};
