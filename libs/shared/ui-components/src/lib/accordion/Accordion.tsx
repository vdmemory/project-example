import { ReactNode, useEffect, useRef, useState } from 'react';
import { StyledAccordion } from './AccordionProps.styled';
import { ChevronIcon, starsImage } from '@breef/shared/assets';
import { motion } from 'framer-motion';
import { useMediaContext } from '@breef/shared/hooks';

interface AccordionProps {
    title: string | ReactNode;
    children?: ReactNode;
    isShowImage?: boolean;
    defaultIsOpen?: boolean;
    isAccent?: boolean;
    triggerCloseAccordion?: boolean;
    key?: string;
    isClosedEffect?: boolean;
    hideBorder?: boolean;
}

export function Accordion({
    title,
    isShowImage,
    defaultIsOpen = false,
    isAccent,
    triggerCloseAccordion,
    children,
    key,
    isClosedEffect = false,
    hideBorder = false,
}: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);
    const accordionInnerRef = useRef<HTMLDivElement>(null);
    const { isMobile } = useMediaContext();

    useEffect(() => {
        if (triggerCloseAccordion) {
            setIsOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerCloseAccordion]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledAccordion
            isOpen={isOpen}
            className="accordion"
            isAccent={isAccent}
            hideBorder={hideBorder}
        >
            <div
                data-testid="accordion-header"
                className="accordion-header"
                onClick={toggleAccordion}
            >
                <div>{title}</div>
                <div className="collapse-image-wrapper">
                    <ChevronIcon className="chevron-icon" />
                    <ChevronIcon className="chevron-icon" />
                </div>

                {isClosedEffect && (
                    <span
                        className={
                            isOpen
                                ? 'accordion-header-triangle accordion-header-triangle-hide'
                                : 'accordion-header-triangle'
                        }
                    ></span>
                )}
            </div>
            <motion.div
                data-testid="accordion-content-wrapper"
                ref={accordionInnerRef}
                className={
                    isOpen
                        ? 'accordion-inner-section accordion-inner-section-open'
                        : 'accordion-inner-section'
                }
                key={key || (title as string)}
                layout
                animate={{
                    maxHeight: isOpen ? 'initial' : 0,
                    height: isOpen ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                {!hideBorder && <div className="top-white-space" />}
                <motion.div layout className="layout">
                    {children}
                </motion.div>
            </motion.div>
            {isShowImage && !isMobile && (
                <motion.img
                    layout
                    data-testid="rocket-image"
                    className="rocket-image"
                    src={starsImage.src}
                    alt="Small Rocket"
                    initial={{ opacity: 0, bottom: '-180px', height: 0 }}
                    animate={{
                        opacity: isOpen ? 1 : 0,
                        height: isOpen ? 'auto' : 0,
                        bottom: isOpen ? '80px' : '-500px',
                    }}
                    transition={{ duration: isOpen ? 0.4 : 0.1 }}
                />
            )}
        </StyledAccordion>
    );
}

export default Accordion;
