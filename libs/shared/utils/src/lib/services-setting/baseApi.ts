import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const apiBase = createApi({
    reducerPath: 'baseService',
    baseQuery: baseQuery,
    tagTypes: ['BaseService'],
    endpoints: () => ({}),
});
