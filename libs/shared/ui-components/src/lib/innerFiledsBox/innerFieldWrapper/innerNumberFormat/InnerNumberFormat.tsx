import NumberFormat from 'react-number-format';
import { StyledInnerNumberFormat } from './InnerNumberFormat.styled';
import { ChangeHandler } from 'react-hook-form';
interface DefaultInputProps {
    value: number | null;
    onChange?: ChangeHandler;
    placeholder?: string;
    maxLength?: number;
    isReadOnly?: boolean;
}

export const InnerNumberFormat = ({
    value,
    onChange,
    placeholder,
    maxLength = 16,
    isReadOnly = false,
}: DefaultInputProps) => {
    return (
        <StyledInnerNumberFormat>
            <NumberFormat
                prefix="$"
                allowNegative={false}
                defaultValue={''}
                value={value || ''}
                onValueChange={values => {
                    const { floatValue } = values;
                    onChange &&
                        onChange({
                            target: { value: floatValue || null },
                        });
                }}
                placeholder={placeholder}
                thousandSeparator={true}
                fixedDecimalScale={true}
                decimalScale={2}
                allowEmptyFormatting={false}
                allowLeadingZeros={false}
                maxLength={maxLength}
                readOnly={isReadOnly}
            />
        </StyledInnerNumberFormat>
    );
};

export default InnerNumberFormat;
