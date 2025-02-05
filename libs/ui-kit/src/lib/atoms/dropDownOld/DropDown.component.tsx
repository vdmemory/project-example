import { getClasses } from '@breef/shared/utils';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronSmallIcon } from '../../icons/svg';
import { StyledDropDown } from './DropDown.styled';
import { useOnClickOutside } from './useOnClickOutside';

type Option = {
    value: string;
    label: string;
    group?: string;
};

interface DropDownProps {
    optionDistance?: number;
    className?: string;
    scrollId?: string;
    onSelect?: (selectedOption: Option) => void;
    option?: Option;
    options: Option[];
    errorOutside?: string;
    isSearchable?: boolean;
    isGrouped?: boolean;
    placeholder?: string;
    small?: boolean;
    isDownList?: boolean;
    isDefaultView?: boolean;
    isNotSelectedErrorMessage?: boolean;
}

const NOT_SELECT_OPTION = 'Please select from the list';

const getErrorMessage = (message?: string) => {
    if (!message) return NOT_SELECT_OPTION;
    return message;
};

export const checkIsElemOverflowsOnElement = (
    refElem: RefObject<HTMLElement>,
    bottomElClass: string,
) => {
    const pageBottomEl = document.querySelector(bottomElClass);
    const pageBody = document.querySelector('body');

    if (refElem.current && pageBody) {
        const rectPageBody = pageBody.getBoundingClientRect();
        const rectDropList = refElem.current.getBoundingClientRect();
        const bottomYOfDropList = rectDropList.y + rectDropList.height + 20;
        const bottomYOfBottomEl =
            rectPageBody.height + rectPageBody.y - (pageBottomEl ? 50 : 0);
        return bottomYOfDropList >= bottomYOfBottomEl;
    }
    return false;
};

export const DropDown = ({
    optionDistance = 13,
    className,
    scrollId,
    option,
    onSelect,
    options,
    errorOutside,
    isSearchable,
    isGrouped,
    placeholder,
    small,
    isDefaultView,
    isNotSelectedErrorMessage = true,
}: DropDownProps) => {
    let newValue = '';
    let newSelectedOptions = null;

    const refDropList = useRef<HTMLUListElement>(null);
    const dropdownRef = useRef(null);

    if (option) {
        const result = options.find(o => o.value === option.value);
        newSelectedOptions = result || {
            value: option.value,
            label: option.label,
        };
        newValue = result?.label || option.label;
    }

    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const [query, setQuery] = useState<string>(newValue);
    const [selectedOption, setSelectedOption] = useState<Option | null>(
        newSelectedOptions,
    );
    const [isShow, setIsShow] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const scroll = useCallback(() => {
        if (!scrollId) return;
        if (!isShow) return;

        const section = document.querySelector(`.id-${scrollId}`);
        section?.scrollIntoView({ block: 'center' });
    }, [isShow, scrollId]);

    const checkOverflow = () => {
        if (refDropList.current) {
            if (checkIsElemOverflowsOnElement(refDropList, 'button.medium')) {
                refDropList.current.style.bottom = `calc(100% - ${optionDistance}px)`;
                refDropList.current.style.top = 'auto';
            } else {
                refDropList.current.style.bottom = 'auto';
                refDropList.current.style.top = `calc(100% - ${optionDistance}px)`;
            }
        }
    };

    useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () => {
        if (isSearchable) {
            setQuery(selectedOption?.label || '');
            setFilteredOptions(options);
        }

        setIsShow(false);
    });

    const filterOptions = (options: Option[], query: string) => {
        if (!query) return options;

        return options.filter(({ label }) =>
            label.toLowerCase().includes(query),
        );
    };

    const toggleList = () => {
        if (isSearchable && isShow) return;
        setIsShow(prev => !prev);
    };

    useEffect(() => {
        checkOverflow();
        scroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow, scroll]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();

        if (isSearchable) {
            const filtered = filterOptions(options, query);
            setFilteredOptions(filtered);
        }

        setQuery(query);
    };

    const handleOptionClick = (option: Option) => {
        setFilteredOptions(options);
        setQuery(option.label);
        setSelectedOption(option);
        setErrorMessage('');
        onSelect && onSelect(option);
    };

    const handleValidation = (query: string) => {
        if (selectedOption?.label === query) return;

        if (!selectedOption && isNotSelectedErrorMessage) {
            const errorMessage = getErrorMessage(errorOutside);
            setErrorMessage(errorMessage);
            return;
        }
    };

    const renderOptions = () => {
        const optionClassName = (option: Option, scrollId?: string) => {
            if (scrollId && option.value === selectedOption?.value) {
                return `item selected id-${scrollId}`;
            }
            if (selectedOption?.value === option.value) return 'item selected';
            return 'item';
        };

        if (filteredOptions.length === 0)
            return (
                <ul ref={refDropList} className="options">
                    <li className="no-options">No options found</li>
                </ul>
            );

        if (isGrouped) {
            const groupedOptions = filteredOptions.reduce((acc, option) => {
                if (!option.group) return acc;
                const firstLetter = option.group;
                if (!acc[firstLetter]) {
                    acc[firstLetter] = [];
                }
                acc[firstLetter].push(option);
                return acc;
            }, {} as { [key: string]: Option[] });

            const renderGroupedOptions = (option: Option) => (
                <li
                    className={`group-item ${optionClassName(
                        option,
                        scrollId,
                    )}`}
                    key={option.value}
                    onClick={() => {
                        handleOptionClick(option);
                    }}
                >
                    {option.label}
                </li>
            );

            return (
                <div className="options grouped">
                    {Object.keys(groupedOptions).map(groupName => (
                        <div key={groupName} className="group">
                            <h3 className="group-name">{groupName}</h3>
                            <ul ref={refDropList} className="group-list">
                                {groupedOptions[groupName].map(
                                    renderGroupedOptions,
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <ul ref={refDropList} className="options">
                {filteredOptions.map(option => (
                    <li
                        key={option.value}
                        className={optionClassName(option, scrollId)}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        );
    };

    const renderErrorMessage = (message?: string) => {
        if (!message) return null;
        if (message === 'empty') return null;

        return <div className="error">* {message}</div>;
    };

    const getPlaceholder = () => {
        if (placeholder) return placeholder;
        if (isSearchable) return 'Search...';

        return 'Select...';
    };

    return (
        <StyledDropDown
            small={small}
            isDefaultView={isDefaultView}
            isGrouped={isGrouped}
            isShow={isShow}
            isError={!!errorMessage || !!errorOutside}
            isSearchable={isSearchable}
            ref={dropdownRef}
            className={getClasses('dropdown', className)}
            onClick={toggleList}
            data-testid="dropdown"
        >
            <div className="input-wrapper">
                <input
                    className="dropdown-input"
                    type="text"
                    placeholder={getPlaceholder()}
                    onChange={handleInputChange}
                    value={query}
                    readOnly={!isSearchable}
                    onBlur={() => handleValidation(query)}
                />
                <ChevronSmallIcon className="chevron" />
                {renderErrorMessage(errorMessage || errorOutside)}
            </div>
            {isShow && renderOptions()}
        </StyledDropDown>
    );
};
