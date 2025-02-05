import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InnerInvitesMembers from './InnerInvitesMembers';
import { usePopup } from '../../../popup/usePopup';
import { useCheckEmailMutation } from '@breef/shared/data-access-auth';

jest.mock('../../../popup/usePopup', () => ({
    usePopup: jest.fn(),
}));

jest.mock('@breef/shared/data-access-auth');
(useCheckEmailMutation as jest.Mock).mockImplementation(() => [
    jest.fn(),
    jest.fn(() =>
        Promise.resolve({
            isLoading: false,
            error: null,
        }),
    ),
]);

const mockUsePopup = usePopup as jest.Mock;

describe('InnerInvitesMembers', () => {
    const mockOnSelectTeamMember = jest.fn();
    const mockOnSelectTeamInvites = jest.fn();
    const mockOnAddInvitations = jest.fn();

    const teamMembersList = [
        {
            id: 1,
            email: 'member1@example.com',
            firstName: 'John',
            lastName: 'Doe',
            position: 'Developer',
        },
        {
            id: 2,
            email: 'member2@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            position: 'Designer',
        },
    ];

    const teamInvitesList = [
        {
            id: 3,
            email: 'invite1@example.com',
            date: '2024-05-21',
            phoneNumber: '1234567890',
            status: 'Pending',
        },
        {
            id: 4,
            email: 'invite2@example.com',
            date: '2024-05-22',
            phoneNumber: '0987654321',
            status: 'Pending',
        },
    ];

    const teamMembers = [{ id: 1, email: 'member1@example.com' }];

    const teamInvites = [{ id: 3, email: 'invite1@example.com' }];

    const invitations = [
        {
            email: 'invitation1@example.com',
            phoneNumber: '1111111111',
            checked: true,
        },
        {
            email: 'invitation2@example.com',
            phoneNumber: '2222222222',
            checked: false,
        },
    ];

    const defaultProps = {
        teamMembersList,
        teamInvitesList,
        teamInvites,
        onSelectTeamInvites: mockOnSelectTeamInvites,
        onSelectTeamMember: mockOnSelectTeamMember,
        teamMembers,
        onAddInvitations: mockOnAddInvitations,
        invitations,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockUsePopup.mockReturnValue({
            isOpen: false,
            open: jest.fn(),
            close: jest.fn(),
        });
    });

    it('should render correctly', () => {
        render(<InnerInvitesMembers {...defaultProps} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('invite1@example.com')).toBeInTheDocument();
        expect(screen.getByText('invite2@example.com')).toBeInTheDocument();
        expect(screen.getByText('invitation1@example.com')).toBeInTheDocument();
        expect(screen.getByText('invitation2@example.com')).toBeInTheDocument();
        expect(screen.getByText('Colleague')).toBeInTheDocument();
    });

    it('should handle team member click', () => {
        render(<InnerInvitesMembers {...defaultProps} />);
        fireEvent.click(screen.getByText('John Doe'));
        expect(mockOnSelectTeamMember).toHaveBeenCalledWith([]);
    });

    it('should handle team invite click', () => {
        render(<InnerInvitesMembers {...defaultProps} />);
        fireEvent.click(screen.getByText('invite1@example.com'));
        expect(mockOnSelectTeamInvites).toHaveBeenCalledWith([]);
    });

    it('should handle invitation click', () => {
        render(<InnerInvitesMembers {...defaultProps} />);
        fireEvent.click(screen.getByText('invitation1@example.com'));
        expect(mockOnAddInvitations).toHaveBeenCalledWith([
            {
                email: 'invitation1@example.com',
                phoneNumber: '1111111111',
                checked: false,
            },
            {
                email: 'invitation2@example.com',
                phoneNumber: '2222222222',
                checked: false,
            },
        ]);
    });

    it('should open AddInvitePopup when Colleague button is clicked', () => {
        const mockOpen = jest.fn();
        mockUsePopup.mockReturnValue({
            isOpen: false,
            open: mockOpen,
            close: jest.fn(),
        });
        render(<InnerInvitesMembers {...defaultProps} />);
        fireEvent.click(screen.getByText('Colleague'));
        expect(mockOpen).toHaveBeenCalled();
    });

    it('should render AddInvitePopup when it is open', () => {
        mockUsePopup.mockReturnValue({
            isOpen: true,
            open: jest.fn(),
            close: jest.fn(),
        });
        render(<InnerInvitesMembers {...defaultProps} />);
        expect(screen.getByText('Add payment contact')).toBeInTheDocument();
    });
});
