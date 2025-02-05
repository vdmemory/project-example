import { StyledButton } from './Button.styled';
import { ScrollNavIcon } from '@breef/shared/assets';
import React, { ReactNode } from 'react';
import TextLoader from '../loader/text-loader/TextLoader';
import Spinner from '../spinner/Spinner';

export interface ButtonProps {
    type?: 'submit' | 'button';
    title?: string;
    subtitle?: string;
    onClick?: (e: React.SyntheticEvent) => void;
    className?:
        | 'big'
        | 'normal'
        | 'medium'
        | 'small-accent'
        | 'only-icon'
        | 'button-logout'
        | string;
    border?: 'all' | 'none';
    color?: 'primary' | 'secondary' | 'transparent';
    disabled?: boolean;
    isDisabledWithActiveText?: boolean;
    arrowRight?: boolean;
    arrowLeft?: boolean;
    children?: ReactNode;
    isSubmitting?: boolean;
    iconButton?: ReactNode;
    withAnimate?: boolean;
    isLoading?: boolean;
}

export const Button = ({
    type = 'button',
    onClick,
    title,
    subtitle,
    className,
    color = 'primary',
    disabled = false,
    isDisabledWithActiveText = false,
    arrowLeft = false,
    arrowRight = false,
    border = 'none',
    children,
    isSubmitting = false,
    iconButton,
    withAnimate = false,
    isLoading = false,
}: ButtonProps) => {
    const getIconButton = (classNameBtn: string) =>
        iconButton ? (
            iconButton
        ) : (
            <ScrollNavIcon
                className={classNameBtn ? `${classNameBtn} arrow` : 'arrow'}
            />
        );
    return (
        <StyledButton
            data-testid="custom-button"
            className={className}
            isSubtitle={!!subtitle}
            color={color}
            type={type}
            onClick={onClick}
            disabled={disabled || isSubmitting}
            isDisabledWithActiveText={isDisabledWithActiveText}
            border={border}
            withAnimate={withAnimate}
        >
            {subtitle && !withAnimate && (
                <span className="subtitle">{subtitle}</span>
            )}
            <div className="main-content">
                {withAnimate ? (
                    <div className="main-content-item">
                        {subtitle && (
                            <span className="subtitle">{subtitle}</span>
                        )}

                        <span className="main-content-text">
                            {' '}
                            {isLoading && <Spinner />}
                            {arrowLeft && !isSubmitting && !isLoading
                                ? getIconButton('arrow-left')
                                : null}
                            {title && isSubmitting && !isLoading && (
                                <TextLoader loadingText={title} />
                            )}
                            {title && !isSubmitting && !isLoading && title}
                            {children && !isLoading && children}
                            {arrowRight && !isLoading && !isSubmitting
                                ? getIconButton('arrow-right')
                                : null}
                        </span>
                    </div>
                ) : (
                    <>
                        {isLoading && <Spinner />}
                        {arrowLeft && !isSubmitting && !isLoading
                            ? getIconButton('arrow-left')
                            : null}
                        {title && isSubmitting && !isLoading && (
                            <TextLoader loadingText={title} />
                        )}
                        {title && !isSubmitting && !isLoading && title}
                        {children && !isLoading && children}
                        {arrowRight && !isLoading && !isSubmitting
                            ? getIconButton('arrow-right')
                            : null}
                    </>
                )}
            </div>
        </StyledButton>
    );
};

export default Button;
