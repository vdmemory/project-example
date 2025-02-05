import { FC, useEffect, useRef, useState } from 'react';
import List from '../list/List.component';
import { StyledSelect } from './Select.styled';
import ListItem from '../listItem/ListItem.component';
import { ChevronSmallIcon } from '../../icons';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Label } from '../label/Label.component';
import { checkIsElemOverflowsOnElement } from '@breef/shared/utils';
import Input from '../input/Input.component';

type ListItem = { value: string; label: string };

export interface SelectProps {
    id?: string;
    labelId?: string;
    label?: string;
    value?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    list: ListItem[];
    error?: string;
    isOptional?: boolean;
    disabled?: boolean;
    isSearchable?: boolean;
    isSearchIcon?: boolean;
    className?: string;
}
export const Select: FC<SelectProps> = ({
    label,
    labelId,
    value,
    onChange,
    list,
    isOptional = false,
    isSearchable = false,
    className,
    onBlur,
    ...rest
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [isOverflowsPage, setIsOverflowsPage] = useState(false);
    const getValueView = (value?: string): string => {
        return list.find(item => item.value === value)?.label ?? '';
    };
    const valueView = getValueView(value);
    const [searchValue, setSearchValue] = useState(valueView);
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const refSelect = useOnclickOutside(() => {
        if (isOpen) {
            onBlur?.();
        }
        close();
    });

    const searchCriteria = (item: ListItem) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase());
    const filteredList = isSearchable ? list.filter(searchCriteria) : list;
    const onSelect = (value: string) => {
        onChange(value);
        setSearchValue(getValueView(value));
        onBlur?.();
        close();
    };

    useEffect(() => {
        if (listRef.current && !isOverflowsPage) {
            setIsOverflowsPage(checkIsElemOverflowsOnElement(listRef));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredList.length, isOpen]);

    const renderListItem = (item: ListItem) => (
        <ListItem key={item.value} onClick={() => onSelect(item.value)}>
            {item.label}
        </ListItem>
    );

    return (
        <StyledSelect
            ref={refSelect}
            isOpen={isOpen}
            isDisabled={rest.disabled}
            isSearchable={isSearchable}
            isOverflowsPage={isOverflowsPage}
            className={className}
        >
            {label && (
                <Label
                    id={labelId}
                    forId={rest.id}
                    isDisabled={rest.disabled}
                    text={label}
                    isOptional={isOptional}
                />
            )}
            <div className="input-wrapper" ref={wrapperRef}>
                <Input
                    {...rest}
                    value={searchValue}
                    onChange={setSearchValue}
                    onFocus={() => isSearchable && setIsOpen(true)}
                    onCLick={() => !isSearchable && setIsOpen(!isOpen)}
                    readOnly={!isSearchable}
                    isScrollIntoViewOnFocus={false}
                >
                    <ChevronSmallIcon
                        className="drop-arrow"
                        data-testid="drop-arrow"
                    />
                </Input>
                <div ref={listRef} className="dropdown-list-wrapper">
                    {isOpen && filteredList.length !== 0 && (
                        <List className="dropdown-list">
                            {filteredList.map(renderListItem)}
                        </List>
                    )}
                </div>
            </div>
        </StyledSelect>
    );
};

export default Select;
