import React, { useEffect, useRef, useState } from 'react';
import { StyledTextArea } from './TextArea.styled';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { ChangeHandler } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

interface TextAreaProps {
    label?: string;
    rows?: number;
    type?: string;
    error?: string;
    placeholder?: string;
    maxLength?: number;
    onChange?: ChangeHandler;
    customOnChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    value?: string;
    id?: string;
    className?: string;
    hideNumberCharacters?: boolean;
    isAutoHeightArea?: boolean;
    autoSize?: boolean;
    isDisabled?: boolean;
    isAutoFocus?: boolean;
    readOnly?: boolean;
    withList?: boolean;
}

export const TextArea = ({
    label,
    rows,
    error,
    placeholder,
    maxLength = 500,
    onChange,
    onBlur,
    value,
    id,
    hideNumberCharacters,
    className,
    isAutoHeightArea = false,
    customOnChange,
    autoSize = false,
    isDisabled = false,
    isAutoFocus = false,
    readOnly = false,
    withList = false,
}: TextAreaProps) => {
    const [text, setText] = useState('');
    const areaWrapperRef = useRef<HTMLDivElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        setText(value || '');
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const value = e.target.value;
        setText(value);
        if (customOnChange) {
            customOnChange(value);
        } else if (onChange) {
            onChange(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const value = e.target.value;
        if (onBlur) onBlur(value);
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

    return (
        <StyledTextArea ref={areaWrapperRef} className={className}>
            {label && <label>{label}</label>}
            {autoSize ? (
                <TextareaAutosize
                    id={id}
                    maxLength={maxLength}
                    rows={rows}
                    placeholder={placeholder}
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={textAreaRef}
                    autoFocus={isAutoFocus}
                />
            ) : (
                <textarea
                    id={id}
                    data-testid="textarea"
                    maxLength={maxLength}
                    rows={rows}
                    placeholder={placeholder}
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={textAreaRef}
                    disabled={isDisabled}
                    autoFocus={isAutoFocus}
                    readOnly={readOnly}
                    // onKeyUp={handleKeyPress}
                />
            )}

            {!hideNumberCharacters && (
                <span className="count">
                    {text.length}/{maxLength}
                </span>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </StyledTextArea>
    );
};

export default TextArea;
