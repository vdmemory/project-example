import {
    useChangeRoleMutation,
    useResendInviteTeamMemberMutation,
} from '@breef/shared/data-access-profile';
import ConfirmContent from '../../../popup/confirmContent/ConfirmContent';
import { useTeamMemberRemoveInviteController } from './useTeamMemberRemoveInviteController';
import { configNotifyMessages } from '../configNotifyMessages';
import { useToastifyRequest } from '@breef/shared/hooks';
import { usePopup } from '../../../popup/usePopup';

export type TeamMemberDataType = {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    date?: string;
    status?: string;
};

enum TeamMemberToastIds {
    RESEND_INVITE = 'resend-invite',
    REMOVE_INVITE = 'remove-invite',
}

interface UseTeamMemberRequestActionsControlProps {
    type: 'profile' | 'project' | 'pitch';
    data: TeamMemberDataType;
}
export const useTeamMemberControl = ({
    type,
    data,
}: UseTeamMemberRequestActionsControlProps) => {
    const confirmPopupControl = usePopup();
    const [fetchChangeRole] = useChangeRoleMutation();
    const [resendInvite, resendInviteQuery] =
        useResendInviteTeamMemberMutation();
    const { removeInvite, removeInviteQuery } =
        useTeamMemberRemoveInviteController(type);

    const onSelectActionForInvite = (value: string) => {
        switch (value) {
            case 'resend':
                return resendInvite(data);
            case 'revoke':
                return removeInvite(data.id);
            default:
                return;
        }
    };

    const eventConfirmModal = (event: 'confirm' | 'cancel') => {
        switch (event) {
            case 'cancel':
                return confirmPopupControl.close();
            case 'confirm':
                return removeInvite(data.id);
        }
    };

    const handleChangeRole = (position: number) => {
        fetchChangeRole({ userId: data.id, position: position });
    };

    const onChangeMember = (e: { target: { value: string } }) => {
        const value = e.target.value;
        switch (value) {
            case 'remove':
                return confirmPopupControl.open();
            default:
                return handleChangeRole(Number(value));
        }
    };

    const renderConfirmPopup = () =>
        confirmPopupControl.isOpen && (
            <ConfirmContent
                isSubmitting={removeInviteQuery.isLoading}
                title="Confirm Delete?"
                description="Are you sure you like to delete this user?"
                onClick={eventConfirmModal}
                close={confirmPopupControl.close}
            />
        );

    useToastifyRequest({
        actionProps: resendInviteQuery,
        configMessages: configNotifyMessages.resendInvite,
        toastId: TeamMemberToastIds.RESEND_INVITE + data.id,
    });
    useToastifyRequest({
        actionProps: removeInviteQuery,
        configMessages: configNotifyMessages.removeInvite,
        toastId: TeamMemberToastIds.REMOVE_INVITE + data.id,
        callbackFn: confirmPopupControl.close,
    });

    return {
        onSelectActionForInvite,
        onChangeMember,
        renderConfirmPopup,
    };
};
