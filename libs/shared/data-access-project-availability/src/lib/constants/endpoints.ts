export const getProjectSchedule = (projectId: string | number) =>
    `/projects/${projectId}/schedule`;

export const getProjectBookSchedule = (projectId: string | number) =>
    `/projects/${projectId}/schedule/book`;

export const getScheduleCalls = (projectId: string | number) =>
    `/projects/${projectId}/schedule/dashboard`;
