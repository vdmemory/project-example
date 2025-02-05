export const SET_PASSWORD_PATH = '/auth/set-password';
export const CHANGE_PASSWORD_PATH = '/auth/change-password';

export const CLIENTS_ACCOUNT_INFO_PATH = '/clients/profile/user';
export const AGENCIES_ACCOUNT_INFO_PATH = '/agencies/profile/user';

export const CLIENTS_COMPANY_INFO_PATH = '/clients/profile';
export const AGENCIES_COMPANY_INFO_PATH = '/agencies/profile';

export const AGENCIES_COMPANY_PATH = '/agencies/profile/company';
export const AGENCIES_CAPABILITIES_PATH = '/agencies/profile/capabilities';
export const AGENCIES_INDUSTRIES_TAGS_PATH = '/agencies/profile/industries';
export const AGENCIES_LINKS_DOCS_PATH = '/agencies/profile/links';

export const INDUSTRIES_PATH = '/industries';
export const IDENTITIES_PATH = '/agencies/identity';
export const SERVICES_AND_SKILLS_PATH = '/services-and-skills';

export const TEAM_MEMBERS_PATH = '/profile/team';
export const TEAM_MEMBERS_KICKOFF_PATH = '/profile/team/kick-off';
export const INVITE_TEAM_MEMBER_PATH = '/profile/team/invite';

export const getRemoveUserPath = (id: number) => `/profile/team/user/${id}`;

export const LIST_ROLES_PATH = '/roles';

export const BILLING_DATA_PATH = '/profile/billing-details';
export const TOKEN_PROFILE_PATH = '/auth/token/profile';

export const changeRolePath = (id: number) => `/position/user/${id}`;
