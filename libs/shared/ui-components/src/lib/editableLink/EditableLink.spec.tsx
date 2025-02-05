import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import { EditableLink } from './EditableLink';

describe('EditableLink', () => {
    const onSaveMock = jest.fn();
    const onRemoveMock = jest.fn();

    const defaultProps = {
        preValue: { title: 'Link Title', link: 'https://example.com' },
        onSave: onSaveMock,
        onRemove: onRemoveMock,
        isEditable: false,
        setIsEditable: jest.fn(),
    };

    it('renders link in non-editable mode', () => {
        render(<EditableLink {...defaultProps} />);
        const linkElement = screen.getByText('Link Title');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'https://example.com');
    });

    it('calls setIsEditable and onSave on edit button click', () => {
        const { baseElement } = render(<EditableLink {...defaultProps} />);
        const editButton = baseElement.querySelector(
            '.edit-icon',
        ) as HTMLButtonElement;
        fireEvent.click(editButton);
        expect(defaultProps.setIsEditable).toHaveBeenCalledWith(true);
        expect(onSaveMock).not.toHaveBeenCalled();
    });

    it('calls onSave on save button click in editable mode', async () => {
        const { baseElement } = render(
            <EditableLink {...defaultProps} isEditable />,
        );
        fireEvent.change(screen.getByPlaceholderText('Link Name'), {
            target: { value: 'New Link Title' },
        });
        fireEvent.change(screen.getByPlaceholderText('https://breef.com'), {
            target: { value: 'https://new-example.com' },
        });
        const saveButton = baseElement.querySelector(
            '.add-button',
        ) as HTMLButtonElement;
        fireEvent.click(saveButton);
        expect(screen.getByPlaceholderText('Link Name')).toHaveValue(
            'New Link Title',
        );
        expect(screen.getByPlaceholderText('https://breef.com')).toHaveValue(
            'https://new-example.com',
        );
    });

    it('calls onRemove on trash icon click in non-editable mode', () => {
        const { baseElement } = render(<EditableLink {...defaultProps} />);
        const trashIcon = baseElement.querySelector(
            '.trash-icon',
        ) as HTMLButtonElement;
        fireEvent.click(trashIcon);
        expect(trashIcon).toBeInTheDocument();
    });

    it('calls setIsEditable and onSave on Add icon click in editable mode', () => {
        const propsWithLastItem = {
            ...defaultProps,
            isEditable: false,
            isLastItem: true,
        };
        const { baseElement } = render(<EditableLink {...propsWithLastItem} />);
        const trashIcon = baseElement.querySelector(
            '.trash-icon',
        ) as HTMLButtonElement;
        fireEvent.click(trashIcon);
        expect(defaultProps.setIsEditable).toHaveBeenCalledWith(true);
        expect(onSaveMock).toHaveBeenCalledWith({ title: '', link: '' });
    });

    it('calls setIsEditable and onSave on icon click in editable mode for last item', () => {
        const propsWithLastItem = {
            ...defaultProps,
            isEditable: true,
            isLastItem: false,
        };
        render(<EditableLink {...propsWithLastItem} />);
        const trashIcon = screen.getByTestId('button-container');
        expect(trashIcon).toBeInTheDocument();
    });

    it('calls onRemove on trash icon click in editable mode for non-last item', () => {
        const propsWithNonLastItem = {
            ...defaultProps,
            isEditable: false,
            isLastItem: false,
        };
        const { baseElement } = render(
            <EditableLink {...propsWithNonLastItem} />,
        );
        const trashIcon = baseElement.querySelector(
            '.trash-icon',
        ) as HTMLButtonElement;
        fireEvent.click(trashIcon);
        expect(onRemoveMock).toHaveBeenCalled();
    });
});
