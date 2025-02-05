import { render } from '@testing-library/react';
import SelectPaymentType from './SelectPaymentType';

const handleChange = jest.fn();
const props = {
    value: '',
    onChange: handleChange,
};

describe('SelectPaymentType', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SelectPaymentType {...props} />);
        expect(baseElement).toBeTruthy();
    });
});
