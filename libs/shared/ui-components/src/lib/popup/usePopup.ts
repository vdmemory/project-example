import { useState } from 'react';

export const usePopup = (hasOpen?: boolean) => {
    const [isOpen, setIsOpen] = useState(hasOpen || false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
    };
};
