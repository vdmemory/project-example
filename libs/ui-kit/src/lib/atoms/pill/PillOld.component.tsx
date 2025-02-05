import { FC } from 'react';
import { CloseSmallIcon } from '../../icons';
import { PlusIconSmall } from '@breef/shared/assets';
import { StyledPillOld } from './PillOld.styled';

export type IconSide = 'left' | 'right' | 'both' | 'none';
export type InputType = 'button' | 'checkbox' | 'radio';
export interface PillProps {
    label: string;
    name?: string;
    iconSide?: IconSide;
    onChange?: () => void;
    onClick?: () => void;
    disabled?: boolean;
    checked?: boolean;
    type?: InputType;
    isUppercase?: boolean;
    isStatic?: boolean;
    iconType?: 'remove' | 'add';
    tooltip?: string;
}
export const PillOld: FC<PillProps> = ({
    label,
    iconSide = 'none',
    isUppercase = false,
    type = 'button',
    isStatic = false,
    iconType = 'remove',
    tooltip,
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
        <StyledPillOld
            className="pill"
            isUppercase={isUppercase}
            type={type}
            isStatic={isStatic}
            title={tooltip}
            isChecked={!!rest.checked}
            isDisabled={!!rest.disabled}
        >
            <input {...rest} type={type} />
            {isLeftIcon && getIcon(true)}
            {label}
            {isRightIcon && getIcon(false)}
        </StyledPillOld>
    );
};

export default PillOld;
