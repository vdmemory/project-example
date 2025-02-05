import Route from 'route-parser';

export const PROJECT_CREATE_ROUTE = '/project/create';
export const PROJECT_CREATE_OLD_ROUTE = '/project/create-old';

export const PROJECT_POST_ROUTE = new Route('/project/:projectId/post');
export const PROJECT_PAYMENT_CHOICE_ROUTE = new Route(
    '/project/:projectId/payment/:paymentId/choice',
);

export const PROJECTS_POST_SUCCESS_ROUTE = new Route(
    '/project/:projectId/post/success',
);
export const PROJECTS_POST_ERROR_ROUTE = new Route(
    '/project/:projectId/post/error',
);

export const CARD_PAY_SUCCESS_ROUTE = new Route(
    '/project/:projectId/payment/:paymentId/success',
);
export const CARD_PAY_ERROR_ROUTE = new Route(
    '/project/:projectId/payment/:paymentId/error',
);

export const PROJECT_EDIT_ROUTE = new Route('/project/:projectId/edit');
export const PROJECTS_ROUTE_CLIENT = '/projects';

export const CLIENT_PITCHES_REVIEW_ROUTER = new Route(
    `/project/:projectId/pitches-review`,
);
export const CLIENT_PITCHES_MAKE_INTRO_ROUTER = new Route(
    `/project/:projectId/pitches-make-intro`,
);

export const CLIENT_AGENCY_SELECTION_ROUTE = new Route(
    '/project/:projectId/agency-selection',
);
export const CLIENT_SINGLE_PITCH_ROUTER = new Route(
    `/project/:projectId/pitch/:pitchId`,
);
export const PROJECT_AVAILABILITY_ROUTE = new Route(
    '/project/:projectId/availability',
);
