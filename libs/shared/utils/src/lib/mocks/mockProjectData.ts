import {
    ProjectStatuses,
    IsInterestedProject,
    PitchProjectStatuses,
    PitchProjectProgressBarStatuses,
    ProjectAgencyActionStatuses,
    Choice,
    BudgetType,
    ProjectCreationStepsEnum,
} from '@breef/shared/constants';

export const mockPitchPreviewData = {
    startDay: 'asap',
    agencySkills: [],
    budgetRange: Choice.less_then_fifty,
    budgetType: BudgetType.Monthly,
    agencyPreferences: [],
    agencyAdvantages: [],
    isAcceptedTerms: false,
    companyWebsite: '',
    kickOffStatus: 'approved_by_breef' as const as 'approved_by_breef',
    projectAgencyId: 123,
    name: 'name',
    description: 'description',
    submissionDeadline: '',
    companyName: 'New Balance',
    companyLogoUrl: 'https://www.logo.jpg',
    companyDescription: 'companyDescription',
    clientDescription: 'clientDescription',
    socialLinks: [
        {
            title: 'Instagram',
            link: '',
        },
        {
            title: 'Twitter',
            link: '',
        },
        {
            title: 'TikTok',
            link: '',
        },
    ],
    companyLocation: 'Barcelona',
    agencyLocation: 'Italy',
    openToRemoteAgencies: true,
    objectives: [
        {
            id: 111,
            name: 'objectives name',
            description: 'objectives description',
        },
    ],
    agenciesAdvantages: [
        {
            id: 222,
            name: 'agenciesAdvantages name',
        },
    ],
    projectFormat: 'ongoing',
    miscNotes: 'miscNotes',
    miscNotesGif: null,
    files: [],
    pitchId: 321,
    brandLinks: [
        {
            id: 44,
            title: 'link-1',
            link: 'https://link-1.com',
            loading: false,
        },
    ],

    kickoffId: null,
    website: 'website.com',
    status: ProjectStatuses.draft,
    projectAgencyStatus: PitchProjectStatuses.reviewProject,
    progressBarStatus: PitchProjectProgressBarStatuses.reviewAndPitch,
    actionValue: ProjectAgencyActionStatuses.reviewAndPitch,
    isPitchSubmitted: false,
    isInterested: IsInterestedProject.NotSelected,
    isArchived: false,
    step: ProjectCreationStepsEnum.ProjectScope,
};
