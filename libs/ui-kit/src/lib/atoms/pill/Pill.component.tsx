import { FC } from 'react';
import { StyledPill } from './Pill.styled';
import { CloseSmallIcon } from '../../icons';
import { PlusIconSmall } from '@breef/shared/assets';
import { getClasses } from '@breef/shared/utils';

export type IconSide = 'left' | 'right' | 'both' | 'none';
export type InputType = 'button' | 'checkbox' | 'radio';
export interface PillProps {
    label: string;
    name?: string;
    color?: 'orange';
    iconSide?: IconSide;
    onChange?: () => void;
    onClick?: () => void;
    disabled?: boolean;
    checked?: boolean;
    type?: InputType;
    isUppercase?: boolean;
    isStatic?: boolean;
    isResizeMobile?: boolean;
    isTransparentInitially?: boolean;
    iconType?: 'remove' | 'add';
    tooltip?: string;
    className?: string;
}
export const Pill: FC<PillProps> = ({
    label,
    iconSide = 'none',
    color,
    isUppercase = false,
    type = 'button',
    isStatic = false,
    isResizeMobile = true,
    isTransparentInitially = false,
    iconType = 'remove',
    tooltip,
    className = '',
    ...rest
}) => {
    const isLeftIcon = iconSide === 'left' || iconSide === 'both';
    const isRightIcon = iconSide === 'right' || iconSide === 'both';

    const getIcon = (isLeftSide: boolean) => {
        const testId = isLeftSide ? 'left-icon' : 'right-icon';
        if (iconType === 'remove') {
            return (
                <CloseSmallIcon data-testid={testId} className="close-icon" />
            );
        }
        return <PlusIconSmall data-testid={testId} className="plus-icon" />;
    };

    return (
        <StyledPill
            className={getClasses('pill', [className])}
            isUppercase={isUppercase}
            type={type}
            isStatic={isStatic}
            title={tooltip}
            color={color}
            isResizeMobile={isResizeMobile}
            isLeftIcon={isLeftIcon}
            isRightIcon={isRightIcon}
            isTransparentInitially={isTransparentInitially}
            isChecked={!!rest.checked}
            isDisabled={!!rest.disabled}
        >
            <input {...rest} type={type} />
            {isLeftIcon && getIcon(true)}
            {label && <span>{label}</span>}
            {isRightIcon && getIcon(false)}
        </StyledPill>
    );
};

export default Pill;
