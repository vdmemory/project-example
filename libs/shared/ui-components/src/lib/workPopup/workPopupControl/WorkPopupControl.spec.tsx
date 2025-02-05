import { render, screen, fireEvent } from '@testing-library/react';
import { WorkPopupControl } from './WorkPopupControl';

describe('WorkPopupControl', () => {
    const mockOnSave = jest.fn();
    const mockOnCancel = jest.fn();

    it('renders WorkPopupControl component correctly', () => {
        render(
            <WorkPopupControl
                onSave={mockOnSave}
                isDisabledSave={false}
                onCancel={mockOnCancel}
            />,
        );

        expect(
            screen.getByRole('button', { name: 'Cancel' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Save' }),
        ).toBeInTheDocument();
    });

    it('calls onSave function when Save button is clicked', () => {
        render(
            <WorkPopupControl
                onSave={mockOnSave}
                isDisabledSave={false}
                onCancel={mockOnCancel}
            />,
        );

        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        expect(mockOnSave).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel function when Cancel button is clicked', () => {
        render(
            <WorkPopupControl
                onSave={mockOnSave}
                isDisabledSave={false}
                onCancel={mockOnCancel}
            />,
        );

        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('disables Save button when isDisabledSave is true', () => {
        render(
            <WorkPopupControl
                onSave={mockOnSave}
                isDisabledSave={true}
                onCancel={mockOnCancel}
            />,
        );

        const saveButton = screen.getByRole('button', { name: 'Save' });
        expect(saveButton).toBeDisabled();
    });
});
