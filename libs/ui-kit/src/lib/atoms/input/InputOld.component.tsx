import { ChangeEvent, FC, ReactNode, FocusEvent, useRef } from 'react';
import { InputDirection, StyledIconsWrapper } from './Input.styled';
import { CloseIcon, SearchIcon, SpinnerIcon, WarningIcon } from '../../icons';
import { TagInput } from './tagInput/TagInput.component';
import { useLimitSymbols } from '@breef/shared/hooks';
import NumberFormat from 'react-number-format';
import { StyledInputOld } from './InputOld.styled';

type SelectedItemType = {
    id: number;
    name: string;
};
export interface InputProps {
    id?: string;
    value?: string;
    onChange: (value: string) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onCLick?: () => void;
    placeholder?: string;
    descriptiveText?: string;
    disabled?: boolean;
    error?: string;
    warning?: string;
    inputDirection?: InputDirection;
    isDollarSymbol?: boolean;
    isPercentSymbol?: boolean;
    isSearchIcon?: boolean;
    isWarningIcon?: boolean;
    isRemovable?: boolean;
    showChip?: boolean;
    selectedList?: SelectedItemType[];
    onChangeSelect?: (item: SelectedItemType) => void;
    readOnly?: boolean;
    children?: ReactNode;
    maxLength?: number;
    isScrollIntoViewOnFocus?: boolean;
    className?: string;
    isLoading?: boolean;
    isVisibleCounter?: boolean;
    prefix?: string;
    suffix?: string;
}

export const InputOld: FC<InputProps> = ({
    descriptiveText,
    error,
    warning,
    inputDirection = 'left',
    isDollarSymbol = false,
    isPercentSymbol = false,
    isSearchIcon = false,
    isWarningIcon = false,
    isRemovable = false,
    selectedList = [],
    onChangeSelect,
    onChange,
    children,
    onCLick,
    isLoading,
    isVisibleCounter,
    maxLength = 200,
    isScrollIntoViewOnFocus = true,
    ...rest
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleRemove = () => {
        onChange('');
    };

    const handleRemoveChip = (id: number, name: string) => {
        onChangeSelect?.({ id, name });
    };

    const renderTags = ({ id, name }: SelectedItemType) => {
        const handleClick = (id: number) => handleRemoveChip(id, name);

        return (
            <TagInput
                key={id}
                id={id}
                value={name}
                onClick={handleClick}
                isWarning
            />
        );
    };

    const renderCounter = () => {
        if (error || warning) {
            return <span className="error">{error || warning}</span>;
        }
        return (
            <span className="counter">
                {rest.value ? rest.value.length : 0}/{maxLength}
            </span>
        );
    };

    const renderInputDownSection = () => {
        if (isVisibleCounter) return renderCounter();
        if (error || descriptiveText || warning) {
            return <span>{error || warning || descriptiveText}</span>;
        }
        return null;
    };

    const handleFocus = () => {
        rest.onFocus?.();
        // if (isMobile && isScrollIntoViewOnFocus) {
        //     scrollAboveKeyboard(wrapperRef);
        // }
    };

    const inputProps = {
        ...rest,
        maxLength,
        onChange: handleChange,
        onFocus: handleFocus,
    };

    useLimitSymbols({ value: inputProps.value, onChange, maxLength });

    const renderInput = () => {
        if (!!rest.prefix || !!rest.suffix) {
            return (
                <NumberFormat
                    {...inputProps}
                    allowNegative={false}
                    thousandSeparator={true}
                    onChange={undefined}
                    onValueChange={values => {
                        onChange(values.value);
                    }}
                />
            );
        }
        return <input {...inputProps} />;
    };

    return (
        <StyledInputOld
            isDisabled={rest.disabled}
            isError={!!error}
            isWarning={!!warning}
            isVisibleCounter={isVisibleCounter}
            inputDirection={inputDirection}
            isDollarSymbol={isDollarSymbol}
            isPercentSymbol={isPercentSymbol}
            isSearchIcon={isSearchIcon}
            isWarningIcon={isWarningIcon}
            isRemovable={isRemovable}
            isAbsoluteErrorPosition={!descriptiveText}
            onClick={onCLick}
            data-testid="input-wrapper"
            className="input"
        >
            <div className="input-wrapper" ref={wrapperRef}>
                {(isSearchIcon || isDollarSymbol) && (
                    <StyledIconsWrapper
                        position="left"
                        isDisabled={rest.disabled}
                    >
                        {isSearchIcon && (
                            <SearchIcon data-testid="search-icon" />
                        )}
                        {isDollarSymbol && <span>$</span>}
                    </StyledIconsWrapper>
                )}
                {selectedList.length > 0 && selectedList.map(renderTags)}
                {renderInput()}
                {(isPercentSymbol ||
                    isWarningIcon ||
                    isRemovable ||
                    isLoading) && (
                    <StyledIconsWrapper
                        className="right"
                        position="right"
                        isRemovable
                        isDisabled={rest.disabled}
                    >
                        {isPercentSymbol && <span>%</span>}
                        {isWarningIcon && (
                            <WarningIcon data-testid="warning-icon" />
                        )}
                        {isRemovable && (
                            <button
                                onClick={handleRemove}
                                type="button"
                                className="remove-btn"
                            >
                                <CloseIcon />
                            </button>
                        )}
                        {isLoading && (
                            <SpinnerIcon
                                className="loader"
                                data-testid="loader"
                            />
                        )}
                    </StyledIconsWrapper>
                )}
                {children}
            </div>
            {renderInputDownSection()}
        </StyledInputOld>
    );
};

export default InputOld;
