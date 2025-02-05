import { FilterProjectsType } from '@breef/shared/types';

export const PROJECTS_PATH = (
    role: 'client' | 'agency',
    filterData: FilterProjectsType,
) => {
    const baseUrl = role === 'client' ? '/projects' : '/agencies/projects';
    const queryParamsArray = [];
    if (filterData.status) queryParamsArray.push(`status=${filterData.status}`);
    if (filterData.page) queryParamsArray.push(`page=${filterData.page}`);
    if (filterData.pageSize)
        queryParamsArray.push(`page_size=${filterData.pageSize}`);

    if (queryParamsArray.length !== 0) {
        return `${baseUrl}?${queryParamsArray.join('&')}`;
    }
    return baseUrl;
};
export const DASHBOARD_CTA_ACTION_PATH = '/projects/dashboard-cta';
export const COLLECTION_POSTS_PATH = '/webflow-items';
export const STREAMLINED_PROJECT_DATA_PATH = '/projects/default_to_review';
