import Link from 'next/link';
import { linksByErrorsKeyPhrases } from '@breef/shared/utils';
import { StyledFieldError } from './FieldError.styled';

export interface FieldErrorProps {
    error: string;
    warning?: boolean;
    className?: string;
}

export function FieldError({ error, warning, className }: FieldErrorProps) {
    const errorKeyPhrase = findErrorKeyPhrase(error);
    const errorFieldProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        warning,
        className: className ? `${className} field-error` : 'field-error',
    };

    if (errorKeyPhrase) {
        const { keyPhrase, link } = errorKeyPhrase;
        const [startOfMessage, endOfMessage] = error.split(
            new RegExp(keyPhrase, 'i'),
        );
        const linkedPhrase = error
            .replace(startOfMessage, '')
            .replace(endOfMessage, '');

        return (
            <StyledFieldError {...errorFieldProps}>
                {startOfMessage}
                <Link href={link}>{linkedPhrase}</Link>
                {endOfMessage}
            </StyledFieldError>
        );
    }
    return (
        <StyledFieldError {...errorFieldProps} warning={warning}>
            {error}
        </StyledFieldError>
    );
}

function findErrorKeyPhrase(error: string) {
    return linksByErrorsKeyPhrases.find(({ keyPhrase }) =>
        error.toLowerCase().includes(keyPhrase.toLowerCase()),
    );
}
