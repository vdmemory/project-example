import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

export const getIs404StatusCode = (error: FetchBaseQueryError) =>
    (error.status === 'PARSING_ERROR' && error.originalStatus === 404) ||
    error.status === 404;
