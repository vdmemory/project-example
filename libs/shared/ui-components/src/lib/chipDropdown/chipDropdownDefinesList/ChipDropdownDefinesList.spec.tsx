import { render } from '@testing-library/react';
import {
    ChipDropdownDefinesList,
    ChipDropdownDefinesListProps,
} from './ChipDropdownDefinesList';
import { useGetList } from '@breef/shared/hooks';

jest.mock('@breef/shared/hooks', () => ({
    useGetList: jest.fn((listType: string) => [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
    ]),
}));

describe('ChipDropdownDefinesList', () => {
    const props: ChipDropdownDefinesListProps = {
        listType: 'test-list',
        initialListValues: [{ name: 'Initial Option', id: 1 }],
        onClick: jest.fn(),
        onSelect: jest.fn(),
        parentRef: { current: document.createElement('div') },
        placeholder: 'Select an option',
        idxLayer: 2,
        disabled: false,
    };

    it('renders ChipDropdownDefinesList component with initial list values', () => {
        const { getByText } = render(<ChipDropdownDefinesList {...props} />);

        expect(getByText('Initial Option')).toBeInTheDocument();
    });

    it('calls useGetList with the correct listType', () => {
        render(<ChipDropdownDefinesList {...props} />);

        expect(useGetList).toHaveBeenCalledWith('test-list');
    });
});
