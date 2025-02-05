import React from 'react';
import { ReactCountryFlag } from 'react-country-flag';
import { StyledCountryWithPhoneCode } from './CountryWithPhoneCode.styled';

export interface CountryWithPhoneCodeProps {
    name: string;
    country: string;
    code: string;
}

export function CountryWithPhoneCode({
    name,
    country,
    code,
}: CountryWithPhoneCodeProps) {
    return (
        <StyledCountryWithPhoneCode>
            <div className="country-info">
                <ReactCountryFlag
                    className="emoji"
                    countryCode={country}
                    aria-label={name}
                    svg
                />
                <span className="country-name">{name}</span>
            </div>
            <span>{code}</span>
        </StyledCountryWithPhoneCode>
    );
}
