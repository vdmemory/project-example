import { render } from '@testing-library/react';
import { CountryWithPhoneCode } from './CountryWithPhoneCode';

const props = {
    name: 'Ukraine',
    country: 'UA',
    code: '380',
};

describe('CountryWithPhoneCode', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CountryWithPhoneCode {...props} />);
        expect(baseElement).toBeTruthy();
    });
});
