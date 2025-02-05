import { getDomainName } from './getDomain';

describe('getDomain function', () => {
    const testCases = [
        {
            input: 'https://breef.autotest:4200/auth/signin',
            expected: 'breef.autotest',
        },
        {
            input: 'https://client.breef.autotest:4200/client/dashboard',
            expected: 'client.breef.autotest',
        },
        {
            input: 'https://agency.breef.autotest:4200/agency/dashboard',
            expected: 'agency.breef.autotest',
        },
        {
            input: 'https://projects.breef.com/client/project/create',
            expected: 'projects.breef.com',
        },
        {
            input: 'https://dev.new.breef.com/agency/projects',
            expected: 'dev.new.breef.com',
        },
        { input: '', expected: '' },
    ];

    testCases.forEach(testCase => {
        it(`should return ${testCase.expected} when input is ${testCase.input}`, () => {
            expect(getDomainName(testCase.input)).toEqual(testCase.expected);
        });
    });
});
