import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export const SwipeWrapper = ({
    children,
    id,
    direction,
    swipeRight,
    swipeLeft,
    className,
}: {
    children: ReactNode;
    id: number | string | null;
    direction: number;
    swipeRight: () => void;
    swipeLeft: () => void;
    className?: string;
}) => {
    return (
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                    },
                    opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        swipeRight();
                    } else if (swipe > swipeConfidenceThreshold) {
                        swipeLeft();
                    }
                }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
