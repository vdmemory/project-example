export const useTeamMemberGetActionList = (disabledEvents: boolean) => {
    const actionsList = !disabledEvents
        ? [
              {
                  value: 'remove',
                  label: 'Remove user',
              },
          ]
        : [];

    const actionsListPendingInvite = !disabledEvents
        ? [
              {
                  value: 'resend',
                  label: 'Resend invite',
              },
              {
                  value: 'revoke',
                  label: 'Revoke invite',
              },
          ]
        : [
              {
                  value: 'resend',
                  label: 'Resend invite',
              },
          ];

    return { actionsList, actionsListPendingInvite };
};
