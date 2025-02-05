import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { DirectionType, StyledTextarea } from './Textarea.styled';
import TextareaAutosize from 'react-textarea-autosize';
import { useLimitSymbols } from '@breef/shared/hooks';
import { UploadButton } from './uploadButton/UploadButton';

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
    onChangeAttachment?: (files: File[]) => void;
    isDisableAttachButton?: boolean;
    children?: ReactNode;
}

export const Textarea = ({
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
    onChangeAttachment,
    isDisableAttachButton = false,
    children,
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
    const [errorAttachment, setErrorAttachment] = useState('');

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

    const errorMessage = error || errorAttachment;

    const renderBottomSection = () => {
        if (isErrorRightPlacement && !hideNumberCharacters && !!maxLength) {
            return renderCounterWithError();
        }
        return (
            <Fragment>
                {!hideNumberCharacters && !!maxLength && renderCounter()}
                {(errorMessage || warning) && (
                    <span
                        className={`${
                            errorMessage ? 'error' : 'warning'
                        }-message`}
                    >
                        {errorMessage || warning}
                    </span>
                )}
            </Fragment>
        );
    };

    const renderCounterWithError = () => {
        if (errorMessage || warning) {
            const className = `${
                errorMessage ? 'error' : 'warning'
            }-message-right`;
            return <span className={className}>{errorMessage || warning}</span>;
        }
        return renderCounter();
    };

    const renderCounter = () => (
        <span className="count">
            {value.length}/{maxLength}
        </span>
    );

    return (
        <StyledTextarea
            direction={direction}
            isError={!!error}
            isWarning={!!warning}
            isAttachButton={!!onChangeAttachment}
            className={wrapperClassName}
            isCounter={!hideNumberCharacters}
            data-testid={`textarea-container`}
        >
            <div className="textarea-wrapper">
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
                {!!onChangeAttachment && (
                    <UploadButton
                        onChange={onChangeAttachment}
                        setError={setErrorAttachment}
                        disabled={isDisableAttachButton}
                    />
                )}
                {children}
            </div>
            {renderBottomSection()}
        </StyledTextarea>
    );
};
