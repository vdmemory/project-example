import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { StyledPhoneNumberInput } from './PhoneNumberInput.styled';
import { ChangeHandler } from 'react-hook-form';
import { CountryWithPhoneCode } from './countryWithPhoneCode/CountryWithPhoneCode';
import CustomDropdown from '../customDropdown/customDropdown/CustomDropdown';
import {
    CountryCode,
    getCountryCallingCode,
    getExampleNumber,
    getCountries,
    parsePhoneNumberWithError,
    ParseError,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import NumberFormat from 'react-number-format';

interface PhoneNumberInputProps {
    className?: string;
    onChange: ChangeHandler;
    placeholder?: string;
    value: string;
    initialCountryCode?: string;
}

export const defaultPhoneNumberObj: PhoneNumberType = {
    number: '',
    code: '',
    numberWithoutCountryCode: '',
};

export type PhoneNumberType = {
    number: string;
    code: string;
    numberWithoutCountryCode: string;
};

export const PhoneNumberInput = ({
    className,
    value,
    onChange,
    placeholder = 'Phone number',
    initialCountryCode,
}: PhoneNumberInputProps) => {
    const onChangeRef = useRef(onChange);
    const defaultCountryCode = '+1';
    const [isParsedPhoneNumber, setIsParsedPhoneNumber] = useState(false);
    const [code, setCode] = useState(initialCountryCode || defaultCountryCode);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [numberMask, setNumberMask] = useState('###-###-####');
    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    useEffect(() => {
        if (!isParsedPhoneNumber) {
            try {
                const parsedPhoneNumber = parsePhoneNumberWithError(value);
                const countryCallingCode =
                    '+' + parsedPhoneNumber.countryCallingCode;
                setCode(countryCallingCode);
                setPhoneNumber(
                    parsedPhoneNumber.number.replace(countryCallingCode, ''),
                );
                setIsParsedPhoneNumber(true);
            } catch (error) {
                if (!(error instanceof ParseError)) {
                    throw error;
                }
            }
        }
    }, [/*code,*/ isParsedPhoneNumber, value]);

    useEffect(() => {
        if (!value) {
            setPhoneNumber('');
        }
    }, [code, value]);

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const listCountries = getCountries()
        .map(item => ({
            country: item,
            name: regionNames.of(item) || '',
            phone: getCountryCallingCode(item),
        }))
        .sort((a, b) => (a.name > b.name ? 1 : -1));

    useEffect(() => {
        onChangeRef.current({
            target: {
                value: {
                    number: code + phoneNumber,
                    numberWithoutCountryCode: phoneNumber,
                    code: code,
                },
            },
        });
    }, [code, phoneNumber]);

    useEffect(() => {
        const currentCountryObj = listCountries.find(
            item => '+' + item.phone === code,
        );
        const examplePhoneNumberObj = getExampleNumber(
            (currentCountryObj?.country || 'US') as CountryCode,
            examples,
        );
        const examplePhoneNumberInternational =
            examplePhoneNumberObj?.formatInternational();
        const exampleNumberCountryCode =
            '+' + examplePhoneNumberObj?.countryCallingCode;
        const mask =
            examplePhoneNumberInternational
                ?.replace(exampleNumberCountryCode, '')
                .trim()
                .replace(/\d/g, '#')
                .replace(/ /g, '-') || '###-###-####';
        const digitsLength = mask.replace('-', '').length;
        const formattedMask = `${mask}${
            digitsLength < 15 ? '#'.repeat(15 - digitsLength) : ''
        }`;
        setNumberMask(formattedMask);
    }, [code, listCountries]);

    const onStopPropagation = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            return e.preventDefault();
        }
    };
    return (
        <StyledPhoneNumberInput className={className}>
            <CustomDropdown
                placeholder={placeholder}
                onChange={handleChangeCode as ChangeHandler}
                value={code}
                dropdownList={listCountries.map(item => ({
                    value: '+' + item.phone,
                    label: '+' + item.phone,
                    component: (
                        <CountryWithPhoneCode
                            name={item.name || ''}
                            country={item.country}
                            code={'+' + item.phone}
                        />
                    ),
                }))}
            />
            <NumberFormat
                id={'field-phone-number'}
                format={numberMask}
                mask=" "
                value={phoneNumber}
                placeholder={placeholder}
                autoComplete="off"
                onValueChange={values => {
                    setPhoneNumber(values.value);
                }}
                onKeyDown={onStopPropagation}
            />
        </StyledPhoneNumberInput>
    );
};

export default PhoneNumberInput;
