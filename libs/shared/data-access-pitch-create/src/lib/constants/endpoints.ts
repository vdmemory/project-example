const tagsEndpoint = ({ name, suggested, exclude, limit }: TagsQueryParams) => {
    const queryParams = [];
    if (name) {
        queryParams.push(`name=${name}`);
    }
    if (suggested) {
        queryParams.push(`suggested=${suggested}`);
    }
    if (exclude) {
        queryParams.push(`exclude=${exclude}`);
    }
    if (limit) {
        queryParams.push(`limit=${limit}`);
    }

    const normalisedQueryParams = queryParams.length
        ? `?${queryParams.join('&')}`
        : '';
    return `/tags${normalisedQueryParams}`;
};

export type TagsQueryParams = {
    name?: string;
    suggested?: boolean;
    exclude?: string[];
    limit?: number;
};

export const ENDPOINTS = {
    projectPath: '/pitches',
    getPitchPreview: (id: number) => `/pitches/project/${id}`,
    setTermsForPitch: (id: number) => `/pitches/project/${id}/terms`,
    getPitchById: (id: number) => `/pitches/${id}`,
    sharingPitchAgency: ({ pitchId }: { pitchId: string | number }) =>
        `pitches/${pitchId}/agency_sharing`,
    sharingPitchClient: ({ pitchId }: { pitchId: string | number }) =>
        `pitches/${pitchId}/client_sharing`,
    updateIsInterestedProject: ({
        projectAgencyId,
    }: {
        projectAgencyId: number;
    }) => `/agencies/project-interest/${projectAgencyId}`,
    getPitchGuideUrl: () => `/files/breef_pitch_guide`,
    preferences: '/clients/advantages',
    tags: tagsEndpoint,
    passReasons: '/pass-reasons',
};
