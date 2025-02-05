export enum STEP_CONTROL {
    'increment' = 'inc',
    'decrement' = 'dec',
}
export enum SubStep {
    'SubStep1' = 1,
    'SubStep2',
    'SubStep3',
    'SubStep4',
    'SubStep5',
    'SubStep6',
}

export enum ProjectCreationStepsEnum {
    ProjectScope = 'project_scope',
    AgencyPreferences = 'agency_preferences',
    ProjectDetails = 'project_details',
    CompanyDetails = 'company_details',
    Review = 'review',
    Post = 'post',
}

export enum PitchCreationStepsEnum {
    AboutUs = 'about_us',
    YourPitch = 'your_pitch',
    Portfolio = 'portfolio',
    ProjectFit = 'project_fit',
    Review = 'review',
    Post = 'post',
}

export enum ProjectCreationSteps {
    brandBio = 'brand_bio',
    location = 'location',
    projectGoals = 'project_goals',
    agencyTimeframe = 'agency_timeframe',
    projectOverview = 'project_overview',
    projectType = 'project_type',
    projectPhases1 = 'project_phases_1',
    projectPhases2 = 'project_phases_2',
    brandInfo = 'brand_info',
    brandDocuments = 'brand_documents',
    agenciesAdvantages = 'agency_advantages',
    teamAndContact = 'team_and_contact',
    breefNotes = 'breef_notes',
    review = 'review',
    post = 'post',
}

export enum ProjectCreationStepsRequest {
    brand_bio = 'brandBio',
    location = 'location',
    project_goals = 'projectGoals',
    agency_timeframe = 'agencyTimeframe',
    project_overview = 'projectOverview',
    project_type = 'projectType',
    project_phases_1 = 'projectPhases1',
    project_phases_2 = 'projectPhases2',
    brand_info = 'brandInfo',
    brand_documents = 'brandDocuments',
    agency_advantages = 'agenciesAdvantages',
    team_and_contact = 'teamAndContact',
    breef_notes = 'breefNotes',
    review = 'review',
    post = 'post',
}

type ProjectCreationStepsObjType = {
    [key: string]: {
        step: number;
        stepper: number;
    };
};
export const projectCreationStepsObj: ProjectCreationStepsObjType = {
    // section 1
    brandBio: {
        step: 1,
        stepper: 1,
    },
    location: {
        step: 2,
        stepper: 1,
    },
    projectGoals: {
        step: 3,
        stepper: 1,
    },
    agencyTimeframe: {
        step: 4,
        stepper: 1,
    },
    projectOverview: {
        step: 5,
        stepper: 1,
    },
    projectType: {
        step: 6,
        stepper: 1,
    },
    // section 2
    projectPhases1: {
        step: 1,
        stepper: 2,
    },
    projectPhases2: {
        step: 2,
        stepper: 2,
    },
    // section 3
    brandInfo: {
        step: 1,
        stepper: 3,
    },
    brandDocuments: {
        step: 2,
        stepper: 3,
    },
    agenciesAdvantages: {
        step: 3,
        stepper: 3,
    },
    teamAndContact: {
        step: 4,
        stepper: 3,
    },
    breefNotes: {
        step: 5,
        stepper: 3,
    },
};
