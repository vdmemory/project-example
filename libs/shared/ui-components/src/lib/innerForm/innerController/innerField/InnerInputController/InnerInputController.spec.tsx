import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    InnerInputController,
    InnerInputControllerProps,
} from './InnerInputController';
import {
    useGetIdentitiesQuery,
    useGetIndustriesQuery,
} from '@breef/shared/data-access-profile';
import {
    useGetAgencyAdvantagesListQuery,
    useGetAgencyTimeFramesListQuery,
    useGetProjectGoalsListQuery,
    useGetTemplateTypesQuery,
} from '@breef/shared/data-access-project-create';

jest.mock('@breef/shared/data-access-profile');
jest.mock('@breef/shared/data-access-project-create');

jest.mock('../../../../phoneNumberInput/PhoneNumberInput', () => ({
    __esModule: true,
    default: ({ value, onChange }: { value: string; onChange: any }) => (
        <input type="text" value={value} onChange={onChange} />
    ),
}));

const mockQueryReturnValue = {
    data: ['dummy data'],
};

const mockOnChange = jest.fn();

(useGetIdentitiesQuery as jest.Mock).mockReturnValue(mockQueryReturnValue);
(useGetIndustriesQuery as jest.Mock).mockReturnValue(mockQueryReturnValue);
(useGetAgencyAdvantagesListQuery as jest.Mock).mockReturnValue(
    mockQueryReturnValue,
);
(useGetAgencyTimeFramesListQuery as jest.Mock).mockReturnValue(
    mockQueryReturnValue,
);
(useGetProjectGoalsListQuery as jest.Mock).mockReturnValue(
    mockQueryReturnValue,
);
(useGetTemplateTypesQuery as jest.Mock).mockReturnValue(mockQueryReturnValue);

const defaultProps: InnerInputControllerProps = {
    label: 'Test Input',
    onChange: mockOnChange,
    type: 'text',
    value: '',
};

const renderWithProps = (props: Partial<InnerInputControllerProps>) => {
    return render(<InnerInputController {...defaultProps} {...props} />);
};

describe('InnerInputController Component', () => {
    it('renders text input correctly', () => {
        renderWithProps({ type: 'text' });

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
    });

    it('renders dropdown input correctly', () => {
        const { baseElement } = renderWithProps({ type: 'dropdown' });

        const dropdown = baseElement.querySelector('.custom-dropdown');
        expect(dropdown).toBeInTheDocument();
    });

    it('renders chip dropdown input correctly', () => {
        const { baseElement } = renderWithProps({ type: 'chipDropdown' });

        const chipDropdown = baseElement.querySelector('.chip-dropdown');
        expect(chipDropdown).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        renderWithProps({ type: 'text' });

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(mockOnChange).toHaveBeenCalled();
    });

    it('renders chip autocomplete input correctly', () => {
        renderWithProps({
            type: 'chipAutocomplete',
            value: [
                { id: 1, name: 'Test 1' },
                { id: 2, name: 'Test 2' },
            ],
        });
        const chipButtons = screen.getAllByTestId('chip-button');
        expect(chipButtons).toHaveLength(2);
        expect(screen.getByText('Test 1')).toBeInTheDocument();
        expect(screen.getByText('Test 2')).toBeInTheDocument();
    });

    it('renders textarea correctly', () => {
        renderWithProps({
            type: 'textarea',
        });
        const textarea = screen.getByRole('textbox');
        expect(textarea).toBeInTheDocument();
        fireEvent.change(textarea, { target: { value: 'new value' } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('renders social link correctly', () => {
        renderWithProps({
            type: 'socialLink',
            value: 'https://www.google.com',
        });

        const socialLink = screen.getByText('https://www.google.com');
        expect(socialLink).toBeInTheDocument();
        const deleteIcon = screen.getByTestId('delete-icon-wrapper');
        expect(deleteIcon).toBeInTheDocument();
    });

    it('renders phone input correctly', () => {
        renderWithProps({
            type: 'phone',
            value: '1234567890',
        });
        const phoneInput = screen.getByRole('textbox');
        expect(phoneInput).toBeInTheDocument();
        fireEvent.change(phoneInput, { target: { value: 'new value' } });
        expect(mockOnChange).toHaveBeenCalled();
    });
});
