import { useRemoveInviteTeamMemberMutation } from '@breef/shared/data-access-profile';
import { renderHook } from '@testing-library/react-hooks';
import { useTeamMemberRemoveInviteController } from './useTeamMemberRemoveInviteController';

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { projectId: '123' },
    }),
}));

jest.mock('@breef/shared/data-access-profile', () => ({
    useRemoveInviteTeamMemberMutation: jest.fn(() => [jest.fn(), {}]),
}));

jest.mock('@breef/shared/data-access-project', () => ({
    useRemoveTeamMembersProjectMutation: jest.fn(() => [jest.fn(), {}]),
    useRemoveTeamMembersPitchMutation: jest.fn(() => [jest.fn(), {}]),
}));

describe('useTeamMemberRemoveInviteController', () => {
    it('should return functions to remove invites based on type', () => {
        const { result } = renderHook(() =>
            useTeamMemberRemoveInviteController('profile'),
        );
        const { removeInvite, removeInviteQuery } = result.current;
        expect(typeof removeInvite).toBe('function');
        expect(removeInviteQuery).toBeDefined();
    });
    it('should return functions to remove invites project on type', () => {
        const { result } = renderHook(() =>
            useTeamMemberRemoveInviteController('project'),
        );
        const { removeInvite, removeInviteQuery } = result.current;
        expect(typeof removeInvite).toBe('function');
        expect(removeInviteQuery).toBeDefined();
    });
    it('should return functions to remove invites pitch on type', () => {
        const { result } = renderHook(() =>
            useTeamMemberRemoveInviteController('pitch'),
        );
        const { removeInvite, removeInviteQuery } = result.current;
        expect(typeof removeInvite).toBe('function');
        expect(removeInviteQuery).toBeDefined();
    });
});
