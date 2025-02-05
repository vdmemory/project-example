import { render, screen } from '@testing-library/react';
import PhoneNumberInput from './PhoneNumberInput';

const code = '380';
const onChange = jest.fn();
const props = {
    value: '95',
    onChange,
    initialCountryCode: code,
};

describe('PhoneNumberInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PhoneNumberInput {...props} />);
        expect(baseElement).toBeTruthy();
        const countryCodeElem = screen.getByText(code);
        expect(countryCodeElem).toBeTruthy();
    });
});
