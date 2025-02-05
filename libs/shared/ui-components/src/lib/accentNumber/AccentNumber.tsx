import { StyledAccentNumber } from './AccentNumber.styled';

export function AccentNumber({
    number,
    isOptional,
}: {
    number: number;
    isOptional?: boolean;
}) {
    const transformToAccentFormat = (number: number) => {
        const value = String(number);
        return '0'.repeat(3 - value.length) + value;
    };
    return (
        <StyledAccentNumber className="accent-number">
            <span className="round" />
            <span className="number">
                {transformToAccentFormat(number)}
                {isOptional && ' (optional)'}
            </span>
        </StyledAccentNumber>
    );
}
