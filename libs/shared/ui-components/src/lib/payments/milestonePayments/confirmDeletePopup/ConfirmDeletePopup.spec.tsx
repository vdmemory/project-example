import { render, fireEvent } from '@testing-library/react';
import ConfirmDeletePopup from './ConfirmDeletePopup';

const mockAcceptFunction = jest.fn();
const mockClose = jest.fn();

describe('ConfirmDeletePopup', () => {
    it('renders confirm delete popup with message and buttons', () => {
        const { getByText, getByRole } = render(
            <ConfirmDeletePopup
                acceptFunction={mockAcceptFunction}
                close={mockClose}
            />,
        );

        expect(getByText('Please Confirm')).toBeInTheDocument();
        expect(
            getByText('Are you sure you like to delete this milestone?'),
        ).toBeInTheDocument();

        const cancelButton = getByRole('button', { name: 'Cancel' });
        const confirmButton = getByRole('button', { name: 'Confirm' });
        expect(cancelButton).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();
    });

    it('closes the popup when Cancel button is clicked', () => {
        const { getByRole } = render(
            <ConfirmDeletePopup
                acceptFunction={mockAcceptFunction}
                close={mockClose}
            />,
        );

        const cancelButton = getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelButton);

        expect(mockClose).toHaveBeenCalled();
    });

    it('calls acceptFunction and closes the popup when Confirm button is clicked', () => {
        const { getByRole } = render(
            <ConfirmDeletePopup
                acceptFunction={mockAcceptFunction}
                close={mockClose}
            />,
        );

        const confirmButton = getByRole('button', { name: 'Confirm' });
        fireEvent.click(confirmButton);

        expect(mockAcceptFunction).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalled();
    });
});
