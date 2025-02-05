import { render, fireEvent, screen } from '@testing-library/react';
import FieldInput from './FieldInput';
import { TypeFieldNames } from '@breef/shared/constants';

describe('FieldInput component', () => {
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const handleSetValue = jest.fn();

    beforeEach(() => {
        handleChange.mockClear();
        handleClick.mockClear();
        handleSetValue.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders input field with default props', () => {
        render(
            <FieldInput
                setValue={handleSetValue}
                onChange={handleChange}
                onClick={handleClick}
                isDisableNextBtn
                placeholder="placeholder"
            />,
        );
        const inputElement = screen.getByTestId('field-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('placeholder', 'placeholder');
        expect(inputElement).not.toHaveAttribute('disabled');
    });

    it('handles input change correctly', () => {
        render(
            <FieldInput
                setValue={handleSetValue}
                onChange={handleChange}
                onClick={handleClick}
                isDisableNextBtn
            />,
        );
        const inputElement = screen.getByTestId(
            'field-input',
        ) as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'test value' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('renders password input with eye icon when onEyeIcon is true', () => {
        const { baseElement } = render(
            <FieldInput
                setValue={handleSetValue}
                onChange={handleChange}
                onClick={handleClick}
                isDisableNextBtn
                typeInput={TypeFieldNames.PASSWORD}
                onEyeIcon
            />,
        );
        const passwordIcon = baseElement.querySelector('.password-icon');
        expect(passwordIcon).toBeInTheDocument();
    });

    it('toggles password visibility when eye icon is clicked', () => {
        const { baseElement } = render(
            <FieldInput
                setValue={handleSetValue}
                onChange={handleChange}
                onClick={handleClick}
                isDisableNextBtn
                typeInput={TypeFieldNames.PASSWORD}
                onEyeIcon
            />,
        );
        const passwordIcon = baseElement.querySelector(
            '.password-icon',
        ) as HTMLElement;
        const inputElement = screen.getByTestId('field-input');
        expect(inputElement).toHaveAttribute('type', 'password');
        fireEvent.click(passwordIcon);
        expect(inputElement).toHaveAttribute('type', 'text');
    });

    it('renders phone-input when type prop is provided', () => {
        const { baseElement } = render(
            <FieldInput
                setValue={handleSetValue}
                onChange={handleChange}
                onClick={handleClick}
                isDisableNextBtn
                typeInput={'phone'}
                onEyeIcon
            />,
        );

        const phoneElement = baseElement.querySelector(
            '.phone-input',
        ) as HTMLInputElement;
        expect(phoneElement).toBeInTheDocument();

        const phoneInputElement = baseElement.querySelector(
            '#field-phone-number',
        ) as HTMLInputElement;
        expect(phoneInputElement).toBeInTheDocument();
        fireEvent.change(phoneInputElement, {
            target: { value: '1234567890' },
        });
        expect(handleChange).toHaveBeenCalledTimes(2);
    });
});
