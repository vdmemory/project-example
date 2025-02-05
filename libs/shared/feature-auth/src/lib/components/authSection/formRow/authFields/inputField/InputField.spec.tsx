import { fireEvent, render } from '@testing-library/react';
import { InputField } from './InputField';
import { TypeFieldNames } from '@breef/shared/constants';

const onChange = jest.fn();
const props = {
    name: 'Test Name',
    onChange,
    value: 'Test Value',
};

describe('InputField', () => {
    it('should render successfully', () => {
        const { baseElement, getByDisplayValue } = render(
            <InputField {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByDisplayValue('Test Value')).toBeInTheDocument();
    });
    it('should render with error successfully', () => {
        const { getByText } = render(
            <InputField {...props} error="Test Error" />,
        );
        expect(getByText('Test Error')).toBeInTheDocument();
    });
    it('should render with warning successfully', () => {
        const { getByText } = render(
            <InputField {...props} warning="Test Warning" />,
        );
        expect(getByText('Test Warning')).toBeInTheDocument();
        expect(document.querySelector('.warning-icon')).toBeInTheDocument();
    });
    it('should render password input successfully', () => {
        render(<InputField {...props} type={TypeFieldNames.PASSWORD} />);
        expect(document.querySelector('.password-icon')).toBeInTheDocument();
    });
    it('should call onChange successfully', () => {
        const { getByDisplayValue } = render(<InputField {...props} />);
        const input = getByDisplayValue('Test Value');
        fireEvent.change(input, { target: { value: 'Test Custom Value' } });
        expect(onChange).toBeCalledWith('Test Custom Value');
    });
});
