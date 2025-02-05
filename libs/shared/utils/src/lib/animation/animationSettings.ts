export const containerAnimationSettings = {
    variants: {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    },
    initial: 'hidden',
    animate: 'visible',
};

export const itemAnimationSettings = {
    variants: {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    },
};
