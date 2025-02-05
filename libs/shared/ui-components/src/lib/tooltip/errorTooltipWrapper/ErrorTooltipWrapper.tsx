import styled from '@emotion/styled';
import Tooltip from '../Tooltip';
import { Placement } from '@floating-ui/react-dom-interactions';

interface StyledErrorProps {
    left: string;
    top: string;
    flex: number;
}

export const StyledErrorTooltipWrapper = styled.div`
    position: relative;
    flex: ${({ flex }: StyledErrorProps) => flex};
    display: flex;

    .error {
        position: absolute;
        top: ${({ top }: StyledErrorProps) => `${top}px`};
        left: ${({ left }: StyledErrorProps) => `${left}px`};
    }
`;

export interface ErrorTooltipWrapperProps {
    tooltipOffset?: number;
    placement?: Placement;
    className?: string;
    left?: string;
    top?: string;
    flex?: number;
    errorMessage?: string;
    children: React.ReactNode;
}

export const ErrorTooltipWrapper = ({
    left = '0',
    top = '0',
    flex = 1,
    errorMessage,
    tooltipOffset = 14,
    placement = 'right',
    className,
    children,
}: ErrorTooltipWrapperProps) => {
    return (
        <StyledErrorTooltipWrapper
            left={left}
            top={top}
            flex={flex}
            className="error-tooltip-wrapper"
        >
            {children}
            {errorMessage ? (
                <Tooltip
                    className={className ? `tooltip ${className}` : 'tooltip'}
                    isError
                    placement={placement}
                    label={errorMessage}
                    offsetCustom={tooltipOffset}
                >
                    <div className="error"></div>
                </Tooltip>
            ) : null}
        </StyledErrorTooltipWrapper>
    );
};

export default ErrorTooltipWrapper;
