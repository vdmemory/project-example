import styled from '@emotion/styled';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Tooltip } from '@breef/shared/ui-components';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

export const StyledLabelField = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;

    .label-container {
        margin-bottom: 8px;

        .label-text {
            font-size: 14px;
            line-height: 16.02px;
            letter-spacing: 0;
            text-align: left;
            color: rgba(47, 57, 65, 1);
            font-weight: bolder;
        }
    }
`;

interface LabelFieldProps {
    className?: string;
    label?: string;
    error?: string;
    children?: React.ReactNode;
    tooltipOffset?: number;
    isStatic?: boolean;
}

export const LabelField = ({
    className,
    label,
    error,
    children,
    tooltipOffset = 14,
    isStatic,
}: LabelFieldProps) => {
    return (
        <StyledLabelField className={`label-field ${className ?? ''}`}>
            <div className="label-container">
                {error ? (
                    <Tooltip
                        className="tooltip"
                        isError
                        placement="right"
                        label={error}
                        offsetCustom={tooltipOffset}
                    >
                        <span className="label-text">{label}&nbsp;</span>
                    </Tooltip>
                ) : (
                    <span className="label-text">{label}&nbsp;</span>
                )}
            </div>
            <div>{children}</div>
        </StyledLabelField>
    );
};
