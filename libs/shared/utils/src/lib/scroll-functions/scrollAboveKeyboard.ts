import { RefObject } from 'react';

export const scrollAboveKeyboard = (ref: RefObject<HTMLElement>) => {
    if (ref.current) {
        ref.current.scrollIntoView();
    }
};
