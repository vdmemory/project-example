import { Fragment, useEffect, useRef } from 'react';
import { DirectionType } from './Textarea.styled';
import TextareaAutosize from 'react-textarea-autosize';
import { useLimitSymbols } from '@breef/shared/hooks';
import { StyledTextareaOld } from './TextareaOld.styled';

interface TextareaProps {
    value?: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    onFocus?: () => void;
    error?: string;
    warning?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    minLength?: number;
    className?: string;
    wrapperClassName?: string;
    autoSize?: boolean;
    rows?: number;
    direction?: DirectionType;
    hideNumberCharacters?: boolean;
    isAutoHeightArea?: boolean;
    isErrorRightPlacement?: boolean;
}

export const TextareaOld = ({
    value = '',
    onChange,
    onBlur,
    error,
    warning,
    placeholder = 'Enter text here...',
    maxLength,
    minLength,
    className,
    wrapperClassName,
    disabled = false,
    readOnly = false,
    rows = 5,
    direction = 'left',
    autoSize = false,
    hideNumberCharacters = false,
    isAutoHeightArea = false,
    isErrorRightPlacement = false,
}: TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const attr = {
        maxLength,
        minLength,
        placeholder,
        rows,
        className,
        disabled,
        readOnly,
    };
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const areaWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        onChange(e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const value = e.target.value;
        onBlur?.(value);
    };

    function fixTextareaSize(
        textarea: HTMLTextAreaElement,
        textAreaWrapper: HTMLDivElement,
    ) {
        textarea.style.height = 'auto';
        textAreaWrapper.style.height = 'fit-content';
        textAreaWrapper.style.height = textarea.scrollHeight + 2 + 'px';
    }
    const textarea = textAreaRef.current;
    const textAreaWrapper = areaWrapperRef.current;

    useEffect(() => {
        if (textarea && textAreaWrapper && isAutoHeightArea) {
            fixTextareaSize(textarea, textAreaWrapper);
            textarea.addEventListener('input', function (e) {
                fixTextareaSize(
                    e.target as HTMLTextAreaElement,
                    textAreaWrapper,
                );
            });
        }
        return () =>
            textarea?.removeEventListener('input', function (e) {
                fixTextareaSize(
                    e.target as HTMLTextAreaElement,
                    textAreaWrapper as HTMLDivElement,
                );
            });
    }, [isAutoHeightArea, textarea, textAreaWrapper]);

    useLimitSymbols({ value, onChange, maxLength });

    const renderAutoSizeComponent = () => {
        return (
            <TextareaAutosize
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={textAreaRef}
                minRows={rows}
                {...attr}
            />
        );
    };

    const renderBottomSection = () => {
        if (isErrorRightPlacement && !hideNumberCharacters && !!maxLength) {
            return renderCounterWithError();
        }
        return (
            <Fragment>
                {!hideNumberCharacters && !!maxLength && renderCounter()}
                {(error || warning) && (
                    <span className={`${error ? 'error' : 'warning'}-message`}>
                        {error || warning}
                    </span>
                )}
            </Fragment>
        );
    };

    const renderCounterWithError = () => {
        if (error || warning) {
            const className = `${error ? 'error' : 'warning'}-message-right`;
            return <span className={className}>{error || warning}</span>;
        }
        return renderCounter();
    };

    const renderCounter = () => (
        <span className="count">
            {value.length}/{maxLength}
        </span>
    );

    return (
        <StyledTextareaOld
            direction={direction}
            isError={!!error}
            isWarning={!!warning}
            className={wrapperClassName}
        >
            {autoSize ? (
                renderAutoSizeComponent()
            ) : (
                <textarea
                    data-testid={`textarea`}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={textAreaRef}
                    {...attr}
                >
                    {value}
                </textarea>
            )}
            {renderBottomSection()}
        </StyledTextareaOld>
    );
};
