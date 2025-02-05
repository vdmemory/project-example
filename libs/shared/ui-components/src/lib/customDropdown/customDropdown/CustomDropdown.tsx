import {
    ChangeEvent,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { StyledCustomDropdown } from './CustomDropdown.styled';
import { ChevronSmallIcon } from '@breef/shared/assets';
import {
    useMediaContext,
    useOnClickOutside,
    useWindowSize,
} from '@breef/shared/hooks';
import { ChangeHandler } from 'react-hook-form';
import { checkIsElemOverflowsOnElement } from '@breef/shared/utils';
import { Dots } from '../../dots/Dots';
import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';

export interface CustomDropdownProps {
    onChange?: ChangeHandler;
    placeholder?: string;
    dropdownList: { value: string; label: string; component?: ReactNode }[];
    value: string;
    parentRef?: RefObject<HTMLElement>;
    customChange?: (value: string) => void;
    isAction?: boolean;
    type?: 'dropdown' | 'header-menu';
    itemsListViewType?: 'small';
    dropdownButtonView?: 'dots';
    isDownList?: boolean;
    isDisabled?: boolean;
}

export default function CustomDropdown({
    placeholder = '',
    onChange,
    dropdownList,
    value,
    parentRef,
    customChange,
    isAction = true,
    type = 'dropdown',
    itemsListViewType,
    dropdownButtonView,
    isDownList,
    isDisabled = false,
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropListRef = useRef<HTMLUListElement>(null);

    const windowWidth = useWindowSize();
    const { isMobile } = useMediaContext();

    const toggleDropdown = useCallback(() => {
        !isDisabled && setIsOpen(!isOpen);
    }, [isOpen, isDisabled]);

    useOnClickOutside(
        parentRef || (dropdownRef as RefObject<HTMLElement>),
        () => setIsOpen(false),
    );
    useEffect(() => {
        if (
            IS_CLIENT_PLATFORM &&
            type === 'header-menu' &&
            isOpen &&
            isMobile
        ) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.removeProperty('overflow-y');
        }
    }, [isOpen, type, isMobile]);

    useEffect(() => {
        if (parentRef?.current && customChange && !isAction) {
            parentRef.current.onclick = () => customChange('');
        } else if (parentRef?.current && !isAction) {
            parentRef.current.onclick = () => undefined;
        } else if (parentRef?.current && isAction) {
            parentRef.current.onclick = () => toggleDropdown();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentRef, toggleDropdown]);

    const selectItem = (e: unknown) => {
        const typedEvent = e as ChangeEvent<HTMLElement>;
        onChange &&
            onChange({
                target: { value: typedEvent.target.getAttribute('value') },
            });

        if (!parentRef) {
            toggleDropdown();
        }
    };

    const handleChange = (e: unknown, value?: string) => {
        if (customChange && value && isAction) {
            customChange(value);
            setIsOpen(false);
        } else {
            selectItem(e);
        }
    };

    useEffect(() => {
        if (dropListRef.current) {
            if (
                checkIsElemOverflowsOnElement(dropListRef, 'footer') &&
                !isDownList
            ) {
                dropListRef.current.style.bottom = '100%';
                dropListRef.current.style.top = 'auto';
                dropListRef.current.style.borderTop = '1px solid black';
            } else {
                dropListRef.current.style.bottom = 'auto';
                dropListRef.current.style.top = '100%';
                dropListRef.current.style.borderTop = 'none';
            }
        }
    });

    const renderDropButton = () => {
        switch (dropdownButtonView) {
            case 'dots':
                return <Dots className="button-dots" />;
            default:
                return (
                    <>
                        {value ? (
                            <span className="drop-value">
                                {dropdownList.find(
                                    item =>
                                        item.value.toString() ===
                                            value.toString() ||
                                        item.label.toString() ===
                                            value.toString(),
                                )?.label || value}
                            </span>
                        ) : (
                            <span className="drop-placeholder">
                                {placeholder}
                            </span>
                        )}
                        <ChevronSmallIcon
                            className={
                                !isAction
                                    ? 'dropdown-icon-hide'
                                    : 'dropdown-icon'
                            }
                        />
                    </>
                );
        }
    };

    return (
        <StyledCustomDropdown
            ref={dropdownRef}
            isOpen={isOpen}
            isParentRef={!!parentRef}
            className="custom-dropdown"
            isAction={isAction}
            width={windowWidth.width}
            itemsListViewType={itemsListViewType}
            isDisabled={isDisabled}
        >
            {type === 'dropdown' ? (
                <div
                    className="drop-button"
                    onClick={
                        !parentRef && isAction ? toggleDropdown : () => null
                    }
                >
                    {renderDropButton()}
                </div>
            ) : (
                <div
                    className="drop-button"
                    onClick={
                        !parentRef && isAction ? toggleDropdown : () => null
                    }
                >
                    <Dots className="button-dots" />
                </div>
            )}
            <div
                className={
                    isMobile && isOpen && type === 'header-menu'
                        ? 'drop-list-wrapper'
                        : ''
                }
            >
                <ul
                    className={
                        type !== 'dropdown'
                            ? 'drop-list drop-list-header'
                            : 'drop-list'
                    }
                    ref={dropListRef}
                >
                    {dropdownList.map((item, key) => (
                        <li
                            onClick={e => handleChange(e, item.value || '')}
                            className={
                                item.value === 'logout'
                                    ? 'list-item list-item-logout'
                                    : 'list-item'
                            }
                            key={key}
                            value={item.value}
                        >
                            {item.component || item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </StyledCustomDropdown>
    );
}
