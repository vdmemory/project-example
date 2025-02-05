import Route from 'route-parser';

export const PITCH_CREATE_ROUTER = new Route(
    '/project/:projectId/pitch/create',
);
export const PITCH_CREATE_REVIEW_ROUTER = new Route(
    `/project/:projectId/pitch/review`,
);
export const PITCH_EDIT_REVIEW_ROUTER = new Route(
    `/project/:projectId/pitch/:pitchId/review`,
);
export const PITCH_EDIT_ROUTE = new Route(
    '/project/:projectId/pitch/:pitchId/edit',
);
export const PROJECT_KICKOFF_EDIT_ROUTE = new Route(
    '/project/:projectId/kick-off/edit',
);
export const PROJECT_BOOK_MEETING_ROUTE = new Route(
    '/project/:projectId/book-meeting',
);
export const PROJECT_BOOK_MEETING_EDIT_ROUTE = new Route(
    '/project/:projectId/book-meeting/edit',
);
export const BREEF_AGENCY_ONBOARDING_ROUTE = new Route(
    'https://www.breef.com/apply?token=:token',
);
