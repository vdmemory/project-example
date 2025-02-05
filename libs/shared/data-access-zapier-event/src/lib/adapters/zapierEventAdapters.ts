import {
    APP_ENVIRONMENT,
    ProjectFormat,
    ProjectFormatId,
} from '@breef/shared/constants';
import {
    CalendlyEventType,
    ProjectPlanningEventType,
    ProjectTypeEventType,
} from '@breef/shared/types';

const getNameProjectType = (key: string) => {
    switch (key) {
        case ProjectFormat.OneTime:
            return ProjectFormatId.one_time;
        case ProjectFormat.StrategyExecution:
            return ProjectFormatId.strategy_execution;
        case ProjectFormat.OngoingRetainer:
            return ProjectFormatId.ongoing_or_retainer;
        default:
            return 'Unknown';
    }
};

const appEnvironment = () => {
    const locationUrl =
        typeof window !== 'undefined' ? window.location.href : '';
    if (locationUrl.includes('localhost')) return 'localhost';
    if (locationUrl.includes('staging')) return 'staging';
    if (locationUrl.includes('dev')) return 'development';
    return APP_ENVIRONMENT;
};

export const prepareCalendlyEvent = (data: CalendlyEventType) => {
    return JSON.stringify({
        BookingSource: data.bookingSource,
        Email: data.email,
        Environment: appEnvironment(),
    });
};

export const prepareProjectTypeEvent = (data: ProjectTypeEventType) => {
    return JSON.stringify({
        ProjectTitle: data.projectTitle,
        CompanyName: data.companyName,
        TypeOfProject: getNameProjectType(data.typeOfProject),
        Environment: appEnvironment(),
    });
};

export const prepareProjectPlanningEvent = (data: ProjectPlanningEventType) => {
    return JSON.stringify({
        Email: data.email,
        Projects: data.select.length
            ? data.select.map(item => item.name)
            : ['No projects selected'],
        Environment: appEnvironment(),
    });
};
