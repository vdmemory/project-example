export const PROJECT_TYPES_PATH = '/projects/types';
export const projectById = (id: number) => `/projects/${id}`;
export const projectByIdAgency = (id: number) => `/pitches/project/${id}`;

export const sharingProjectAgency = ({
    projectId,
}: {
    projectId: string | number;
}) => `/projects/${projectId}/agency_sharing`;
export const sharingProjectClient = ({
    projectId,
}: {
    projectId: string | number;
}) => `/projects/${projectId}/client_sharing`;

export const getSharedProject = (token: string) => `/projects/shared/${token}`;
export const getPitchesListByClient = (projectId: string) =>
    `/projects/${projectId}/pitches`;
export const getPitchesSharing = (idProject: number) =>
    `/projects/${idProject}/sharing/pitches`;

export const getDataPublicPitchesList = (token: string) =>
    `/pitches/shared/${token}`;

export const getPublicSinglePitch = (token: string, isAdmin?: boolean) =>
    `${isAdmin ? '/admins' : ''}/pitches/shared/${token}`;
// TODO: remove
export const getSinglePitch = ({
    projectId,
    pitchId,
}: {
    projectId: number | string;
    pitchId: number | string;
}) => `/projects/${projectId}/pitch/${pitchId}`;

export const getAgencyPitch = ({
    projectId,
    pitchId,
}: {
    projectId: number | string;
    pitchId: number | string;
}) => `/projects/${projectId}/pitch/${pitchId}`;

export const getPitchesRetrieve = (id: number | string) => `/pitches/${id}`;

export const updateReviewDesign = (id: number | string) =>
    `pitches/${id}/review`;

export const getAgenciesSchedulesList = (id: number | string) =>
    `/projects/${id}/schedule/agencies`;

export const getTeamProject = (id: number | string) => `/projects/${id}/team`;
export const getTeamPitch = (id: number | string) => `/pitches/${id}/team`;

export const sendSelectedAgency = (id: number | string) =>
    `/projects/${id}/select`;
export const removeTeamProjectPath = ({
    projectId,
    teamId,
}: {
    projectId: number;
    teamId: number;
}) => `/projects/${projectId}/team/user/${teamId}`;

export const removeTeamPitchPath = ({
    projectId,
    teamId,
}: {
    projectId: number;
    teamId: number;
}) => `/pitches/${projectId}/team/user/${teamId}`;

export const USING_TYPES_PATH = '/agencies/using-types';
