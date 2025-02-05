import { RefObject, useEffect, useRef, useState } from 'react';
import { ChevronSmallIcon } from '../../icons/svg';
import { StyledDropdown } from './Dropdown.styled';
import { useOnClickOutside } from '@breef/shared/hooks';
import List from '../list/List.component';
import ListItem from '../listItem/ListItem.component';
import Input from '../input/Input.component';
import { checkIsElemOverflowsOnElement } from '@breef/shared/utils';

type Option = {
    value: string;
    label: string;
};

interface DropdownProps {
    onSelect: (selectedOption: Option) => void;
    option?: Option;
    options: Option[];
    error?: string;
    isSearchable?: boolean;
    isSelectable?: boolean;
    isSearchIcon?: boolean;
    placeholder?: string;
    onBlur?: () => void;
    onChange?: (value: string) => void;
    disabled?: boolean;
    onValidate?: (query: string) => void;
}

export const QueryValidateDropDown = ({
    option,
    onSelect,
    options,
    error,
    isSearchable,
    isSelectable = true,
    onValidate,
    isSearchIcon,
    placeholder,
    onBlur,
    onChange,
    disabled,
}: DropdownProps) => {
    const refDropList = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef(null);
    const [query, setQuery] = useState<string>(option?.label ?? '');
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isOverflowsPage, setIsOverflowsPage] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

    useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () => {
        setIsShow(false);
        setFilteredOptions(options);
    });

    const toggleList = () => {
        if (isSearchable && isShow) return;
        setIsShow(prev => !prev);
    };

    const handleOptionClick = (option: Option) => {
        setIsShow(false);
        setQuery(isSelectable ? option.label : '');
        onSelect(option);
        onBlur?.();
        setFilteredOptions(options);
    };

    const handleBlur = () => {
        onBlur?.();
    };

    const handleChange = (value: string) => {
        onChange?.(value);
        setQuery(value);
        onValidate?.(value);

        setFilteredOptions(
            options.filter(({ label }) =>
                label.toLowerCase().includes(value.toLowerCase()),
            ),
        );
    };

    useEffect(() => {
        if (refDropList.current && !isOverflowsPage) {
            setIsOverflowsPage(checkIsElemOverflowsOnElement(refDropList));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredOptions, isShow]);

    const renderOptions = () => {
        if (filteredOptions.length === 0) {
            return <ListItem>No options found</ListItem>;
        }

        return filteredOptions.map(option => (
            <ListItem
                key={option.value}
                onClick={() => handleOptionClick(option)}
            >
                {option.label}
            </ListItem>
        ));
    };

    return (
        <StyledDropdown
            isShow={isShow}
            isError={!!error}
            isSearchable={isSearchable}
            ref={dropdownRef}
            className="dropdown"
            onClick={!disabled ? toggleList : undefined}
            data-testid="dropdown"
            isOverflowsPage={isOverflowsPage}
            disabled={disabled}
        >
            <div className="input-wrapper">
                <Input
                    onChange={handleChange}
                    value={query}
                    readOnly={!isSearchable}
                    error={error}
                    onBlur={handleBlur}
                    isSearchIcon={isSearchIcon}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <ChevronSmallIcon className="chevron" />
            </div>
            <div className="dropdown-list-wrapper" ref={refDropList}>
                {isShow && <List>{renderOptions()}</List>}
            </div>
        </StyledDropdown>
    );
};
