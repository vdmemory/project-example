import { ChevronSmallStraight } from '@breef/shared/assets';
import React, { useState } from 'react';
import { StyledExpansionPanel } from './ExpansionPanel.styled';
import { AnimatePresence, motion } from 'framer-motion';

interface ExpansionPanelProps {
    title: string;
    description: string;
    isMarked?: boolean;
}

const ExpansionPanel: React.FC<ExpansionPanelProps> = ({
    title,
    description,
    isMarked = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <StyledExpansionPanel
            data-testid="expansion-panel"
            onClick={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
        >
            <div className="answer-header">
                <h2>{title}</h2>
                <ChevronSmallStraight />
            </div>
            <AnimatePresence initial={false}>
                {isOpen && !isMarked ? (
                    <motion.p
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
                    >
                        {description}
                    </motion.p>
                ) : (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                        onClick={e =>
                            isMarked ? e.stopPropagation() : undefined
                        }
                        className={
                            isOpen
                                ? 'answer-text-wrapper answer-text-wrapper--open'
                                : 'answer-text-wrapper'
                        }
                    />
                )}
            </AnimatePresence>
        </StyledExpansionPanel>
    );
};
export default ExpansionPanel;
