import { cloneElement, useEffect, useMemo, useState } from 'react';
import {
    Placement,
    offset,
    flip,
    autoUpdate,
    useFloating,
    useInteractions,
    useHover,
    useFocus,
    useRole,
    useDismiss,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';
import { StyledTooltip } from './Tooltip.styled';
import { LinkButton } from '../button/linkButton/LinkButton';
import { toast } from 'react-toastify';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { colors } from '@breef/shared/assets';
import { Strategy } from '@floating-ui/react-dom';

interface Props {
    label: string;
    placement?: Placement;
    children: EmotionJSX.Element;
    isCopyBtn?: boolean;
    className?: string;
    isError?: boolean;
    offsetCustom?: number;
    strategy?: Strategy;
    isOpenTooltip?: boolean;
    customStyle?: {
        background?: string;
        padding?: string;
        border?: string;
        borderRadius?: string;
    };
    borderColor?: string;
}

const Tooltip: React.FC<Props> = ({
    label,
    placement = 'bottom',
    children,
    isCopyBtn,
    className,
    isError,
    offsetCustom = 14,
    strategy = 'absolute',
    isOpenTooltip,
    customStyle,
    borderColor = 'black',
}) => {
    const [open, setOpen] = useState(false);

    const styleError = {
        width: 'max-content',
        backgroundColor: `${colors.mainError}`,
        border: 'none',
        color: `${colors.mainWhite}`,
    };

    useEffect(() => {
        if (isError) return setOpen(true);
        return setOpen(false);
    }, [isError]);

    const { x, y, reference, floating, context } = useFloating({
        placement,
        open,
        onOpenChange: !isError ? setOpen : undefined,
        middleware: [offset(offsetCustom), flip()],
        whileElementsMounted: autoUpdate,
        strategy,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, { restMs: 40, delay: isCopyBtn ? 200 : undefined }),
        useFocus(context),
        useRole(context, { role: 'tooltip' }),
        useDismiss(context),
    ]);

    const ref = useMemo(() => reference, [reference]);

    const getLeftPosition = () => {
        switch (placement) {
            case 'top':
                return 'calc(50% - 7px)';
            case 'top-end':
                return 'calc(100% - 30px)';
            case 'bottom':
                return 'calc(50% - 7px)';
            case 'right':
                return '-7px';
            case 'left':
                return 'calc(100% - 7px)';
            default:
                return 'calc(50% - 7px)';
        }
    };

    const getTopPosition = () => {
        switch (placement) {
            case 'top':
                return 'calc(100%  - 7px)';
            case 'top-end':
                return 'calc(100%  - 6px)';
            case 'bottom':
                return '-7px';
            case 'right':
                return 'calc(50%  - 6px)';
            case 'left':
                return 'calc(50%  - 6px)';
            default:
                return 'unset';
        }
    };

    const getRotate = () => {
        switch (placement) {
            case 'top':
            case 'bottom':
                return 'rotate(45deg)';
            case 'top-end':
                return 'rotate(-135deg)';
            case 'right':
                return 'rotate(-45deg)';
            case 'left':
                return 'rotate(135deg)';
            default:
                return 'rotate(45deg)';
        }
    };

    const styleForArrow = {
        border: '1px solid transparent',
        borderColor:
            placement === 'top'
                ? `transparent ${borderColor} ${borderColor} transparent`
                : `${borderColor} transparent transparent ${borderColor}`,
        left: getLeftPosition(),
        top: getTopPosition(),
        bottom: 'unset',
        transform: getRotate(),

        zIndex: -1,
    };

    const onCopyLabel = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Text copied to clipboard', {
            delay: 1,
        });
        setOpen(false);
    };

    const defaultStyle = {
        background: '#F1EAFB',
        padding: '6px 10px',
        border: `1px solid ${borderColor}`,
    };

    const styles = {
        ...defaultStyle,
        ...customStyle,
    };

    return (
        <StyledTooltip role="tooltip" className={className ? className : ''}>
            {cloneElement(
                children,
                getReferenceProps({ ref, ...children.props }),
            )}

            <AnimatePresence>
                {(isOpenTooltip ?? open) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: 'spring',
                            damping: 20,
                            stiffness: 300,
                        }}
                        ref={floating}
                        className="Tooltip"
                        style={Object.assign(
                            {
                                position: strategy,
                                top: y ? y - 1 : 0,
                                left: x ?? 0,
                                zIndex: 1,
                                ...styles,
                            },
                            isError ? styleError : {},
                        )}
                        {...getFloatingProps()}
                    >
                        <span>{label}</span>
                        {isCopyBtn && (
                            <LinkButton
                                onClick={() => onCopyLabel(label)}
                                name="Copy"
                                className="link-button"
                            />
                        )}
                        <div
                            id="arrow"
                            style={
                                isError
                                    ? {
                                          ...styleForArrow,
                                          borderColor: 'transparent',
                                      }
                                    : { ...styleForArrow }
                            }
                        ></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </StyledTooltip>
    );
};

export default Tooltip;
