import { PROFILE_ROUTE, TabsProfile } from '@breef/shared/constants';
import { TabProfileType } from '@breef/shared/types';

const settings = {
    title: 'Account settings',
    tab: TabsProfile.settings,
    route: `${PROFILE_ROUTE}/${TabsProfile.settings}`,
};

const profile = {
    title: 'Company profile',
    tab: TabsProfile.profile,
    route: `${PROFILE_ROUTE}/${TabsProfile.profile}`,
};

const team = {
    title: 'Team members',
    tab: TabsProfile.team,
    route: `${PROFILE_ROUTE}/${TabsProfile.team}`,
};

const payments = {
    title: 'Payments',
    tab: TabsProfile.payments,
    route: `${PROFILE_ROUTE}/${TabsProfile.payments}`,
};

export const getTabsConfigClient = (): TabProfileType[] => {
    const array = [settings, profile, team, payments];
    return array;
};

export const getTabsConfigAgency = (): TabProfileType[] => {
    const array = [settings, profile, team];
    return array;
};
