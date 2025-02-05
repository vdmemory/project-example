import { FC, ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StyledMoreAuthOptions } from './MoreAuthOptions.styled';

interface MoreAuthOptionsProps {
    children: ReactNode;
    isOpenDefault?: boolean;
}

export const MoreAuthOptions: FC<MoreAuthOptionsProps> = ({
    children,
    isOpenDefault = false,
}) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    return (
        <StyledMoreAuthOptions>
            {!isOpen && (
                <div
                    className="more-btn-wrapper"
                    onClick={() => setIsOpen(true)}
                >
                    <span>Show more sign up options</span>
                </div>
            )}
            <AnimatePresence initial={!isOpenDefault}>
                {isOpen && (
                    <motion.div
                        className="children-wrapper"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'fit-content' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </StyledMoreAuthOptions>
    );
};
