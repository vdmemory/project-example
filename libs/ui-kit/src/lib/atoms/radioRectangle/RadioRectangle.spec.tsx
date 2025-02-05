import { render, fireEvent } from '@testing-library/react';
import { RadioRectangle } from './RadioRectangle.component';

describe('RadioRectangle', () => {
    const handleChange = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders RadioRectangle component correctly', () => {
        const { getByTestId, getByText, baseElement } = render(
            <RadioRectangle
                label="Option 1"
                value="option1"
                onChange={handleChange}
                checked={false}
            />,
        );

        const radioRectangle = getByTestId('radio-rectangle');
        const radioInput = radioRectangle.querySelector('input[type="radio"]');
        const radioLabel = getByText('Option 1');
        const checkboxIcon = baseElement.querySelector('.radio-icon');

        expect(checkboxIcon).toBeInTheDocument();
        expect(radioRectangle).toBeInTheDocument();
        expect(radioInput).toBeInTheDocument();
        expect(radioLabel).toBeInTheDocument();
    });

    it('calls onChange handler when radio is clicked', () => {
        const { getByTestId } = render(
            <RadioRectangle
                label="Option 1"
                value="option1"
                onChange={handleChange}
                checked={false}
            />,
        );

        const radioRectangle = getByTestId('radio-rectangle');
        const radioInput = radioRectangle.querySelector(
            'input[type="radio"]',
        ) as HTMLInputElement;

        fireEvent.click(radioInput);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('renders with checked state when checked prop is true', () => {
        const { getByTestId } = render(
            <RadioRectangle
                label="Option 1"
                value="option1"
                onChange={handleChange}
                checked={true}
            />,
        );

        const radioRectangle = getByTestId('radio-rectangle');
        const radioInput = radioRectangle.querySelector('input[type="radio"]');

        expect(radioInput).toBeChecked();
    });

    it('renders with checkbox state when selectAreaView prop', () => {
        const { baseElement } = render(
            <RadioRectangle
                label="Option 1"
                value="option1"
                onChange={handleChange}
                selectAreaView="checkbox"
            />,
        );
        const checkboxIcon = baseElement.querySelector('.checkbox-icon');
        expect(checkboxIcon).toBeInTheDocument();
    });
});
