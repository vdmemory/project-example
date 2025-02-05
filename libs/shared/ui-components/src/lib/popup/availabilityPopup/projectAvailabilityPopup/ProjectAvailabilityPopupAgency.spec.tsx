import '@testing-library/jest-dom';
import { TipsPopup } from './ProjectAvailabilityPopupAgency';
import { fireEvent, render, screen } from '@testing-library/react';
import ProjectAvailabilityPopupAgency from './ProjectAvailabilityPopupAgency';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { useRouteControl } from '@breef/shared/hooks';

jest.mock('@breef/shared/hooks');
jest.mock('@breef/shared/data-access-auth');

describe('ProjectAvailabilityPopupAgency', () => {
    const mockChangePage = jest.fn();
    const mockUseRouteControl = useRouteControl as jest.Mock;
    const mockUseGetSelfQuery = useGetSelfQuery as jest.Mock;

    beforeEach(() => {
        mockUseRouteControl.mockReturnValue({ changePage: mockChangePage });
        mockUseGetSelfQuery.mockReturnValue({ data: null, isLoading: true });
        jest.clearAllMocks();
    });

    it('renders null while loading', () => {
        mockUseGetSelfQuery.mockReturnValue({ data: {}, isLoading: true });
        render(<ProjectAvailabilityPopupAgency projectId={1} />);
        expect(
            screen.queryByText('Schedule Agency Intros'),
        ).not.toBeInTheDocument();
    });

    it('renders TipsPopup when data is loaded', () => {
        mockUseGetSelfQuery.mockReturnValue({ data: {}, isLoading: false });
        render(<ProjectAvailabilityPopupAgency projectId={1} />);
        expect(screen.getByText('Schedule Agency Intros')).toBeInTheDocument();
    });

    it('calls changePage on next button click', () => {
        mockUseGetSelfQuery.mockReturnValue({ data: {}, isLoading: false });
        render(<ProjectAvailabilityPopupAgency projectId={1} />);
        const button = screen.getByTestId('custom-button');
        fireEvent.click(button);
        expect(mockChangePage).toHaveBeenCalledWith('/project/1/book-meeting');
    });
});

describe('TipsPopup', () => {
    const mockOnClick = jest.fn();
    const mockConfig = {
        label: 'Test Label',
        note: 'Test Note',
        completeButtonLabel: 'Complete',
    };
    const mockTips = [
        { id: 1, title: 'Tip 1', description: 'Description 1' },
        { id: 2, title: 'Tip 2', description: 'Description 2' },
    ];

    it('renders correctly with tips and config', () => {
        render(
            <TipsPopup
                onClick={mockOnClick}
                config={mockConfig}
                tips={mockTips}
            />,
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('Tip 1')).toBeInTheDocument();
        expect(screen.getByText('Description 1')).toBeInTheDocument();
        expect(screen.getByText('Tip 2')).toBeInTheDocument();
        expect(screen.getByText('Description 2')).toBeInTheDocument();
    });

    it('hides card number when hideCardNumber is true', () => {
        render(
            <TipsPopup
                onClick={mockOnClick}
                config={mockConfig}
                tips={mockTips}
                hideCardNumber={true}
            />,
        );

        expect(screen.queryByText('001')).not.toBeInTheDocument();
        expect(screen.queryByText('002')).not.toBeInTheDocument();
    });

    it('shows card number when hideCardNumber is false', () => {
        render(
            <TipsPopup
                onClick={mockOnClick}
                config={mockConfig}
                tips={mockTips}
                hideCardNumber={false}
            />,
        );

        expect(screen.getByText('001')).toBeInTheDocument();
        expect(screen.getByText('002')).toBeInTheDocument();
    });
});
