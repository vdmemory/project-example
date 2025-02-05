import { StyledErrorMessage } from './ErrorMessage.styled';
import React from 'react';

interface ErrorMessageProps {
    children: string | undefined;
    className?: string;
}
export const ErrorMessage = ({ children, className }: ErrorMessageProps) => (
    <StyledErrorMessage className={className}>{children}</StyledErrorMessage>
);
export default ErrorMessage;
