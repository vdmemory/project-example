import {
    BudgetType,
    ProjectClientActionStatuses,
    ProjectCreationStepsEnum,
    ProjectProgressBarStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import { ProjectByIdType } from '@breef/shared/types';
import { getProjectData } from './getDataByProjectScope';
import {
    getCamelCase,
    getCamelCaseObject,
    getSnakeCase,
    getSnakeCaseObject,
} from './getTransformCase';
import { isSharingAdapter } from './sharingAdapters';
import { SocialNameEnum } from '@breef/shared/constants';

describe('getCamelCase', () => {
    it('should return camel case key from snake case key', () => {
        expect(getCamelCase('test_some_key')).toEqual('testSomeKey');
    });
});

describe('getSnakeCase', () => {
    it('should return snake case key from camel case key', () => {
        expect(getSnakeCase('testSomeKey')).toEqual('test_some_key');
    });
});

describe('getCamelCaseObject', () => {
    it('should return object with camel case keys instead of snake case keys', () => {
        expect(
            JSON.stringify(
                getCamelCaseObject({
                    test_some_key_first: 'test val 1',
                    test_some_key_second: 'test val 2',
                }),
            ),
        ).toEqual(
            JSON.stringify({
                testSomeKeyFirst: 'test val 1',
                testSomeKeySecond: 'test val 2',
            }),
        );
    });
});

describe('getSnakeCaseObject', () => {
    it('should return object with snake case keys instead of camel case keys', () => {
        expect(
            JSON.stringify(
                getSnakeCaseObject({
                    testSomeKeyFirst: 'test val 1',
                    testSomeKeySecond: 'test val 2',
                }),
            ),
        ).toEqual(
            JSON.stringify({
                test_some_key_first: 'test val 1',
                test_some_key_second: 'test val 2',
            }),
        );
    });
});

describe('isSharingAdapter', () => {
    it('should return truthy transformed is sharing object', () => {
        const expectResult = {
            id: 1,
            isSharing: true,
            token: 'token',
        };
        const result = isSharingAdapter({
            id: 1,
            is_shared: true,
            token: 'token',
        });
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectResult));
    });
});

describe('getProjectData', () => {
    const mockProjectData: ProjectByIdType = {
        id: 2,
        name: 'Project 2',
        companyName: 'Company B',
        companyLocation: 'Location C',
        startDay: '2024-05-15',
        description: 'Description of Project 2',
        agencySkills: [],
        budgetRange: '',
        budgetType: BudgetType.Monthly,
        agencyLocation: 'Location D',
        agencyTags: [{ id: 2, name: 'Tag B' }],
        companyDescription: 'Description of Company B',
        companyWebsite: 'https://companyB.com',
        files: [],
        brandLinks: [],
        socialLinks: [], // Empty socialLinks array
        idealAgencyDescription: 'Ideal Agency Description',
        progressBarStatus: ProjectProgressBarStatuses.projectStarted,
        actionValue: ProjectClientActionStatuses.completed,
        currentPaymentId: 123,
        status: ProjectStatuses.complete,
        step: ProjectCreationStepsEnum.ProjectDetails,
        isAvailabilityCreated: false,
        isSchedulingCreated: false,
        isConfidential: true,
        isNameEditLocked: true,
        openToRemoteAgencies: true,
    };
    it('returns the default social links when socialLinks array is empty', () => {
        const result = getProjectData(mockProjectData);
        expect(result.socialLinks).toEqual([
            {
                title: SocialNameEnum.Tiktok,
                link: '',
            },
            {
                title: SocialNameEnum.Twitter,
                link: '',
            },
            {
                title: SocialNameEnum.Instagram,
                link: '',
            },
        ]);
    });

    it('returns modified social links when socialLinks array has entries', () => {
        const projectData = {
            ...mockProjectData,
            socialLinks: [
                { title: 'twitter', link: 'https://twitter.com/sample' },
                { title: 'instagram', link: 'https://instagram.com/sample' },
            ],
        };

        const result = getProjectData(projectData);
        expect(result.socialLinks).toEqual([
            {
                title: SocialNameEnum.Instagram,
                link: 'https://instagram.com/sample',
            },
            {
                title: SocialNameEnum.Tiktok,
                link: '',
            },
            {
                title: SocialNameEnum.Twitter,
                link: 'https://twitter.com/sample',
            },
        ]);
    });
});
