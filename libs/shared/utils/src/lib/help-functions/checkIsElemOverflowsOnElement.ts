import { RefObject } from 'react';

export const checkIsElemOverflowsOnElement = (
    refElem: RefObject<HTMLElement>,
    bottomElClass?: string,
) => {
    const pageBottomEl = document.getElementsByTagName('footer')[0];
    const pageBody = document.getElementsByTagName('body')[0];
    if (refElem.current && pageBody) {
        const rectPageBody = pageBody.getBoundingClientRect();
        const rectDropList = refElem.current.getBoundingClientRect();
        const bottomYOfDropList = rectDropList.y + rectDropList.height;
        const bottomYOfBottomEl =
            rectPageBody.height +
            rectPageBody.y -
            (pageBottomEl?.scrollHeight ?? 0);
        return bottomYOfDropList >= bottomYOfBottomEl;
    }
    return false;
};
