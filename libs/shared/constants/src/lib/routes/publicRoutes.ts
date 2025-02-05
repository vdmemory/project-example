import Route from 'route-parser';

export const PUBLIC_PROJECT_ROUTE = '/project';
export const PUBLIC_PITCHES_ROUTE = '/pitches';
export const PUBLIC_CLIENT_PITCHES_LIST = new Route(`/:token/pitches-list`);
export const PUBLIC_CLIENT_SINGLE_PITCH = new Route(`/:token/pitch`);

// breef resources
export const BREEF_PAY_INFORMATION_ROUTE = 'https://www.breef.com/breefpay';
