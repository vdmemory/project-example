import { StyledLabel } from './Label.styled';

interface LabelProps {
    label?: string;
    children: React.ReactNode;
    hasInputWrapper?: boolean;
    error?: string;
    isFocus?: boolean;
    isReadonly?: boolean;
    isHideErrorMessage?: boolean;
    isRedesign?: boolean;
}

export const Label = ({
    label,
    children,
    hasInputWrapper,
    error,
    isFocus,
    isReadonly,
    isHideErrorMessage = false,
    isRedesign = false,
    ...rest
}: LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <StyledLabel
            hasInputWrapper={hasInputWrapper}
            isError={!!error}
            isFocus={isFocus}
            isReadonly={isReadonly}
            isRedesign={isRedesign}
            className={rest.className}
        >
            {label && (
                <label {...rest} className="label">
                    {label}
                </label>
            )}
            <form className="wrapper">{children}</form>
            {error && !isHideErrorMessage && (
                <div className="error">{error}</div>
            )}
        </StyledLabel>
    );
};
