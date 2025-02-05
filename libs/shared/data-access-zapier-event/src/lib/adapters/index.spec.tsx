import { APP_ENVIRONMENT } from '@breef/shared/constants';
import {
    prepareCalendlyEvent,
    prepareProjectTypeEvent,
    prepareProjectPlanningEvent,
} from './zapierEventAdapters';

describe('prepareCalendlyEvent', () => {
    const values = {
        email: 'email@gmail.com',
        bookingSource: 'bookingSource',
    };
    it('prepareCalendlyEvent should return correct value on the localhost environment', () => {
        window.location.href = 'http://localhost:3000/some-path';
        const result = prepareCalendlyEvent(values);
        const expectedResult = JSON.stringify({
            BookingSource: 'bookingSource',
            Email: 'email@gmail.com',
            Environment: 'localhost',
        });

        expect(result).toEqual(expectedResult);
    });
    it('prepareCalendlyEvent should return correct value on the staging environment', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://staging/some-path',
            },
            writable: true,
        });

        const result = prepareCalendlyEvent(values);
        const expectedResult = JSON.stringify({
            BookingSource: 'bookingSource',
            Email: 'email@gmail.com',
            Environment: 'staging',
        });

        expect(result).toEqual(expectedResult);
    });
    it('prepareCalendlyEvent should return correct value on the development environment', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://dev/some-path',
            },
            writable: true,
        });

        const result = prepareCalendlyEvent(values);
        const expectedResult = JSON.stringify({
            BookingSource: 'bookingSource',
            Email: 'email@gmail.com',
            Environment: 'development',
        });

        expect(result).toEqual(expectedResult);
    });

    it('prepareCalendlyEvent should return correct value on the default environment', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://some-path',
            },
            writable: true,
        });

        const result = prepareCalendlyEvent(values);
        const expectedResult = JSON.stringify({
            BookingSource: 'bookingSource',
            Email: 'email@gmail.com',
            Environment: `${APP_ENVIRONMENT}`,
        });

        expect(result).toEqual(expectedResult);
    });
});

describe('prepareProjectTypeEvent', () => {
    const defaultValues = {
        projectTitle: 'projectTitle',
        companyName: 'companyName',
    };
    it('prepareProjectTypeEvent should return correct value with TypeOfProject = one_time', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://localhost:3000/some-path',
            },
            writable: true,
        });

        const values = {
            ...defaultValues,
            typeOfProject: 'one_time',
        };

        const result = prepareProjectTypeEvent(values);
        const expectedResult = JSON.stringify({
            ProjectTitle: 'projectTitle',
            CompanyName: 'companyName',
            TypeOfProject: 'One-Time',
            Environment: 'localhost',
        });

        expect(result).toEqual(expectedResult);
    });

    it('prepareProjectTypeEvent should return correct value with TypeOfProject = one_time', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://dev/some-path',
            },
            writable: true,
        });

        const values = {
            ...defaultValues,
            typeOfProject: 'strategy_execution',
        };

        const result = prepareProjectTypeEvent(values);
        const expectedResult = JSON.stringify({
            ProjectTitle: 'projectTitle',
            CompanyName: 'companyName',
            TypeOfProject: 'Strategy + Retainer',
            Environment: 'development',
        });

        expect(result).toEqual(expectedResult);
    });

    it('prepareProjectTypeEvent should return correct value with TypeOfProject = OngoingRetainer', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://staging/some-path',
            },
            writable: true,
        });

        const values = {
            ...defaultValues,
            typeOfProject: 'ongoing_or_retainer',
        };

        const result = prepareProjectTypeEvent(values);
        const expectedResult = JSON.stringify({
            ProjectTitle: 'projectTitle',
            CompanyName: 'companyName',
            TypeOfProject: 'Ongoing or Retainer',
            Environment: 'staging',
        });

        expect(result).toEqual(expectedResult);
    });
});

describe('prepareProjectPlanningEvent', () => {
    it('prepareProjectPlanningEvent should return correct value', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://localhost/some-path',
            },
            writable: true,
        });
        const values = {
            email: 'test-email@gmail.test',
            select: [
                {
                    id: 22,
                    name: 'name',
                },
            ],
        };

        const result = prepareProjectPlanningEvent(values);
        const expectedResult = JSON.stringify({
            Email: 'test-email@gmail.test',
            Projects: ['name'],
            Environment: 'localhost',
        });

        expect(result).toEqual(expectedResult);
    });

    it('prepareProjectPlanningEvent should return correct value with empty array select', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://localhost/some-path',
            },
            writable: true,
        });
        const values = {
            email: 'test-email@gmail.test',
            select: [],
        };

        const result = prepareProjectPlanningEvent(values);
        const expectedResult = JSON.stringify({
            Email: 'test-email@gmail.test',
            Projects: ['No projects selected'],
            Environment: 'localhost',
        });

        expect(result).toEqual(expectedResult);
    });
});
