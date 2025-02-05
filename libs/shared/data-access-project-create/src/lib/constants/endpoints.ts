export type CapabilitiesQueryParams = {
    suggested?: boolean;
    limit?: number;
};
const capabilitiesEndpoint = ({
    suggested,
    limit,
}: CapabilitiesQueryParams) => {
    const queryParams = [];
    if (suggested) {
        queryParams.push(`suggested=${suggested}`);
    }
    if (limit) {
        queryParams.push(`limit=${limit}`);
    }

    const normalisedQueryParams = queryParams.length
        ? `?${queryParams.join('&')}`
        : '';
    return `/tags/capabilities${normalisedQueryParams}`;
};

export const ENDPOINTS = {
    projectPath: '/projects',
    projectCreatorPath: '/projects/creator',
    updateProjectPath: (id: number) => `/projects/${id}`,
    agencyTimeFramesPath: '/projects/agency-time-frame',
    projectGoalsPath: '/projects/objectives',
    agencyAdvantagesPath: (type: 'clients' | 'agencies') =>
        `${type}/advantages`,
    projectTemplatesPath: (id: number) => `/projects/template/${id}`,
    getTemplateTypes: '/projects/template-types',
    getTemplate: (skillsIds: number[]) =>
        `/projects/autofill?skills=${skillsIds}`,
    capabilities: capabilitiesEndpoint,
    preferences: '/agencies/preferences',
};
