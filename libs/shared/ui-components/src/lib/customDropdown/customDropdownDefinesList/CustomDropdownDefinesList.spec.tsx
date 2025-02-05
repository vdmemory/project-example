import React from 'react';
import { render } from '@testing-library/react';
import CustomDropdownDefinesList from './CustomDropdownDefinesList';

jest.mock('@breef/shared/hooks', () => ({
    useGetList: jest.fn().mockReturnValue([
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
    ]),
    useWindowSize: jest.fn().mockReturnValue({
        width: 300,
        height: 400,
    }),

    useMediaContext: jest.fn().mockReturnValue({
        isMobile: false,
    }),
    useOnClickOutside: jest.fn(),
}));

describe('CustomDropdownDefinesList', () => {
    it('should render custom dropdown with fetched list items', () => {
        const { getByText } = render(
            <CustomDropdownDefinesList
                listType="someListType"
                placeholder="Select option"
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
});
