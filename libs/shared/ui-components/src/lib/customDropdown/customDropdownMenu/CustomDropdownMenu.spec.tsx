import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomDropdownMenu from './CustomDropdownMenu';
import { useMediaContext, useWindowSize } from '@breef/shared/hooks';

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));

(useWindowSize as jest.Mock).mockReturnValue({
    width: 1024,
    height: 720,
});

describe('CustomDropdownMenu', () => {
    it('renders with hamburger icon initially', () => {
        const { getByTestId } = render(
            <CustomDropdownMenu
                dropdownList={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]}
            />,
        );
        const hamburgerIcon = getByTestId('button-hamburger');
        expect(hamburgerIcon).toBeInTheDocument();
    });

    it('toggles dropdown on button click', () => {
        const { getByTestId } = render(
            <CustomDropdownMenu
                dropdownList={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]}
            />,
        );
        const dropdownButton = getByTestId('drop-button');
        fireEvent.click(dropdownButton);
        const closeButton = getByTestId('button-close');
        expect(closeButton).toBeInTheDocument();
    });

    it('renders dropdown list items', () => {
        const { getByText } = render(
            <CustomDropdownMenu
                dropdownList={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]}
            />,
        );
        const option1 = getByText('Option 1');
        const option2 = getByText('Option 2');
        expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
    });

    it('calls onChange or customChange on item click', () => {
        const handleChange = jest.fn();
        const { getByText } = render(
            <CustomDropdownMenu
                onChange={handleChange}
                dropdownList={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]}
            />,
        );
        const option1 = getByText('Option 1');
        fireEvent.click(option1);
        expect(handleChange).toHaveBeenCalled();
    });

    it('closes dropdown after item selection if isAction is true', () => {
        const handleChange = jest.fn();
        const { getByText, getByTestId, queryByTestId } = render(
            <CustomDropdownMenu
                onChange={handleChange}
                isAction={true}
                dropdownList={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]}
            />,
        );
        fireEvent.click(getByText('Option 1'));
        expect(getByTestId('button-close')).toBeInTheDocument();
        fireEvent.click(getByTestId('button-close'));
        const closeButton = queryByTestId('button-close');
        expect(closeButton).not.toBeInTheDocument();
    });

    it('adds correct class names based on state', () => {
        const { getByTestId } = render(
            <CustomDropdownMenu
                dropdownList={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]}
            />,
        );
        const dropdownButton = getByTestId('drop-button') as HTMLButtonElement;
        const dropdownWrapper = getByTestId('dropdown-wrapper');

        expect(dropdownWrapper).toHaveClass('custom-dropdown');

        fireEvent.click(dropdownButton);
        expect(dropdownWrapper).toHaveClass('custom-dropdown open');
    });

    it('renders differently on mobile view', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        const { getByTestId } = render(
            <CustomDropdownMenu
                dropdownList={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]}
            />,
        );
        const dropdownWrapper = getByTestId('dropdown-wrapper');
        expect(dropdownWrapper).toHaveClass('custom-dropdown menu');
    });
});
