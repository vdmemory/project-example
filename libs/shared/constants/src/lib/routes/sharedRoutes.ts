import Route from 'route-parser';
import { TabsDashboardClient } from '../constants';

export const PROJECTS_ROUTE = '/projects';
export const PAYMENTS_ROUTE = '/payments';
export const PROFILE_ROUTE = '/profile';

export const NOTIFICATION_ROUTE = '/notification';

export const FAQ_ROUTE = '/faq';
export const TERMS_OF_USE_ROUTE = '/terms-of-use';
export const TERMS_OF_USE_STANDARD_ROUTE = '/terms-of-use-standard';
export const TERMS_OF_USE_PROJECT = '/terms-of-use-project';
export const PRIVACY_POLICY_ROUTE = '/privacy-policy';
export const REFERRALS_ROUTE = '/referrals';

export const PROJECT_KICKOFF_ROUTE = new Route('/project/:projectId/kick-off');

export const BASE_DASHBOARD_ROUTE = new Route('/project/:projectId/dashboard');

export const DASHBOARD_PROJECT_ROUTE = new Route(
    `/project/:projectId/dashboard/${TabsDashboardClient.project}`,
);
export const DASHBOARD_PITCHES_ROUTE = new Route(
    `/project/:projectId/dashboard/${TabsDashboardClient.pitches}`,
);
export const DASHBOARD_MEET_ROUTE = new Route(
    `/project/:projectId/dashboard/${TabsDashboardClient.meet}`,
);
export const DASHBOARD_PAYMENTS_ROUTE = new Route(
    `/project/:projectId/dashboard/${TabsDashboardClient.payments}`,
);

// TODO: old agency route
export const PROJECT_DASHBOARD_ROUTE = new Route('/project/:projectId');
export const PROJECT_DASHBOARD_MY_PITCH_ROUTE = new Route(
    '/project/:projectId?tab=my-pitch',
);
export const PROJECT_DASHBOARD_PAYMENTS_ROUTE = new Route(
    '/project/:projectId?tab=payments',
);
export const PROJECT_DASHBOARD_TABS_ROUTE = new Route(
    '/project/:projectId?tab=:tab',
);
