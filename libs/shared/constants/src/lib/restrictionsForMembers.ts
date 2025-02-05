export enum CompanyPosition {
    member = 'member',
    finance = 'finance',
}

export enum Restrictions {
    editCompanyInfo = 'editCompanyInfo',
    editTeamMembersRole = 'editTeamMembersRole',
    selectTeam = 'selectTeam',
    billingAccess = 'billingAccess',
    agencies = 'agencies',
}

export const restrictionsClientMembers = [
    Restrictions.editCompanyInfo,
    Restrictions.editTeamMembersRole,
];

export const restrictionsAgencyMembers = [Restrictions.editTeamMembersRole];

export const restrictionsClientFinance = [
    Restrictions.editCompanyInfo,
    Restrictions.editTeamMembersRole,
];

export const restrictionsAgencyFinance = [Restrictions.editTeamMembersRole];
