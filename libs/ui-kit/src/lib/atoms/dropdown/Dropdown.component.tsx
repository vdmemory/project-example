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
    disabled?: boolean;
}

export const Dropdown = ({
    option,
    onSelect,
    options,
    error,
    isSearchable,
    isSelectable = true,
    ...rest
}: DropdownProps) => {
    const refDropList = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef(null);
    const [query, setQuery] = useState<string>(option?.label ?? '');
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isOverflowsPage, setIsOverflowsPage] = useState(false);

    useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () => {
        setIsShow(false);
    });

    const filterOptions = (options: Option[], query: string) => {
        if (!query) return options;

        return options.filter(({ label }) =>
            label.toLowerCase().includes(query.toLowerCase()),
        );
    };
    const filteredOptions = filterOptions(options, query);

    const toggleList = () => {
        if (isSearchable && isShow) return;
        setIsShow(prev => !prev);
    };

    const handleOptionClick = (option: Option) => {
        setIsShow(false);
        setQuery(isSelectable ? option.label : '');
        onSelect(option);
        rest.onBlur?.();
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
            onClick={!rest.disabled ? toggleList : undefined}
            data-testid="dropdown"
            isOverflowsPage={isOverflowsPage}
            disabled={rest.disabled}
        >
            <div className="input-wrapper">
                <Input
                    data-testid="dropdown-input"
                    onChange={setQuery}
                    value={query}
                    readOnly={!isSearchable}
                    error={error}
                    {...rest}
                />
                <ChevronSmallIcon className="chevron" />
            </div>
            <div className="dropdown-list-wrapper" ref={refDropList}>
                {isShow && <List>{renderOptions()}</List>}
            </div>
        </StyledDropdown>
    );
};
