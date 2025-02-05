import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function AnimationOpacity({
    children,
    className,
    onAnimationStart,
    duration,
    delay,
}: {
    children?: ReactNode;
    className?: string;
    onAnimationStart?: () => void;
    duration?: number;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, delay }}
            className={className}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </motion.div>
    );
}
