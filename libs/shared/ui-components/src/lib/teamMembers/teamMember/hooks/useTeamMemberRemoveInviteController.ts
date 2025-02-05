import { useRemoveInviteTeamMemberMutation } from '@breef/shared/data-access-profile';
import {
    useRemoveTeamMembersPitchMutation,
    useRemoveTeamMembersProjectMutation,
} from '@breef/shared/data-access-project';
import { useRouter } from 'next/router';

export const useTeamMemberRemoveInviteController = (
    type: 'profile' | 'project' | 'pitch',
) => {
    const router = useRouter();
    const {
        query: { projectId },
    } = router;
    const [removeInviteProfile, removeInviteProfileQuery] =
        useRemoveInviteTeamMemberMutation();
    const [removeInviteTeamProject, removeInviteTeamProjectQuery] =
        useRemoveTeamMembersProjectMutation();
    const [removeInviteTeamPitch, removeInviteTeamPitchQuery] =
        useRemoveTeamMembersPitchMutation();

    switch (type) {
        case 'profile':
            return {
                removeInvite: (id: number) => removeInviteProfile(id),
                removeInviteQuery: removeInviteProfileQuery,
            };
        case 'project':
            return {
                removeInvite: (id: number) =>
                    removeInviteTeamProject({
                        projectId: Number(projectId),
                        teamId: id,
                    }),
                removeInviteQuery: removeInviteTeamProjectQuery,
            };
        case 'pitch':
            return {
                removeInvite: (id: number) =>
                    removeInviteTeamPitch({
                        projectId: Number(projectId),
                        teamId: id,
                    }),
                removeInviteQuery: removeInviteTeamPitchQuery,
            };
    }
};
