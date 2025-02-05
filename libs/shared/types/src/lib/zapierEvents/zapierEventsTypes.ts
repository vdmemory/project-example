export type CalendlyEventType = {
    bookingSource: string;
    email: string;
};

export type ProjectTypeEventType = {
    projectTitle: string;
    companyName: string;
    typeOfProject: string;
};

export enum TypeSource {
    ONBOARDING = 'app-onboarding',
}

export type ProjectPlanningEventType = {
    email: string;
    select: {
        id: number | string;
        name: string;
    }[];
};
