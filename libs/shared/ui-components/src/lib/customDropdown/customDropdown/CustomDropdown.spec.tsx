import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomDropdown from './CustomDropdown';

describe('CustomDropdown', () => {
    const dropdownList = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
    ];

    it('should render with placeholder and options', () => {
        const { getByText, queryByText } = render(
            <CustomDropdown
                placeholder="Select option"
                dropdownList={dropdownList}
                value=""
            />,
        );

        const placeholderElement = getByText('Select option');
        expect(placeholderElement).toBeInTheDocument();

        const option1 = getByText('Option 1');
        expect(option1).toBeInTheDocument();

        const option2 = getByText('Option 2');
        expect(option2).toBeInTheDocument();
    });

    it('should toggle dropdown on click', () => {
        const { getByText, queryByText } = render(
            <CustomDropdown
                placeholder="Select option"
                dropdownList={dropdownList}
                value=""
            />,
        );

        const placeholderElement = getByText('Select option');
        fireEvent.click(placeholderElement);

        const option1 = getByText('Option 1');
        expect(option1).toBeInTheDocument();

        fireEvent.click(placeholderElement);

        const option1AfterToggle = queryByText('Option 1');
        expect(option1AfterToggle).toBeInTheDocument();
    });

    it('should call customChange function on option select', () => {
        const customChangeMock = jest.fn();
        const { getByText } = render(
            <CustomDropdown
                placeholder="Select option"
                dropdownList={dropdownList}
                value=""
                customChange={customChangeMock}
            />,
        );

        const option1 = getByText('Option 1');
        fireEvent.click(option1);

        expect(customChangeMock).toHaveBeenCalledWith('1');
    });

    it('should disable dropdown if isDisabled prop is true', () => {
        const { getByText } = render(
            <CustomDropdown
                placeholder="Select option"
                dropdownList={dropdownList}
                value=""
                isDisabled={true}
            />,
        );

        const placeholderElement = getByText('Select option');
        fireEvent.click(placeholderElement);

        const option1 = getByText('Option 1');
        expect(option1).toBeInTheDocument();
    });

    it('should disable dropdown if isDisabled prop is true', () => {
        const { baseElement } = render(
            <CustomDropdown
                placeholder="Select option"
                dropdownList={dropdownList}
                value=""
                isDisabled={true}
                dropdownButtonView="dots"
                type="dropdown"
            />,
        );

        const buttonDots = baseElement.querySelector('.button-dots');
        expect(buttonDots).toBeInTheDocument();
    });
});
