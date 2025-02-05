import React, { ReactNode } from 'react';
import { ChangeHandler } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { StyledMain } from './TabPresetText.styled';
import TextArea from '../textarea/TextArea';

type TabPresetText = {
    handleChange: (type: string, value: string) => void;
    presetTextPlaceholder: string;
    presetText: string;
    children?: ReactNode;
    textMaxLength: number;
};

export const TabPresetText: React.FC<TabPresetText> = ({
    handleChange,
    presetTextPlaceholder,
    presetText,
    children,
    textMaxLength,
}) => {
    return (
        <StyledMain className="template-main">
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    className="inner-main"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <TextArea
                        className="step-area"
                        id="useText"
                        maxLength={textMaxLength}
                        placeholder={presetTextPlaceholder}
                        rows={6}
                        onChange={
                            (e =>
                                handleChange(
                                    'preset-text',
                                    e.target.value,
                                )) as ChangeHandler
                        }
                        value={presetText}
                    />
                    {children && children}
                </motion.div>
            </AnimatePresence>
        </StyledMain>
    );
};
