import { renderHook, act } from '@testing-library/react-hooks';
import {
    useTeamMemberControl,
    TeamMemberDataType,
} from './useTeamMemberControl';
import { usePopup } from '../../../popup/usePopup';
import { useResendInviteTeamMemberMutation } from '@breef/shared/data-access-profile';

jest.mock('@breef/shared/data-access-profile', () => ({
    useChangeRoleMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
    useResendInviteTeamMemberMutation: jest.fn(() => [
        jest.fn(),
        { isLoading: false },
    ]),
}));

jest.mock('../../../popup/usePopup', () => ({
    usePopup: jest.fn(() => ({
        isOpen: false,
        open: jest.fn(),
        close: jest.fn(),
    })),
}));

jest.mock('./useTeamMemberRemoveInviteController', () => ({
    useTeamMemberRemoveInviteController: jest.fn(() => ({
        removeInvite: jest.fn(),
        removeInviteQuery: { isLoading: false },
    })),
}));

describe('useTeamMemberControl', () => {
    const mockData: TeamMemberDataType = {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Developer',
        date: '2024-06-11',
        status: 'Active',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call the respective mutation when onSelectActionForInvite is called', () => {
        const { result } = renderHook(() =>
            useTeamMemberControl({
                type: 'profile',
                data: mockData,
            }),
        );

        act(() => {
            result.current.onSelectActionForInvite('resend');
        });

        expect(useResendInviteTeamMemberMutation).toHaveBeenCalled();
    });

    it('should call the respective controller function when onChangeMember is called', () => {
        const { result } = renderHook(() =>
            useTeamMemberControl({
                type: 'profile',
                data: mockData,
            }),
        );

        act(() => {
            result.current.onChangeMember({ target: { value: 'remove' } });
        });

        expect(usePopup).toHaveBeenCalled();
    });

    it('should render confirm popup when renderConfirmPopup is called', () => {
        const { result } = renderHook(() =>
            useTeamMemberControl({
                type: 'profile',
                data: mockData,
            }),
        );

        act(() => {
            result.current.renderConfirmPopup();
        });

        expect(usePopup).toHaveBeenCalled();
    });
});
