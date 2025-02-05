import { useEffect } from 'react';

interface UseLimitSymbolsProps {
    value?: string;
    onChange: (value: string) => void;
    maxLength?: number;
}
export const useLimitSymbols = ({
    value,
    onChange,
    maxLength,
}: UseLimitSymbolsProps) => {
    useEffect(() => {
        if (maxLength && value && value.length > maxLength) {
            onChange(value.slice(0, maxLength));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
};
