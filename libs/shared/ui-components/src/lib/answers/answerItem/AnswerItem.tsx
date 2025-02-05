import { StyledAnswerItem } from './AnswerItem.styled';
import { ChevronSmallStraight } from '@breef/shared/assets';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnswersProps {
    title: string;
    description: string;
}

export function AnswerItem({ title, description }: AnswersProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <StyledAnswerItem
            data-testid="answer-item"
            onClick={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
        >
            <div className="answer-header">
                <h2>{title}</h2>
                <ChevronSmallStraight />
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="answer-text"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {
                                opacity: 1,
                                height: 'fit-content',
                                marginTop: 10,
                                marginBottom: 15,
                            },
                            collapsed: {
                                opacity: 0,
                                height: 0,
                                marginTop: 0,
                                marginBottom: 0,
                            },
                        }}
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    />
                )}
            </AnimatePresence>
        </StyledAnswerItem>
    );
}
