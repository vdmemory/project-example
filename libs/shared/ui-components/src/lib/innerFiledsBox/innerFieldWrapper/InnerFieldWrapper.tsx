import { RefObject } from 'react';
import { StyledInnerFieldWrapper } from './InnerFieldWrapper.styled';
import Tooltip from '../../tooltip/Tooltip';
import { IconQuestion } from '@breef/shared/assets';
import { useIsPresent } from 'framer-motion';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

interface InnerFieldsBoxProps {
    labelText: string;
    children?: EmotionJSX.Element | null;
    setRef?: RefObject<HTMLLabelElement>;
    isCursorPointer?: boolean;
    isDisableLabelClick?: boolean;
    isReadOnly?: boolean;
    toolTipText?: string;
    error?: string;
    tooltipOffset?: number;
    autoSize?: boolean;
}

export const InnerFieldWrapper = ({
    labelText,
    setRef,
    children,
    isCursorPointer = false,
    isDisableLabelClick = false,
    isReadOnly = false,
    toolTipText,
    tooltipOffset = 14,
    error,
    autoSize,
}: InnerFieldsBoxProps) => {
    const isPresent = useIsPresent();

    return (
        <StyledInnerFieldWrapper
            ref={setRef}
            isCursorPointer={isCursorPointer}
            htmlFor={
                isDisableLabelClick || isReadOnly
                    ? 'disable-label-events'
                    : undefined
            }
            isError={!!error && isPresent}
            className={`label-wrapper ${autoSize ? 'auto-size' : ''}`}
            isReadOnly={isReadOnly}
        >
            <div className="label-container">
                {error ? (
                    <Tooltip
                        className="tooltip"
                        isError
                        placement="right"
                        label={error}
                        offsetCustom={tooltipOffset}
                    >
                        <span className="label-text">{labelText}&nbsp;</span>
                    </Tooltip>
                ) : (
                    <span className="label-text">{labelText}&nbsp;</span>
                )}
                {toolTipText && (
                    <Tooltip
                        className="tooltip"
                        placement="right"
                        label={toolTipText}
                    >
                        <IconQuestion />
                    </Tooltip>
                )}
            </div>
            {children}
        </StyledInnerFieldWrapper>
    );
};

export default InnerFieldWrapper;
