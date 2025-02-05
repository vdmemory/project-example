import { ReactNode } from 'react';
import Tooltip from '../../tooltip/Tooltip';
import { StyledAccessDeniedButton } from './AccessDeniedButton.styled';

export const AccessDeniedButton = ({
    message,
    children,
    placement = 'top',
    className,
}: {
    message: string;
    children: ReactNode;
    placement?: 'top' | 'left' | 'right';
    className?: string;
}) => {
    const classNameForButton = className
        ? `access-denied-wrapper ${className}`
        : 'access-denied-wrapper';

    return (
        <StyledAccessDeniedButton
            className={classNameForButton}
            placement={placement}
        >
            <Tooltip className="tooltip" placement={placement} label={message}>
                <div className="inner-toolkit">{children}</div>
            </Tooltip>
        </StyledAccessDeniedButton>
    );
};
