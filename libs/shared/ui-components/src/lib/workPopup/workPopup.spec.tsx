import { render, screen, fireEvent } from '@testing-library/react';
import { WorkPopup } from './WorkPopup';

describe('WorkPopup', () => {
    const mockClose = jest.fn();

    it('renders WorkPopup component correctly', () => {
        render(
            <WorkPopup title="Test Popup" close={mockClose}>
                <div>Popup content</div>
            </WorkPopup>,
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Test Popup')).toBeInTheDocument();
        expect(screen.getByText('Popup content')).toBeInTheDocument();
    });

    it('calls close function when close button is clicked', () => {
        const { baseElement } = render(
            <WorkPopup title="Test Popup" close={mockClose}>
                <div>Popup content</div>
            </WorkPopup>,
        );

        const closeButton = baseElement.querySelector(
            '.close-button',
        ) as HTMLElement;
        fireEvent.click(closeButton);

        expect(mockClose).toHaveBeenCalledTimes(1);
    });
});
